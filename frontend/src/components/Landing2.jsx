import { useState } from "react";
import heroImage from "../assets/image/PropertyIA.webp"; // الصورة الصحيحة
import API from "../api";
import Gallery from "./Gallery/Gallery";

export default function Landing({ showGallery, onShowGallery, disabled }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [showHero, setShowHero] = useState(false);

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
      {/* النصوص والمحتوى */}
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
            { title: "تنبؤات السوق", desc: "توقعات ذكية لاتخاذ القرار الأفضل" },
            { title: "دعم العملاء AI", desc: "روبوتات ذكية للتواصل مع عملائك" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800 bg-opacity-70 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => item.title === "أتمتة العمليات" && onShowGallery()}
            >
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-gray-200 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* نموذج الاشتراك */}
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

      {/* الصورة الجانبية */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center animate__animated animate__fadeInLeft">
        <img
          src={heroImage}
          alt="AI Solutions"
          className="w-full max-w-lg rounded-xl shadow-lg cursor-pointer"
          onClick={() => setShowHero(true)}
        />
      </div>

      {/* Overlay للصورة المكبرة */}
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

      {/* عرض معرض الصور إذا تم الضغط على أتمتة العمليات */}
      {showGallery && <Gallery />}
    </div>
  );
}
