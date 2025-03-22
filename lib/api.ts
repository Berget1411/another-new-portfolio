import { ContactFormSchema } from "@/validation";
import { toast } from "sonner";

export const sendEmail = async (data: ContactFormSchema) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();

  if (response.ok) {
    toast.success(responseData.success);
  } else {
    toast.error(responseData.error);
  }
};
