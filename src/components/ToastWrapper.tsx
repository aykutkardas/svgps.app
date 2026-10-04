"use client";

import { Toaster } from "react-hot-toast";

const ToastWrapper = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 1500,
      className:
        "bg-surface-raised! text-fg! text-xs! font-medium! rounded-full! border! border-line-strong! shadow-elevated!",
      style: {
        padding: "6px 12px",
      },
      success: {
        iconTheme: {
          primary: "#a78bfa",
          secondary: "#0b0b0e",
        },
      },
      error: {
        iconTheme: {
          primary: "#fb7185",
          secondary: "#0b0b0e",
        },
      },
    }}
  />
);

export default ToastWrapper;
