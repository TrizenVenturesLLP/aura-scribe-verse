
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ArticleList from '@/components/articles/ArticleList';
import ArticleCard from '@/components/articles/ArticleCard';
import ShareButtons from '@/components/articles/ShareButtons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { BookmarkIcon, MessageSquare, ThumbsUp, PlayCircle } from 'lucide-react';
import { 
  getArticleBySlug, 
  getRelatedArticles, 
  getArticleComments, 
  mockComments
} from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  // Format date helper
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    if (!slug) return;
    
    // Simulate data loading
    setIsLoading(true);
    
    // Get article data
    const foundArticle = getArticleBySlug(slug);
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Get related articles
      const related = getRelatedArticles(foundArticle.id);
      setRelatedArticles(related);
      
      // Get comments
      const articleComments = getArticleComments(foundArticle.id);
      setComments(articleComments);
      
      // Scroll to top
      window.scrollTo(0, 0);
    } else {
      // Article not found
      navigate('/not-found');
    }
    
    setIsLoading(false);
  }, [slug, navigate]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // In a real app, this would be an API call to save the comment
    const newCommentObj = {
      id: `temp-${Date.now()}`,
      articleId: article.id,
      content: newComment,
      author: {
        id: "temp-user",
        name: "Guest User",
        image: "",
        slug: "guest-user"
      },
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked 
        ? "This article has been removed from your bookmarks."
        : "This article has been added to your bookmarks.",
    });
  };

  const toggleLikeComment = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const toggleAudioPlayer = () => {
    setShowAudioPlayer(!showAudioPlayer);
    
    if (!showAudioPlayer) {
      toast({
        title: "Audio feature",
        description: "In a production environment, this would start the AI-powered audio narration of the article.",
      });
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading article...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!article) return null;

  return (
    <MainLayout>
      <article className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main article content */}
          <div className="lg:col-span-8">
            {/* Article header */}
            <header className="mb-8">
              {article.tags && article.tags.length > 0 && (
                <div className="mb-4">
                  {article.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      to={`/tag/${tag.toLowerCase()}`}
                      className="inline-block mr-2 px-3 py-1 bg-accent hover:bg-accent/80 rounded-full text-sm transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
              
              <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link to={`/author/${article.author.slug}`}>
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={article.author.image} alt={article.author.name} />
                      <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <Link 
                      to={`/author/${article.author.slug}`}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {article.author.name}
                    </Link>
                    <div className="flex text-sm text-muted-foreground">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span className="mx-1">•</span>
                      <span>{article.readingTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleAudioPlayer}
                    className="relative"
                    aria-label="Listen to article"
                  >
                    <PlayCircle className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleBookmark}
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                  >
                    <BookmarkIcon 
                      className={`h-5 w-5 ${isBookmarked ? "fill-primary text-primary" : ""}`} 
                    />
                  </Button>
                  <ShareButtons 
                    url={window.location.href} 
                    title={article.title} 
                  />
                </div>
              </div>
            </header>
            
            {/* Audio player */}
            {showAudioPlayer && (
              <div className="mb-8 p-4 bg-accent rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PlayCircle className="h-6 w-6 mr-2 text-primary" />
                    <div>
                      <p className="font-medium">AI Audio Narration</p>
                      <p className="text-sm text-muted-foreground">Listen to this article</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm">1x</Button>
                    <div className="w-48 h-1 bg-muted rounded overflow-hidden">
                      <div className="w-1/4 h-full bg-primary"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">1:30 / 6:45</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Featured image */}
            {article.coverImage && (
              <div className="mb-8">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-full h-auto rounded-lg object-cover" 
                />
              </div>
            )}
            
            {/* Article content */}
            <div 
              className="article-content" 
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Article footer */}
            <footer className="mt-12">
              <Separator className="my-8" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Written by</p>
                    <Link 
                      to={`/author/${article.author.slug}`}
                      className="font-medium text-lg hover:text-primary transition-colors"
                    >
                      {article.author.name}
                    </Link>
                  </div>
                  <Button variant="outline">Follow</Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={toggleBookmark}>
                    <BookmarkIcon 
                      className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-primary text-primary" : ""}`} 
                    />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                  <ShareButtons 
                    url={window.location.href} 
                    title={article.title} 
                  />
                </div>
              </div>
            </footer>
            
            {/* Comments section */}
            <section className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Comments</h3>
              
              {/* Comment form */}
              <div className="mb-8">
                <Textarea
                  placeholder="Add to the discussion..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4"
                  rows={4}
                />
                <Button onClick={handleAddComment}>Post Comment</Button>
              </div>
              
              {/* Comments list */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-background p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Link to={`/author/${comment.author.slug}`}>
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={comment.author.image} alt={comment.author.name} />
                              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                            </Avatar>
                          </Link>
                          <div>
                            <div className="flex items-center space-x-2">
                              <Link 
                                to={`/author/${comment.author.slug}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                {comment.author.name}
                              </Link>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="mt-1">{comment.content}</p>
                            <div className="mt-2 flex items-center space-x-4">
                              <button
                                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => toggleLikeComment(comment.id)}
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {comment.likes}
                              </button>
                              <button className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Author info */}
            <div className="bg-accent rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={article.author.image} alt={article.author.name} />
                  <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <Link 
                    to={`/author/${article.author.slug}`}
                    className="font-medium text-lg hover:text-primary transition-colors"
                  >
                    {article.author.name}
                  </Link>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.author.bio}</p>
                </div>
              </div>
              <Button className="w-full">Follow</Button>
            </div>
            
            {/* Related articles */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedArticles.length > 0 ? (
                  relatedArticles.map(relatedArticle => (
                    <ArticleCard 
                      key={relatedArticle.id}
                      article={relatedArticle}
                      variant="minimal"
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground">No related articles found.</p>
                )}
              </div>
            </div>
            
            {/* Related questions - AI generated */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Questions about this topic</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="block hover:text-primary transition-colors">
                    How can AI be used ethically in healthcare?
                  </Link>
                </li>
                <li>
                  <Link to="#" className="block hover:text-primary transition-colors">
                    What skills will be most valuable as AI transforms industries?
                  </Link>
                </li>
                <li>
                  <Link to="#" className="block hover:text-primary transition-colors">
                    How will machine learning affect job markets in the next decade?
                  </Link>
                </li>
                <li>
                  <Link to="#" className="block hover:text-primary transition-colors">
                    What are the biggest misconceptions about AI?
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </MainLayout>
  );
};

export default ArticleDetail;
