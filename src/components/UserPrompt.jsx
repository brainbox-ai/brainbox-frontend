import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import DisplayResponse from './DisplayResponse';

const UserPrompt = ({ message }) => {

    return (
        <div className="user-prompt-container">
            {/* <DisplayResponse message={message.content} role={message.role} /> */}
            <p className="user-prompt">{message.content}</p>
            <AccountCircleIcon sx={{
                fontSize: 50,
                padding: "10px"
            }} />

        </div>
    );
};

export default UserPrompt;