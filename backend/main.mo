// The documentation request is handled by frontend tooling. The existing code is untouched.
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";


import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";


actor {
  // ================== User Profile and Credit Management Types ==================
  type UserProfile = {
    userId : Principal;
    registrationDate : Int;
    email : ?Text;
    displayName : ?Text;
    creditsConsumed : Nat;
    totalCreditsAllowed : Nat;
  };

  type UserFavorites = {
    userId : Principal;
    favoriteToolIds : [Text];
  };

  type ToolUsageRecord = {
    userId : Principal;
    toolId : Text;
    timestamp : Int;
    usageCount : Nat;
  };

  type SearchHistory = {
    userId : Principal;
    searchQuery : Text;
    timestamp : Int;
    resultsCount : Nat;
  };

  type UserPreferences = {
    userId : Principal;
    theme : Text;
    defaultMeasurementUnit : ?Text;
    notificationSettings : ?Text;
  };

  type Tool = {
    id : Nat;
    name : Text;
    slug : Text;
    category : Text;
    description : Text;
    iconUrl : Text;
    favoriteCount : Nat;
    usageCount : Nat;
    tags : [Text];
    route : Text;
    iconName : Text;
  };

  type ToolCategory = {
    id : Nat;
    name : Text;
    description : Text;
  };

  type ToolPage = {
    id : Nat;
    title : Text;
    content : Text;
    files : [Storage.ExternalBlob];
    category : ToolCategory;
  };

  type UserCreditStatus = {
    userId : Principal;
    displayName : Text;
    totalCreditsAllowed : Nat;
    creditsConsumed : Nat;
    creditsRemaining : Nat;
  };

  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Store persistent data
  let userProfiles = Map.empty<Principal, UserProfile>();
  let userFavorites = Map.empty<Principal, UserFavorites>();
  let toolUsageRecords = Map.empty<Text, ToolUsageRecord>();
  let userPreferences = Map.empty<Principal, UserPreferences>();
  let toolCategories = Map.empty<Nat, ToolCategory>();
  let toolPages = Map.empty<Nat, ToolPage>();
  let tools = Map.empty<Nat, Tool>();
  let toolUsageCounts = Map.empty<Text, Nat>();

  var searchHistory : [SearchHistory] = [];

  var toolPageIdCounter = 1;
  var toolCategoryIdCounter = 1;
  var isToolInitialized : Bool = false;

  // ================== User Profile and Credit Functions ==================

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    if (profile.userId != caller) {
      Runtime.trap("Unauthorized: Cannot save profile for another user");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func consumeCredits(amount : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can consume credits");
    };

    switch (userProfiles.get(caller)) {
      case (?profile) {
        let remainingCredits = profile.totalCreditsAllowed - profile.creditsConsumed;
        if (remainingCredits < amount) {
          return false;
        };
        let updatedProfile : UserProfile = {
          userId = profile.userId;
          registrationDate = profile.registrationDate;
          email = profile.email;
          displayName = profile.displayName;
          creditsConsumed = profile.creditsConsumed + amount;
          totalCreditsAllowed = profile.totalCreditsAllowed;
        };
        userProfiles.add(caller, updatedProfile);
        true;
      };
      case (null) { Runtime.trap("Profile not found for caller") };
    };
  };

  public query ({ caller }) func getCreditBalance(userId : Principal) : async ?UserCreditStatus {
    switch (userProfiles.get(userId)) {
      case (?profile) {
        ?{
          userId;
          displayName = switch (profile.displayName) { case (?name) { name }; case (null) { "" } };
          totalCreditsAllowed = profile.totalCreditsAllowed;
          creditsConsumed = profile.creditsConsumed;
          creditsRemaining = if (profile.totalCreditsAllowed > profile.creditsConsumed) {
            profile.totalCreditsAllowed - profile.creditsConsumed;
          } else { 0 };
        };
      };
      case (null) { null };
    };
  };

  public shared ({ caller }) func listAllCreditBalances() : async [UserCreditStatus] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view credit balances");
    };

    userProfiles.values().toArray().map(
      func(profile) {
        {
          userId = profile.userId;
          displayName = switch (profile.displayName) { case (?name) { name }; case (null) { "" } };
          totalCreditsAllowed = profile.totalCreditsAllowed;
          creditsConsumed = profile.creditsConsumed;
          creditsRemaining = if (profile.totalCreditsAllowed > profile.creditsConsumed) {
            profile.totalCreditsAllowed - profile.creditsConsumed;
          } else { 0 };
        };
      }
    );
  };

  public shared ({ caller }) func updateProfileCredits(userId : Principal, totalCreditsAllowed : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update profile credits");
    };

    switch (userProfiles.get(userId)) {
      case (?profile) {
        let updatedProfile : UserProfile = {
          userId = profile.userId;
          registrationDate = profile.registrationDate;
          email = profile.email;
          displayName = profile.displayName;
          creditsConsumed = 0;
          totalCreditsAllowed;
        };
        userProfiles.add(userId, updatedProfile);
      };
      case (null) { Runtime.trap("Profile not found for user") };
    };
  };

  // ================== User Preferences Functions ==================
  public query ({ caller }) func getCurrentUserPreferences() : async ?UserPreferences {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access preferences");
    };
    userPreferences.get(caller);
  };

  public shared ({ caller }) func saveCurrentUserPreferences(preferences : UserPreferences) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save preferences");
    };
    if (preferences.userId != caller) {
      Runtime.trap("Unauthorized: Cannot save preferences for another user");
    };
    userPreferences.add(caller, preferences);
  };

  // ================== User Favorites Functions ==================
  public shared ({ caller }) func saveCurrentUserFavorites(favorites : UserFavorites) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save favorites");
    };
    if (favorites.userId != caller) {
      Runtime.trap("Unauthorized: Cannot save favorites for another user");
    };
    userFavorites.add(caller, favorites);
  };

  public query ({ caller }) func getCurrentUserFavorites() : async ?UserFavorites {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access favorites");
    };
    userFavorites.get(caller);
  };

  // ================== Tool Usage Functions ==================

  public shared ({ caller }) func recordToolUsage(userId : Principal, toolId : Text) : async () {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only record your own tool usage");
    };

    let currentCount = switch (toolUsageCounts.get(toolId)) {
      case (null) { 0 };
      case (?count) { count };
    };
    toolUsageCounts.add(toolId, currentCount + 1);
  };

  public query ({ caller }) func getToolUsageCount(toolId : Text) : async Nat {
    let count = switch (toolUsageCounts.get(toolId)) {
      case (null) { 0 };
      case (?c) { c };
    };
    count;
  };

  public query ({ caller }) func getAllToolUsageCounts() : async [(Text, Nat)] {
    toolUsageCounts.toArray();
  };

  // ================== Search History Functions ==================

  public shared ({ caller }) func addSearchHistory(userId : Principal, searchQuery : Text, resultCount : Nat) : async () {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only add your own search history");
    };
    let newSearch : SearchHistory = {
      userId;
      searchQuery;
      timestamp = Time.now();
      resultsCount = resultCount;
    };
    searchHistory := searchHistory.concat([newSearch]);
  };

  public query ({ caller }) func getSearchHistory() : async [SearchHistory] {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      searchHistory;
    } else {
      if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
        Runtime.trap("Unauthorized: Only users can access search history");
      };
      searchHistory.filter(func(search) { search.userId == caller });
    };
  };

  // ================== Tool Management ==================

  public shared ({ caller }) func initializeTools() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize tools");
    };
    if (isToolInitialized) {
      Runtime.trap("Tools already initialized");
    };

    let newTools = [
      {
        id = 3001;
        name = "Duotone Filter";
        slug = "duotone-filter";
        description = "Apply vibrant duotone color effects to your images for a modern, artistic look. Choose two colors to create striking visual contrasts and enhance your photos with easy-to-use presets.";
        iconUrl = "duotone-filter.png";
        favoriteCount = 0;
        category = "Image Tools";
        usageCount = 0;
        tags = [ "duotone", "image-processing", "color", "filter" ];
        route = "/tools/duotone-filter";
        iconName = "filter";
      },
      {
        id = 3002;
        name = "Gradient Generator";
        slug = "gradient-generator";
        description = "Create beautiful color gradients for backgrounds, graphics, and websites. Adjust colors, angles, and patterns with a simple interface to generate stunning visuals effortlessly.";
        iconUrl = "gradient-generator.png";
        favoriteCount = 0;
        category = "Generators";
        usageCount = 0;
        tags = [ "gradient", "color", "design", "generator" ];
        route = "/tools/gradient-generator";
        iconName = "gradient";
      },
      {
        id = 3003;
        name = "Pattern Maker";
        slug = "pattern-maker";
        description = "Design seamless patterns using shapes, colors, and textures. Perfect for backgrounds, wallpapers, and digital art. Includes easy customization options and ready-to-use templates.";
        iconUrl = "pattern-maker.png";
        favoriteCount = 0;
        category = "Generators";
        usageCount = 0;
        tags = [ "pattern", "design", "generator", "background" ];
        route = "/tools/pattern-maker";
        iconName = "pattern";
      },
      {
        id = 3004;
        name = "Color Extractor";
        slug = "color-extractor";
        description = "Extract dominant and palette colors from any image. Identify main hues, complementary colors, and gradients for design inspiration and color matching.";
        iconUrl = "color-extractor.png";
        favoriteCount = 0;
        category = "Analyzers";
        usageCount = 0;
        tags = [ "color", "analyzer", "gradient", "palette" ];
        route = "/tools/color-extractor";
        iconName = "color-extract";
      },
      {
        id = 3005;
        name = "Mesh Generator";
        slug = "mesh-generator";
        description = "Generate mesh backgrounds with poly gradients and color blending. Create abstract, visually appealing designs for use in websites, presentations, and digital projects.";
        iconUrl = "mesh-generator.png";
        favoriteCount = 0;
        category = "Generators";
        usageCount = 0;
        tags = [ "mesh", "gradient", "color", "design" ];
        route = "/tools/mesh-generator";
        iconName = "mesh";
      },
      {
        id = 3006;
        name = "Duotone Generator";
        slug = "duotone-generator";
        description = "Quickly create duotone color schemes and gradients for digital art, branding, and marketing materials. Experiment with various color pairs and preset combos.";
        iconUrl = "duotone-generator.png";
        favoriteCount = 0;
        category = "Generators";
        usageCount = 0;
        tags = [ "duotone", "gradient", "color", "generator" ];
        route = "/tools/duotone-generator";
        iconName = "duotone-gen";
      },
      {
        id = 1;
        name = "Easy Browser";
        slug = "easy-browser";
        description = "Browse the internet with simplified navigation";
        iconUrl = "browser.png";
        favoriteCount = 0;
        category = "Browsers";
        usageCount = 0;
        tags = [ "browser", "navigation", "internet" ];
        route = "/tools/easy-browser";
        iconName = "browser";
      },
      {
        id = 2;
        name = "Simple Password Manager";
        slug = "simple-password-manager";
        description = "Securely store and retrieve your passwords";
        iconUrl = "password-manager.png";
        favoriteCount = 0;
        category = "Security";
        usageCount = 0;
        tags = [ "password", "security", "manager" ];
        route = "/tools/simple-password-manager";
        iconName = "password";
      },
      {
        id = 3;
        name = "Accessible Cloud Storage";
        slug = "accessible-cloud-storage";
        description = "Store photos and documents with ease";
        iconUrl = "cloud-storage.png";
        favoriteCount = 0;
        category = "Productivity";
        usageCount = 0;
        tags = [ "cloud", "storage", "files" ];
        route = "/tools/accessible-cloud-storage";
        iconName = "cloud";
      },
      {
        id = 4;
        name = "User-Friendly VPN";
        slug = "user-friendly-vpn";
        description = "Protect your privacy online";
        iconUrl = "vpn.png";
        favoriteCount = 0;
        category = "Security";
        usageCount = 0;
        tags = [ "vpn", "security", "privacy" ];
        route = "/tools/user-friendly-vpn";
        iconName = "vpn";
      },
      {
        id = 5;
        name = "Simple Music Player";
        slug = "simple-music-player";
        description = "Listen to your favorite tunes";
        iconUrl = "music-streaming.png";
        favoriteCount = 0;
        category = "Entertainment";
        usageCount = 0;
        tags = [ "music", "entertainment", "player" ];
        route = "/tools/simple-music-player";
        iconName = "music";
      },
      {
        id = 6;
        name = "Easy Video Streaming";
        slug = "easy-video-streaming";
        description = "Watch movies and shows effortlessly";
        iconUrl = "video-streaming.png";
        favoriteCount = 0;
        category = "Entertainment";
        usageCount = 0;
        tags = [ "video", "entertainment", "streaming" ];
        route = "/tools/easy-video-streaming";
        iconName = "video";
      },
      {
        id = 7;
        name = "Online Banking Helper";
        slug = "online-banking-helper";
        description = "Simplified online banking tasks";
        iconUrl = "banking.png";
        favoriteCount = 0;
        category = "Finance";
        usageCount = 0;
        tags = [ "banking", "finance", "helper" ];
        route = "/tools/online-banking-helper";
        iconName = "banking";
      },
      {
        id = 8;
        name = "Shopping Assistant";
        slug = "shopping-assistant";
        description = "Easy online shopping for seniors";
        iconUrl = "shopping.png";
        favoriteCount = 0;
        category = "Shopping";
        usageCount = 0;
        tags = [ "shopping", "assistant", "ecommerce" ];
        route = "/tools/shopping-assistant";
        iconName = "shopping";
      },
      {
        id = 9;
        name = "Travel Planner";
        slug = "travel-planner";
        description = "Book trips and manage travel plans";
        iconUrl = "travel.png";
        favoriteCount = 0;
        category = "Travel";
        usageCount = 0;
        tags = [ "travel", "planner", "booking" ];
        route = "/tools/travel-planner";
        iconName = "travel";
      },
      {
        id = 10;
        name = "Social Media Simplified";
        slug = "social-media-simplified";
        description = "Connect with friends and family easily";
        iconUrl = "social-media.png";
        favoriteCount = 0;
        category = "Social";
        usageCount = 0;
        tags = [ "social", "media", "connections" ];
        route = "/tools/social-media-simplified";
        iconName = "social";
      },
      {
        id = 11;
        name = "Email Simplifier";
        slug = "email-simplifier";
        description = "Manage emails with less stress";
        iconUrl = "email.png";
        favoriteCount = 0;
        category = "Communication";
        usageCount = 0;
        tags = [ "email", "communication", "simplifier" ];
        route = "/tools/email-simplifier";
        iconName = "email";
      },
      {
        id = 12;
        name = "Health Tracker";
        slug = "health-tracker";
        description = "Track health metrics and appointments";
        iconUrl = "health.png";
        favoriteCount = 0;
        category = "Health";
        usageCount = 0;
        tags = [ "health", "tracker", "metrics" ];
        route = "/tools/health-tracker";
        iconName = "health";
      },
      {
        id = 13;
        name = "Finance Manager";
        slug = "finance-manager";
        description = "Simplified income and expense tracking";
        iconUrl = "finance.png";
        favoriteCount = 0;
        category = "Finance";
        usageCount = 0;
        tags = [ "finance", "manager", "expenses" ];
        route = "/tools/finance-manager";
        iconName = "finance";
      }
    ];

    for (tool in newTools.values()) {
      tools.add(tool.id, tool);
    };
    isToolInitialized := true;
  };

  public query ({ caller }) func getAllTools() : async [Tool] {
    tools.values().toArray();
  };

  public query ({ caller }) func getToolCategory(id : Nat) : async ?ToolCategory {
    toolCategories.get(id);
  };

  public query ({ caller }) func getAllToolCategories() : async [ToolCategory] {
    toolCategories.values().toArray();
  };

  public shared ({ caller }) func addToolCategory(name : Text, description : Text) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add tool categories");
    };
    let newCategory : ToolCategory = {
      id = toolCategoryIdCounter;
      name;
      description;
    };
    toolCategories.add(toolCategoryIdCounter, newCategory);
    toolCategoryIdCounter += 1;
    newCategory.id;
  };

  public query ({ caller }) func getToolPage(id : Nat) : async ?ToolPage {
    toolPages.get(id);
  };

  public query ({ caller }) func getAllToolPages() : async [ToolPage] {
    toolPages.values().toArray();
  };

  public query ({ caller }) func getToolPagesByCategory(categoryId : Nat) : async [ToolPage] {
    let pages = toolPages.values().toArray();
    pages.filter(func(page) { page.category.id == categoryId });
  };

  public shared ({ caller }) func addToolPage(title : Text, content : Text, categoryId : Nat, files : [Storage.ExternalBlob]) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add tool pages");
    };
    let category = toolCategories.get(categoryId);
    switch (category) {
      case (null) { Runtime.trap("Category not found") };
      case (?cat) {
        let newPage : ToolPage = {
          id = toolPageIdCounter;
          title;
          content;
          files;
          category = cat;
        };
        toolPages.add(toolPageIdCounter, newPage);
        toolPageIdCounter += 1;
        newPage.id;
      };
    };
  };

  public shared ({ caller }) func editDisplayName(newDisplayName : ?Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can edit their display name");
    };

    switch (userProfiles.get(caller)) {
      case (?profile) {
        let updatedProfile : UserProfile = {
          userId = profile.userId;
          registrationDate = profile.registrationDate;
          email = profile.email;
          displayName = newDisplayName;
          creditsConsumed = profile.creditsConsumed;
          totalCreditsAllowed = profile.totalCreditsAllowed;
        };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) { Runtime.trap("Profile not found for caller") };
    };
  };

  public query ({ caller }) func getUserDisplayName(principal : Principal) : async ?Text {
    switch (userProfiles.get(principal)) {
      case (?profile) { profile.displayName };
      case (null) { null };
    };
  };
};

