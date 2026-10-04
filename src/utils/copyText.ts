import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

/** Copies text and reports the result; copy-to-clipboard 4 is async. */
export const copyText = async (text: string, successMessage: string) => {
  const copied = await copy(text);

  if (copied) toast.success(successMessage);
  else toast.error("Could not copy to clipboard");

  return copied;
};
