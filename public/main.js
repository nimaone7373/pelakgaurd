// Theme
let isDark = true;
function toggleTheme() {
  isDark = !isDark;
  document.documentElement.classList.toggle('light', !isDark);
  const sun = document.getElementById('sun-icon');
  const moon = document.getElementById('moon-icon');
  if (sun && moon) {
    sun.style.display = isDark ? 'none' : 'block';
    moon.style.display = isDark ? 'block' : 'none';
  }
}

// Language
let isFa = true;
function toggleLang() {
  isFa = !isFa;
  const html = document.getElementById('html-root');
  html.lang = isFa ? 'fa' : 'en';
  html.dir = isFa ? 'rtl' : 'ltr';
  document.getElementById('langBtn').textContent = isFa ? 'EN' : 'FA';
  document.title = isFa ? 'PelakGuard — هوش مصنوعی تشخیص پلاک' : 'PelakGuard — AI License Plate Masking';
  document.querySelectorAll('[data-fa]').forEach(el => {
    el.textContent = isFa ? el.dataset.fa : el.dataset.en;
  });
  buildMarquee();
  buildFAQ();
}

// Marquee
const marqueeItems = {
  fa: ['🎯 دقت ۹۸٪', '⚡ پردازش آنی', '🔒 آفلاین‌پذیر', '🇮🇷 پلاک ایرانی', '✏️ ویرایش دستی', '🔌 REST API', '🤖 Gemini AI', '📦 ONNX', '🌐 پشتیبانی بین‌المللی', '🛡️ حریم خصوصی اول'],
  en: ['🎯 98% Accuracy', '⚡ Instant Processing', '🔒 Offline Ready', '🇮🇷 Iranian Plates', '✏️ Manual Editing', '🔌 REST API', '🤖 Gemini AI', '📦 ONNX Engine', '🌐 International Support', '🛡️ Privacy First'],
};
function buildMarquee() {
  const track = document.getElementById('marquee');
  if (!track) return;
  const items = marqueeItems[isFa ? 'fa' : 'en'];
  const doubled = [...items, ...items];
  track.innerHTML = doubled.map(t => `<div class="marquee-item">${t}</div>`).join('');
}

// FAQ
const faqData = {
  fa: [
    { q: 'آیا پردازش کاملاً آنلاین است؟', a: 'خیر، ما نسخه‌های آفلاین (on-device با ONNX) داریم که تصاویر شما هرگز از دستگاهتان خارج نمی‌شوند.' },
    { q: 'چه فرمت‌هایی پشتیبانی می‌شوند؟', a: 'JPG، PNG، WebP، BMP برای تصویر — و MP4، AVI، MOV برای ویدیو.' },
    { q: 'آیا API در دسترس است؟', a: 'بله، REST API کامل با مستندات و SDK برای Python و JavaScript در دسترس است.' },
    { q: 'پلاک‌های کدام کشورها پشتیبانی می‌شوند؟', a: 'بهینه‌سازی‌شده برای پلاک‌های ایرانی؛ پشتیبانی از پلاک‌های بین‌المللی نیز موجود است.' },
    { q: 'آیا می‌توانم کادرهای تشخیص را دستی ویرایش کنم؟', a: 'بله، رابط تعاملی اجازه اضافه، جابجا، تغییر اندازه و حذف کادرها را می‌دهد.' },
  ],
  en: [
    { q: 'Is processing fully online?', a: 'No. We offer offline (on-device with ONNX) versions where your images never leave your device.' },
    { q: 'What file formats are supported?', a: 'JPG, PNG, WebP, BMP for images — and MP4, AVI, MOV for video.' },
    { q: 'Is there an API?', a: 'Yes, a full REST API with complete docs and SDKs for Python and JavaScript.' },
    { q: 'Which country plates are supported?', a: 'Optimized for Iranian plates; international plate support is also available.' },
    { q: 'Can I edit detection boxes manually?', a: 'Yes, the interactive UI lets you add, move, resize, and delete mask boxes freely.' },
  ],
};
function buildFAQ() {
  const container = document.getElementById('faq-container');
  if (!container) return;
  const data = faqData[isFa ? 'fa' : 'en'];
  container.innerHTML = data.map((item, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" onclick="toggleFAQ(${i})">
        <span>${item.q}</span>
        <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="faq-ans"><div class="faq-ans-inner">${item.a}</div></div>
    </div>
  `).join('');
}
function toggleFAQ(i) {
  const el = document.getElementById(`faq-${i}`);
  if (!el) return;
  el.classList.toggle('open');
}

// Scroll fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  buildMarquee();
  buildFAQ();
});

// Expose toggles to global (so inline onclick in index.html still works)
window.toggleTheme = toggleTheme;
window.toggleLang = toggleLang;
window.toggleFAQ = toggleFAQ;
