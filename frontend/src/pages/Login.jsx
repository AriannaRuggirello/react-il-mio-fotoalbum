
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {

  return (
    <>
    <section className="bg-orange-50 text-orange-300">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                  Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium  ">Email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-orange-600 focus:border-primary-600 block w-full p-2.5   " placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium  ">Password</label>
                      <input type="password" name="password" id="password" placeholder="*********" className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-orange-600 focus:border-primary-600 block w-full p-2.5   " required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                
                  </div>
                  <button type="submit" class="w-full  border text-white border-orange-300 bg-orange-300 hover:bg-transparent hover:text-orange-300 focus:outline-none focus:ring active:text-opacity-75 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                  <p class="text-sm text-center font-light text-gray-500 400">
                      Non hai già un account?<Link className="font-medium text-primary-600 hover:underline ry-500" to="/register" >Registrati</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
      
    </>
    );
}