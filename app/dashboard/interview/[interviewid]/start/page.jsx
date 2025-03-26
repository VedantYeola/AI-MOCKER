"use client";

import { use, useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap params
  const [interviewData, setInterviewData] = useState(null);
  const [MockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  
  useEffect(() => {
    if (params?.interviewid) {
      GetInterviewDetails();
    }
  }, [params?.interviewid]); // Re-fetch data if `interviewid` changes

  const GetInterviewDetails = async () => {
    try {
      console.log("Fetching interview for ID:", params.interviewid);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewid));

      if (result.length === 0) {
        console.warn("No interview data found.");
        return;
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  if (!MockInterviewQuestion) {
    return <p className="text-center text-gray-500">Loading interview details...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section */}
        <QuestionsSection
          MockInterviewQuestion={MockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        
        {/* Video/Audio Recording Section */}
        <RecordAnswerSection
          MockInterviewQuestion={MockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-6 mt-5">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}

        {activeQuestionIndex < MockInterviewQuestion.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}

        {activeQuestionIndex === MockInterviewQuestion.length - 1 && (
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;



// "use client";
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState, use } from 'react';
// import QuestionsSection from './_components/QuestionsSection';
// import RecordAnswerSection from './_components/RecordAnswerSection';

// function StartInterview({ params }) {
//   // Unwrap `params` using `React.use()`
//   const { interviewid } = use(params); 

//   const [interviewData, setInterviewData] = useState({});
//   const [MockInterviewQuestion, setMockInterviewQuestion] = useState([]);
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

//   useEffect(() => {
//     (async () => {
//       try {
//         console.log("User Id --->", interviewid);
//         const result = await db
//           .select()
//           .from(MockInterview)
//           .where(eq(MockInterview.mockId, interviewid));

//         if (result.length > 0) {
//           const jsonMockResp = JSON.parse(result[0].jsonMockResp);
//           console.log("Parsed Questions:", jsonMockResp);
//           setMockInterviewQuestion(jsonMockResp);
//           setInterviewData(result[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching interview details:", error);
//       }
//     })();
//   }, [interviewid]);

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Questions Section */}
//         <QuestionsSection  
//           MockInterviewQuestion={MockInterviewQuestion}
//           activeQuestionIndex={activeQuestionIndex}
//         />

//         {/* Video/ Audio Recording Section */}
//         <RecordAnswerSection />
//       </div>
//     </div>
//   );
// }

// export default StartInterview;
