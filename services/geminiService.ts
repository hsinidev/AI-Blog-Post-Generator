import { GoogleGenAI, Type } from "@google/genai";
import { PostOutput } from "../components/OutputDisplay";

const constructPrompt = (topic: string, keywords: string, audience: string, author: string): string => {
  return `
You are an expert SEO Content Strategist and professional long-form blog writer. Your name is "Code Vibe Assistant".

Your task is to generate a complete, high-quality, and SEO-optimized blog post based on the user-provided inputs.

You MUST follow these critical instructions:
1.  **JSON ONLY:** You MUST return the entire response as a single, valid JSON object. Do not add *any* conversational text, apologies, or any characters before or after the opening \`{\` and closing \`}\`.
2.  **CONTENT:** The \`articleBody\` must be at least 800 words, engaging, and directly relevant to the "${audience}".
3.  **KEYWORDS:** Naturally weave the provided "${keywords}" throughout the \`articleBody\`. The primary keyword must be in the \`title\`, \`metaDescription\`, and at least one \`H2\` heading within the \`articleBody\`.
4.  **SLUG:** Generate a URL-friendly "slug" from the \`title\`. It must be lowercase, with words separated by hyphens (e.g., "my-first-blog-post").
5.  **AUTHOR:** Use the exact "${author}" provided.
6.  **MARKDOWN:** The *entire* \`articleBody\` MUST be formatted in valid Markdown, including an H1 for the title, H2s for main sections, and H3s for sub-sections.

Here is the information to use:
* **Topic:** ${topic}
* **Keywords:** ${keywords}
* **Target Audience:** ${audience}
* **Author:** ${author}
`;
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        slug: { type: Type.STRING },
        metaDescription: { type: Type.STRING },
        author: { type: Type.STRING },
        articleBody: { type: Type.STRING },
    },
    required: ["title", "slug", "metaDescription", "author", "articleBody"],
};


export const generateBlogPost = async (topic: string, keywords: string, audience: string, author: string): Promise<PostOutput> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing. Please ensure it's configured in your environment.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = constructPrompt(topic, keywords, audience, author);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    // In case the model still wraps the JSON in markdown backticks
    const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
    const parsedResponse = JSON.parse(cleanedJsonText);

    // The Gemini API with responseSchema returns the object directly inside a `json` property
    // But sometimes it might just be the text. Let's handle both.
    const postData = parsedResponse.json ? parsedResponse.json : parsedResponse;

    return postData as PostOutput;

  } catch (error) {
    console.error("Error calling Gemini API or parsing JSON:", error);
    throw new Error("The AI model failed to generate a valid response. Please check your inputs or try again later.");
  }
};
