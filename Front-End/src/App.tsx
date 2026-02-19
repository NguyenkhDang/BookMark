import { useEffect, useState } from "react";
import {AddBookMark} from "./Components/AddBookMark"
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Fullstack App</h1>
      <AddBookMark />
      <p>{message}</p>
    </div>
  );
}

export default App;
