import { useEffect, useState } from "react";
import "./BookMarkSpotLight.css"
type Bookmark = {
  id: number;
  url: string;
  webname: string;
};


interface SearchResultsProps {
  result: any[];
}
function BookMarkSpotLight({result}: SearchResultsProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const fetchBookmarks = async () => {
    const res = await fetch("http://localhost:5000/bookmarks");
    const data = await res.json();
    setBookmarks(data.bookmarks);
    console.log(data)
    };
    
  useEffect(() => {
    fetchBookmarks();
  },[]);

  return (
    <div className="BookMarkSpotLight">
      {result.length > 0 && !result ? <div>No result found</div>
      :
      result.length === 0 ? 
      bookmarks.map((bookmark) => (
        <a href={bookmark.url} target="_blank" rel="noreferrer">
          <div className="BookMarkEach" key={bookmark.id}>
            <h4>{bookmark.webname}</h4>
          </div>
        </a>
      ))
      :
      result.map(r => (
        <a href={r.url} target="_blank" rel="noreferrer">
          <div className="BookMarkEach" key={r.id}>
            <h4>{r.webname}</h4>
          </div>
        </a>
      ))}

    </div>
  );
}

export default BookMarkSpotLight;