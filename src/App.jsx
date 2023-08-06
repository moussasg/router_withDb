import './App.css';
import React from 'react';
import {Route , Routes , Link} from "react-router-dom"
import Login from "./login"
import UserForm from "./signup";

function App() {
  return (
    <div className="App">
      <div class='center'>
      <Link to='/signin'>Login</Link>
      <Link to='/signup'>signup</Link>
      </div>
      <Routes>
      <Route path='/signin' element={<Login/>}/>
      <Route path='/signup' element={<UserForm/>}/>
      </Routes>
    </div>
  );
}
export default App;
