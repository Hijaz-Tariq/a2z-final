// lib/lahza.ts

const LAHZA_BASE_URL = "https://api.lahza.io"; 

export async function initializeTransaction(
  data: {
    amount: string;
    currency: "USD" | "ILS" | "JOD";
    email: string;
    reference: string;
    first_name?: string;
    last_name?: string;
    mobile?: string;
    callback_url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: Record<string, any>; // Will be stringified
  }
) {
  // Validate required fields
  if (!data.callback_url) {
    throw new Error("callback_url is required");
  }

  // Prepare metadata: Lahza expects it as a JSON string
  const metadata = data.metadata ? JSON.stringify(data.metadata) : undefined;

  const res = await fetch(`${LAHZA_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LAHZA_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: data.amount,
      currency: data.currency,
      email: data.email,
      reference: data.reference,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile: data.mobile,
      callback_url: data.callback_url,
      metadata, // ✅ Already stringified
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lahza init failed [${res.status}]: ${text}`);
  }

  const json = await res.json();

  if (!json.status) {
    throw new Error(`Lahza init error: ${json.message || "Unknown error"}`);
  }

  return json.data; // { authorization_url, access_code, reference }
}

export async function verifyTransaction(reference: string) {
  const res = await fetch(`${LAHZA_BASE_URL}/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${process.env.LAHZA_SECRET_KEY}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lahza verify failed [${res.status}]: ${text}`);
  }

  const json = await res.json();

  if (!json.status) {
    throw new Error(`Lahza verify error: ${json.message || "Unknown error"}`);
  }

  return json.data;
}