/* // ! Install package 'cookie' with npm or yarn and import it */

import cookie from "cookie";
import { API_URL } from "@/config/index";

// Getting our request(req) and response(res)
export default async (req, res) => {
  // We want to make sure this is a post request
  if (req.method === "POST") {
    // Getting username, email, password from the register fill in
    const { username, email, password } = req.body;

    const strapiResponse = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await strapiResponse.json();

    if (strapiResponse.ok) {
      // Set strapi Cookie on server side - name set to "token" and data is data.jwt. Options objects
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          // secure is set if it is not in development mode
          secure: process.env.NODE_ENV !== "development",
          // maxAge is the time the cookie is stored
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          // Accessable on the whole site
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    // 405 is method not allowed
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
};
