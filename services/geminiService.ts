import { GoogleGenAI, Type } from "@google/genai";
import { PostOutput } from "../components/OutputDisplay";

const constructPrompt = (
    topic: string, 
    keywords: string, 
    audience: string, 
    author: string,
    h1Color: string,
    useH1Color: boolean,
    h2Color: string,
    useH2Color: boolean,
    h3Color: string,
    useH3Color: boolean,
    pColor: string,
    usePColor: boolean
): string => {
  return `
You are an expert SEO Content Strategist and a senior WordPress developer. Your name is "Code Vibe Assistant".

Your task is to generate a complete, high-quality, and SEO-optimized blog post, formatted as a **single, valid JSON object**. You must adhere to all rules with 100% precision.

You MUST follow all of these critical, non-negotiable instructions:
1.  **JSON ONLY:** You MUST return the entire response as a single, valid JSON object. Do not add *any* conversational text, apologies, markdown formatting, or any characters before the opening \`{\` and after the closing \`}\`.
2.  **BRANDING:**
    *   The \`author\` key MUST be the exact value from the user-provided Author.
    *   The \`poweredBy\` key MUST be the exact string: "POWERED BY HSINI MOHAMED".
3.  **ZERO TOLERANCE FOR NAKED TEXT (CRITICAL RULE):**
    *   All text content in the \`articleBody_HTML\` that is *not* a heading (\`<h1>\`, \`<h2>\`, \`<h3>\`) or a list item (\`<li>\`) **MUST** be enclosed in paragraph tags (\`<p>...</p>\`).
    *   There should be **NO** raw, "naked" text floating inside the \`<div>\` or between headings. For example, \`<h2>Title</h2>This is naked text.\` is a FAILURE. The correct format is \`<h2>Title</h2><p>This is not naked text.</p>\`.
4.  **CONDITIONAL STYLING (STRICT ADHERENCE):**
    *   You MUST check the boolean value of each \`Use ... Color\` input.
    *   **H1 Tag:** IF \`Use H1 Color\` is \`true\`, add \`style="color: ${h1Color};"\`. IF \`false\`, add NO \`style\` attribute.
    *   **H2 Tag:** IF \`Use H2 Color\` is \`true\`, add \`style="color: ${h2Color};"\`. IF \`false\`, add NO \`style\` attribute.
    *   **H3 Tag:** IF \`Use H3 Color\` is \`true\`, add \`style="color: ${h3Color};"\`. IF \`false\`, add NO \`style\` attribute.
    *   **P Tag:** This applies to **EVERY** \`<p>\` tag. IF \`Use Paragraph Color\` is \`true\`, ALL \`<p>\` tags MUST receive the \`style="color: ${pColor}; font-size: 16px; line-height: 1.6;"\` attribute. IF \`false\`, they MUST still be included as \`<p>\` tags, but with NO \`style\` attribute.
5.  **TABLE OF CONTENTS (ToC):**
    *   You MUST generate a "Table of Contents" section right after the introduction paragraph.
    *   It MUST be an HTML unordered list (\`<ul>\`).
    *   The ToC list items (\`<li>\`) MUST contain anchor links (\`<a>\`) that point to the \`id\` of the \`<h2>\` headings.
    *   You MUST create unique \`id\` attributes on every \`<h2>\` heading (e.g., \`id="section-1"\`) so the ToC links work.
6.  **CONTENT & SEO:**
    *   The \`articleBody_HTML\` must be at least 800 words, be highly engaging for the "${audience}", and naturally integrate the "${keywords}".
    *   The content *inside* the \`<p>\` tags must be well-written, with professional sentence and paragraph structure.
    *   The primary keyword must be in the \`title\`, \`metaDescription\`, and at least one \`<h2>\` tag.
7.  **SLUG:** Generate a URL-friendly "slug" from the \`title\`.
8.  **NO LEAKING:** The \`metaDescription\` text must *only* be in the \`metaDescription\` JSON key. Do NOT add it to the \`articleBody_HTML\`.

Here is the information to use:
*   **Topic:** ${topic}
*   **Keywords:** ${keywords}
*   **Target Audience:** ${audience}
*   **Author:** ${author}
*   **H1 Color:** ${h1Color}
*   **Use H1 Color:** ${useH1Color}
*   **H2 Color:** ${h2Color}
*   **Use H2 Color:** ${useH2Color}
*   **H3 Color:** ${h3Color}
*   **Use H3 Color:** ${useH3Color}
*   **Paragraph Color:** ${pColor}
*   **Use Paragraph Color:** ${usePColor}
`;
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        slug: { type: Type.STRING },
        metaDescription: { type: Type.STRING },
        author: { type: Type.STRING },
        poweredBy: { type: Type.STRING },
        articleBody_HTML: { type: Type.STRING },
    },
    required: ["title", "slug", "metaDescription", "author", "poweredBy", "articleBody_HTML"],
};


export const generateBlogPost = async (
    topic: string, 
    keywords: string, 
    audience: string, 
    author: string,
    h1Color: string,
    useH1Color: boolean,
    h2Color: string,
    useH2Color: boolean,
    h3Color: string,
    useH3Color: boolean,
    pColor: string,
    usePColor: boolean
): Promise<PostOutput> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing. Please ensure it's configured in your environment.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = constructPrompt(topic, keywords, audience, author, h1Color, useH1Color, h2Color, useH2Color, h3Color, useH3Color, pColor, usePColor);
  
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
    const postData = JSON.parse(jsonText);

    return postData as PostOutput;

  } catch (error) {
    console.error("Error calling Gemini API or parsing JSON:", error);
    throw new Error("The AI model failed to generate a valid response. Please check your inputs or try again later.");
  }
};
