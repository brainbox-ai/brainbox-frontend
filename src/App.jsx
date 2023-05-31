import { Route, Routes } from "react-router-dom";
import bbxImage from "./assets/bbx.jpeg";
import "./App.css";
import MainChatDisplay from "./components/MainChatDisplay";
import DebateChatDisplay from "./components/DebateChatDisplay";
import NavBar from "./components/NavBar";

function App() {

  return (
    <>
      <NavBar />
      <div>
        <a href="" target="_blank">
          <img src={bbxImage} className="logo" alt="brainbox logo" />
        </a>
        <h1>Brainbox_ai</h1>
      </div>
      <Routes>
        <Route path="/chat" element={<MainChatDisplay />} />
        <Route path="/debate" element={<DebateChatDisplay />} />
      </Routes>
    </>
  );
}

export default App;
