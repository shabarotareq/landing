import { useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import heroImage from "../assets/image/PropertyIA.webp";
import API from "../api";
import Gallery from "./Gallery/Gallery";

export default function Landing({ showGallery, onShowGallery, disabled }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showHero, setShowHero] = useState(false);

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("الرجاء إدخال بريد صالح.");
    try {
      await API.post("/subscribe", { email });
      setMessage("تم تسجيل بريدك بنجاح!");
      setEmail("");
    } catch {
      setMessage("حدث خطأ، حاول مرة أخرى.");
    }
  };

  return (
    <div
      className={`relative flex flex-col md:flex-row items-center justify-center min-h-screen p-6 transition-opacity duration-500 ${
        disabled ? "opacity-40 pointer-events-none" : "opacity-100"
      } bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700`}
      dir="rtl"
    >
      {/* الخلفية المتحركة */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            collisions: { enable: true },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 2,
              straight: false,
            },
            number: { value: 80, density: { enable: true, area: 800 } },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      {/* باقي المحتوى ... */}
      <div className="md:w-1/2 flex flex-col gap-6 text-right relative z-10">
        <h1 className="text-5xl font-extrabold text-white">
          💡 حلول الأعمال بالذكاء الاصطناعي
        </h1>
        <p className="text-lg text-gray-200">
          نقدم لك حلول مبتكرة وذكية لتحسين أعمالك وزيادة الإنتاجية باستخدام
          تقنيات الذكاء الاصطناعي.
        </p>

        {/* الاشتراك */}
        <form
          onSubmit={handleSubscribe}
          className="mt-6 flex flex-col md:flex-row gap-3"
        >
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-white border-opacity-30 bg-gray-700 bg-opacity-50 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            اشترك الآن
          </button>
        </form>
        {message && <p className="mt-2 text-green-300">{message}</p>}
      </div>

      {/* الصورة */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10">
        <img
          src={heroImage}
          alt="AI Solutions"
          className="w-full max-w-lg rounded-xl shadow-lg cursor-pointer"
          onClick={() => setShowHero(true)}
        />
      </div>

      {/* الصورة المكبرة */}
      {showHero && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowHero(false)}
        >
          <img
            src={heroImage}
            alt="AI Solutions"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {showGallery && <Gallery />}
    </div>
  );
}
