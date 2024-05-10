module.exports = {
  apps: [
    {
      name: "ADMIN-DEV",
      script: "./bin/www-admin",
      watch: true,
      ignore_watch: ["node_modules", "public/uploads"],
      env: {
        NODE_ENV: "development",
        DB_HOST: "database-1.c9yoee0ua5de.us-east-1.rds.amazonaws.com",
        DB_USER: "admin",
        DB_PASSWORD: "Admin123",
        DB_NAME: "database-1",
        PORT: 2098,

        EMAIL_PORT: 465,
        EMAIL_HOST: "smtp.zoho.in",
        EMAIL_USER: "team@thecodebucket.com",
        EMAIL_PASSWORD: "Team$123",
        BASEURL: "http://localhost:2098",
      },
        },
     {
      name: "TEACHER-DEV",
      script: "./bin/www-teacher",
      watch: true,
      ignore_watch: ["node_modules", "public/uploads"],
      env: {
        NODE_ENV: "development",
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASSWORD: "",
        DB_NAME: "erp",
        PORT: 2096,

        EMAIL_PORT: 465,
        EMAIL_HOST: "smtp.zoho.in",
        EMAIL_USER: "team@thecodebucket.com",
        EMAIL_PASSWORD: "Team$123",
        BASEURL: "http://localhost:2096",
      },
    },
    {
      name: "STUDENT-DEV",
      script: "./bin/www-student",
      watch: true,
      ignore_watch: ["node_modules", "public/uploads"],
      env: {
        NODE_ENV: "development",
        DB_HOST: "localhost",
        DB_USER: "root",
        DB_PASSWORD: "",
        DB_NAME: "erp",
        SECRET: "supersecret1234@",
        PORT: 2097,
        JWT_PRIVATE_KEY: "swc_random_string",
        EMAIL_PORT: 465,
        EMAIL_HOST: "smtp.zoho.in",
        EMAIL_USER: "team@thecodebucket.com",
        EMAIL_PASSWORD: "Team$123",
        BASEURL: "http://localhost:6502",
      },
    },
    {
      name: "ADMIN-STAGE",
      script: "./app.js",
      env: {
        NODE_ENV: "staging",
        PORT: 5000,
        BASEURL: "https://bipard-hostel.codebucketstage.online",
      },
    },
   
  ],
};
