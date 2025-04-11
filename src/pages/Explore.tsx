
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ArticleList from '@/components/articles/ArticleList';
import TagCloud from '@/components/articles/TagCloud';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockArticles, mockTags } from '@/data/mockData';
import { SearchIcon } from 'lucide-react';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Filter articles based on search term and active tag
  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !activeTag || (article.tags && article.tags.includes(activeTag));
    
    return matchesSearch && matchesTag;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setActiveTag(null);
    } else {
      setActiveTag(tag);
    }
  };

  const loadMore = () => {
    setIsLoading(true);
    // In a real app, this would load more articles from an API
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Articles</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          
          <form onSubmit={handleSearch} className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="search"
              placeholder="Search by title, content, or author"
              className="pl-10 py-6 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        
        {/* Active tag indicator */}
        {activeTag && (
          <div className="flex items-center justify-center mb-8">
            <div className="bg-accent flex items-center px-4 py-2 rounded-full">
              <span className="mr-2">Filtering by:</span>
              <Button 
                variant="secondary" 
                size="sm" 
                className="rounded-full text-sm"
                onClick={() => setActiveTag(null)}
              >
                {activeTag} ✕
              </Button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold mb-4">Explore by Topic</h2>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {mockTags.map((tag) => (
                  <Button
                    key={tag.slug}
                    variant={activeTag === tag.name ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleTagClick(tag.name)}
                    size="sm"
                  >
                    {tag.name}
                    <span className="ml-auto text-muted-foreground text-xs">
                      {tag.count}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {filteredArticles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-2xl font-bold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setActiveTag(null);
                }}>
                  Clear filters
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {searchTerm || activeTag ? "Search Results" : "Latest Articles"}
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredArticles.length} articles
                  </p>
                </div>
                
                <ArticleList
                  articles={filteredArticles}
                  variant="column"
                  showLoadMore={filteredArticles.length >= 5}
                  onLoadMore={loadMore}
                  isLoading={isLoading}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Explore;
