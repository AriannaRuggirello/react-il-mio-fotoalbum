import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage";
import Login from "./pages/Login"
import Register from "./pages/Register";
import DefaultLayout from "./pages/DefaultLayout";
import DashboardLayout from "./pages/DashboardLayout";
import Show from "./pages/posts/Show"
import Edit from "./pages/posts/Edit";
import Create from "./pages/posts/Create";
import { AuthProvider } from "./contexts/AuthContext";
import PrivatePages from "./middlewares/PrivatePages";


function App() {

return (
  <BrowserRouter>
    <AuthProvider>
      <Routes>

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />}></Route>
            {/* crud */}
            <Route path="/posts/:id" element={<Show />}></Route>
            <Route path="/edit" element={<Edit />}></Route>
            <Route path="/create" element={<Create />}></Route>

            {/* rotta privata */}
            {/* dashboard */}
            {/* <Route path="/dashboard" element={<PrivatePages><DashboardLayout /></PrivatePages>}> */}
              <Route path="/dashboard" element={<DashboardLayout />}></Route>
            </Route>
          {/* </Route> */}

            {/* auth */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

      </Routes> 
    </AuthProvider>
  </BrowserRouter>
);
}

export default App;