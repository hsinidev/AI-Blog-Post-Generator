import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, QuillIcon, CodeIcon, TextIcon } from './Icons';

export interface PostOutput {
  title: string;
  slug: string;
  metaDescription: string;
  author: string;
  poweredBy: string;
  articleBody_HTML: string;
}

interface OutputDisplayProps {
  generatedPost: PostOutput | null;
  isLoading: boolean;
}

const SectionCopyButton: React.FC<{ textToCopy: string, label?: string }> = ({ textToCopy, label = 'Copy' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center px-3 py-1 border border-gray-600 text-xs font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all"
      aria-label={isCopied ? 'Copied to clipboard' : `Copy ${label}`}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
      <span className="ml-2">{isCopied ? 'Copied!' : label}</span>
    </button>
  );
};

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ generatedPost, isLoading }) => {
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');

  useEffect(() => {
    if (generatedPost) {
      setViewMode('preview');
    }
  }, [generatedPost]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mb-4"></div>
          <p className="text-lg font-medium text-gray-300">Generating your SEO-optimized blog post...</p>
          <p className="text-sm text-gray-500">This can take a moment. The AI is crafting greatness!</p>
        </div>
      );
    }

    if (!generatedPost) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <QuillIcon />
          <p className="mt-4 text-lg font-medium text-gray-300">Your generated post will appear here.</p>
          <p className="text-sm text-gray-500">Fill out the form and click "Generate" to start.</p>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col space-y-4 h-full">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <h3 className="font-semibold text-base text-white">Title</h3>
                <SectionCopyButton textToCopy={generatedPost.title} label="Copy Title" />
            </div>
            <p className="p-3 text-gray-300">{generatedPost.title}</p>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <h3 className="font-semibold text-base text-white">Slug</h3>
                <SectionCopyButton textToCopy={generatedPost.slug} label="Copy Slug"/>
            </div>
            <p className="p-3 text-gray-400 text-sm font-mono">{generatedPost.slug}</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center p-3 border-b border-gray-700">
                <h3 className="font-semibold text-base text-white">Meta Description</h3>
                <SectionCopyButton textToCopy={generatedPost.metaDescription} label="Copy Meta"/>
            </div>
            <p className="p-3 text-gray-400 text-sm">{generatedPost.metaDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-3 border-b border-gray-700">
                    <h3 className="font-semibold text-base text-white">Author</h3>
                </div>
                <p className="p-3 text-gray-400 text-sm">{generatedPost.author}</p>
            </div>
            <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-3 border-b border-gray-700">
                    <h3 className="font-semibold text-base text-white">Branding</h3>
                </div>
                <p className="p-3 text-indigo-400 text-xs font-bold tracking-wider uppercase">{generatedPost.poweredBy}</p>
            </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 flex-grow flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center p-3 border-b border-gray-700 flex-shrink-0">
                <h3 className="font-semibold text-base text-white">Article Body</h3>
                <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-md transition-colors ${viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                      <TextIcon />
                      Preview
                    </button>
                     <button
                      onClick={() => setViewMode('html')}
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-md transition-colors ${viewMode === 'html' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                      <CodeIcon />
                      HTML Code
                    </button>
                </div>
            </div>
            <div className="p-4 overflow-y-auto flex-grow relative">
                <div className="absolute top-2 right-2 z-10">
                    <SectionCopyButton textToCopy={generatedPost.articleBody_HTML} label="Copy HTML" />
                </div>
                {viewMode === 'preview' ? (
                    <div className="prose prose-sm prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: generatedPost.articleBody_HTML }} />
                ) : (
                    <pre className="whitespace-pre-wrap text-sm text-indigo-300 font-mono break-words bg-gray-900/50 p-3 rounded-md"><code>{generatedPost.articleBody_HTML}</code></pre>
                )}
            </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-[400px] lg:min-h-0 lg:h-full flex flex-col">
      {renderContent()}
    </div>
  );
};