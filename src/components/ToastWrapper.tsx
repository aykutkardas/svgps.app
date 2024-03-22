"use client";

import { Toaster } from "react-hot-toast";

const ToastWrapper = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 1500,
      className:
        "!bg-neutral-200 dark:!bg-neutral-800 text-xs !text-neutral-900 dark:!text-neutral-50 border !border-neutral-200/10",
      style: {
        padding: "5px 10px",
      },
      success: {
        iconTheme: {
          primary: "rgb(192,132,252)",
          secondary: "white",
        },
      },
      error: {
        iconTheme: {
          primary: "rgb(244,63,94)",
          secondary: "white",
        },
      },
    }}
  />
);

export default ToastWrapper;
