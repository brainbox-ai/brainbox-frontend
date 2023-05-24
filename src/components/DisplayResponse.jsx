import { useState, useEffect } from "react";

const DisplayResponse = ({ message }) => {

    const responseArray = message?.split(/\s|\n/);
    const [text, setText] = useState("");
    let count = -1;

    useEffect(() => {
        const displayInterval = setInterval(() => {

            setText(
                (text) => text + " " + (responseArray[count] || ""),
                count++
            );

            if (responseArray[count] === undefined) {
                clearInterval(displayInterval);
            };
        }, 50)

        return () => {
            count = 0;
            clearInterval(displayInterval);
        };

    }, [message])


    return (
        <p className="gpt-response">{text}</p>
    );
};

export default DisplayResponse;