import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// TOAST IMPORT
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>

      {/* GLOBAL TOASTER */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "10px",
            padding: "14px",
            fontSize: "14px",
          },

          success: {
            style: {
              background: "#16a34a",
            },
          },

          error: {
            style: {
              background: "#dc2626",
            },
          },
        }}
      />

      <App />

    </AuthProvider>
  </BrowserRouter>
);