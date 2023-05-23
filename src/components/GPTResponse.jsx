
const GPTResponse = ({ message }) => {

    return (
        <div>
            <p className="gpt-response">GPT: {message.content}</p>
        </div>
    );
};

export default GPTResponse;