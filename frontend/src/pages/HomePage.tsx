import HeroSection from '../components/HeroSection';
import FeaturedToolsGrid from '../components/FeaturedToolsGrid';
import CategoryCards from '../components/CategoryCards';
import PopularToolsByCategory from '../components/PopularToolsByCategory';
import NewToolsSection from '../components/NewToolsSection';
import TrustSignals from '../components/TrustSignals';
import Sidebar from '../components/Sidebar';
import { ALL_TOOLS } from '../constants/tools';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { filterTools } from '../utils/toolHelpers';
import { Link } from '@tanstack/react-router';
import { getToolPath } from '../utils/toolHelpers';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const newTools = ALL_TOOLS.filter((tool) => tool.isNew);

  // Filter tools based on search query
  const filteredTools = searchQuery
    ? filterTools(ALL_TOOLS, { search: searchQuery })
    : [];

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Search Section */}
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for tools by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mt-4 bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {filteredTools.length > 0 ? (
                <div className="divide-y">
                  {filteredTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={getToolPath(tool.id, ALL_TOOLS)}
                      className="block p-4 hover:bg-muted/50 transition-colors"
                      onClick={() => setSearchQuery('')}
                    >
                      <h3 className="font-semibold text-foreground">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {tool.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No tools found matching "{searchQuery}"</p>
                  <p className="text-sm mt-2">Try different keywords or browse categories below</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-16">
            {/* Featured Tools Grid */}
            <FeaturedToolsGrid />

            {/* New Tools Section */}
            {newTools.length > 0 && <NewToolsSection tools={newTools} />}

            {/* Category Cards - Browse by Category */}
            <CategoryCards />

            {/* Popular Tools by Category */}
            <PopularToolsByCategory />

            {/* Trust Signals */}
            <TrustSignals />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
