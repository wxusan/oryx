export type Lang = "en" | "ru" | "uz";

const t = {
  en: {
    nav: {
      services: "SERVICES",
      work:     "WORK",
      about:    "ABOUT",
      contact:  "CONTACT",
      cta:      "BOOK A CALL",
    },
    hero: {
      eyebrow:     "> ORYX / HOME",
      headline:    ["We turn ideas into", "digital products", "that scale."],
      description: "Founder-led digital product studio for websites, MVPs, automations, and AI systems.",
      cta1:        "BOOK A 20-MIN CALL",
      cta2:        "VIEW OUR WORK",
      scroll:      "SCROLL TO EXPLORE",
      swipe:       "SWIPE TO EXPLORE",
      year:        "2026 — STUDIO ORYX",
    },
    loader: {
      lines: [
        { command: "INITIALIZING ORYX", status: "[ OK ]" },
        { command: "SYSTEM CHECK",      status: "[ OK ]" },
        { command: "READY",             status: "[ ✓ ]"  },
      ],
    },
    buildStack: {
      label:      "> BUILD STACK",
      headline:   ["One studio.", "Four systems."],
      supporting: "We design, build, automate, and visualize digital operations that scale.",
      scroll:     "SCROLL TO EXPLORE",
      swipe:      "SWIPE TO EXPLORE",
      services: [
        {
          id:       "01 — 02",
          title:    "Websites & Platforms",
          subtitle: "CRM & ERP Systems",
          desc:     "High-performance websites, landing pages, e-commerce, and booking platforms — plus CRM pipelines, client records, inventory, operations, approvals, and internal workflows.",
        },
        {
          id:   "03",
          title: "Mobile Apps",
          desc:  "iOS, Android, and cross-platform apps for customers, teams, marketplaces, and product ideas.",
        },
        {
          id:   "04",
          title: "AI Automations & Custom Systems",
          desc:  "AI agents, bots, integrations, custom workflows, reporting systems, and unusual ideas that do not fit a template.",
        },
      ],
      scenes: [
        { num: "01 + 02", title: "Websites & Platforms", subtitle: "& CRM / ERP Systems" },
        { num: "03",      title: "Mobile Apps",          subtitle: "iOS · Android · Cross-platform" },
        { num: "04",      title: "AI Automations",       subtitle: "& Custom Systems" },
      ],
      counter: (n: number) => `0${n} / 03`,
    },
    work: {
      label:      "> WORK",
      headline:   "Selected work.",
      tagline:    "Real products. Real clients.\nBuilt and shipped by ORYX.",
      moreSoon:   "MORE COMING SOON",
      workWithUs: "WORK WITH US",
      live:       "LIVE",
      inProgress: "IN PROGRESS",
      visit:      "VISIT",
      projects: [
        {
          descriptor: "Full-scale e-commerce and digital retail platform built for growth.",
          tags: ["E-commerce", "Web Platform"],
        },
        {
          descriptor: "Real estate marketplace connecting buyers, sellers, and agencies nationwide.",
          tags: ["Real Estate", "Marketplace"],
        },
        {
          descriptor: "Custom patient management and clinic operations system, built end-to-end.",
          tags: ["CRM", "Healthcare"],
        },
      ],
    },
    about: {
      label: "> STUDIO",
      title: "FOUNDER & CEO · ORYX STUDIO",
      bio:   "ORYX is a founder-led digital product studio based in Tashkent. We design, build, and ship — websites, apps, CRM systems, and AI automations. You work directly with us, not through layers.",
      tags:  ["WEBSITES", "MOBILE APPS", "CRM / ERP", "AI AUTOMATION"],
      stats: [
        { value: "4",   label: "Years building" },
        { value: "15+", label: "Projects shipped" },
        { value: "3",   label: "Countries" },
      ],
      cta: "BOOK A 20-MIN CALL",
    },
    contact: {
      label:       "> CONTACT",
      headline:    ["Let's build", "something."],
      description: "Fill in the form and I'll get back to you within 24 hours.",
      labels: {
        name:     "NAME",
        phone:    "PHONE NUMBER",
        telegram: "TELEGRAM",
        service:  "WHAT DO YOU NEED",
        message:  "MESSAGE",
        optional: "OPTIONAL",
        required: "*",
      },
      placeholders: {
        name:     "Your name",
        phone:    "+998 XX XXX XX XX",
        telegram: "@username",
        service:  "Select a service",
        message:  "Tell me about your project...",
      },
      services: [
        "Website / Landing Page",
        "Mobile App",
        "CRM / ERP System",
        "AI Automation",
        "Other",
      ],
      submit:   "SEND MESSAGE",
      sending:  "SENDING...",
      success: {
        title:   "Message sent.",
        message: "I'll get back to you within 24 hours.",
      },
      error: "Something went wrong. Try again.",
    },
  },

  ru: {
    nav: {
      services: "УСЛУГИ",
      work:     "РАБОТЫ",
      about:    "О НАС",
      contact:  "КОНТАКТ",
      cta:      "ЗАПИСАТЬСЯ",
    },
    hero: {
      eyebrow:     "> ORYX / ГЛАВНАЯ",
      headline:    ["Превращаем идеи в", "цифровые продукты,", "которые растут."],
      description: "Студия цифровых продуктов — сайты, мобильные приложения, автоматизации и ИИ системы.",
      cta1:        "ЗАПИСАТЬСЯ НА ЗВОНОК",
      cta2:        "НАШИ РАБОТЫ",
      scroll:      "ЛИСТАЙТЕ ВНИЗ",
      swipe:       "ЛИСТАЙТЕ ВНИЗ",
      year:        "2026 — СТУДИЯ ORYX",
    },
    loader: {
      lines: [
        { command: "ИНИЦИАЛИЗАЦИЯ ORYX", status: "[ OK ]" },
        { command: "ПРОВЕРКА СИСТЕМЫ",   status: "[ OK ]" },
        { command: "ГОТОВО",             status: "[ ✓ ]"  },
      ],
    },
    buildStack: {
      label:      "> СТЕК РАЗРАБОТКИ",
      headline:   ["Одна студия.", "Четыре системы."],
      supporting: "Мы проектируем, строим, автоматизируем и визуализируем цифровые операции.",
      scroll:     "ЛИСТАЙТЕ ВНИЗ",
      swipe:      "ЛИСТАЙТЕ ВНИЗ",
      services: [
        {
          id:       "01 — 02",
          title:    "Сайты и Платформы",
          subtitle: "CRM и ERP Системы",
          desc:     "Высокопроизводительные сайты, лендинги, порталы, e-commerce — плюс CRM, учёт клиентов, склад, операции и внутренние процессы.",
        },
        {
          id:   "03",
          title: "Мобильные Приложения",
          desc:  "iOS, Android и кроссплатформенные приложения для клиентов, команд и маркетплейсов.",
        },
        {
          id:   "04",
          title: "ИИ Автоматизации и Системы",
          desc:  "ИИ агенты, боты, интеграции, кастомные процессы, системы отчётности и нестандартные задачи.",
        },
      ],
      scenes: [
        { num: "01 + 02", title: "Сайты и Платформы",       subtitle: "и CRM / ERP Системы" },
        { num: "03",      title: "Мобильные Приложения",     subtitle: "iOS · Android · Кроссплатформа" },
        { num: "04",      title: "ИИ Автоматизации",         subtitle: "и Кастомные Системы" },
      ],
      counter: (n: number) => `0${n} / 03`,
    },
    work: {
      label:      "> РАБОТЫ",
      headline:   "Избранные проекты.",
      tagline:    "Реальные продукты. Реальные клиенты.\nСоздано и запущено ORYX.",
      moreSoon:   "СКОРО БОЛЬШЕ",
      workWithUs: "РАБОТАТЬ С НАМИ",
      live:       "ЗАПУЩЕН",
      inProgress: "В РАЗРАБОТКЕ",
      visit:      "ОТКРЫТЬ",
      projects: [
        {
          descriptor: "Полноценная e-commerce платформа и цифровой магазин, построенный для роста.",
          tags: ["E-commerce", "Веб платформа"],
        },
        {
          descriptor: "Маркетплейс недвижимости, объединяющий покупателей, продавцов и агентства.",
          tags: ["Недвижимость", "Маркетплейс"],
        },
        {
          descriptor: "Кастомная система управления пациентами и операциями клиники.",
          tags: ["CRM", "Медицина"],
        },
      ],
    },
    about: {
      label: "> СТУДИЯ",
      title: "ОСНОВАТЕЛЬ И CEO · ORYX STUDIO",
      bio:   "ORYX — студия цифровых продуктов из Ташкента. Мы проектируем, строим и запускаем — сайты, приложения, CRM-системы и ИИ-автоматизации. Вы работаете напрямую с нами, без посредников.",
      tags:  ["САЙТЫ", "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ", "CRM / ERP", "ИИ АВТОМАТИЗАЦИЯ"],
      stats: [
        { value: "4",   label: "Года в разработке" },
        { value: "15+", label: "Проектов сдано" },
        { value: "3",   label: "Страны" },
      ],
      cta: "ЗАПИСАТЬСЯ НА ЗВОНОК",
    },
    contact: {
      label:       "> КОНТАКТ",
      headline:    ["Давайте", "построим."],
      description: "Заполните форму и я отвечу в течение 24 часов.",
      labels: {
        name:     "ИМЯ",
        phone:    "НОМЕР ТЕЛЕФОНА",
        telegram: "TELEGRAM",
        service:  "ЧТО ВАМ НУЖНО",
        message:  "СООБЩЕНИЕ",
        optional: "НЕОБЯЗАТЕЛЬНО",
        required: "*",
      },
      placeholders: {
        name:     "Ваше имя",
        phone:    "+998 XX XXX XX XX",
        telegram: "@username",
        service:  "Выберите услугу",
        message:  "Расскажите о вашем проекте...",
      },
      services: [
        "Сайт / Лендинг",
        "Мобильное приложение",
        "CRM / ERP Система",
        "ИИ Автоматизация",
        "Другое",
      ],
      submit:   "ОТПРАВИТЬ",
      sending:  "ОТПРАВКА...",
      success: {
        title:   "Сообщение отправлено.",
        message: "Я отвечу в течение 24 часов.",
      },
      error: "Что-то пошло не так. Попробуйте ещё раз.",
    },
  },

  uz: {
    nav: {
      services: "XIZMATLAR",
      work:     "ISHLAR",
      about:    "BIZ HAQIMIZDA",
      contact:  "BOG'LANISH",
      cta:      "QONGIROQ",
    },
    hero: {
      eyebrow:     "> ORYX / BOSH SAHIFA",
      headline:    ["G'oyalarni raqamli", "mahsulotlarga", "aylantiramiz."],
      description: "Veb-saytlar, MVP, avtomatizatsiya va AI tizimlari uchun raqamli mahsulot studiyasi.",
      cta1:        "20 DAQIQALIK QONGIROQ",
      cta2:        "ISHLARIMIZ",
      scroll:      "PASTGA AYLANTIRING",
      swipe:       "PASTGA AYLANTIRING",
      year:        "2026 — ORYX STUDIO",
    },
    loader: {
      lines: [
        { command: "ORYX ISHGA TUSHIRILMOQDA", status: "[ OK ]" },
        { command: "TIZIM TEKSHIRUVI",         status: "[ OK ]" },
        { command: "TAYYOR",                   status: "[ ✓ ]"  },
      ],
    },
    buildStack: {
      label:      "> ISHLAB CHIQISH STEKI",
      headline:   ["Bitta studio.", "To'rt tizim."],
      supporting: "Biz raqamli operatsiyalarni loyihalash, qurish, avtomatlashtirish va vizualizatsiya qilamiz.",
      scroll:     "PASTGA AYLANTIRING",
      swipe:      "PASTGA AYLANTIRING",
      services: [
        {
          id:       "01 — 02",
          title:    "Veb-saytlar va Platformalar",
          subtitle: "CRM va ERP Tizimlari",
          desc:     "Yuqori samarali veb-saytlar, landinglar, e-commerce — hamda CRM, mijozlar bazasi, ombor va ichki jarayonlar.",
        },
        {
          id:   "03",
          title: "Mobil Ilovalar",
          desc:  "iOS, Android va cross-platform ilovalar — mijozlar, jamoalar va marketplace uchun.",
        },
        {
          id:   "04",
          title: "AI Avtomatizatsiyalar va Tizimlar",
          desc:  "AI agentlar, botlar, integratsiyalar, maxsus jarayonlar, hisobot tizimlari va noodatiy g'oyalar.",
        },
      ],
      scenes: [
        { num: "01 + 02", title: "Veb-saytlar va Platformalar", subtitle: "va CRM / ERP Tizimlari" },
        { num: "03",      title: "Mobil Ilovalar",               subtitle: "iOS · Android · Cross-platform" },
        { num: "04",      title: "AI Avtomatizatsiyalar",        subtitle: "va Maxsus Tizimlar" },
      ],
      counter: (n: number) => `0${n} / 03`,
    },
    work: {
      label:      "> ISHLAR",
      headline:   "Tanlangan ishlar.",
      tagline:    "Haqiqiy mahsulotlar. Haqiqiy mijozlar.\nORYX tomonidan qurilgan va topshirilgan.",
      moreSoon:   "YAQINDA KO'PROQ",
      workWithUs: "BIZ BILAN ISHLASH",
      live:       "ISHGA TUSHGAN",
      inProgress: "ISHLAB CHIQILMOQDA",
      visit:      "OCHISH",
      projects: [
        {
          descriptor: "O'sish uchun qurilgan to'laqonli e-commerce platformasi va raqamli do'kon.",
          tags: ["E-commerce", "Veb Platforma"],
        },
        {
          descriptor: "Xaridorlar, sotuvchilar va agentliklarni birlashtiruvchi ko'chmas mulk marketplace.",
          tags: ["Ko'chmas Mulk", "Marketplace"],
        },
        {
          descriptor: "Klinika uchun maxsus bemorlarni boshqarish va operatsion tizim.",
          tags: ["CRM", "Tibbiyot"],
        },
      ],
    },
    about: {
      label: "> STUDIO",
      title: "ASOSCHI VA CEO · ORYX STUDIO",
      bio:   "ORYX — Toshkentdagi raqamli mahsulot studiyasi. Biz loyihalash, qurish va topshiramiz — veb-saytlar, ilovalar, CRM tizimlari va AI avtomatizatsiyalar. Siz to'g'ridan-to'g'ri biz bilan ishlaysiz, vositachilarsiz.",
      tags:  ["VEB-SAYTLAR", "MOBIL ILOVALAR", "CRM / ERP", "AI AVTOMATIZATSIYA"],
      stats: [
        { value: "4",   label: "Yil dasturlashda" },
        { value: "15+", label: "Loyiha topshirilgan" },
        { value: "3",   label: "Mamlakatlar" },
      ],
      cta: "20 DAQIQALIK QONGIROQ",
    },
    contact: {
      label:       "> BOG'LANISH",
      headline:    ["Keling,", "quramiz."],
      description: "Formani to'ldiring, 24 soat ichida javob beraman.",
      labels: {
        name:     "ISM",
        phone:    "TELEFON RAQAMI",
        telegram: "TELEGRAM",
        service:  "NIMA KERAK",
        message:  "XABAR",
        optional: "IXTIYORIY",
        required: "*",
      },
      placeholders: {
        name:     "Ismingiz",
        phone:    "+998 XX XXX XX XX",
        telegram: "@username",
        service:  "Xizmat tanlang",
        message:  "Loyihangiz haqida aytib bering...",
      },
      services: [
        "Veb-sayt / Landing Page",
        "Mobil Ilova",
        "CRM / ERP Tizimi",
        "AI Avtomatizatsiya",
        "Boshqa",
      ],
      submit:   "YUBORISH",
      sending:  "YUBORILMOQDA...",
      success: {
        title:   "Xabar yuborildi.",
        message: "24 soat ichida javob beraman.",
      },
      error: "Xatolik yuz berdi. Qayta urinib ko'ring.",
    },
  },
};

export type Translations = typeof t.en;
export default t;
