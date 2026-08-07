// Lightweight, fully offline "idea engine" for the AI screen.
// It mixes proven YouTube title/hook patterns with whatever topic the user
// types, so it works instantly with no backend or API key. If you later want
// real generative AI, swap generateIdeas() below for a call to your own
// backend (never call a paid AI API with a secret key directly from a
// public, static-hosted app).

const TITLE_PATTERNS = {
  fa: [
    (x) => `۵ اشتباهی که هر تازه‌کار توی ${x} انجام می‌ده`,
    (x) => `چطور توی ۳۰ روز توی ${x} حرفه‌ای شدم`,
    (x) => `اگه الان می‌خواستم ${x} رو از صفر شروع کنم، این کارو می‌کردم`,
    (x) => `${x}: راهنمای کامل برای تازه‌کارها`,
    (x) => `چیزی که هیچکس درباره‌ی ${x} بهت نمی‌گه`,
    (x) => `۱۰ ترفند ${x} که زمان زیادی برات ذخیره می‌کنه`,
    (x) => `این ویدیو نگاهت به ${x} رو کامل عوض می‌کنه`,
    (x) => `مقایسه: روش قدیمی در برابر روش جدید توی ${x}`,
    (x) => `یه روز کامل با من: پشت‌صحنه‌ی ${x}`,
    (x) => `سوالاتی که بیشترین بار درباره‌ی ${x} ازم پرسیدن — جواب دادم`,
  ],
  en: [
    (x) => `5 mistakes every beginner makes in ${x}`,
    (x) => `How I got good at ${x} in 30 days`,
    (x) => `If I were starting ${x} from zero today, I'd do this`,
    (x) => `${x}: the complete beginner's guide`,
    (x) => `Nobody tells you this about ${x}`,
    (x) => `10 ${x} tips that will save you hours`,
    (x) => `This video will change how you see ${x}`,
    (x) => `Old way vs new way: ${x} edition`,
    (x) => `A full day with me: behind the scenes of ${x}`,
    (x) => `Answering your most-asked questions about ${x}`,
  ],
  tr: [
    (x) => `${x} konusunda herkesin yaptığı 5 hata`,
    (x) => `30 günde ${x} konusunda nasıl iyileştim`,
    (x) => `${x}'a sıfırdan başlasaydım bunu yapardım`,
    (x) => `${x}: yeni başlayanlar için tam rehber`,
    (x) => `${x} hakkında kimsenin sana söylemediği şey`,
    (x) => `Saatlerini kurtaracak 10 ${x} ipucu`,
    (x) => `Bu video ${x} hakkındaki bakışını değiştirecek`,
    (x) => `Eski yöntem vs yeni yöntem: ${x}`,
    (x) => `Benimle bir gün: ${x} perde arkası`,
    (x) => `${x} hakkında en çok sorulan sorulara cevap veriyorum`,
  ],
};

const HOOKS = {
  fa: [
    (x) => `اگه توی ${x} تازه‌کاری، این ۳۰ ثانیه رو از دست نده...`,
    (x) => `من هم قبلاً همینجوری فکر می‌کردم، تا اینکه...`,
    (x) => `این چیزیه که کاش یکی زودتر بهم درباره‌ی ${x} می‌گفت`,
    (x) => `بذار همین اول بگم: اکثر آدما این‌جا اشتباه می‌کنن`,
    (x) => `تا آخر ویدیو بمون، آخرش یه سورپرایز داره`,
  ],
  en: [
    (x) => `If you're new to ${x}, don't skip these first 30 seconds...`,
    (x) => `I used to think the same thing, until...`,
    (x) => `I wish someone had told me this about ${x} sooner`,
    (x) => `Let me say this up front: most people get this wrong`,
    (x) => `Stick around till the end — there's a surprise`,
  ],
  tr: [
    (x) => `${x} konusunda yeniysen, ilk 30 saniyeyi kaçırma...`,
    (x) => `Ben de aynı şeyi düşünürdüm, ta ki...`,
    (x) => `${x} hakkında keşke biri bunu bana daha önce söyleseydi`,
    (x) => `Baştan söyleyeyim: çoğu kişi burada hata yapıyor`,
    (x) => `Sonuna kadar kal, bir sürprizle bitiyor`,
  ],
};

function slugTags(topic, lang) {
  const base = topic
    .split(/[\s,،]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => `#${w.replace(/[^\p{L}\p{N}]/gu, "")}`)
    .filter((w) => w.length > 1);
  const generic = { fa: ["#یوتیوب", "#محتوا", "#آموزش"], en: ["#youtube", "#content", "#tutorial"], tr: ["#youtube", "#içerik", "#eğitim"] };
  return [...new Set([...base, ...(generic[lang] || generic.en)])].slice(0, 5);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateIdeas(topic, lang, count = 5) {
  const x = topic.trim();
  if (!x) return [];
  const titles = shuffle(TITLE_PATTERNS[lang] || TITLE_PATTERNS.en).slice(0, count);
  const hooks = shuffle(HOOKS[lang] || HOOKS.en);
  return titles.map((fn, i) => ({
    id: `${Date.now()}-${i}`,
    title: fn(x),
    hook: (hooks[i % hooks.length])(x),
    tags: slugTags(x, lang),
  }));
}
