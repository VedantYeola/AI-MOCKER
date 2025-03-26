// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation';

// import React from 'react'

// function InterviewItemCard({interview}) {

//     const router=useRouter();

//     const onStart=()=>{
//         router.push("/dashboard/interview/"+interview?.mockId)
//     }

//     const onFeedbackPress=()=>{
//         router.push("/dashboard/feedback/"+interview?.mockId+"/feedback")
//     }

//   return (
//     <div className='border shadow-sm rounded-lg p-3'>
//         <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
//         <h2 className='text-sm text-gray-600'>{interview?.jobExperience}Years of Experience</h2>
//         <h2 className='text-xs text-gray-400'>Created At:{interview.createdAt}</h2>
//         <div className='flex justify-between mt-2 gap-5'>
//             <Button size="sm" variant="outline" className="w-full"
//             onClick={onFeedbackPress}
//             >Feedback</Button>
//             <Button size="sm" className="w-full"
//             onClick={onStart}
//             >Start</Button>
//         </div>
//     </div>
//   )
// }

// export default InterviewItemCard
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        {/* Feedback Button - Updated Color Only */}
        <Button
          size="sm"
          className="w-full bg-white text-black border border-gray-300 font-bold shadow-md"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>

        {/* Start Button (No Changes) */}
        <Button
          size="sm"
          className="w-full bg-primary text-white hover:bg-primary-700"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
