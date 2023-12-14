import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage";
import Login from "./pages/Login"
import Register from "./pages/Register";
import Show from "./pages/Show"
import DefaultLayout from "./pages/DefaultLayout";


function App() {

return (
  <BrowserRouter>
 
  <Routes>

      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts/:id" element={<Show />}></Route>
      </Route>
      
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

    </Routes> 
  </BrowserRouter>
);
}

export default App;