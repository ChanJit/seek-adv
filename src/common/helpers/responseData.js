export async function getResponse(response) {
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const body = await response.json();
      const error = new Error(body.message || 'Request Failed');

      error.errors = body.errors;
      throw error;
    } else {
      throw new Error(await response.text());
    }
  }

  if (contentType && contentType.indexOf('application/json') !== -1) {
    return await response.json();
  }

  return await response.text();
}