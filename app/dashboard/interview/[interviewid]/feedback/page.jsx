// "use client";
// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";


// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from "lucide-react";

// function Feedback({ params }) {
//   const [feedbackList, setFeedbackList] = useState([]);
//   useEffect(() => {
//     GetFeedback();
//   }, []);

//   const GetFeedback = async (params) => {
//     const result = await db
//       .select()
//       .from(UserAnswer)
//       .where(eq(UserAnswer.mockIdRef, params.interviewid))
//       .orderBy(UserAnswer.id);

//     console.log(result);
//     setFeedbackList(result);
//   };
//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
//       <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
//       <h2 className="text-primary text-lg my-3">
//         Your overall interview rating: <strong>7/10</strong>
//       </h2>

//       <h2 className="text-sm text-gray-500">Find below interview question with correct answer, Your answer and feedback for improvement</h2>
//       {feedbackList &&feedbackList.map((item, index) => (
//           <Collapsible key={index}>
//             <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left gap-7">
//               {item.question} <ChevronsUpDown className="h-5 w-5" />
//             </CollapsibleTrigger>
//             <CollapsibleContent>
//             <div>
//               <h2><strong>Rating:</strong>{item.rating}</h2>
//               </div>
//             </CollapsibleContent>
//           </Collapsible>
//         ))}
//     </div>
//   );
// }

// export default Feedback;





// "use client";
// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation"; // ✅ Correct way to get params in Next.js

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";




// function Feedback() {
//   const params = useParams(); // ✅ Get route params properly
//   const [feedbackList, setFeedbackList] = useState([]);
//   const router=useRouter();

//   useEffect(() => {
//     if (params?.interviewid) {
//       GetFeedback(params.interviewid); // ✅ Pass interviewid correctly
//     } else {
//       console.error("No interview ID found in params");
//     }
//   }, [params]);

//   const GetFeedback = async (interviewId) => {
//     try {
//       console.log("Fetching feedback for interview ID:", interviewId);

//       const result = await db
//         .select()
//         .from(UserAnswer)
//         .where(eq(UserAnswer.mockIdRef, interviewId)) // ✅ Using interviewId correctly
//         .orderBy(UserAnswer.id);

//       console.log("Fetched feedback:", result);
//       setFeedbackList(result);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
//       <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
//       <h2 className="text-primary text-lg my-3">
//         Your overall interview rating: <strong>7/10</strong>
//       </h2>

//       <h2 className="text-sm text-gray-500">
//         Find below interview questions with correct answers, your answers, and feedback for improvement:
//       </h2>

//       {feedbackList.length > 0 ? (
//         feedbackList.map((item, index) => (
//           <Collapsible key={index} className="mt-7">
//             <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex items-center gap-7 w-full">
//               {item.question} <ChevronsUpDown className="h-5 w-5" />
//             </CollapsibleTrigger>
//             <CollapsibleContent>
//               <div className="flex flex-col gap-2">
//                 <h2 className="text-red-500 p-2 border-lg"><strong>Rating:</strong> {item.rating}</h2>
//                 <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900"><strong>Your Answer:</strong>{item.UserAns}</h2>
//                 <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900"><strong>Correct Answer:</strong>{item.CorrectAns}</h2>
//                 <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary"><strong>Feedback:</strong>{item.feedback}</h2>
//               </div>
//             </CollapsibleContent>
//           </Collapsible>
//         ))
//       ) : (
//         <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>

//       )}
//     </div>
//   );
// }

// export default Feedback;

// "use client";
// import { db } from "@/utils/db";
// import { UserAnswer } from "@/utils/schema";
// import { eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function Feedback() {
//   const params = useParams();
//   const router = useRouter();
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Params:", params); // Debugging
//     if (params?.interviewid) { // Ensure correct param name
//       GetFeedback(params.interviewid);
//     } else {
//       console.error("No interview ID found in params");
//       setLoading(false);
//     }
//   }, [params]);

//   const GetFeedback = async (mockId) => {
//     try {
//       console.log("Fetching feedback for mock ID:", mockId);
//       const result = await db
//         .select()
//         .from(UserAnswer)
//         .where(eq(UserAnswer.mockIdRef, mockId))
//         .orderBy(UserAnswer.id)
//         .execute(); // Ensure execution

//       console.log("Fetched feedback:", result);
//       setFeedbackList(result);
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//       setFeedbackList([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-5">
//       <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
//       <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
//       <h2 className="text-primary text-lg my-3">
//         Your overall interview rating: <strong>7/10</strong>
//       </h2>

//       <h2 className="text-sm text-gray-500">
//         Find below interview questions with correct answers, your answers, and feedback for improvement:
//       </h2>

