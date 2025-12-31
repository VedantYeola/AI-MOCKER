// import {pgTable, serial, text, varchar } from "drizzle-orm/mysql-core";

//  export const MockInterview=pgTable('mockInterview',{
//     id:serial('id').primaryKey(),
//     jsonMockResp:text('jsonMockResp').notNull(),
//     jobPosition:varchar('jobPosition').notNull(),
//     jobDesc:varchar('jobDesc').notNull(),
//     jobExperience:varchar('jobExperience').notNull(),
//     createdBy:varchar('createdBy').notNull(),
//     createdAt:varchar('createdAt'),
//     mockId:varchar('mockId').notNull()
//  })

// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// export const MockInterview = pgTable("mockInterview", {
//   id: serial("id").primaryKey(),
//   jsonMockResp: text("jsonMockResp").notNull(),
//   jobPosition: varchar("jobPosition").notNull(),
//   jobDesc: varchar("jobDesc").notNull(),
//   jobExperience: varchar("jobExperience").notNull(),
//   createdBy: varchar("createdBy").notNull(),
//   createdAt: varchar("createdAt"),
//   mockId: varchar("mockId").notNull(),
// });


// export const UserAnswer=pgTable('userAnswer',{
//   id:serial('id').primaryKey(),
//   mockIdRef:varchar('mockId').notNull(),
//   question:varchar('question').notNull(),
//   correctAns:text('correctAns'),
//   userAns:text('userAns'),
//   feedback:text('feedback'),
//   rating:varchar('rating'),
//   userEmail:varchar('userEmail'),
//   createdAt:varchar('createdAt'),
// })



import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// MockInterview Table (Main Table)
export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull().unique(), // Unique ID for each mock interview
  currentInstanceId: varchar("currentInstanceId"), // Track active session
});

// UserAnswer Table (Stores User Responses)
export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockIdRef").notNull(), // Foreign Key Reference to MockInterview
  question: text("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt").notNull(),
});
