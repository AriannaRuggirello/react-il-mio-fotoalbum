import { NavLink } from "react-router-dom";

function NavbarLink({ href, children }) {
  return (<NavLink to={href} className="block py-3 px-4 min-w-[80px] text-center rounded-md transition-all duration-300  hover:text-orange-300">
    {children}
  </NavLink>);
}

export default function Header() {


  return (
    <header className="sticky top-0 z-50 bg-orange-100 backdrop-blur-sm shadow-lg ">
      <nav className="py-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <NavbarLink href="/">
         <h1 className="font-bold text-3xl"><i class="fa-solid fa-camera-retro"></i> PixelMagia</h1>
         </NavbarLink>
     

          <div>
            <ul className="flex ">
          
              <li className="font-bold"><NavbarLink href="/">Home</NavbarLink></li>
              <li className="font-bold"><NavbarLink href="/login">Login</NavbarLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </header >
  );
}