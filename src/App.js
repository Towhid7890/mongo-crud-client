import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import AddUser from './Components/Adduser/AddUser';
import UpdateUser from './Components/UpdateUser/UpdateUser';

function App() {
  return (
    <div className="App">
     <Routes>
       <Route path="/" element={<Home></Home>}></Route>
       <Route path="add/user" element={<AddUser></AddUser>}></Route>
       <Route path="update/:id" element={<UpdateUser></UpdateUser>}></Route>
     </Routes>
    </div>
  );
}

export default App;
