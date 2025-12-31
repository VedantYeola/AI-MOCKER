"use client";

import { use, useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function StartInterview({ params: paramsPromise }) {
  const params = use(paramsPromise); // Unwrap params
  const [interviewData, setInterviewData] = useState(null);
  const [MockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState(null);
  const [isTerminated, setIsTerminated] = useState(false);
  const [warningOpen, setWarningOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (params?.interviewid) {
      GetInterviewDetails();
      const id = uuidv4();
      setSessionId(id);
      registerSession(id);
    }
  }, [params?.interviewid]);

  const registerSession = async (id) => {
    try {
      if (params?.interviewid) {
        await db.update(MockInterview)
          .set({ currentInstanceId: id })
          .where(eq(MockInterview.mockId, params.interviewid));
      }
    } catch (error) {
      console.error("Error registering session:", error);
    }
  };

  useEffect(() => {
    if (!sessionId || !params?.interviewid) return;

    // Initial check and interval
    const checkSession = async () => {
      try {
        const result = await db.select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewid));

        if (result.length > 0 && result[0].currentInstanceId && result[0].currentInstanceId !== sessionId) {
          setIsTerminated(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    const interval = setInterval(checkSession, 5000);
    return () => clearInterval(interval);
  }, [sessionId, params?.interviewid]);

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

  if (isTerminated) {
    return (
      <Dialog open={true}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-red-600 font-bold text-xl">Session Terminated</DialogTitle>
            <DialogDescription className="text-lg pt-2">
              You have joined this interview from another device or tab.
              To maintain integrity, this session has been terminated.
            </DialogDescription>
            <Button className="mt-5 bg-red-600 hover:bg-red-700 w-full" onClick={() => router.push('/dashboard')}>
              Return to Dashboard
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Dialog open={warningOpen} onOpenChange={setWarningOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="font-bold text-xl">⚠️ Important Notice</DialogTitle>
              <DialogDescription className="text-md pt-2">
                Access is restricted to <b>one device at a time</b>.
                If you attempt to join from another device (PC or Mobile), this session will automatically terminate.
              </DialogDescription>
              <Button className="mt-4" onClick={() => setWarningOpen(false)}>I Understand</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>

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
          <Link href={'/dashboard/interview/' + interviewData?.mockId + "/feedback"}>
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
