import { VercelRequest, VercelResponse } from "@vercel/node";
import { GeminiService } from "./lib/gemini";
import { FormatRequest } from "./lib/types";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for all
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { messages, options = {} }: FormatRequest = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: "Messages array is required",
      });
    }

    const geminiService = new GeminiService(process.env.GEMINI_API_KEY!);
    const formattedMarkdown = await geminiService.formatChat(messages);

    res.json({
      success: true,
      formattedMarkdown,
    });
  } catch (error) {
    console.error("Format chat error:", error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
