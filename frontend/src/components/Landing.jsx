import React from "react";
import EmailForm from "./EmailForm";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

function Landing() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="landing-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#6a11cb" },
          fpsLimit: 60,
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#fff", distance: 150 },
            move: { enable: true, speed: 2 },
            number: { value: 50 },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 5 } },
          },
        }}
      />
      <div className="landing">
        <div className="content">
          <h1>حلول الاعمال بالذكاء الاصطناعي</h1>
          <p>
            اشترك معنا لتحصل على أحدث التطبيقات والحلول العملية المدعومة بالذكاء
            الاصطناعي لدى شركة سنيم للتدريب الالكتروني والذكاء الاصطناعي
            بالشراكة مع شركة الغدير - مسرعات الاعمال
          </p>
          <EmailForm />
        </div>
        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
            alt="Landing"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
