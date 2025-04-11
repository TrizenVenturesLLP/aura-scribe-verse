
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ArticleCard from '@/components/articles/ArticleCard';
import ArticleList from '@/components/articles/ArticleList';
import TagCloud from '@/components/articles/TagCloud';
import { Button } from '@/components/ui/button';
import { 
  mockArticles, 
  mockTags, 
  getTrendingArticles, 
  getRecommendedArticles 
} from '@/data/mockData';
import { cn } from '@/lib/utils';
import { BookMarked, TrendingUp, BookOpen, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredArticle = mockArticles[0];
  const secondaryArticles = mockArticles.slice(1, 3);
  const trendingArticles = getTrendingArticles();
  const recommendedArticles = getRecommendedArticles();

  return (
    <MainLayout>
      {/* Hero section */}
      <section className="relative overflow-hidden bg-accent py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span>Discover ideas, </span>
                <span className="text-shimmer">insights</span>
                <span> & expertise</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl">
                AuraScribe is where curious minds find their next favorite read and writers share their knowledge with the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/explore">Start exploring</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base">
                  <Link to="/register">Create account</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-full max-w-md aspect-[3/4]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5 rounded-lg transform rotate-6"></div>
                <div className="absolute inset-0 bg-card border shadow-lg rounded-lg transform -rotate-3">
                  <div className="p-6 flex flex-col h-full">
                    <BookMarked className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Write your story</h3>
                    <p className="text-muted-foreground">Share your ideas with millions of readers.</p>
                    <div className="flex-grow"></div>
                    <div className="mt-8 border-t pt-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background"></div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">Join 1000+ writers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              <span className="inline-flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-primary" />
                Featured Stories
              </span>
            </h2>
            <Button variant="ghost" asChild>
              <Link to="/explore">View all</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <ArticleCard article={featuredArticle} variant="featured" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondaryArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Topics and trending */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="inline-flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Recommended For You
                  </span>
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/recommended">More</Link>
                </Button>
              </div>
              <ArticleList 
                articles={recommendedArticles} 
                variant="column"
                cardVariant="default"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  <span className="inline-flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                    Trending
                  </span>
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/trending">More</Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {trendingArticles.map((article, index) => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    variant="minimal" 
                    className={cn(
                      "p-3 rounded-lg",
                      index % 2 === 0 ? "bg-background" : "bg-transparent"
                    )}
                  />
                ))}
              </div>
              
              <div className="mt-8">
                <TagCloud tags={mockTags.slice(0, 10)} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-accent/70">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start writing?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of writers and share your stories, ideas, and expertise with readers around the world.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link to="/register">Get started</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
