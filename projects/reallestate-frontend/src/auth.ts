import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function getAccessToken(): Promise<string | null> {
  try {
    interface TokenResponse {
      access_token: string;
    }

    const response = await axios.post<TokenResponse>(process.env.TOKEN_URL!, {
      grant_type: "client_credentials",
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Failed to get access token:", error);
    return null;
  }
}
