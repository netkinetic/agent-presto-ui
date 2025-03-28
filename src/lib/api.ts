const API_BASE = 'https://agent-presto-api.onrender.com';

// src/lib/api.ts (or wherever you define your fetch functions)

export async function fetchIndustries(): Promise<string[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/dynamic-industries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) throw new Error('Invalid response while fetching industries');

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

  if (!json.data || !json.data.businessTypes) {
    throw new Error('Invalid response while fetching business types');
  }

  return json.data.businessTypes;
}



export async function fetchGoals({
  industry,
  businessType,
}: {
  industry?: string;
  businessType: string;
}): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/dynamic-goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessType }),
  });
  const json = await res.json();
  return json.data.goals;
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

// src/lib/api.ts

export async function fetchPlaybooks(goal: string, business: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/dynamic-playbooks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal, business }),
  });

  const json = await res.json();

  if (!json.success || !Array.isArray(json.data)) {
    throw new Error('Invalid response while fetching playbooks');
  }

  return json.data;
}
