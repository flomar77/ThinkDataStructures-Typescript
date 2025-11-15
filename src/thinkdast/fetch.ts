async function resilientFetch(url: string): Promise<any> {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error: `, error);
    throw error;
  }
}
