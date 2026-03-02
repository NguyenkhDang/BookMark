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

  const API_URL = import.meta.env.Vite_API_URL
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const fetchBookmarks = async () => {
    const res = await fetch(`${API_URL}/bookmarks`);
    const data = await res.json();
    setBookmarks(data.bookmarks);
    console.log(data)
    };
  useEffect(() => {
    fetchBookmarks();
  },[]);
  const getFavicon = (url: string) => {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  };
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/bookmarks/${id}`, {
      method: "DELETE",
    });

    setBookmarks(prev => prev.filter(b => b.id !== id));
  };
  return (
    <div className="BookMarkSpotLight">
      {result.length > 0 && !result ? <div>No result found</div>
      :
      result.length === 0 ? 
      bookmarks.map((bookmark) => (
        <div className="box">
          <button onClick={() => handleDelete(bookmark.id)}className="deleteBtn">X</button>
          <a href={bookmark.url} target="_blank" rel="noreferrer" className="linkBookMark">
          <div className="BookMarkEach" key={bookmark.id}>
              <h4>{bookmark.webname}</h4>
              <img src={getFavicon(bookmark.url)} className="favicon" alt="favicon" />
            </div>
          </a>
        </div>
      ))
      :
      result.map(r => (
        <div className="box">
          <button onClick={() => handleDelete(r.id)} className="deleteBtn">X</button>
          <a href={r.url} target="_blank" rel="noreferrer" className="linkBookMark">
            <div className="BookMarkEach" key={r.id}>
              <h4>{r.webname}</h4>
              <img src={getFavicon(r.url)} className="favicon" alt="favicon" />
            </div>
          </a>
        </div>
      ))}

    </div>
  );
}

export default BookMarkSpotLight;