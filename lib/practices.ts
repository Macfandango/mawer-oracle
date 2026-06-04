export type Practice = {
  id: string;
  category: "body" | "mind" | "soul";

  title: string;
  text: string;

  duration: number;

  difficulty: "easy" | "medium" | "hard";

  tags: string[];

  relatedCards: string[];
};

export const bodyPractices: Practice[] = [
  {
    id: "body_001",
    category: "body",
    title: "Прогулка без телефона",
    text: "Пройди 10 минут без телефона. Просто замечай шаги, дыхание и пространство вокруг.",
    duration: 10,
    difficulty: "easy",
    tags: ["grounding", "walking"],
    relatedCards: ["Отшельник", "Умеренность", "Солнце"],
  },

  {
    id: "body_002",
    category: "body",
    title: "Мягкая растяжка",
    text: "Сделай 5 минут мягкой растяжки шеи, плеч и спины без цели добиться результата.",
    duration: 5,
    difficulty: "easy",
    tags: ["stretching"],
    relatedCards: ["Звезда", "Императрица"],
  },

  {
    id: "body_003",
    category: "body",
    title: "Осознанное дыхание",
    text: "5 минут наблюдай вдох и выдох. Не меняй дыхание специально.",
    duration: 5,
    difficulty: "easy",
    tags: ["breathing"],
    relatedCards: ["Жрица", "Отшельник"],
  },

  {
    id: "body_004",
    category: "body",
    title: "Танец энергии",
    text: "Включи любимую музыку и двигайся свободно 1 песню.",
    duration: 5,
    difficulty: "easy",
    tags: ["dance"],
    relatedCards: ["Солнце", "Шут"],
  },

  {
    id: "body_005",
    category: "body",
    title: "Контакт с водой",
    text: "Умой лицо прохладной водой и несколько минут наблюдай ощущения тела.",
    duration: 3,
    difficulty: "easy",
    tags: ["water"],
    relatedCards: ["Луна", "Звезда"],
  },

  {
    id: "body_006",
    category: "body",
    title: "Проверка осанки",
    text: "В течение дня трижды выпрями спину и расслабь плечи.",
    duration: 5,
    difficulty: "easy",
    tags: ["posture"],
    relatedCards: ["Император"],
  },

  {
    id: "body_007",
    category: "body",
    title: "Прогулка босиком",
    text: "Если безопасно, пройди несколько минут босиком по земле или траве.",
    duration: 5,
    difficulty: "easy",
    tags: ["grounding"],
    relatedCards: ["Мир"],
  },

  {
    id: "body_008",
    category: "body",
    title: "Медленные движения",
    text: "Выполни любые движения тела максимально медленно и внимательно.",
    duration: 10,
    difficulty: "medium",
    tags: ["awareness"],
    relatedCards: ["Повешенный"],
  },

  {
    id: "body_009",
    category: "body",
    title: "Сканирование тела",
    text: "Закрой глаза и мысленно пройди вниманием по всему телу сверху вниз.",
    duration: 7,
    difficulty: "easy",
    tags: ["body-scan"],
    relatedCards: ["Жрица"],
  },

  {
    id: "body_010",
    category: "body",
    title: "Солнечный свет",
    text: "Проведи 10 минут на дневном свету без телефона.",
    duration: 10,
    difficulty: "easy",
    tags: ["sun"],
    relatedCards: ["Солнце"],
  },
];

