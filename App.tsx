import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { OutputDisplay, PostOutput } from './components/OutputDisplay';
import { generateBlogPost } from './services/geminiService';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [topic, setTopic] = useState('5 Simple AI Tools to Automate Your Small Business');
  const [keywords, setKeywords] = useState('AI for small business, AI automation tools, small business productivity, automate marketing, AI customer service');
  const [audience, setAudience] = useState('Non-technical small business owners who feel overwhelmed by daily tasks and want to learn about simple, affordable AI solutions.');
  const [author, setAuthor] = useState('HSINI MOHAMED');
  
  // State for color inputs
  const [h1Color, setH1Color] = useState('#a78bfa');
  const [h2Color, setH2Color] = useState('#c4b5fd');
  const [h3Color, setH3Color] = useState('#d1d5db');
  const [pColor, setPColor] = useState('#9ca3af');

  // State for conditional styling toggles
  const [useH1Color, setUseH1Color] = useState(true);
  const [useH2Color, setUseH2Color] = useState(true);
  const [useH3Color, setUseH3Color] = useState(true);
  const [usePColor, setUsePColor] = useState(true);

  const [generatedPost, setGeneratedPost] = useState<PostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!topic || !keywords || !audience || !author) {
      setError("All fields are required.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPost(null);
    try {
      const post = await generateBlogPost(
        topic, 
        keywords, 
        audience, 
        author,
        h1Color,
        useH1Color,
        h2Color,
        useH2Color,
        h3Color,
        useH3Color,
        pColor,
        usePColor
      );
      setGeneratedPost(post);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate post. ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [topic, keywords, audience, author, h1Color, useH1Color, h2Color, useH2Color, h3Color, useH3Color, pColor, usePColor]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <header className="w-full p-4 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex items-center space-x-3">
          <LogoIcon />
          <h1 className="text-xl font-bold text-white">AI Blog Post Generator</h1>
          <span className="text-sm text-gray-400 hidden sm:inline">by Code Vibe Assistant</span>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <div className="flex flex-col space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold mb-1 text-white">Content Brief</h2>
              <p className="text-gray-400 mb-4">Provide the details for your blog post.</p>
              <InputForm
                topic={topic}
                setTopic={setTopic}
                keywords={keywords}
                setKeywords={setKeywords}
                audience={audience}
                setAudience={setAudience}
                author={author}
                setAuthor={setAuthor}
                h1Color={h1Color}
                setH1Color={setH1Color}
                useH1Color={useH1Color}
                setUseH1Color={setUseH1Color}
                h2Color={h2Color}
                setH2Color={setH2Color}
                useH2Color={useH2Color}
                setUseH2Color={setUseH2Color}
                h3Color={h3Color}
                setH3Color={setH3Color}
                useH3Color={useH3Color}
                setUseH3Color={setUseH3Color}
                pColor={pColor}
                setPColor={setPColor}
                usePColor={usePColor}
                setUsePColor={setUsePColor}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </div>
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-sm">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            )}
          </div>
          
          <OutputDisplay
            generatedPost={generatedPost}
            isLoading={isLoading}
          />
        </div>
      </main>
      
      <footer className="w-full text-center p-4 text-xs text-gray-500 border-t border-gray-700 mt-8">
        <p>Powered by Google Gemini. Designed for rapid prototyping and portfolio building.</p>
      </footer>
    </div>
  );
};

export default App;