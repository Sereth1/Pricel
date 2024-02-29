const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;


app.use(cors());

fs.readFile("./data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file", err);
    return;
  }
  const houses = JSON.parse(data);

  app.get("/houses", (req, res) => {
    const { name } = req.query;
    if (!name) {
      res.json(houses);
    } else {
      const filteredHouses = houses.filter((house) =>
        house.name.toLowerCase().includes(name.toLowerCase())
      );
      res.json(filteredHouses);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
