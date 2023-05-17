
const GPTResponse = ({ message }) => {

    return (
        <div>
            <p className="gpt-response">GPT: {message.message}</p>
        </div>
    );
};

export default GPTResponse;