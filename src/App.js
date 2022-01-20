
import './App.css';
import {BrowserRouter as Router , Route  , Routes} from 'react-router-dom';
import Login from './component/login/login';
import Chatroom from './component/chatroom/chatroom';
function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/chatroom" element={<Chatroom/>}/>
        </Routes> 
        
      </Router>
    </>
  );
}

export default App;
