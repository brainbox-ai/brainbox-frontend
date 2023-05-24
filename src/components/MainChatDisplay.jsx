import { useState } from "react";
import GPTResponse from "./GPTResponse";
import UserPrompt from "./UserPrompt";
import LoadingSpinner from "./LoadingSpinner";

const MainChatDisplay = () => {
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
            if (prompt === "") {
                throw new Error("Prompt Empty. Please enter a prompt.");
            }
            let req = await fetch("http://localhost:8000/api/prompts/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input_prompt: prompt,
                    history: [...messages],
                }),
            });
            let res = await req.json();
            console.log(res);
            setResponse(res.gpt_response);
            setMessages([
                ...messages,
                { role: "user", content: prompt },
                {
                    role: "assistant",
                    content: res.gpt_response,
                },
            ]);
            setPrompt("");
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleRandomResponse = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let req = await fetch("http://localhost:8000/api/RandomCharacterResponse/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input_prompt: prompt,
                    history: [...messages],
                }),
            });
            let res = await req.json();
            console.log(res);
            setResponse(res.gpt_response);
            setMessages([
                ...messages,
                { role: "user", content: prompt },
                {
                    role: "assistant",
                    content: res.gpt_response,
                },
            ]);
            setPrompt("");
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };
    const renderMessages = messages?.map((message, index) => {
        if (message.role === "user") {
            return <UserPrompt key={index} message={message} />
        }
        if (message.role === "assistant") {
            return <GPTResponse key={index} message={message} />
        }
    });

    return (
        <>
            {renderMessages}
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <textarea
                        type="text"
                        name="prompt"
                        className="input_prompt"
                        placeholder="ask me something..."
                        autoComplete="off"
                        value={prompt}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleRandomResponse}>Respond Random</button>
                    {isLoading && <LoadingSpinner />}
                </form>
            </div>
        </>
    );
};

export default MainChatDisplay;