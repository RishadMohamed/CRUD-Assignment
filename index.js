const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let items = [];

// Create (POST)
app.post("/items", (req, res) => {
  const item = { id: items.length + 1, name: req.body.name };
  items.push(item);
  res.status(201).json(item);
});

// Read (GET)
app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  res.json(item);
});

// Update (PUT)
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  item.name = req.body.name;
  res.json(item);
});

// Delete (DELETE)
app.delete("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  items = items.filter((i) => i.id !== parseInt(req.params.id));
  res.json(item);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
