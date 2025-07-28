import { defineConfig } from "drizzle-kit"
//get the database URL from envuronment variables
const databaseUrl = process.env.DATABASE_URL
//if the database URL is not defined, throw an error to prevent misconfiguration
if (!databaseUrl){
    throw new Error("❌DATABASE_URL is not defined in environment variables")
}

export default defineConfig({
    //path to your schema definitions (Drizzle ORM will scan this file)
    schema: "./drizzle/schema.ts",

    //Directory where Drizzle will output migration files
    out: "./drizzle/migrations",

    //specify which SQL dialect you're using (Mysql, PostgreSQL)
    dialect:"postgresql",

    //enable strict mode to enforce stricter validation and type-safety
    strict: true,

    //enable verbose logging to get more information during CLI actions
    verbose:true,

    //pass in database credentials (like connection url)
    dbCredentials: {
        //safe to use now because we checked above that its defined
        url: databaseUrl,
},
})