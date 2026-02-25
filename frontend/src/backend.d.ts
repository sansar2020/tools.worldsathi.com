import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserCreditStatus {
    displayName: string;
    userId: Principal;
    creditsRemaining: bigint;
    totalCreditsAllowed: bigint;
    creditsConsumed: bigint;
}
export interface ToolCategory {
    id: bigint;
    name: string;
    description: string;
}
export interface UserPreferences {
    theme: string;
    userId: Principal;
    notificationSettings?: string;
    defaultMeasurementUnit?: string;
}
export interface ToolPage {
    id: bigint;
    files: Array<ExternalBlob>;
    title: string;
    content: string;
    category: ToolCategory;
}
export interface UserFavorites {
    userId: Principal;
    favoriteToolIds: Array<string>;
}
export interface Tool {
    id: bigint;
    name: string;
    usageCount: bigint;
    slug: string;
    tags: Array<string>;
    description: string;
    iconName: string;
    category: string;
    iconUrl: string;
    route: string;
    favoriteCount: bigint;
}
export interface SearchHistory {
    userId: Principal;
    timestamp: bigint;
    resultsCount: bigint;
    searchQuery: string;
}
export interface UserProfile {
    displayName?: string;
    userId: Principal;
    email?: string;
    totalCreditsAllowed: bigint;
    creditsConsumed: bigint;
    registrationDate: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addSearchHistory(userId: Principal, searchQuery: string, resultCount: bigint): Promise<void>;
    addToolCategory(name: string, description: string): Promise<bigint>;
    addToolPage(title: string, content: string, categoryId: bigint, files: Array<ExternalBlob>): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    consumeCredits(amount: bigint): Promise<boolean>;
    editDisplayName(newDisplayName: string | null): Promise<void>;
    getAllToolCategories(): Promise<Array<ToolCategory>>;
    getAllToolPages(): Promise<Array<ToolPage>>;
    getAllToolUsageCounts(): Promise<Array<[string, bigint]>>;
    getAllTools(): Promise<Array<Tool>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCreditBalance(userId: Principal): Promise<UserCreditStatus | null>;
    getCurrentUserFavorites(): Promise<UserFavorites | null>;
    getCurrentUserPreferences(): Promise<UserPreferences | null>;
    getSearchHistory(): Promise<Array<SearchHistory>>;
    getToolCategory(id: bigint): Promise<ToolCategory | null>;
    getToolPage(id: bigint): Promise<ToolPage | null>;
    getToolPagesByCategory(categoryId: bigint): Promise<Array<ToolPage>>;
    getToolUsageCount(toolId: string): Promise<bigint>;
    getUserDisplayName(principal: Principal): Promise<string | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeTools(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    listAllCreditBalances(): Promise<Array<UserCreditStatus>>;
    recordToolUsage(userId: Principal, toolId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCurrentUserFavorites(favorites: UserFavorites): Promise<void>;
    saveCurrentUserPreferences(preferences: UserPreferences): Promise<void>;
    updateProfileCredits(userId: Principal, totalCreditsAllowed: bigint): Promise<void>;
}
