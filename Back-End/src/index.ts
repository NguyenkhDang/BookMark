import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 5000;
type Bookmark = {
  id: number;
  url: string;
  webname: string;
};

let bookmarks: Bookmark[] = [];

let searchResult: Bookmark[] = [];
let currentId = 1;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

app.get("/bookmarks" , (req, res) =>{
  res.json({ bookmarks})
})

app.get("/searchbar" , (req, res) =>{
  res.json({searchResult})
})


app.post("/bookmarks", (req, res) => {
  const { url, webname } = req.body;

  const newBookmark: Bookmark = {
    id: currentId++,
    url,
    webname
  };

  bookmarks.push(newBookmark);

  res.status(201).json({
    bookmarks: bookmarks
  });
});

app.post("/searchbar", (req, res) => {
  const { search } = req.body; 
  if (!search) return res.json([]);
  const results = bookmarks.filter(b =>
    b.webname.toLowerCase().includes(search.toLowerCase())
  );
  console.log("Search Result:", results);
  res.json(results); 

  console.log("Search: ", search)
  console.log("Results: ", results)
});

app.delete("/bookmarks/:id", (req, res) => {
  const id = Number(req.params.id);

  const exists = bookmarks.some(b => b.id === id);
  if (!exists) {
    return res.status(404).json({
      error: `Bookmark with id ${id} not found`
    });
  }

  bookmarks = bookmarks.filter(b => b.id !== id);

  res.json({
    message: "Bookmark deleted successfully",
    bookmarks
  });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
