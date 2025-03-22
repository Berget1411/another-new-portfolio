"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormSchema } from "@/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { TextArea } from "../ui/text-area";
import { sendEmail } from "@/lib/api";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  });
  const onSubmit = async (data: ContactFormSchema) => {
    await sendEmail(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-lg mx-auto border border-background-tertiary rounded-lg px-4 py-6'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <Input
          label='Name'
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label='Email'
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
      <TextArea
        label='Message'
        {...register("message")}
        error={errors.message?.message}
      />

      <Button type='submit' className='mt-4 w-full group'>
        Send
        <Send className='w-4 h-4 ' />
      </Button>
    </form>
  );
}
