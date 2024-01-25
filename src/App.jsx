// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
// import NavBar from './components/Navbar';
import {
  BrowserRouter as Router,
} from "react-router-dom";
 
import { AppRouter } from "./route";

function App() {
  return (
    <div>
      <Router>
        <AppRouter/>
     </Router>
    </div>
  );
}

export default App;
