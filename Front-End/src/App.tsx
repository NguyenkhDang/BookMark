import { useState } from "react";
import AddBookMark from "./Components/AddBookMark/AddBookMark";
import BookMarkSpotLight from "./Components/BookMarkSpotLight/BookMarkSpotLight";
import Searchbar from "./Components/Searchbar/Searchbar";
import "./App.css";

type Bookmark = {
  id: number;
  webname: string;
  url: string;
};

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchResult, setSearchResult] = useState<Bookmark[]>([]);

  return (
    <div>
      <h1>Bookmark App</h1>
      <div className="searchAndBookmark">
        <Searchbar setResult={setSearchResult} />
        <AddBookMark onAdd={(newBookmark: Bookmark) =>
          setBookmarks(prev => [...prev, newBookmark])
        } />
      </div>
      <BookMarkSpotLight result={searchResult.length > 0 ? searchResult : bookmarks} />
    </div>
  );
}

export default App;