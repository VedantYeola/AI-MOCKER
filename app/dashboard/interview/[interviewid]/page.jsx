"use client";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation"; // ✅ Fix: Use useParams()

function Interview() {
  const params = useParams(); // ✅ Fix: Fetch params correctly
  const interviewId = params?.interviewid; // ✅ Get interview ID safely

  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (interviewId) {
      console.log("User Id--->", interviewId);
      GetInterviewDetails(interviewId);
    }
  }, [interviewId]); // ✅ Fix: Depend on interviewId safely

  const GetInterviewDetails = async (id) => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, id));
      setInterviewData(result[0] || {});
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div className="my-10 flex flex-col items-center">
      {/* Grid layout for description and webcam */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Left Side - Job Description & Information */}
        <div className="flex flex-col gap-6 w-full">
          <h2 className="font-bold text-2xl mb-6">Let's Get Started</h2>
          {/* Job Description Box */}
          <div className="p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-medium text-gray-800">
              <strong className="text-black">Job Role/Job Position:</strong>{" "}
              {interviewData?.jobPosition || "N/A"}
            </h2>
            <h2 className="text-lg font-medium text-gray-800 mt-2">
              <strong className="text-black">
                Job Description/Tech Stack:
              </strong>{" "}
              {interviewData?.jobDesc || "N/A"}
            </h2>
            <h2 className="text-lg font-medium text-gray-800 mt-2">
              <strong className="text-black">Years of Experience:</strong>{" "}
              {interviewData?.jobExperience || "N/A"}
            </h2>
          </div>

          {/* Information Box */}
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600 font-semibold">
              <Lightbulb /> Information
            </h2>
            <h2 className="mt-3 text-yellow-500">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>

        {/* Right Side - Webcam Section */}
        <div className="flex flex-col items-center">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              className="w-96 h-60 rounded-lg border bg-gray-100 shadow-md"
            />
          ) : (
            <div className="w-[28rem] h-64 flex justify-center items-center bg-gray-100 rounded-lg border shadow-md">
              <WebcamIcon className="h-20 w-20 text-black" />
            </div>
          )}

          {!webCamEnabled && (
            <Button
              className="mt-6 w-99 bg-white text-black border border-gray-300 shadow-md px-4 py-2 rounded-lg hover:shadow-lg transition"
              onClick={() => setWebCamEnabled(true)}
            >
              Enable Web Cam and Microphone
            </Button>
          )}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-end items-end w-full max-w-5xl mt-6">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button className="bg-[#3F3FEE] text-white px-6 py-3 rounded-lg">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
