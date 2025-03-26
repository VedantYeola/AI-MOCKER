"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState(null);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!jobPosition || !jobDesc || !jobExperience) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    console.log("Submitting data:", { jobPosition, jobDesc, jobExperience });

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Based on these details, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. Provide 'question' and 'answer' fields in JSON.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = await result.response.text();
      const cleanedResponse = rawResponse.replace(/```json|```/g, "").trim();

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleanedResponse);
        console.log("Parsed JSON Response:", parsedResponse);
      } catch (error) {
        console.error("JSON Parsing Error:", error);
        alert("Failed to parse AI response. Please try again.");
        setLoading(false);
        return;
      }

      setJsonResponse(parsedResponse);

      if (!Array.isArray(parsedResponse) || parsedResponse.length === 0) {
        console.error("Error: AI did not return valid interview questions.");
        alert("No questions were generated. Try again.");
        setLoading(false);
        return;
      }

      const newMockId = uuidv4();
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: newMockId,
          jsonMockResp: JSON.stringify(parsedResponse),
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID:", resp);

      if (resp?.length > 0 && resp[0]?.mockId) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      } else {
        console.error("Database Error: Failed to insert data.");
        alert("Error saving to database.");
      }
    } catch (error) {
      console.error("Error in API Call or Database Insert:", error);
      alert("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-6 rounded-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)]  
                        hover:shadow-[0_0_15px_rgba(0,0,0,1)] hover:scale-105  
                        cursor-pointer transition-all duration-500 ease-in-out 
                        xs:p-4 xs:shadow-md xs:hover:shadow-xl"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center font-semibold text-black hover:text-black transition-all duration-500 ease-in-out">
          + Add New
        </h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us about your job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about your job position, role, job description,
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      className="bg-white text-black border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      required
                      value={jobPosition}
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Job Description/ Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. React, Angular, Nodejs, MySql etc"
                      className="bg-white text-black border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      required
                      value={jobDesc}
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      min="0"
                      max="100"
                      className="bg-white text-black border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      required
                      value={jobExperience}
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating from AI✨
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
