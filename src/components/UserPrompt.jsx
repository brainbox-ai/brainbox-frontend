const UserPrompt = ({ message }) => {

    return (
        <div>
            <p className="user-prompt">User: {message.text}</p>
        </div>
    );
};

export default UserPrompt;