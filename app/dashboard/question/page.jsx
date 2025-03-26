"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function Feedback() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestTestQuestions();
  }, []);

  const fetchLatestTestQuestions = async () => {
    try {
      // Find the most recent test ID
      const latestTest = await db
        .select({ mockIdRef: UserAnswer.mockIdRef })
        .from(UserAnswer)
        .orderBy(desc(UserAnswer.mockIdRef))
        .limit(1)
        .execute();

      if (!latestTest.length) {
        setQuestions([]);
        setLoading(false);
        return;
      }

      const latestMockId = latestTest[0].mockIdRef;

      // Fetch questions from the most recent test
      const result = await db
        .select({ question: UserAnswer.question })
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, latestMockId))
        .execute();

      setQuestions(result.map((item) => item.question));
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      {loading ? (
        <p className="text-center text-gray-500 mt-5">Loading questions...</p>
      ) : questions.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Recent Test Questions Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here are your latest test questions</h2>

          <h2 className="text-sm text-gray-500 mt-2">
            Expand to review your questions from your most recent test:
          </h2>

          {questions.map((question, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex items-center gap-7 w-full">
                {question} <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="text-gray-500 p-3">
                  Click above to expand/collapse the question.
                </p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

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
