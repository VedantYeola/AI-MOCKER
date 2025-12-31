// "use client";
// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import React, { useEffect } from "react";
// function Header() {
//   const path = usePathname();
//   useEffect(() => {
//     console.log(path);
//   }, []);

//   return (
//     <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
//       <Image src="/logo.svg" width={160} height={100} alt="logo" />

//       <ul className="hidden md:flex gap-6">
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path == "/dashboard/questions" && "text-primary font-bold"}
//             `}
//         >
//           Dashboard
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//              ${path == "/dashboard" && "text-primary font-bold"}`}
//         >
//           Questions
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                  ${path == "/dashboard/upgrade" && "text-primary font-bold"}
//                 `}
//         >
//           Upgrade
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                  ${path == "/dashboard/how" && "text-primary font-bold"}
//                 `}
//         >
//           How it Works?
//         </li>
//       </ul>
//       <UserButton />
//     </div>
//   );
// }

// export default Header;

// "use client";
// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import React, { useEffect } from "react";

// function Header() {
//   const path = usePathname();

//   useEffect(() => {
//     console.log("Current path:", path);
//   }, [path]); // Added path as dependency so it logs on every route change

//   return (
//     <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
//       <Image src="/logo.svg" width={160} height={100} alt="logo" />

//       <ul className="hidden md:flex gap-6">
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path === "/dashboard" && "text-primary font-bold"}`}
//         >
//           Dashboard
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path === "/dashboard/questions" && "text-primary font-bold"}`}
//         >
//           Questions
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path === "/dashboard/upgrade" && "text-primary font-bold"}`}
//         >
//           Upgrade
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path === "/dashboard/how" && "text-primary font-bold"}`}
//         >
//           How it Works?
//         </li>
//       </ul>

//       <UserButton />
//     </div>
//   );
// }

// export default Header;

"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    console.log("Current path:", path);
  }, [path]); // Logs path on every route change

  return (
    // <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
    //   <Image src="/AI MOCK INTERVIEW.png" width={100} height={30} alt="logo" />
    <div className="relative flex items-center justify-between bg-secondary border-b border-transparent shadow-sm p-4">
      <div className="flex items-center gap-2">
        <Image src="/logo Ai.png" width={40} height={40} alt="logo" />
        <h6 className="hidden md:block font-bold">AI Mock Interview ✨</h6>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
        <li>
          <Link
            href="/dashboard"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
              ${path === "/dashboard" && "text-primary font-bold"}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/question"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
              ${path === "/dashboard/question" && "text-primary font-bold"}`}
          >
            Questions
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/upgrade"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
              ${path === "/dashboard/upgrade" && "text-primary font-bold"}`}
          >
            Upgrade
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/how"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer 
              ${path === "/dashboard/how" && "text-primary font-bold"}`}
          >
            How it Works?
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <UserButton />
        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-secondary border-b shadow-lg md:hidden z-50">
          <ul className="flex flex-col p-4 gap-4">
            <li>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`block hover:text-primary hover:font-bold transition-all cursor-pointer 
                  ${path === "/dashboard" && "text-primary font-bold"}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/question"
                onClick={() => setIsMenuOpen(false)}
                className={`block hover:text-primary hover:font-bold transition-all cursor-pointer 
                  ${path === "/dashboard/question" && "text-primary font-bold"}`}
              >
                Questions
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/upgrade"
                onClick={() => setIsMenuOpen(false)}
                className={`block hover:text-primary hover:font-bold transition-all cursor-pointer 
                  ${path === "/dashboard/upgrade" && "text-primary font-bold"}`}
              >
                Upgrade
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/how"
                onClick={() => setIsMenuOpen(false)}
                className={`block hover:text-primary hover:font-bold transition-all cursor-pointer 
                  ${path === "/dashboard/how" && "text-primary font-bold"}`}
              >
                How it Works?
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;

// "use client";
// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import React, { useEffect } from "react";

// function Header() {
//   const path = usePathname();

//   useEffect(() => {
//     console.log("Current path:", path);
//   }, [path]); // Logs path on every route change

//   return (
//     <div className="flex p-4 items-center justify-between bg-secondary border-b border-transparent shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
//       <Image src="/AI MOCK INTERVIEW.png" width={80} height={20} alt="logo" />

//       <ul className="hidden md:flex gap-6">
//         <li>
//           <Link
//             href="/dashboard"
//             className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//               ${path === "/dashboard" && "text-primary font-bold"}`}
//           >
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/dashboard/question"
//             className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//               ${path === "/dashboard/question" && "text-primary font-bold"}`}
//           >
//             Questions
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/dashboard/upgrade"
//             className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//               ${path === "/dashboard/upgrade" && "text-primary font-bold"}`}
//           >
//             Upgrade
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/dashboard/how"
//             className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//               ${path === "/dashboard/how" && "text-primary font-bold"}`}
//           >
//             How it Works?
//           </Link>
//         </li>
//       </ul>

//       <UserButton />
//     </div>
//   );
// }

// export default Header;
