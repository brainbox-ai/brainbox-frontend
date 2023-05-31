import { useEffect, useState } from "react";
import GPTResponse from "./GPTResponse";
import UserPrompt from "./UserPrompt";
import LoadingSpinner from "./LoadingSpinner";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from '@mui/material/colors';

const DebateChatDisplay = () => {
    const [topic, setTopic] = useState("");
    // const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({ id: null, name: "" });

    useEffect(() => {
        const getProfiles = async () => {
            let request = await fetch("http://localhost:8000/api/profiles/")
            let result = await request.json();
            setProfiles(result);
        }
        getProfiles();
    }, []);

    // console.log(profiles);
    const selectCharacter = (profile) => {
        setSelectedProfile({ ...selectedProfile, id: profile.id, name: profile.name });
    }

    const renderProfiles = profiles?.map((profile) => {
        return (
            <div key={profile.id} >
                <Avatar
                    alt={profile.name}
                    src=""
                    onClick={() => selectCharacter(profile)}
                    sx={selectedProfile.id === profile.id ? { bgcolor: deepPurple[500] } : null}
                >{profile.name[0]}</Avatar>
                <p style={{ fontSize: "0.3em" }}>{profile.name}</p>
            </div>
        )
    });

    const handleChange = (e) => {
        setTopic(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // if (topic === "") {
            //     throw new Error("Please enter a topic of conversation!");
            // }
            if (!selectedProfile.id) {
                throw new Error("You have not selected a character!");
            }
            let req = await fetch("http://localhost:8000/api/debates/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    profile: selectedProfile.name,
                    topic: topic,
                    history: [...messages],
                }),
            });
            let res = await req.json();
            console.log(res);
            setMessages([
                ...messages,
                { role: "user", content: topic },
                {
                    role: "assistant",
                    content: res.message,
                },
            ]);
            setTopic("");
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
            <p>Select a Character</p>
            <Stack direction="row" spacing={2}>
                {renderProfiles}
            </Stack>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <p>Enter a topic of discussion</p>
                    <input
                        type="text"
                        name="topic"
                        className="input_prompt"
                        placeholder="Topic of conversation..."
                        autoComplete="off"
                        value={topic}
                        onChange={handleChange}
                    />
                    <input type="submit" value="Discuss" onClick={handleSubmit} />
                    {isLoading && <LoadingSpinner />}
                </form>
            </div>
        </>
    );
};

export default DebateChatDisplay;