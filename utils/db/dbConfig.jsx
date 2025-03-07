// postgresql://neondb_owner:npg_WlYqgfQ9RH0h@ep-spring-hat-a5gdyfjb.us-east-2.aws.neon.tech/neondb?sslmode=require

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });
