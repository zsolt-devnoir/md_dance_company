"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { contactContent } from "@/app/data/content";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle form submission
    console.log("Form data:", data);
    // Here you would typically send to an API
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 hover:text-gray-800"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="grid md:grid-cols-2">
                {/* Form */}
                <div className="p-6 md:p-8 lg:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    {contactContent.title}
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-gray-700"
                      >
                        Name *
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:border-transparent transition-all"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:border-transparent transition-all"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium mb-2"
                      >
                        Company
                      </label>
                      <input
                        {...register("company")}
                        type="text"
                        id="company"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-medium mb-2"
                      >
                        Project Type *
                      </label>
                      <select
                        {...register("projectType")}
                        id="projectType"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select a project type</option>
                        <option value="sport-ceremony">Sport Ceremony</option>
                        <option value="creative-production">
                          Creative Production
                        </option>
                        <option value="talent-booking">Talent Booking</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.projectType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.projectType.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        {...register("message")}
                        id="message"
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF88] focus:border-transparent transition-all resize-none"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                {/* Contact Info Sidebar */}
                <div className="bg-black text-white p-6 md:p-8 lg:p-12">
                  <h3 className="text-xl md:text-2xl font-bold mb-6">
                    Get in Touch
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                        Email
                      </p>
                      <a
                        href={`mailto:${contactContent.email}`}
                        className="text-base md:text-lg hover:text-[#00FF88] transition-colors block"
                      >
                        {contactContent.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">
                        Phone
                      </p>
                      <a
                        href={`tel:${contactContent.phone}`}
                        className="text-base md:text-lg hover:text-[#00FF88] transition-colors block"
                      >
                        {contactContent.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
