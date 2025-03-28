const API_BASE = 'https://agent-presto-api.onrender.com';

export async function fetchIndustries(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/dynamic-industries`, { method: 'POST' });
  const json = await res.json();
  return json.data.industries;
}

export async function fetchBusinessTypes(industry: string): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/dynamic-business-types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ industry }),
  });
  const json = await res.json();
  return json.data.business_types;
}

// src/lib/api.ts

export async function fetchGoals(businessType: string): Promise<string[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/dynamic-goals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ businessType }),
  });

  const json = await res.json();

  if (!json.success || !Array.isArray(json.data)) {
    throw new Error('Invalid response while fetching goals');
  }

  return json.data;
}



export async function generateCampaignContent(payload: Record<string, any>) {
  const res = await fetch(`${API_BASE}/api/campaign-content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to generate content: ${errorText}`);
  }

  return await res.json();
}

