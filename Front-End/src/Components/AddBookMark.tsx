import React, { useState } from 'react'

type Bookmark = {
  url: string
  webname: string
}

export const AddBookMark: React.FC = () => {
  const [bookmark, setBookmark] = useState<Bookmark>({
    url: "",
    webname: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBookmark(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(bookmark)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
    </div>
  )
}
