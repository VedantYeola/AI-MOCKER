// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
// import { Mic } from "lucide-react";
// import { chatSession } from "@/utils/GeminiAiModel";
// import { toast } from "sonner";
// import moment from "moment";
// import { db } from "@/utils/db";

// // Dynamically import Webcam to avoid hydration errors
// const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

// function RecordAnswerSection({ MockInterviewQuestion, activeQuestionIndex, interviewData }) {
//   const [isClient, setIsClient] = useState(false);
//   const [webcamError, setWebcamError] = useState(null);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   useEffect(() => {
//     if (transcript) {
//       setUserAnswer(transcript);
//     }
//   }, [transcript]);

//   if (!isClient) return null;
//   if (!browserSupportsSpeechRecognition) return <p>Browser does not support speech recognition.</p>;

//   const startRecording = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true, interimResults: true });
//   };

//   const stopRecording = () => {
//     SpeechRecognition.stopListening();
//     console.log("Final Answer:", userAnswer);
//     updateUserAnswer();
//   };

//   const updateUserAnswer = async () => {
//     if (!userAnswer || userAnswer.length < 5) {
//       toast.error("Please provide a longer answer.");
//       return;
//     }

//     setLoading(true);
//     console.log("User Answer:", userAnswer);

//     const feedbackPrompt = `Question: ${MockInterviewQuestion[activeQuestionIndex]?.question},
//       User Answer: ${userAnswer},
//       Based on the question and user's answer, provide a rating and feedback (area of improvement) in 3-5 lines in JSON format.
//       Response must contain "rating" and "feedback" fields.`;

//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       const mockJsonResp = (await result.response.text()).replace("\njson", "").replace("\n", "");

//       console.log("AI Response:", mockJsonResp);
//       const JsonFeedbackResp = JSON.parse(mockJsonResp);

//       // Save to database
//       const resp = await db.insertInto("UserAnswer").values({
//         mockIdRef: interviewData.mockId,
//         question: MockInterviewQuestion[activeQuestionIndex]?.question,
//         correctAns: MockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAns: userAnswer,
//         feedback: JsonFeedbackResp?.feedback,
//         rating: JsonFeedbackResp?.rating,
//         userEmail: interviewData?.userEmail,
//         createdAt: moment().format("YYYY-MM-DD"),
//       });

//       if (resp) {
//         toast.success("User Answer recorded successfully");
//       }
//     } catch (error) {
//       console.error("Error updating user answer:", error);
//       toast.error("Failed to save answer.");
//     }

//     setUserAnswer("");
//     setLoading(false);
//   };

//   const handleWebcamError = (error) => {
//     console.error("Webcam error:", error);
//     setWebcamError("Webcam access denied or not available.");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="flex flex-col mt-20 items-center justify-center bg-black rounded-lg p-5 relative">
//         <Image src="/webcam.png" width={200} height={200} className="absolute" />
//         <Webcam mirrored={true} onUserMediaError={handleWebcamError} style={{ height: 300, width: "100%", zIndex: 10 }} />
//       </div>

//       {webcamError && <p className="text-red-500">{webcamError}</p>}

//       {/* Record Button */}
//       <Button
//         disabled={loading}
//         variant="outline"
//         className="my-10 bg-white border border-gray-300 hover:border-gray-400 transition"
//         onClick={listening ? stopRecording : startRecording}
//       >
//         <div className="flex items-center gap-2">
//           {listening ? (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
//               <circle cx="12" cy="12" r="10" />
//               <rect x="9" y="9" width="6" height="6" fill="red" stroke="red" />
//             </svg>
//           ) : (
//             <Mic />
//           )}
//           <span className={listening ? "animate-pulse text-red-500" : ""}>
//             {listening ? "Stop Recording" : "Record Answer"}
//           </span>
//         </div>
//       </Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;




// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import { Mic } from "lucide-react";
// import { chatSession } from "@/utils/GeminiAiModel";
// import { toast } from "sonner";
// import { db } from "@/utils/db";
// import * as schema from "@/utils/schema";

// // Dynamically import Webcam to avoid hydration errors
// const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

