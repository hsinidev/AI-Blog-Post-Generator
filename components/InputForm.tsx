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
  h1Color: string;
  setH1Color: (value: string) => void;
  useH1Color: boolean;
  setUseH1Color: (value: boolean) => void;
  h2Color: string;
  setH2Color: (value: string) => void;
  useH2Color: boolean;
  setUseH2Color: (value: boolean) => void;
  h3Color: string;
  setH3Color: (value: string) => void;
  useH3Color: boolean;
  setUseH3Color: (value: boolean) => void;
  pColor: string;
  setPColor: (value: string) => void;
  usePColor: boolean;
  setUsePColor: (value: boolean) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ConditionalColorInput: React.FC<{
  label: string;
  id: string;
  colorValue: string;
  onColorChange: (value: string) => void;
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}> = ({ label, id, colorValue, onColorChange, isEnabled, onToggle }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
        <button
            type="button"
            onClick={() => onToggle(!isEnabled)}
            className={`${isEnabled ? 'bg-indigo-600' : 'bg-gray-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
            role="switch"
            aria-checked={isEnabled}
        >
            <span
            aria-hidden="true"
            className={`${isEnabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
        <label htmlFor={id} className={`text-sm font-medium transition-colors ${isEnabled ? 'text-gray-300' : 'text-gray-500'}`}>
            {label}
        </label>
    </div>
    <div className={`flex items-center space-x-2 transition-opacity ${!isEnabled && 'opacity-50'}`}>
      <input
        type="text"
        value={colorValue}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-24 bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm font-mono text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
        aria-label={`${label} hex code`}
        disabled={!isEnabled}
      />
      <div className="relative w-8 h-8">
          <input
          id={id}
          type="color"
          value={colorValue}
          onChange={(e) => onColorChange(e.target.value)}
          className="absolute inset-0 w-full h-full p-0 border-0 rounded-md cursor-pointer appearance-none disabled:cursor-not-allowed"
          style={{backgroundColor: colorValue}}
          disabled={!isEnabled}
          />
      </div>
    </div>
  </div>
);


export const InputForm: React.FC<InputFormProps> = ({
  topic,
  setTopic,
  keywords,
  setKeywords,
  audience,
  setAudience,
  author,
  setAuthor,
  h1Color,
  setH1Color,
  useH1Color,
  setUseH1Color,
  h2Color,
  setH2Color,
  useH2Color,
  setUseH2Color,
  h3Color,
  setH3Color,
  useH3Color,
  setUseH3Color,
  pColor,
  setPColor,
  usePColor,
  setUsePColor,
  onGenerate,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset className="space-y-4">
        <legend className="sr-only">Blog Post Content</legend>
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
      </fieldset>

      <fieldset className="space-y-3 border-t border-gray-700 pt-4">
          <legend className="text-base font-medium text-white mb-2">Styling</legend>
          <ConditionalColorInput label="H1 Color" id="h1Color" colorValue={h1Color} onColorChange={setH1Color} isEnabled={useH1Color} onToggle={setUseH1Color} />
          <ConditionalColorInput label="H2 Color" id="h2Color" colorValue={h2Color} onColorChange={setH2Color} isEnabled={useH2Color} onToggle={setUseH2Color} />
          <ConditionalColorInput label="H3 Color" id="h3Color" colorValue={h3Color} onColorChange={setH3Color} isEnabled={useH3Color} onToggle={setUseH3Color} />
          <ConditionalColorInput label="Paragraph Color" id="pColor" colorValue={pColor} onColorChange={setPColor} isEnabled={usePColor} onToggle={setUsePColor} />
      </fieldset>

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