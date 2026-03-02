import { useState, useEffect } from "react"
import "./Searchbar.css"
interface SearchBarProps{
  setResult: (result: any[]) => void
}

function Searchbar({setResult} : SearchBarProps) {

  const API_URL = import.meta.env.VITE_API_URL
  const [search, setSearch] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

 
  const findSearchResult = async () =>{
    try{
      const response = await fetch(`${API_URL}/searchbar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({search}),
    });
    const data = await response.json();
    setResult(data)
    console.log(data)
    }
    catch (error) { console.log(error)}
  }

  useEffect(() => {
    findSearchResult();
  }, [search])
  return (
    <div className="outerBox">
      <input
        className="searchBar"
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search for Bookmark"
      />
      
    </div>
  );
}

export default Searchbar;