//       {loading ? (
//         <p className="text-center text-gray-500 mt-5">Loading feedback...</p>
//       ) : feedbackList.length > 0 ? (
//         feedbackList.map((item, index) => (
//           <Collapsible key={index} className="mt-7">
//             <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex items-center gap-7 w-full">
//               {item.question} <ChevronsUpDown className="h-5 w-5" />
//             </CollapsibleTrigger>
//             <CollapsibleContent>
//               <div className="flex flex-col gap-2">
//                 <h2 className="text-red-500 p-2 border rounded-lg shadow-lg backdrop-blur-md bg-white/10 border-white/30">
//                   <strong>Rating:</strong> {item.rating} / 10
//                 </h2>
//                 <h2 className="p-2 border rounded-lg shadow-lg backdrop-blur-md bg-red-100/40 border-red-300 text-sm text-red-900">
//                   <strong>Your Answer:</strong> {item.userAns}
//                 </h2>
//                 <h2 className="p-2 border rounded-lg shadow-lg backdrop-blur-md bg-green-100/40 border-green-300 text-sm text-green-900">
//                   <strong>Correct Answer:</strong> {item.correctAns}
//                 </h2>
//                 <h2 className="p-2 border rounded-lg shadow-lg backdrop-blur-md bg-blue-100/40 border-blue-300 text-sm text-primary">
//                   <strong>Feedback:</strong> {item.feedback}
//                 </h2>
//               </div>
//             </CollapsibleContent>
//           </Collapsible>
//         ))
//       ) : (
//         <p className="text-gray-500 mt-5 text-center">No feedback available.</p>
//       )}

//       {/* Fixed Feedback Button */}
//       <div className="flex justify-center mt-10">
//         <Button
//           onClick={() => router.push("/dashboard")}
//           className="bg-white text-black border border-gray-300 font-bold rounded-lg px-4 py-2 shadow-md hover:bg-gray-100"
//         >
//           Go Home
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Feedback;
















"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function Feedback() {
  const params = useParams();
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallRating, setOverallRating] = useState(0.0); // Default rating is 0.0

  useEffect(() => {
    console.log("Params:", params);
    if (params?.interviewid) {
      GetFeedback(params.interviewid);
    } else {
      console.error("No interview ID found in params");
      setLoading(false);
    }
  }, [params]);

  const GetFeedback = async (mockId) => {
    try {
      console.log("Fetching feedback for mock ID:", mockId);
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, mockId))
        .orderBy(UserAnswer.id)
        .execute();

      console.log("Fetched feedback:", result);
      setFeedbackList(result);

      if (result.length > 0) {
        // Ensure all ratings are valid numbers between 0 and 5
        const validRatings = result
          .map((item) => Number(item.rating))
          .filter((rating) => !isNaN(rating) && rating >= 0 && rating <= 5);

        if (validRatings.length > 0) {
          const totalRating = validRatings.reduce((sum, r) => sum + r, 0);
          const maxPossibleRating = validRatings.length * 5; // Max rating assuming 5 per question

          // Normalize rating to a 10-point scale
          const normalizedRating = ((totalRating / maxPossibleRating) * 10).toFixed(1);
          setOverallRating(normalizedRating);
        } else {
          setOverallRating(0.0);
        }
      } else {
        setOverallRating(0.0);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedbackList([]);
      setOverallRating(0.0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      

        {feedbackList?.length==0?
        <h2 className="font-bold text-xl text-gray-500">No Interview Feedback Record Found</h2>
        :
          <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>{overallRating}/10</strong>
      </h2>

      <h2 className="text-sm text-gray-500">
        Find below interview questions with correct answers, your answers, and feedback for improvement:
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 mt-5">Loading feedback...</p>
      ) : feedbackList.length > 0 ? (
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-7">
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex items-center gap-7 w-full">
              {item.question} <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg shadow-lg backdrop-blur-md bg-white/10 border-white/30">
                  <strong>Rating:</strong> {item.rating} / 5
                </h2>
                <h2 className="p-2 border rounded-lg shadow-lg backdrop-blur-md bg-red-100/40 border-red-300 text-sm text-red-900">
                  <strong>Your Answer:</strong> {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg shadow-lg backdrop-blur-md bg-green-100/40 border-green-300 text-sm text-green-900">
                  <strong>Correct Answer:</strong> {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg shadow-lg backdrop-blur-md bg-blue-100/40 border-blue-300 text-sm text-primary">
                  <strong>Feedback:</strong> {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))
      ) : (
        <p className="text-gray-500 mt-5 text-center">No feedback available.</p>
      )}
        </>}

      {/* Fixed Feedback Button */}
      <div className="flex justify-center mt-10">
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-white text-black border border-gray-300 font-bold rounded-lg px-4 py-2 shadow-md hover:bg-gray-100"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
