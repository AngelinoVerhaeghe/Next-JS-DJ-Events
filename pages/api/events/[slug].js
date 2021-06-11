const { events } = require("./data.json");

export default (req, res) => {
  /* Single Event */
  const singleEvent = events.filter((event) => event.slug === req.query.slug);
  /*  Limited methods to only a GET */
  if (req.method === "GET") {
    res.status(200).json(singleEvent);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};
