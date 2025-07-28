//import the neon serverless client for PostgreSQL
import { neon } from "@neondatabase/serverless";
//Import Drizzle's Neon HTTP driver for ORM support
import { drizzle } from "drizzle-orm/neon-http";

//import your database schema definitions(e.g, tables) from the local schema file
import * as schema from "./schema";

//initialize the neon client using the DATABASE_URL from your environment variables
const sql = neon(process.env.DATABASE_URL!)

//create and export the drizzle ORM instance, with the NEON client and schema for type-safe queries
export const db = drizzle(sql, { schema })