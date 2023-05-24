import SmartToyIcon from '@mui/icons-material/SmartToy';
import DisplayResponse from './DisplayResponse';

const GPTResponse = ({ message }) => {

    return (
        <div className="gpt-response-container">
            <SmartToyIcon
                sx={{
                    fontSize: 50,
                    padding: "10px"
                }}

            />
            <DisplayResponse message={message.content} role={message.role} />
        </div>
    );
};

export default GPTResponse;