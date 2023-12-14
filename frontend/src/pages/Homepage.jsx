
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero"
import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {

  return (
    <>
    <Hero/>
    <section className="bg-orange-100 my-10 py-10">
      <div className="container mx-auto grid grid-cols-3 justify-between ">
      <div className="max-w-sm bg-white border  rounded-lg shadow ">
            <a href="#">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <Link  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-300 rounded-lg hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 " to="/posts/:id">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>

        <div className="max-w-sm bg-white border  rounded-lg shadow ">
            <a href="#">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <Link  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-300 rounded-lg hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 " to="/posts/:id">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>

        <div className="max-w-sm bg-white border  rounded-lg shadow ">
            <a href="#">
                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <Link  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-300 rounded-lg hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 " to="/posts/:id">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
      </div>
       
    </section>



    </>);
}