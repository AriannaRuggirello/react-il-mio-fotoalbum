
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";

export default function Register() {
const [values,setValues]= useState ({
    name:'',
    surname:'',
    email:'',
    password:''
})

const handleSubmit = (e)=>{
    e.preventDefault();

    axios.post('http://localhost:3000/register', values)
    .then(res=>console.log(res))
    .then(err=>console.log(err));
}
  return (
    <>
   <section className="bg-orange-50 text-orange-300">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl">
                  Registrati
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="name" class="block mb-2 text-sm font-medium ">Nome</label>
                      <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    " placeholder="Inserisci il tuo nome..." required=""/>
                  </div>
                  <div>
                      <label htmlFor="surname" class="block mb-2 text-sm font-medium ">Cognome</label>
                      <input type="text" name="surname" id="surname" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    " placeholder="Inserisci il tuo cognome..." required=""/>
                  </div>
                  <div>
                      <label htmlFor="email" class="block mb-2 text-sm font-medium ">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    " placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium ">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    " required=""/>
                  </div>
              
                  <button type="submit" className="w-full  border text-white border-orange-300 bg-orange-300 hover:bg-transparent hover:text-orange-300 focus:outline-none focus:ring active:text-opacity-75 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                  <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                      Hai già un account?<Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/login" >Login</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
      
    </>);
}