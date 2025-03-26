import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ MockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Your browser does not support speech recognition');
    }
  };

  return MockInterviewQuestion && (
    <div style={{
      border: "1px solid #D1D5DB",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
      borderRadius: "8px",
      padding: "20px"
    }}
      className="p-5 border rounded-lg my-10">
      
      {/* Question List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {MockInterviewQuestion.map((question, index) => (
          <h2
            key={index}  // ✅ Fix: Added unique key
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
              ${activeQuestionIndex === index ? "bg-primary text-white" : "bg-secondary"}
            `}
            style={{
              minWidth: "100px",  // ✅ Prevents text overflow
              padding: "10px",
              whiteSpace: "nowrap", // ✅ Fixes text breaking issue
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Active Question Content */}
      <h2 className="my-5 text-md md:text-lg">{MockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 className="cursor-pointer" onClick={() => textToSpeech(MockInterviewQuestion[activeQuestionIndex]?.question)} />

      {/* Note Section */}
      <div className="my-5 rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-5 items-center text-blue-700">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
