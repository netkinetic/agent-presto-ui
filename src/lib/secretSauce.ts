/**
 * secretSauce.ts
 * Ported from secret-sauce.php
 * Builds the AI prompt and extracts clean JSON from raw OpenAI responses.
 */

type PromptOptions = {
  businessName: string;
  campaignName: string;
  keywords: string;
  contentType: string;
  contentLength: string;
  additionalInstructions?: string;
  deliverablesKeys?: string[];
  playbookDuration?: string;
};

// 🔥 Prompt Builder
export function buildFinalPrompt({
  businessName,
  campaignName,
  keywords,
  contentType,
  contentLength,
  additionalInstructions = '',
  deliverablesKeys = [],
  playbookDuration = '7 days',
}: PromptOptions): string {
  const basePrompt = `
Before generating content, ensure the output is fully formatted in valid semantic HTML using <h1>, <h2>, <p>, <ul>, <li>, <strong>, <div>, and <span>.
Align the content with ${businessName} and incorporate SEO best practices using keywords: ${keywords}.
No extra commentary. Always return only raw JSON without any Markdown formatting, code fences, or explanations. The JSON must start with '{' and end with '}'.
`;

  const jsonStructure = `
{
  "playbook": {
    "name": "Short descriptive title",
    "short_desc": "A brief summary of the strategy",
    "woo_product": {
      "title": "Compelling product title",
      "short_description": "Concise product description",
      "long_description": "Detailed product info in valid HTML",
      "price": "String price (e.g., '49.99')",
      "schedule": "Suggest a timing (e.g., Day 3 of ${playbookDuration})"
    },
    "deliverables": [
      {
        "key": "deliverable_slug",
        "label": "Human-readable label",
        "description": "Explain the deliverable in 1-2 sentences",
        "count": 1,
        "schedule": "Optional schedule (e.g., Day 2 of ${playbookDuration})",
        "instructions": [
          "Step 1: ...",
          "Step 2: ...",
          "Step 3: ..."
        ],
        "estimated_time": "2 hours",
        "effort_level": "medium"
      }
    ]
  }
}
`;

  return `
${basePrompt}

Generate a marketing playbook for the campaign titled "${campaignName}" at business "${businessName}".
Focus on "${contentType}" with keywords "${keywords}". The ideal content length is "${contentLength}" and the recommended playbook duration is "${playbookDuration}".

IMPORTANT:
1. Return only valid JSON (no disclaimers or extra text).
2. Use a brand voice that’s playful yet professional, with a hint of wit.
3. Include actionable steps, estimated time, and effort level for each deliverable.

Here is the required JSON structure:

${jsonStructure}

Additional instructions:
${additionalInstructions}
`;
}

// ✅ Helper: Extract clean JSON from AI response (removes markdown fences, trims)
export function extractStrictJson(raw: string | object): any {
  if (typeof raw !== 'string') return raw;

  let cleaned = raw.trim();

  if (cleaned.startsWith('```')) {
    const lines = cleaned.split(/\r?\n/);
    lines.shift(); // remove opening ```
    if (lines[lines.length - 1].trim() === '```') lines.pop();
    cleaned = lines.join('\n').trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('❌ extractStrictJson - Failed to parse:', err);
    return false;
  }
}

// ✅ Helper: Fallback regex-based extractor
export function rescueJson(raw: string): any {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    console.error('❌ rescueJson - No JSON match found.');
    return false;
  }

  try {
    return JSON.parse(match[0]);
  } catch (err) {
    console.error('❌ rescueJson - Fallback decode failed:', err);
    return false;
  }
}
