// للاشتراك
await fetch(`${process.env.REACT_APP_API_URL}/subscribe`, {...})

// للتسجيل
await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {...})

// لتسجيل الدخول
await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {...})

// لنسيت كلمة المرور
await fetch(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, {...})

// لإعادة تعيين كلمة المرور (مثال)
await fetch(`${process.env.REACT_APP_API_URL}/auth/reset-password/${token}`, {...})
