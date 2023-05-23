import GPTResponse from "./GPTResponse";
import UserPrompt from "./UserPrompt";

const MainChatDisplay = ({ messages }) => {
    const renderMessages = messages?.map((message, index) => {
        if (message.role === "user") {
            return <UserPrompt key={index} message={message} />
        }
        if (message.role === "assistant") {
            return <GPTResponse key={index} message={message} />
        }
    });

    return (
        <div>
            {renderMessages}
        </div>
    );
};

export default MainChatDisplay;