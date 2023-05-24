import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
    return (
        <nav>
            <Link to="chat">Chat</Link>
            <Link to="Debate">Debate</Link>
        </nav>
    );
};

export default NavBar;