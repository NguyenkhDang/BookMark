import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 5000;
let bookmarks = [];
let searchResult = [];
let currentId = 1;
const app = express();
app.use(cors());
app.use(express.json());
// ===== Health check =====
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});
// ===== Test route =====
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from backend 👋" });
});
// ===== Bookmarks routes =====
app.get("/bookmarks", (req, res) => {
    res.json({ bookmarks });
});
app.post("/bookmarks", (req, res) => {
    const { url, webname } = req.body;
    const newBookmark = { id: currentId++, url, webname };
    bookmarks.push(newBookmark);
    res.status(201).json({ bookmarks });
});
app.delete("/bookmarks/:id", (req, res) => {
    const id = Number(req.params.id);
    const exists = bookmarks.some(b => b.id === id);
    if (!exists)
        return res.status(404).json({ error: `Bookmark with id ${id} not found` });
    bookmarks = bookmarks.filter(b => b.id !== id);
    res.json({ message: "Bookmark deleted successfully", bookmarks });
});
// ===== Search route =====
app.get("/searchbar", (req, res) => res.json({ searchResult }));
app.post("/searchbar", (req, res) => {
    const { search } = req.body;
    if (!search)
        return res.json([]);
    const results = bookmarks.filter(b => b.webname.toLowerCase().includes(search.toLowerCase()));
    console.log("Search Result:", results);
    res.json(results);
});
// ===== Start server =====
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map