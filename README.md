# 🚀 AI Blog Post Generator

![AI Blog Post Generator Screenshot](https://i.imgur.com/your-screenshot-url.png) <!-- TODO: Replace with a real screenshot of your app -->

A powerful content creation tool that leverages the Google Gemini API to generate complete, SEO-optimized, and custom-styled blog posts from a simple brief.

**Live Demo:** [**https://your-live-url.vercel.app**](https://your-live-url.vercel.app) <!-- TODO: Replace with your deployed Vercel URL -->

---

## Client Problem this Solves

This tool is designed for marketers, small business owners, and content creators who need to produce high-quality blog content quickly and efficiently. It solves the problem of "writer's block" and drastically reduces the time spent on drafting, formatting, and optimizing articles for the web.

## ✨ Key Features

- **AI-Powered Content Generation:** Creates full-length (800+ words) articles from a topic, keywords, and target audience.
- **SEO Optimization:** Generates an SEO-friendly title, URL slug, and meta description.
- **Dynamic HTML & Styling:** Produces clean, structured HTML with an automatic Table of Contents.
- **Conditional CSS:** Users can toggle and customize colors for H1, H2, H3, and paragraph tags for brand alignment.
- **Automation Blueprints:** Includes a "Workflow Plan Generator" that creates step-by-step automation plans for tools like Make.com.
- **Copy-Ready Output:** All generated content and code is easily copyable, ready to be pasted directly into any CMS like WordPress.

## 🛠️ The "Vibe Stack" (Tech Stack)

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API (`gemini-2.5-flash`)
- **Deployment:** Vercel

## ⚙️ Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hsinidev/AI-Blog-Post-Generator.git
    cd AI-Blog-Post-Generator
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up your environment variables:**
    - Create a new file named `.env` in the root of the project.
    - Add your Gemini API key to this file:
      ```
      VITE_API_KEY=YOUR_GEMINI_API_KEY
      ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

---
*This project was generated as part of a rapid prototyping portfolio-building exercise with Code Vibe Assistant.*
