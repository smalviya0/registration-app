const BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export const ResetPasswordApi = async (email, password, code) => {
  try {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:email,
        code:code,
        password:password
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const data = await response.json(); // Parse the JSON response
    console.log(data, "data=======>")
    return data; // Return the API response
  } catch (error) {
    throw error.message || 'Something went wrong';
  }
};
