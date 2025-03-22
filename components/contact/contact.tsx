"use client";
import { ContactForm } from "./contact-form";
import { motion } from "framer-motion";

export function Contact() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <section className='main-container py-20' id='contact'>
      <motion.div
        className='flex flex-col relative'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className='text-2xl md:text-4xl font-bold mb-6 text-center'
          variants={itemVariants}
        >
          Contact Me
        </motion.h2>
        <motion.div variants={itemVariants}>
          <ContactForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
