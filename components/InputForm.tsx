import React from 'react';
import { GenerateIcon, LoadingSpinnerIcon } from './Icons';

interface InputFormProps {
  topic: string;
  setTopic: (value: string) => void;
  keywords: string;
  setKeywords: (value: string) => void;
  audience: string;
  setAudience: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  topic,
  setTopic,
  keywords,
  setKeywords,
  audience,
  setAudience,
  author,
  setAuthor,
  onGenerate,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
          Topic
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 5 Simple AI Tools for Small Businesses"
          className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-1">
          Keywords
        </label>
        <input
          id="keywords"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Comma-separated, e.g., AI for small business, AI tools"
          className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
       <div>
        <label htmlFor="audience" className="block text-sm font-medium text-gray-300 mb-1">
          Target Audience
        </label>
        <textarea
          id="audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          rows={3}
          placeholder="e.g., Non-technical small business owners..."
          className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
       <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
          Author
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g., Jane Doe"
          className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <LoadingSpinnerIcon />
              Generating...
            </>
          ) : (
            <>
              <GenerateIcon />
              Generate Blog Post
            </>
          )}
        </button>
      </div>
    </form>
  );
};
