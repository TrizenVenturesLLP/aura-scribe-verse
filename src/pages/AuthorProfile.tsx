
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ArticleList from '@/components/articles/ArticleList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserBySlug, getArticlesByAuthor } from '@/data/mockData';
import { CalendarIcon, Users } from 'lucide-react';

const AuthorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const [author, setAuthor] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    // Simulate data loading
    setIsLoading(true);
    
    // Get author data
    const foundAuthor = getUserBySlug(slug);
    if (foundAuthor) {
      setAuthor(foundAuthor);
      
      // Get author's articles
      const authorArticles = getArticlesByAuthor(foundAuthor.id);
      setArticles(authorArticles);
    }
    
    setIsLoading(false);
  }, [slug]);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!author) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Author not found</h1>
            <p className="text-muted-foreground mb-8">
              The author you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-accent py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
              <AvatarImage src={author.image} alt={author.name} />
              <AvatarFallback className="text-4xl">{author.name[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-grow">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{author.name}</h1>
              <p className="text-muted-foreground mb-3 max-w-2xl">{author.bio}</p>
              
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  <span className="font-medium mr-1">{author.followers}</span> followers
                  <span className="mx-2">•</span>
                  <span className="font-medium mr-1">{author.following}</span> following
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  Joined {formatDate(author.joinedDate)}
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button
                variant={isFollowing ? "outline" : "default"}
                onClick={toggleFollow}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="articles">
          <TabsList className="mb-8">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            {articles.length > 0 ? (
              <ArticleList
                articles={articles}
                variant="grid"
                cardVariant="default"
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {author.name} hasn't published any articles yet.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">About {author.name}</h2>
                <p className="mb-4">{author.bio}</p>
                
                <h3 className="text-lg font-medium mt-6 mb-2">Contact</h3>
                <p className="text-muted-foreground">{author.email}</p>
                
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="sm">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AuthorProfile;
