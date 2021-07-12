/* Hit a strapi endpoint of user/me, send your token that we have in the cookie and it will give u back the user */

/* // ! Install package 'cookie' with npm or yarn and import it */

import cookie from "cookie";
import { API_URL } from "@/config/index";

// Getting our request(req) and response(res)
export default async (req, res) => {
  // We want to make sure this is a GET request
  if (req.method === "GET") {
    // Check if cookie exists -> can access it to .headers.cookie
    if (!req.headers.cookie) {
      // Get satus forbidden (403)
      res.status(403).json({ message: "Not Authorized!" });
      return;
    }

    // if token is found set it in a variable
    const { token } = cookie.parse(req.headers.cookie);

    // Strapi route /users/me
    const strapiResponse = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Get the user
    const user = await strapiResponse.json();

    // Response is ok, send the user object {user}
    if (strapiResponse.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden!" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    // 405 is method not allowed
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
};
