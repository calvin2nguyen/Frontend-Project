const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//Ideally secret would never be shared but spotify's stupid token refreshes every hour.
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_SECRET_ID;

export async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}
