import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/routes.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./main.scss";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  </StrictMode>
);
