// module.exports = {
//     schema: "./utils/schema.js", // Adjust path if needed
//     out: "./drizzle",
//     dialect: "postgresql",
//     driver: "pg", // Use 'pg' for local PostgreSQL
//     dbCredentials: {
//       connectionString: process.env.DATABASE_URL, // Ensure it's correct in .env
//     },
//   };

/**@type {import("drizzle-kit").Congfig} */
export default {
  schema: "./utils/schema.js",
  output: "./utils",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://demo_owner:npg_lqz5TWA1rnMO@ep-fancy-firefly-a7648sya-pooler.ap-southeast-2.aws.neon.tech/demo?sslmode=require",
  },
};
