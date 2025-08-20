# Chat-Port Backend

This is the backend service for Chat-Port. It's a Node.js application built with TypeScript and designed to be deployed as serverless functions on Vercel.

The main feature of this backend is to process chat conversations using the Google Gemini API and format them into clean Markdown.

## Core Features

- **Chat Formatting**: Takes a chat history and formats it using the Gemini API.
- **Health Check**: Includes a `/api/health` endpoint to monitor service status.
- **Serverless**: Built to run efficiently on Vercel.

## Local Development

### Prerequisites

- Node.js
- Vercel CLI (`npm i -g vercel`)
- A Google Gemini API Key

### Setup

1. **Clone the repository.**
2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file** in the root directory and add your API key:

    ```
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

4. **Run the development server:**

    ```bash
    vercel dev
    ```
