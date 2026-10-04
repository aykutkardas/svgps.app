import toast from "react-hot-toast";

/** Copies text with the Clipboard API and reports the result. */
export const copyText = async (text: string, successMessage: string) => {
  let copied = false;

  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch {
    // Not a secure context, permission denied or no clipboard support.
  }

  if (copied) toast.success(successMessage);
  else toast.error("Could not copy to clipboard");

  return copied;
};
