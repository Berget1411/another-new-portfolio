import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section className='main-container py-20'>
      <div className='flex flex-col  relative'>
        <h2 className='text-2xl md:text-4xl font-bold mb-6 text-center '>
          Contact Me
        </h2>
        <ContactForm />
      </div>
    </section>
  );
}
