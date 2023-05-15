import { useState, useEffect } from "react";

const DisplayResponse = ({ gptResponse }) => {
    const responseArray = gptResponse.split(" ");
    const [text, setText] = useState("");
    let count = -1;

    useEffect(() => {
        const displayInterval = setInterval(() => {

            setText(
                (text) => text + " " + (responseArray[count] || ""),
                count++
            );

            if (!responseArray[count]) {
                clearInterval(displayInterval);
            };
        }, 150)

        return () => {
            count = 0;
            clearInterval(displayInterval);
        };

    }, [gptResponse])


    return (
        <p>{text}</p>
    );
};

export default DisplayResponse;