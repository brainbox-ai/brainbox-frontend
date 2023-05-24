import { useState } from 'react';
import bbxImage from './assets/bbx.jpeg';
import LoadingSpinner from './components/LoadingSpinner';
import DisplayResponse from './components/DisplayResponse';
import './App.css';
import MainChatDisplay from './components/MainChatDisplay';

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

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
          "input_prompt": prompt,
          "history": [...messages]
        })
      });
      let res = await req.json();
      console.log(res)
      setResponse(res.gpt_response);
      setMessages([...messages,
      { role: "user", content: prompt },
      {
        role: "assistant",
        content: res.gpt_response
      }
      ]);
      setPrompt("")
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
        <MainChatDisplay messages={messages} />
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
          <input type="submit" value="Send" ></input>
          {isLoading && <LoadingSpinner />}
        </form>
        {/* <DisplayResponse gptResponse={response} /> */}
      </div>

    </>
  )
}

export default App
