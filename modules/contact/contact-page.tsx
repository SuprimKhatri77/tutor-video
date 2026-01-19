"use client";

import { contactUsAction } from "@/actions/contact-us/contact-us";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ContactUsResponse } from "@/utils/validators/contact-us.validator";
import { useState, FormEvent, JSX } from "react";
import { toast } from "sonner";

interface FormData {
  name: string;
  subject: string;
  message: string;
}

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactUsResponse["errors"]>({});
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const result = await contactUsAction(formData);
      if (!result.success) {
        toast.error(result.message);
        if (result.errors) {
          setErrors(result.errors);
        }
        return;
      }
      toast.success(result.message);
      setErrors({});
    } finally {
      setFormData({ name: "", message: "", subject: "" });
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen  bg-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-black mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-lg">
            Fill out the form below and I&apos;ll get back to you shortly
          </p>
        </div>
        <div className="sr-only">
          <h2>German Language Classes Contact</h2>
          <p>
            Contact Tutordai for German language classes, exam preparation, and
            study in Germany guidance. The tutor is C1 certified and experienced
            with Nepali students.
          </p>
        </div>
        <div className="sr-only">
          <h1 className="">Contact Your German Tutor</h1>

          <p className="">
            Have questions about learning German, exam preparation, or studying
            in Germany? Reach out to a{" "}
            <strong>C1 certified German tutor</strong> at Tutordai. This contact
            form is ideal for course inquiries, class schedules, and guidance
            for Nepali students planning to study or work in Germany.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-black mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-3 border-2 ${
                errors && errors.name ? "border-red-500" : "border-black"
              } bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all`}
              placeholder="John Doe"
            />
            {errors && errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-black mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className={`w-full px-4 py-3 border-2 ${
                errors && errors.subject ? "border-red-500" : "border-black"
              } bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all`}
              placeholder="How can I help you?"
            />
            {errors && errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-black mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={6}
              className={`w-full px-4 py-3 border-2 ${
                errors && errors.message ? "border-red-500" : "border-black"
              } bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none`}
              placeholder="Tell us more about your inquiry..."
            />
            {errors && errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message[0]}</p>
            )}
          </div>

          <Button
            disabled={
              formData.message === "" ||
              formData.subject === "" ||
              formData.name === "" ||
              isPending
            }
            size="lg"
            type="submit"
            className="w-full bg-gray-600 text-white py-7 px-6 font-semibold disabled:opacity-75 text-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 "
          >
            {isPending ? <Spinner /> : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