// function RecordAnswerSection({
//   MockInterviewQuestion,
//   activeQuestionIndex,
//   interviewData,
// }) {
//   const [isClient, setIsClient] = useState(false);
//   const [webcamError, setWebcamError] = useState(null);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { user } = useUser(); // Get logged-in user details

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   useEffect(() => {
//     if (transcript) {
//       setUserAnswer(transcript);
//     }
//   }, [transcript]);

//   if (!isClient) return null;
//   if (!browserSupportsSpeechRecognition)
//     return <p>Browser does not support speech recognition.</p>;

//   const startRecording = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({
//       continuous: true,
//       interimResults: true,
//     });
//   };

//   const stopRecording = () => {
//     SpeechRecognition.stopListening();
//     console.log("Final Answer:", userAnswer);
//     updateUserAnswer();
//   };

//   const updateUserAnswer = async () => {
//     if (!userAnswer || userAnswer.length < 5) {
//       toast.error("Please provide a longer answer.");
//       return;
//     }

//     setLoading(true);
//     console.log("User Answer:", userAnswer);

//     const feedbackPrompt = `Question: ${MockInterviewQuestion[activeQuestionIndex]?.question}, 
//       User Answer: ${userAnswer}, 
//       Based on the question and user's answer, provide a rating and feedback (area of improvement) in 3-5 lines in JSON format. 
//       Response must contain "rating" and "feedback" fields.`;

//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);
//       let mockJsonResp = await result.response.text();
//       mockJsonResp = mockJsonResp
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//       console.log("AI Response (cleaned):", mockJsonResp);
//       const JsonFeedbackResp = JSON.parse(mockJsonResp);

//       // Fetch user email from Clerk
//       const userEmail = user?.primaryEmailAddress || "unknown@example.com"; // Ensure email is correctly retrieved
//       console.log("Saving userEmail to DB:", userEmail); // Debugging log

//       // Save to database using Drizzle ORM
//       await db.insert(schema.UserAnswer).values({
//         mockIdRef: interviewData.mockId,
//         question: MockInterviewQuestion[activeQuestionIndex]?.question,
//         correctAns: MockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAns: userAnswer,
//         feedback: JsonFeedbackResp?.feedback || "No feedback provided",
//         rating: JsonFeedbackResp?.rating || "Not rated",
//         userEmail: userEmail, // Ensure it's set correctly
//         createdAt: new Date().toISOString(),
//       });

//       toast.success("User Answer recorded successfully");
//     } catch (error) {
//       console.error("Error updating user answer:", error);
//       toast.error("Failed to save answer.");
//     } finally {
//       setUserAnswer("");
//       setLoading(false);
//     }
//   };

//   const handleWebcamError = (error) => {
//     console.error("Webcam error:", error);
//     setWebcamError("Webcam access denied or not available.");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="flex flex-col mt-20 items-center justify-center bg-black rounded-lg p-5 relative">
//         <Image
//           src="/webcam.png"
//           width={200}
//           height={200}
//           alt="Webcam preview"
//           className="absolute"
//         />
//         <Webcam
//           mirrored={true}
//           onUserMediaError={handleWebcamError}
//           style={{ height: 300, width: "100%", zIndex: 10 }}
//         />
//       </div>

//       {webcamError && <p className="text-red-500">{webcamError}</p>}

//       {/* Record Button */}
//       <Button
//         disabled={loading}
//         variant="outline"
//         className="my-10 bg-white border border-gray-300 hover:border-gray-400 transition"
//         onClick={listening ? stopRecording : startRecording}
//       >
//         <div className="flex items-center gap-2">
//           {listening ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="red"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="w-5 h-5"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <rect x="9" y="9" width="6" height="6" fill="red" stroke="red" />
//             </svg>
//           ) : (
//             <Mic />
//           )}
//           <span className={listening ? "animate-pulse text-red-500" : ""}>
//             {listening ? "Stop Recording" : "Record Answer"}
//           </span>
//         </div>
//       </Button>
//     </div>
//   );
// }

// export default RecordAnswerSection;





"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Mic } from "lucide-react";
import { chatSession } from "@/utils/GeminiAiModel";
import { toast } from "sonner";
import { db } from "@/utils/db";
import * as schema from "@/utils/schema";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function RecordAnswerSection({ MockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [isClient, setIsClient] = useState(false);
  const [webcamError, setWebcamError] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setUserAnswer(transcript);
    }
  }, [transcript]);

  if (!isClient) return null;
  if (!browserSupportsSpeechRecognition)
    return <p>Your browser does not support speech recognition.</p>;

  const startRecording = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, interimResults: true });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    updateUserAnswer();
  };

  const updateUserAnswer = async () => {
    if (!userAnswer || userAnswer.length < 5) {
      toast.error("Please provide a more detailed answer.");
      return;
    }

    setLoading(true);

    const feedbackPrompt = `Question: ${MockInterviewQuestion[activeQuestionIndex]?.question},
      User Answer: ${userAnswer},
      Based on the question and user's answer, provide a rating and feedback in 3-5 lines as JSON format.
      Response must contain 'rating' and 'feedback' fields.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      let responseText = await result.response.text();
      responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

      const feedbackData = JSON.parse(responseText);
      const userEmail = user?.primaryEmailAddress || "unknown@example.com";

      await db.insert(schema.UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: MockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: MockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: feedbackData.feedback || "No feedback provided",
        rating: feedbackData.rating || "Not rated",
        userEmail,
        createdAt: new Date().toISOString(),
      });

      toast.success("Answer recorded successfully!");
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Failed to save the answer.");
    } finally {
      setUserAnswer("");
      setLoading(false);
    }
  };

  const handleWebcamError = (error) => {
    console.error("Webcam error:", error);
    setWebcamError("Webcam access denied or unavailable.");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-10 md:mt-20 items-center justify-center bg-black rounded-lg p-5 relative">
        <Image src="/webcam.png" width={200} height={200} alt="Webcam preview" className="absolute" />
        <Webcam mirrored={true} onUserMediaError={handleWebcamError} style={{ height: 300, width: "100%", zIndex: 10 }} />
      </div>

      {webcamError && <p className="text-red-500">{webcamError}</p>}

      <Button disabled={loading} variant="outline" className="my-10 bg-white border border-gray-300 hover:border-gray-400 transition" onClick={listening ? stopRecording : startRecording}>
        <div className="flex items-center gap-2">
          {listening ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="12" cy="12" r="10" />
              <rect x="9" y="9" width="6" height="6" fill="red" stroke="red" />
            </svg>
          ) : (
            <Mic />
          )}
          <span className={listening ? "animate-pulse text-red-500" : ""}>{listening ? "Stop Recording" : "Record Answer"}</span>
        </div>
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