export const mindPractices: Practice[] = [
  {
    id: "mind_001",
    category: "mind",
    title: "Три главные мысли",
    text: "Запиши три мысли, которые чаще всего возвращаются сегодня.",
    duration: 5,
    difficulty: "easy",
    tags: ["journal"],
    relatedCards: ["Отшельник", "Жрица"],
  },

  {
    id: "mind_002",
    category: "mind",
    title: "Один вопрос",
    text: "Ответь письменно на вопрос: что сейчас действительно важно?",
    duration: 10,
    difficulty: "easy",
    tags: ["reflection"],
    relatedCards: ["Суд", "Мир"],
  },

  {
    id: "mind_003",
    category: "mind",
    title: "Ментальная уборка",
    text: "Выпиши всё, что занимает место в голове. Без структуры и анализа.",
    duration: 10,
    difficulty: "easy",
    tags: ["brain-dump"],
    relatedCards: ["Башня"],
  },

  {
    id: "mind_004",
    category: "mind",
    title: "Одна задача",
    text: "Выбери одну задачу и занимайся только ей 15 минут.",
    duration: 15,
    difficulty: "medium",
    tags: ["focus"],
    relatedCards: ["Император"],
  },

  {
    id: "mind_005",
    category: "mind",
    title: "Найди доказательства",
    text: "Если есть тревожная мысль, выпиши факты за и против неё.",
    duration: 10,
    difficulty: "medium",
    tags: ["cbt"],
    relatedCards: ["Справедливость"],
  },

  {
    id: "mind_006",
    category: "mind",
    title: "Три победы",
    text: "Запиши три вещи, которые уже получаются хорошо.",
    duration: 5,
    difficulty: "easy",
    tags: ["confidence"],
    relatedCards: ["Солнце"],
  },

  {
    id: "mind_007",
    category: "mind",
    title: "Остановка автопилота",
    text: "Заметь одну привычку, которую выполняешь автоматически.",
    duration: 5,
    difficulty: "easy",
    tags: ["awareness"],
    relatedCards: ["Шут"],
  },

  {
    id: "mind_008",
    category: "mind",
    title: "Что я контролирую",
    text: "Раздели лист на две колонки: контролирую / не контролирую.",
    duration: 10,
    difficulty: "easy",
    tags: ["clarity"],
    relatedCards: ["Колесо Фортуны"],
  },

  {
    id: "mind_009",
    category: "mind",
    title: "Переформулируй",
    text: "Замени одну негативную мысль на более реалистичную.",
    duration: 5,
    difficulty: "medium",
    tags: ["reframing"],
    relatedCards: ["Умеренность"],
  },

  {
    id: "mind_010",
    category: "mind",
    title: "Вопрос будущему себе",
    text: "Что бы посоветовал тебе ты через год?",
    duration: 10,
    difficulty: "easy",
    tags: ["future-self"],
    relatedCards: ["Звезда"],
  },
];

export const soulPractices: Practice[] = [
  {
    id: "soul_001",
    category: "soul",
    title: "Практика благодарности",
    text: "Назови 5 вещей, за которые благодарен сегодня.",
    duration: 5,
    difficulty: "easy",
    tags: ["gratitude"],
    relatedCards: ["Солнце"],
  },

  {
    id: "soul_002",
    category: "soul",
    title: "Тишина",
    text: "Посиди 5 минут в полной тишине без телефона.",
    duration: 5,
    difficulty: "easy",
    tags: ["silence"],
    relatedCards: ["Отшельник"],
  },

  {
    id: "soul_003",
    category: "soul",
    title: "Созерцание",
    text: "Наблюдай за небом, водой или деревом 5 минут.",
    duration: 5,
    difficulty: "easy",
    tags: ["presence"],
    relatedCards: ["Звезда"],
  },

  {
    id: "soul_004",
    category: "soul",
    title: "Письмо душе",
    text: "Напиши несколько строк о том, что сейчас чувствует твоё сердце.",
    duration: 10,
    difficulty: "easy",
    tags: ["journaling"],
    relatedCards: ["Влюблённые"],
  },

  {
    id: "soul_005",
    category: "soul",
    title: "Мантра",
    text: "Повторяй выбранную мантру или молитву 5 минут.",
    duration: 5,
    difficulty: "easy",
    tags: ["mantra"],
    relatedCards: ["Жрец"],
  },

  {
    id: "soul_006",
    category: "soul",
    title: "Прощение",
    text: "Вспомни ситуацию, которую пора отпустить.",
    duration: 10,
    difficulty: "medium",
    tags: ["forgiveness"],
    relatedCards: ["Суд"],
  },

  {
    id: "soul_007",
    category: "soul",
    title: "Доброе действие",
    text: "Сделай один небольшой добрый поступок без ожидания благодарности.",
    duration: 10,
    difficulty: "easy",
    tags: ["kindness"],
    relatedCards: ["Императрица"],
  },

  {
    id: "soul_008",
    category: "soul",
    title: "Свеча",
    text: "Зажги свечу и посиди рядом несколько минут.",
    duration: 5,
    difficulty: "easy",
    tags: ["ritual"],
    relatedCards: ["Звезда"],
  },

  {
    id: "soul_009",
    category: "soul",
    title: "Внутренний диалог",
    text: "Спроси себя: чего я сейчас действительно хочу?",
    duration: 10,
    difficulty: "easy",
    tags: ["self-contact"],
    relatedCards: ["Жрица"],
  },

  {
    id: "soul_010",
    category: "soul",
    title: "Момент красоты",
    text: "Найди сегодня что-то красивое и удели этому внимание.",
    duration: 5,
    difficulty: "easy",
    tags: ["beauty"],
    relatedCards: ["Мир"],
  },
];
