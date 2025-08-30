/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // يبحث في جميع ملفات React
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // أزرق Tailwind
        secondary: "#9333ea", // بنفسجي Tailwind
      },
      animation: {
        "pulse-slow": "pulse 10s infinite",
      },
    },
  },
  plugins: [],
};
