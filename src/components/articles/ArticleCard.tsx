
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt?: string;
    coverImage?: string;
    slug: string;
    author: {
      name: string;
      image?: string;
      slug: string;
    };
    publishedAt: string;
    readingTime?: string;
    tags?: string[];
  };
  variant?: 'default' | 'featured' | 'minimal';
  className?: string;
}

const ArticleCard = ({ 
  article, 
  variant = 'default',
  className 
}: ArticleCardProps) => {
  // Format date helper
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // For minimal variant (sidebar)
  if (variant === 'minimal') {
    return (
      <Link 
        to={`/article/${article.slug}`}
        className={cn(
          "block group card-hover p-2 -mx-2 rounded-lg",
          className
        )}
      >
        <div className="flex items-start space-x-3">
          {article.coverImage && (
            <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md">
              <img 
                src={article.coverImage} 
                alt={article.title} 
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <span>{article.author.name}</span>
              <span className="mx-1">•</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Featured variant (homepage)
  if (variant === 'featured') {
    return (
      <Link 
        to={`/article/${article.slug}`}
        className={cn(
          "group block card-hover",
          className
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {article.coverImage && (
            <div className="overflow-hidden rounded-lg aspect-[16/9]">
              <img 
                src={article.coverImage} 
                alt={article.title} 
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
          )}
          <div>
            {article.tags && article.tags.length > 0 && (
              <div className="mb-3">
                {article.tags.slice(0, 1).map((tag) => (
                  <span 
                    key={tag}
                    className="inline-block px-3 py-1 text-xs bg-accent rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
              {article.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={article.author.image} alt={article.author.name} />
                <AvatarFallback>{article.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{article.author.name}</span>
                <div className="flex text-xs text-muted-foreground">
                  <span>{formatDate(article.publishedAt)}</span>
                  {article.readingTime && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{article.readingTime}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link 
      to={`/article/${article.slug}`}
      className={cn(
        "block group card-hover",
        className
      )}
    >
      {article.coverImage && (
        <div className="overflow-hidden rounded-lg aspect-[16/9] mb-4">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
      )}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-2">
          {article.tags.slice(0, 1).map((tag) => (
            <span 
              key={tag}
              className="inline-block px-3 py-1 text-xs bg-accent rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {article.excerpt}
        </p>
      )}
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={article.author.image} alt={article.author.name} />
          <AvatarFallback>{article.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{article.author.name}</span>
          <div className="flex text-xs text-muted-foreground">
            <span>{formatDate(article.publishedAt)}</span>
            {article.readingTime && (
              <>
                <span className="mx-1">•</span>
                <span>{article.readingTime}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
