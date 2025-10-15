import app from "./app.js";
import { PORT } from "./common/config/env.js";
import { connectAuthDb } from "./auth-service/db/mongoose.js";
import { connectTaskDb } from "./task-service/db/mongoose.js";

try {
  await Promise.all([connectAuthDb(), connectTaskDb()]);
} catch (err) {
  console.error("DB connection failed:", (err as Error).message);
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server up on http://localhost:${PORT}`);
});
