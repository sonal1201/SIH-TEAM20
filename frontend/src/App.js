import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from "./Components/Screens/Home";
import Admin from "./Components/Screens/Admin";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";


function App() {
  return (
    <>
     <Router>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/Admin' element={<Admin/>}/>
      <Route exact path='/Signup' element={<Signup/>}/>
      <Route exact path='/Login' element={<Login/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
