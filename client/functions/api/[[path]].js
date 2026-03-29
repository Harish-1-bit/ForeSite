export async function onRequest(context) {
  // Get the original request URL
  const url = new URL(context.request.url);
  
  // Create a new URL pointing to the Render backend instead of Cloudflare
  const targetUrl = new URL(url.pathname + url.search, "https://foresite-1.onrender.com");
  
  // Create a new request to forward, preserving headers, method, and body
  const request = new Request(targetUrl, context.request);
  
  // Fetch from the Render backend and return the response exactly as is
  return fetch(request);
}
