export type Lang = "en" | "ru";

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
      label: "> ABOUT",
      title: "CEO & SOFTWARE ENGINEER",
      bio:   "Founder and engineer behind ORYX. I build products end-to-end — no layers, no handoffs.",
      stats: [
        { value: "4",   label: "Years building" },
        { value: "15+", label: "Projects shipped" },
        { value: "3",   label: "Domains" },
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
      label: "> О НАС",
      title: "CEO И РАЗРАБОТЧИК",
      bio:   "Основатель и разработчик ORYX. Строю продукты под ключ — без посредников и лишних слоёв.",
      stats: [
        { value: "4",   label: "Года в разработке" },
        { value: "15+", label: "Проектов сдано" },
        { value: "3",   label: "Направления" },
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
};

export type Translations = typeof t.en;
export default t;
