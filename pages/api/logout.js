/* Hit a strapi endpoint of user/me, send your token that we have in the cookie and it will give u back the user */

/* // ! Install package 'cookie' with npm or yarn and import it */

import cookie from "cookie";
import { API_URL } from "@/config/index";

// Getting our request(req) and response(res)
export default async (req, res) => {
  // We want to make sure this is a POST request
  if (req.method === "POST") {
    // Destroy cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        // secure is set if it is not in development mode
        secure: process.env.NODE_ENV !== "development",
        // set expires to new (0)
        expires: new Date(0),
        sameSite: "strict",
        // Accessable on the whole site
        path: "/",
      })
    );

    res.status(200).json({ message: "Success" });
  } else {
    res.setHeader("Allow", ["POST"]);
    // 405 is method not allowed
    res.status(405).json({ message: `Method ${req.method} not allowed.` });
  }
};
