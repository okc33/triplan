import React from 'react';
import { marked } from 'marked';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const htmlContent = marked(content);

  return (
    <div 
      className="prose prose-sm max-w-none
        prose-headings:text-foreground 
        prose-p:text-muted-foreground 
        prose-strong:text-foreground
        prose-ul:text-muted-foreground
        prose-li:text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownContent;