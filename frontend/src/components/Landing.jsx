// Landing.jsx
import React, { useState, useEffect } from "react";
import heroImage from "../assets/image/PropertyIA.webp";
import API from "../api";
import Gallery from "./Gallery/Gallery";
import EmailForm from "./EmailForm";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Landing({ showGallery, onShowGallery, disabled }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [expandVideo, setExpandVideo] = useState(false);

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

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowVideo(false);
        setExpandVideo(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="relative min-h-screen" dir="rtl">
      {/* الخلفية المتحركة */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#6a11cb" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#fff", distance: 150 },
            move: { enable: true, speed: 2 },
            number: { value: 50 },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 5 } },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* المحتوى */}
      <div
        className={`relative flex flex-col md:flex-row items-center justify-center min-h-screen p-6 transition-opacity duration-500 z-10 ${
          disabled ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="md:w-1/2 flex flex-col gap-6 text-right">
          <h1 className="text-5xl font-extrabold text-white animate__animated animate__fadeInRight">
            💡 حلول الأعمال بالذكاء الاصطناعي
          </h1>
          <p className="text-lg text-gray-200 animate__animated animate__fadeInRight animate__delay-1s">
            نقدم لك حلول مبتكرة وذكية لتحسين أعمالك وزيادة الإنتاجية باستخدام
            تقنيات الذكاء الاصطناعي.
          </p>

          {/* صناديق Glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[
              { title: "تحليلات ذكية", desc: "تحليل بيانات أعمالك بدقة وسرعة" },
              {
                title: "أتمتة العمليات",
                desc: "توفير الوقت وتقليل الأخطاء البشرية",
              },
              {
                title: "تنبؤات السوق",
                desc: "توقعات ذكية لاتخاذ القرار الأفضل",
                showVideo: true, // هذا الصندوق سيشغل الفيديو
              },
              {
                title: "دعم العملاء AI",
                desc: "روبوتات ذكية للتواصل مع عملائك",
                link: "https://app.edcafe.ai/chatbots/6836eee8e93c1c9bb5f14ffb",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-800 bg-opacity-70 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  if (item.title === "أتمتة العمليات") onShowGallery();
                  if (item.showVideo) setShowVideo(true);
                  if (item.link)
                    window.open(item.link, "_blank", "noopener,noreferrer");
                }}
              >
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-200 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* نموذج الاشتراك */}
          <EmailForm />
        </div>

        {/* الصورة الجانبية */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center animate__animated animate__fadeInLeft relative">
          <img
            src={heroImage}
            alt="AI Solutions"
            className="w-full max-w-lg rounded-xl shadow-lg"
          />

          {/* Overlay الفيديو داخل صندوق الصورة */}
          {showVideo && (
            <div
              className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowVideo(false);
                setExpandVideo(false);
              }}
            >
              <div
                className={`relative w-full max-w-3xl transition-all duration-300 ${
                  expandVideo ? "h-[90vh]" : "h-96"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/wKrLod0O-sw?autoplay=1"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl shadow-2xl cursor-pointer"
                  onClick={() => setExpandVideo(!expandVideo)}
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* عرض معرض الصور إذا تم الضغط على أتمتة العمليات */}
        {showGallery && <Gallery />}
      </div>
    </div>
  );
}
