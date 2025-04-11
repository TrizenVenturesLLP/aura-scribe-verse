
import React from 'react';
import ArticleCard from './ArticleCard';
import { Button } from '@/components/ui/button';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  slug: string;
  publishedAt: string;
  readingTime: string;
  author: {
    name: string;
    image?: string;
    slug: string;
  };
  tags?: string[];
}

interface ArticleListProps {
  articles: Article[];
  title?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
  variant?: 'default' | 'grid' | 'column';
  cardVariant?: 'default' | 'featured' | 'minimal';
  className?: string;
}

const ArticleList = ({
  articles,
  title,
  showLoadMore = false,
  onLoadMore,
  isLoading = false,
  variant = 'default',
  cardVariant = 'default',
  className,
}: ArticleListProps) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground text-center">No articles found.</p>
      </div>
    );
  }

  const getGridClasses = () => {
    switch (variant) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'column':
        return 'flex flex-col space-y-6';
      default:
        return 'flex flex-col space-y-8';
    }
  };

  return (
    <div className={className}>
      {title && <h2 className="text-2xl font-serif font-bold mb-6">{title}</h2>}
      <div className={getGridClasses()}>
        {articles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            variant={cardVariant}
          />
        ))}
      </div>
      {showLoadMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="outline"
            size="lg"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
