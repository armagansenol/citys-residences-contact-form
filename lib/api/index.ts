export const BASE_URL = "https://mvkgolf.azurewebsites.net"

type FetchOptions = RequestInit & {
  cache?: RequestCache
}

export async function fetchApi<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const defaultOptions: FetchOptions = {
    cache: "no-cache",
  }

  const mergedOptions = { ...defaultOptions, ...options }

  // If the body is FormData, don't set the Content-Type header
  if (!(mergedOptions.body instanceof FormData)) {
    mergedOptions.headers = {
      "Content-Type": "application/json",
      ...mergedOptions.headers,
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/api${url}`, mergedOptions)

    if (!response.ok) {
      // You can customize error handling based on status codes
      if (response.status === 404) {
        throw new Error("Resource not found")
      } else if (response.status === 401) {
        throw new Error("Unauthorized")
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    }

    return await response.json()
  } catch (error) {
    // Log the error or send it to an error tracking service
    console.error("Fetch error:", error)
    throw error // Re-throw the error so it can be handled by the caller if needed
  }
}
