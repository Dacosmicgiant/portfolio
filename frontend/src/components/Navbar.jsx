// // Navbar.jsx

// import React from 'react';
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import { LogOut, Settings, User } from "lucide-react";

// const Navbar = () => {
//   const { logout, authUser } = useAuthStore();

//   return (
//     <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
//       <div className="container mx-auto px-4 h-16">
//         <div className="flex items-center justify-between h-full">
//           <div className="flex items-center gap-8">
//             <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
//               <h1 className="text-lg font-bold">Dacosmicgiant</h1>
//             </Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <Link to="/" className="btn btn-ghost btn-sm">About</Link>
//             <Link to="/projects" className="btn btn-ghost btn-sm">Projects</Link>
//             <Link to="/contact" className="btn btn-ghost btn-sm">Contact</Link>
            
//             <Link to="/theme" className="btn btn-sm gap-2 transition-colors">
//               <Settings className="w-4 h-4" />
//               <span className="hidden sm:inline">Theme</span>
//             </Link>

//             {authUser ? (
//               <button className="btn btn-sm gap-2" onClick={logout}>
//                 <LogOut className="size-4" />
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             ) : (
//               <Link to="/login" className="btn btn-sm gap-2">
//                 <User className="size-4" />
//                 <span className="hidden sm:inline">Login</span>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// Navbar.jsx

import React from 'react';
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <h1 className="text-lg font-bold">Dacosmicgiant</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="btn btn-ghost btn-sm">About</Link>
            <Link to="/projects" className="btn btn-ghost btn-sm">Projects</Link>
            <Link to="/contact" className="btn btn-ghost btn-sm">Contact</Link>
            
            <Link to="/theme" className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Theme</span>
            </Link>

            {authUser ? (
              <>
                {authUser.isAdmin && (
                  <Link to="/admin" className="btn btn-ghost btn-sm gap-2">
                    Admin Panel
                  </Link>
                )}
                <button className="btn btn-sm gap-2" onClick={logout}>
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm gap-2">
                <User className="size-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
