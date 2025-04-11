
import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Link2, MessageSquare } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  url: string;
  title: string;
  vertical?: boolean;
  className?: string;
}

const ShareButtons = ({ 
  url, 
  title, 
  vertical = false,
  className = ''
}: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'text-[#1DA1F2] hover:bg-[#1DA1F2]/10',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'text-[#4267B2] hover:bg-[#4267B2]/10',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: 'text-[#0077B5] hover:bg-[#0077B5]/10',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "The article link has been copied to your clipboard.",
      duration: 3000,
    });
  };

  const containerClasses = vertical
    ? 'flex flex-col space-y-2'
    : 'flex items-center space-x-2';

  return (
    <div className={`${containerClasses} ${className}`}>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="icon"
          className={link.color}
          onClick={() => window.open(link.url, '_blank')}
          aria-label={`Share on ${link.name}`}
        >
          <link.icon className="h-5 w-5" />
        </Button>
      ))}
      
      <Button
        variant="ghost"
        size="icon"
        className="text-foreground hover:bg-accent"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <Link2 className="h-5 w-5" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-accent"
            aria-label="More sharing options"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`, '_blank')}>
            Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, '_blank')}>
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, '_blank')}>
            Telegram
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ShareButtons;
