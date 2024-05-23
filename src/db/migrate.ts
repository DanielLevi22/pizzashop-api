import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

(async () => {
  try {

    const connection = postgres('postgres://docker:docker@localhost:5432/pizza_shop', { max: 1 });


    const db = drizzle(connection);
  

    await migrate(db, { migrationsFolder: 'drizzle' });


    await connection.end();
  
  } catch (error) {

  } finally {

    process.exit();
  }
})();
