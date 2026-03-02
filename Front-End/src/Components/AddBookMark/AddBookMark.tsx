import React, { useState } from 'react'
import "./AddBookMark.css"

function AddBookMark() {
  type Bookmark = {
    id: number
    url: string
    webname: string
  }
  const API_URL = import.meta.env.VITE_API_URL
  const [bookmark, setBookmark] = useState<Bookmark>({
    id: 0,
    url: "",
    webname: "",
  })

  const [toAdd, setToAdd] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBookmark(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
  

  try {
    const response = await fetch(`${API_URL}/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmark),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  setToAdd(false)
  window.location.reload();
};


  return (
    <div className='outerBox'>
      <button className="addBtn"onClick={() => setToAdd(!toAdd)}>+</button>
      
      {toAdd && 
      <div className='addBookMark'>
        <form className="bookMarkForm" onSubmit={handleSubmit}>
          <button
            type="button"
            className="closeBtn"
            onClick={() => setToAdd(false)}
          >
            x
          </button>
          <label htmlFor="url">
            URL
            <input 
              type="url"
              id="url"
              name="url"
              value={bookmark.url}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="webname">
            Name
            <input
              type="text"
              id="webname"
              name="webname"
              value={bookmark.webname}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>}
    </div>
  )
}
export default AddBookMark;