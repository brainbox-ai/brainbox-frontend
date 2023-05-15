import { useState } from 'react';
import bbxImage from './assets/bbx.jpeg';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let req = await fetch("http://localhost:8000/api/prompts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "input_prompt": prompt
        })
      });
      let res = await req.json();
      setResponse(res.gpt_response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={bbxImage} className="logo" alt="brainbox logo" />
        </a>
      </div>
      <h1>Brainbox_ai</h1>
      <div className="card">
        {isLoading && <LoadingSpinner />}
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            name="prompt"
            className="input_prompt"
            placeholder="ask me something..."
            autoComplete='off'
            value={prompt}
            onChange={handleChange}
          />
          <input type="submit" value="Send" />
        </form>
        {response && <p>{response}</p>}
      </div>
    </>
  )
}

export default App
