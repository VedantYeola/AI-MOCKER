// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

// function TestInstructions() {
//   const router = useRouter();
//   const [showPopup, setShowPopup] = useState(false);

//   // Show popup automatically when the user logs in
//   useEffect(() => {
//     const isUserLoggedIn = localStorage.getItem("userLoggedIn");
//     if (!isUserLoggedIn) {
//       setShowPopup(true);
//       localStorage.setItem("userLoggedIn", "true"); // Store login status
//     }
//   }, []);

//   // Redirect to the dashboard after closing the login popup
//   const startTest = () => {
//     setShowPopup(false);
//     router.push("/dashboard");
//   };

//   return (
//     <div className="h-screen flex justify-center items-center">
//       {/* Instruction Box */}
//       <div className="bg-gray-800 py-6 px-8 rounded-xl border border-gray-700 w-full max-w-3xl min-h-[400px] text-white text-center shadow-lg flex flex-col justify-center">
//         <h2 className="text-2xl font-bold mb-6 tracking-wide">📌 Test Instructions</h2>
//         <ul className="text-lg leading-loose text-gray-300">
//           <li>✅ Read each question carefully before answering.</li>
//           <li>✅ The test has a time limit (if applicable).</li>
//           <li>✅ Do not refresh or leave the page during the test.</li>
//           <li>✅ Click 'Submit' after answering all questions.</li>
//           <li>✅ You cannot change answers after submission.</li>
//         </ul>
//       </div>

//       {/* Popup for login instructions */}
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
//           <div className="bg-gray-800 py-6 px-8 rounded-xl border border-gray-700 w-full max-w-3xl min-h-[400px] text-white text-center shadow-xl flex flex-col justify-center">
//             <h2 className="text-2xl font-bold mb-4 tracking-wide">📌 Welcome to the Test</h2>
//             <p className="text-lg leading-loose text-gray-300">
//               Please review the instructions before proceeding.
//             </p>
//             <ul className="mt-4 text-lg leading-loose text-gray-300">
//               <li>✅ Read each question carefully before answering.</li>
//               <li>✅ The test has a time limit (if applicable).</li>
//               <li>✅ Do not refresh or leave the page during the test.</li>
//               <li>✅ Click 'Submit' after answering all questions.</li>
//               <li>✅ You cannot change answers after submission.</li>
//             </ul>
//             <div className="flex justify-center mt-6">
//               <Button
//                 onClick={startTest}
//                 className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-green-400 transition"
//               >
//                 Start Test 🚀
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TestInstructions;




"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function TestInstructions() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check login status from sessionStorage
    const isUserLoggedIn = sessionStorage.getItem("userLoggedIn");

    // If user is logging in for the first time in session, show popup
    if (!isUserLoggedIn) {
      setShowPopup(true);
      sessionStorage.setItem("userLoggedIn", "true"); // Mark as logged in
    }
  }, []);

  // Redirect to the dashboard after closing the popup
  const startTest = () => {
    setShowPopup(false);
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* Instruction Box */}
      <div className="bg-gray-800 py-6 px-8 rounded-xl border border-gray-700 w-full max-w-3xl min-h-[400px] text-white text-center shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 tracking-wide">📌 Test Instructions</h2>
        <ul className="text-lg leading-loose text-gray-300">
          <li>✅ Read each question carefully before answering.</li>
          <li>✅ The test has a time limit (if applicable).</li>
          <li>✅ Do not refresh or leave the page during the test.</li>
          <li>✅ Click 'Submit' after answering all questions.</li>
          <li>✅ You cannot change answers after submission.</li>
        </ul>
      </div>

      {/* Popup for login instructions */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 py-6 px-8 rounded-xl border border-gray-700 w-full max-w-3xl min-h-[400px] text-white text-center shadow-xl flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 tracking-wide">📌 Welcome to the Test</h2>
            <p className="text-lg leading-loose text-gray-300">
              Please review the instructions before proceeding.
            </p>
            <ul className="mt-4 text-lg leading-loose text-gray-300">
              <li>✅ Read each question carefully before answering.</li>
              <li>✅ The test has a time limit (if applicable).</li>
              <li>✅ Do not refresh or leave the page during the test.</li>
              <li>✅ Click 'Submit' after answering all questions.</li>
              <li>✅ You cannot change answers after submission.</li>
            </ul>
            <div className="flex justify-center mt-6">
              <Button
                onClick={startTest}
                className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-green-400 transition"
              >
                Let Start 🚀
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestInstructions;
