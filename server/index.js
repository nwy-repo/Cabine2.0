import "dotenv/config";
import express from "express";
import cors from "cors";

import checkoutRoute from "./routes/checkout.js";
import webhooksRoute from "./routes/webhooks.js";
import contactRoute from "./routes/contact.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/checkout", checkoutRoute);
app.use("/api/webhooks", webhooksRoute);
app.use("/api/contact", contactRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend Cabine 2.0 démarré sur http://localhost:${port}`);
});
