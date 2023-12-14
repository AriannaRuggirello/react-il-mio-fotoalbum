
import { Outlet } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

export default function DefaultLayout() {

return (
    <>
  
     <Header />
    <main className='min-h-screen'>
    <Outlet />
    </main>
    <Footer />
   
  
    </>
);
}