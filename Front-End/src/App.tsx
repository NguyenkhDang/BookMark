import { useState } from "react";
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


  const [result, setResult] = useState<Bookmark[]>([])

  return (
    <div>
      <h1>Bookmark App</h1>
      <div className="searchAndBookmark">
        <Searchbar setResult={setResult}/>
        <AddBookMark />
      </div>
      <BookMarkSpotLight result={result}/>
    </div>
  );
}

export default App;
