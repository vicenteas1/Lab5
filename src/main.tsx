import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/routes.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
