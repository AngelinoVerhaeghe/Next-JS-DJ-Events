const { events } = require("./data.json");

export default (req, res) => {
  /*  Limited methods to only a GET */
  if (req.method === "GET") {
    res.status(200).json(events);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
