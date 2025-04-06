import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./features/auth/pages/Login";
import "./index.scss";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
