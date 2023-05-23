const UserPrompt = ({ message }) => {

    return (
        <div>
            <p className="user-prompt">User: {message.content}</p>
        </div>
    );
};

export default UserPrompt;