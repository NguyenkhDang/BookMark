import { useEffect, useState } from "react";
import AddBookMark from "./Components/AddBookMark/AddBookMark"
import BookMarkSpotLight from "./Components/BookMarkSpotLight/BookMarkSpotLight";
import Searchbar from "./Components/Searchbar/Searchbar";
import "./App.css"
type Bookmark = {
  id: number;
  webname: string;
  url: string;
};
function App() {
  const [message, setMessage] = useState("");

  const [result, setResult] = useState<Bookmark[]>([])

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Bookmark App</h1>
      <div className="searchAndBookmark">
        <Searchbar setResult={setResult}/>
        <AddBookMark />
      </div>
      <BookMarkSpotLight result={result}/>
      <p>{message}</p>
    </div>
  );
}

export default App;
