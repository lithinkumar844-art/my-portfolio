import React, { useState } from "react";

const portfolioEmail = "lithinkumar.tech01@gmail.com";
const whatsappNumber = "918220455767";

const validateField = (field, value) => {
  const trimmed = value.trim();

  if (field === "name") {
    if (!trimmed) return "Please enter your name.";
    return "";
  }

  if (field === "email") {
    if (!trimmed) return "Please enter a valid email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  if (field === "message") {
    if (!trimmed) return "Please enter your message.";
    return "";
  }

  return "";
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = value;

    setForm({
      ...form,
      [name]: nextValue,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, nextValue),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      message: validateField("message", form.message),
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      setStatus("idle");
      return;
    }

    const cleanedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    const whatsappText = `Hello, I’m ${cleanedForm.name}.\n\nEmail: ${cleanedForm.email}\n\nMessage:\n${cleanedForm.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setForm({
      name: "",
      email: "",
      message: "",
    });
    setErrors({ name: "", email: "", message: "" });
    setStatus("sent");
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black py-32 px-6 md:px-16 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Contact Information */}
        <div>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-blue-400 mb-4">
            Contact
          </p>

          <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 leading-tight">
            Let's build something meaningful.
          </h2>

          <p className="text-gray-400 font-sans mb-10 max-w-sm">
            I'm open to internships, opportunities, collaborations, freelance
            projects, and interesting technology-driven ideas.
          </p>

          <div className="flex flex-col gap-4 font-sans text-sm">

            {/* Email */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(portfolioEmail)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition-colors flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-xs">
                ✉
              </span>
              {portfolioEmail}
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/lithinkumar-p"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition-colors flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-xs">
                in
              </span>
              LinkedIn ↗
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/lithinkumar844-art"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition-colors flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-xs">
                GH
              </span>
              GitHub ↗
            </a>

            <div className="flex gap-3 mt-4">

              <a
                href="https://linkedin.com/in/lithinkumar-p"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 text-gray-200 hover:text-white hover:border-white/40 transition-colors text-xs font-mono"
              >
                LinkedIn ↗
              </a>

              <a
                href="https://github.com/lithinkumar844-art"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-white/15 text-gray-200 hover:text-white hover:border-white/40 transition-colors text-xs font-mono"
              >
                GitHub ↗
              </a>

            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs font-mono uppercase tracking-widest text-gray-400"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              className={`bg-black/40 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors font-sans ${
                errors.name
                  ? "border border-red-400/80 focus:border-red-400"
                  : "border border-white/10 focus:border-blue-400/60"
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs text-red-400 font-sans">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs font-mono uppercase tracking-widest text-gray-400"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              className={`bg-black/40 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors font-sans ${
                errors.email
                  ? "border border-red-400/80 focus:border-red-400"
                  : "border border-white/10 focus:border-blue-400/60"
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-400 font-sans">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-xs font-mono uppercase tracking-widest text-gray-400"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              rows={4}
              className={`bg-black/40 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors font-sans resize-none ${
                errors.message
                  ? "border border-red-400/80 focus:border-red-400"
                  : "border border-white/10 focus:border-blue-400/60"
              }`}
              placeholder="Tell me about your idea or opportunity..."
            />
            {errors.message && (
              <p className="text-xs text-red-400 font-sans">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-2 relative overflow-hidden group px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-sans font-semibold text-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            {status === "sent" ? "Message noted ✓" : "Send message"}
          </button>
        </form>

      </div>
    </section>
  );
}