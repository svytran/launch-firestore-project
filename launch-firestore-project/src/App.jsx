import React, { useEffect, useState } from "react";
import { fetchAllResponses, addResponse, upvoteResponse } from "./utils/responses";
import './App.css'

export default function App() {
  const [responses, setResponses] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setResponses(await fetchAllResponses());
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addResponse(input);
    setInput("");
    setResponses(await fetchAllResponses());
  };

  const handleUpvote = async (id, upvotes) => {
    await upvoteResponse(id, upvotes);
    setResponses(await fetchAllResponses());
  };

  return (
    <div>
      <h1>What's the best pizza topping?</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Your answer"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {responses.map(r => (
          <li key={r.id}>
            {r.text} — {r.upvotes} upvotes
            <button onClick={() => handleUpvote(r.id, r.upvotes)}>Upvote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
