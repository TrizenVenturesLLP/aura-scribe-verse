
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ArticleList from '@/components/articles/ArticleList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers, mockArticles } from '@/data/mockData';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Edit,
  Eye,
  Heart,
  MessageSquare,
  Settings,
  Bookmark,
  Users
} from 'lucide-react';

const UserDashboard = () => {
  // Mock user data - in a real app, this would come from authentication
  const user = mockUsers[0];
  const [activeTab, setActiveTab] = useState("overview");

  // Mock stats data
  const stats = {
    views: 8462,
    likes: 423,
    comments: 87,
    followers: user.followers
  };

  // Mock analytics data for chart
  const analyticsData = [
    { name: 'Mon', views: 240, likes: 12 },
    { name: 'Tue', views: 300, likes: 18 },
    { name: 'Wed', views: 380, likes: 22 },
    { name: 'Thu', views: 420, likes: 25 },
    { name: 'Fri', views: 450, likes: 32 },
    { name: 'Sat', views: 280, likes: 16 },
    { name: 'Sun', views: 190, likes: 8 }
  ];

  const draftArticles = [
    {
      id: "draft-1",
      title: "The Impact of Quantum Computing on Cybersecurity",
      excerpt: "Exploring how quantum computing will transform encryption and data security in the coming decade.",
      slug: "draft-quantum-computing-cybersecurity",
      publishedAt: new Date().toISOString(),
      readingTime: "Draft",
      author: user,
      lastEdited: "2 days ago"
    },
    {
      id: "draft-2",
      title: "Sustainable Urban Planning: Building Cities for the Future",
      excerpt: "How innovative cities are redesigning infrastructure to meet environmental and social challenges.",
      slug: "draft-sustainable-urban-planning",
      publishedAt: new Date().toISOString(),
      readingTime: "Draft",
      author: user,
      lastEdited: "1 week ago"
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
              <p className="text-muted-foreground">Manage your content and view your analytics</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button asChild>
              <Link to="/editor/new">
                <Edit className="mr-2 h-4 w-4" /> New Article
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/settings">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-4 md:w-fit md:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.views.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Likes</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.likes.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+7% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Comments</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.comments.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+24% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Followers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.followers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+36 new followers this month</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Analytics chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Weekly Performance
                </CardTitle>
                <CardDescription>
                  Views and engagement from the past 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-end justify-between gap-2 border-b pt-6">
                  {analyticsData.map((day) => (
                    <div key={day.name} className="flex flex-col items-center">
                      <div className="flex gap-1 h-[180px] items-end">
                        <div 
                          className="w-8 bg-primary rounded-t"
                          style={{ height: `${day.views / 5}px` }}
                        ></div>
                        <div 
                          className="w-3 bg-primary/30 rounded-t"
                          style={{ height: `${day.likes * 3}px` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">{day.name}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <div className="flex items-center mr-4">
                    <div className="w-3 h-3 bg-primary mr-1"></div>
                    <span className="text-xs">Views</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary/30 mr-1"></div>
                    <span className="text-xs">Likes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  Recent Articles
                </CardTitle>
                <CardDescription>
                  Your recently published articles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ArticleList 
                  articles={mockArticles.slice(0, 3)}
                  variant="column"
                  cardVariant="minimal"
                />
                <div className="mt-4 text-center">
                  <Button onClick={() => setActiveTab("articles")} variant="outline">
                    View All Articles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="articles" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Published Articles</CardTitle>
                <CardDescription>
                  Manage and edit your published content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.articles && user.articles.length > 0 ? (
                  <div className="space-y-4">
                    {user.articles.map(article => (
                      <div key={article.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                          <h3 className="font-medium">
                            <Link 
                              to={`/article/${article.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {article.title}
                            </Link>
                          </h3>
                          <div className="flex text-xs text-muted-foreground mt-1">
                            <span>Published: {new Date(article.publishedAt).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>{article.readingTime}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/editor/${article.slug}`}>Edit</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="font-medium mb-2">No published articles yet</h3>
                    <p className="text-muted-foreground mb-4">Start creating and publishing your ideas</p>
                    <Button asChild>
                      <Link to="/editor/new">Write your first article</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="drafts" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Draft Articles</CardTitle>
                <CardDescription>
                  Continue working on your unpublished drafts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {draftArticles.length > 0 ? (
                  <div className="space-y-4">
                    {draftArticles.map(article => (
                      <div key={article.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex-1">
                          <h3 className="font-medium">
                            <Link 
                              to={`/editor/${article.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {article.excerpt}
                          </p>
                          <div className="flex text-xs text-muted-foreground mt-1">
                            <span>Last edited: {article.lastEdited}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/editor/${article.slug}`}>Continue</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="font-medium mb-2">No draft articles</h3>
                    <p className="text-muted-foreground mb-4">
                      Start writing and save drafts for later publication
                    </p>
                    <Button asChild>
                      <Link to="/editor/new">Create a draft</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookmarks" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bookmark className="mr-2 h-5 w-5 text-primary" />
                  Your Bookmarks
                </CardTitle>
                <CardDescription>
                  Articles you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.bookmarks && user.bookmarks.length > 0 ? (
                  <ArticleList 
                    articles={user.bookmarks}
                    variant="column"
                  />
                ) : (
                  <div className="text-center py-12">
                    <h3 className="font-medium mb-2">No bookmarks yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Bookmark articles to read them later
                    </p>
                    <Button asChild>
                      <Link to="/explore">Explore articles</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
