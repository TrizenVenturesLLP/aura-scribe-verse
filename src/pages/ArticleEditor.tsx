
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getArticleBySlug, mockTags } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { X, Image, Save, Sparkles, PlusCircle } from 'lucide-react';

const ArticleEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isNewArticle = slug === 'new';
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Load article data if editing existing article
  useEffect(() => {
    if (isNewArticle) return;
    
    const article = getArticleBySlug(slug || '');
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setExcerpt(article.excerpt);
      setCoverImage(article.coverImage || '');
      setSelectedTags(article.tags || []);
    } else {
      // Article not found, redirect to editor
      navigate('/editor/new');
    }
  }, [slug, navigate, isNewArticle]);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        toast({
          title: "Tag limit reached",
          description: "You can only select up to 3 tags per article.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle AI assistance
  const generateWithAI = () => {
    if (!aiPrompt) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt for the AI assistant.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate AI generation
    setIsSaving(true);
    setTimeout(() => {
      // In a real app, this would call an AI service API
      const aiSuggestion = `Here's a suggestion based on your prompt: "${aiPrompt}".\n\n` +
        `This would be AI-generated content that helps with your writing. ` +
        `It might provide outlines, improve your grammar, suggest better phrasing, ` +
        `or even generate entire sections of content based on your needs.`;
      
      setContent(currentContent => currentContent + '\n\n' + aiSuggestion);
      setShowAIDialog(false);
      setAiPrompt('');
      setIsSaving(false);
      
      toast({
        title: "AI content generated",
        description: "The AI-generated content has been added to your article.",
      });
    }, 1500);
  };

  // Handle save draft
  const saveDraft = () => {
    if (!title) {
      toast({
        title: "Title required",
        description: "Please add a title before saving your draft.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Draft saved",
        description: "Your article draft has been saved successfully.",
      });
    }, 1000);
  };

  // Handle publish
  const publishArticle = () => {
    if (!title || !content || !excerpt) {
      toast({
        title: "Missing information",
        description: "Please complete your article before publishing.",
        variant: "destructive",
      });
      return;
    }
    
    setIsPublishing(true);
    // In a real app, this would be an API call to publish the article
    setTimeout(() => {
      setIsPublishing(false);
      toast({
        title: "Article published!",
        description: "Your article has been published successfully.",
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <MainLayout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Editor header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {isNewArticle ? 'Create New Article' : 'Edit Article'}
            </h1>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={saveDraft} 
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </>
                )}
              </Button>
              <Button 
                onClick={publishArticle} 
                disabled={isPublishing}
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
          
          {/* Article title */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Article Title"
              className="text-2xl font-bold h-auto py-4 border-none shadow-none focus-visible:ring-0 focus:border-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          {/* Cover image */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="cover-image">Cover Image</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCoverImage('')}
                className={!coverImage ? 'invisible' : ''}
              >
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            </div>
            
            {coverImage ? (
              <div className="relative">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-md p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Image className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">Drag and drop an image or click to upload</p>
                <Input
                  id="cover-image"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    // In a real app, this would upload the file to a server
                    if (e.target.files && e.target.files[0]) {
                      // Simulate image URL for demo
                      setCoverImage("https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1000&auto=format&fit=crop");
                    }
                  }}
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById('cover-image')?.click()}>
                  Select Image
                </Button>
              </div>
            )}
          </div>
          
          {/* Article excerpt */}
          <div className="mb-6">
            <Label htmlFor="excerpt" className="mb-2 block">Article Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief summary of your article (displayed in previews)"
              className="min-h-[6rem]"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>
          
          {/* Tags selection */}
          <div className="mb-6">
            <Label className="mb-2 block">Tags (up to 3)</Label>
            <div className="flex flex-wrap gap-2">
              {mockTags.slice(0, 15).map((tag) => (
                <button
                  key={tag.slug}
                  type="button"
                  onClick={() => toggleTag(tag.name)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag.name)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent hover:bg-accent/80'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* AI assistant button */}
          <div className="mb-6 flex justify-end">
            <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Assistant
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>AI Writing Assistant</DialogTitle>
                  <DialogDescription>
                    Describe what you need help with, and our AI will generate content to assist your writing.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Textarea
                    placeholder="e.g., 'Write an introduction about quantum computing', 'Suggest a conclusion for my article', 'Help me rephrase this paragraph to be more engaging'..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={generateWithAI} disabled={!aiPrompt || isSaving}>
                    {isSaving ? 'Generating...' : 'Generate'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Content editor */}
          <div className="mb-8">
            <Label htmlFor="content" className="mb-2 block">Article Content</Label>
            <Textarea
              id="content"
              placeholder="Start writing your article..."
              className="min-h-[500px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          {/* Editor footer */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={saveDraft} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button onClick={publishArticle} disabled={isPublishing}>
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArticleEditor;
