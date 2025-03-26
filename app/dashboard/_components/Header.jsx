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
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log("Current path:", path);
  }, [path]); // Logs path on every route change

  return (
    // <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
    //   <Image src="/AI MOCK INTERVIEW.png" width={100} height={30} alt="logo" />
    <div className="flex items-center justify-between bg-secondary border-b border-transparent shadow-sm">
      <div><Image src="/logo Ai.png" width={80} height={20} alt="logo" ></Image>
      <h6>AI Mock Interview ✨</h6>
      </div>

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

      <UserButton />
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
