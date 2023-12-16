import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage";
import Login from "./pages/Login"
import Register from "./pages/Register";
import DefaultLayout from "./pages/DefaultLayout";
import DashboardDefault from "./pages/DashboardDefault";
import Show from "./pages/posts/Show"
import Edit from "./pages/posts/Edit";
import Create from "./pages/posts/Create";


function App() {

return (
  <BrowserRouter>
 
  <Routes>

      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>
{/* crud */}
        <Route path="/posts/:id" element={<Show />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/create" element={<Create />}></Route>
{/* dashboard */}
        <Route path="/dashboard" element={<DashboardDefault />}></Route>

      </Route>

{/* auth */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>

    </Routes> 
  </BrowserRouter>
);
}

export default App;