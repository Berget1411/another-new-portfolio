"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormSchema } from "@/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { TextArea } from "../ui/text-area";
import { sendEmail } from "@/lib/api";
import { motion } from "framer-motion";

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

  // Animation variants for form elements
  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
      },
    }),
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-lg mx-auto border border-background-tertiary rounded-lg px-4 py-6'
      initial='hidden'
      animate='visible'
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <motion.div custom={0} variants={formItemVariants}>
          <Input
            label='Name'
            {...register("name")}
            error={errors.name?.message}
            placeholder='John Doe'
          />
        </motion.div>

        <motion.div custom={1} variants={formItemVariants}>
          <Input
            label='Email'
            {...register("email")}
            error={errors.email?.message}
            placeholder='john.doe@example.com'
          />
        </motion.div>
      </div>

      <motion.div custom={2} variants={formItemVariants}>
        <TextArea
          label='Message'
          {...register("message")}
          error={errors.message?.message}
          placeholder='Write your message here...'
        />
      </motion.div>

      <motion.div custom={3} variants={formItemVariants}>
        <Button type='submit' className='mt-4 w-full group'>
          Send
          <Send className='w-4 h-4 ml-2' />
        </Button>
      </motion.div>
    </motion.form>
  );
}
