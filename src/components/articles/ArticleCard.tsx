
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BookmarkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: {
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
  };
  variant?: 'default' | 'featured' | 'minimal';
  className?: string;
}

const ArticleCard = ({ 
  article, 
  variant = 'default',
  className
}: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (variant === 'featured') {
    return (
      <div className={cn("group flex flex-col md:flex-row gap-6 card-hover rounded-lg p-1", className)}>
        {article.coverImage && (
          <Link 
            to={`/article/${article.slug}`}
            className="md:w-2/3 w-full aspect-[16/9] overflow-hidden rounded-lg"
          >
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
            />
          </Link>
        )}
        <div className="flex flex-col md:w-1/3 justify-between">
          <div>
            {article.tags && article.tags.length > 0 && (
              <div className="mb-2">
                <Link 
                  to={`/tag/${article.tags[0]}`} 
                  className="text-xs text-primary font-medium uppercase tracking-wider"
                >
                  {article.tags[0]}
                </Link>
              </div>
            )}
            <Link to={`/article/${article.slug}`} className="group">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to={`/author/${article.author.slug}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.image} alt={article.author.name} />
                  <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link 
                  to={`/author/${article.author.slug}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {article.author.name}
                </Link>
                <div className="flex text-xs text-muted-foreground">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className="mx-1">•</span>
                  <span>{article.readingTime}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <BookmarkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("group flex items-start gap-4 card-hover p-1", className)}>
        <div className="flex-1">
          <Link to={`/article/${article.slug}`} className="group">
            <h3 className="text-base font-medium group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <Link 
              to={`/author/${article.author.slug}`}
              className="hover:text-primary transition-colors"
            >
              {article.author.name}
            </Link>
            <span className="mx-1">•</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
        {article.coverImage && (
          <Link 
            to={`/article/${article.slug}`}
            className="w-16 h-16 flex-shrink-0 overflow-hidden rounded"
          >
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </Link>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("group flex flex-col card-hover rounded-lg p-1", className)}>
      {article.coverImage && (
        <Link 
          to={`/article/${article.slug}`}
          className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4"
        >
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          />
        </Link>
      )}
      <div>
        {article.tags && article.tags.length > 0 && (
          <div className="mb-2">
            <Link 
              to={`/tag/${article.tags[0]}`} 
              className="text-xs text-primary font-medium uppercase tracking-wider"
            >
              {article.tags[0]}
            </Link>
          </div>
        )}
        <Link to={`/article/${article.slug}`} className="group">
          <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h2>
        </Link>
        <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-2">
          <Link to={`/author/${article.author.slug}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={article.author.image} alt={article.author.name} />
              <AvatarFallback>{article.author.name[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link 
              to={`/author/${article.author.slug}`}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {article.author.name}
            </Link>
            <div className="flex text-xs text-muted-foreground">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="mx-1">•</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ArticleCard;
