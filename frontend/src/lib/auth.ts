import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: "postgres://postgres:123@localhost:5432/onAlertas",
  }),
    emailAndPassword: { 
    enabled: true, 
  }, 
});