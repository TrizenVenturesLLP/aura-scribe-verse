
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Tag {
  name: string;
  slug: string;
  count: number;
}

interface TagCloudProps {
  tags: Tag[];
  title?: string;
  className?: string;
}

const TagCloud = ({ tags, title = "Discover more topics", className }: TagCloudProps) => {
  // Sort tags by count
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);

  return (
    <div className={cn("rounded-lg border p-4", className)}>
      {title && <h3 className="font-medium text-lg mb-4">{title}</h3>}
      <div className="flex flex-wrap gap-2">
        {sortedTags.map((tag) => (
          <Link
            key={tag.slug}
            to={`/tag/${tag.slug}`}
            className="px-3 py-1 bg-accent hover:bg-accent/80 rounded-full text-sm transition-colors"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
