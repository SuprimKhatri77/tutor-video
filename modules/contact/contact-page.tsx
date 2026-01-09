"use client";

import { useState, FormEvent, ChangeEvent, JSX } from "react";

interface FormData {
  name: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=bikashtimalsina1992@gmail.com&su=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\n\n${formData.message}`
    )}`;

    window.open(gmailLink, "_blank");
    setFormData({ name: "", message: "", subject: "" });
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
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 ${
                errors.name ? "border-red-500" : "border-black"
              } bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
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
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 ${
                errors.subject ? "border-red-500" : "border-black"
              } bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all`}
              placeholder="How can I help you?"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
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
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 border-2 ${
                errors.message ? "border-red-500" : "border-black"
              } bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none`}
              placeholder="Tell us more about your inquiry..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <button
            disabled={
              formData.message === "" ||
              formData.subject === "" ||
              formData.name === ""
            }
            type="submit"
            className="w-full bg-black text-white py-4 px-6 font-semibold disabled:opacity-75 text-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Continue to Gmail
          </button>
        </form>
      </div>
    </div>
  );
}
