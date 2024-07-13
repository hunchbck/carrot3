'use server';

interface DeleteResult {
  error?: string;
  success: boolean;
}

export async function deleteImageFromCloudflare(imageUrl: string): Promise<DeleteResult> {
  const prefix = 'https://imagedelivery.net/nwxXMmJxUUiN7Xi9SKXUwA/';

  // Check if imageUrl is provided and valid
  if (!imageUrl) {
    console.error('No image URL provided.');
    return { error: 'No image URL provided.', success: false };
  }

  // Ensure imageUrl contains the expected prefix
  if (!imageUrl.startsWith(prefix)) {
    console.error('Invalid image URL format.');
    return { error: 'Invalid image URL format.', success: false };
  }

  const imageId = imageUrl.replace(prefix, '');
  const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`;
  const headers = {
    Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
  };

  try {
    const response = await fetch(url, {
      headers: headers,
      method: 'DELETE',
    });

    if (response.ok) {
      // Assuming the API returns a successful response on successful deletion
      return { success: true };
    } else {
      const result = await response.json();
      return {
        error: `Failed to delete image. Status: ${response.status}, Message: ${result.errors?.[0]?.message || result.message}`,
        success: false,
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Error deleting image: ${error.message}`, success: false };
    } else {
      return { error: 'An unexpected error occurred', success: false };
    }
  }
}

// eslint-disable-next-line no-undef
export async function getUploadUrl(): Promise<UploadResult> {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
        },
        method: 'POST',
      },
    );
    if (response.ok) {
      const result = await response.json();
      return { result: result.result, success: true }; // Assuming the API returns an object with a 'result' key
    } else {
      return { error: `Failed to fetch URL: ${response.status}`, success: false };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: `Error fetching URL: ${error.message}`, success: false };
    } else {
      return { error: 'An unexpected error occurred', success: false };
    }
  }
}
