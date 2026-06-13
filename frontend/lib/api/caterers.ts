const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchCaterers(search?: string) {
  try {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    const url = `${BASE_URL}/api/caterers${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Fetch failed: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching caterers:", error);
    throw error;
  }
}

export async function createCaterer(catererData: unknown) {
  try {
    const response = await fetch(`${BASE_URL}/api/caterers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(catererData),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Create failed: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating caterer:", error);
    throw error;
  }
}
