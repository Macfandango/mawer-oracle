import { supabase } from "@/lib/supabase";
import ShareCardButton from "./ShareCardButton";

const defaultTrack = {
  title: "MAWER Oracle — Track of the Day",
  audioUrl: "/audio/mawer-oracle.mp3",
};

export const dynamic = "force-dynamic";

type Card = {
  card: string;
  original: string;
  rarity: string;
  rarityColor: string;
  chance: string;
  weight: number;
  meaning: string;
  tracks: string[];
  artwork: string;
};

const cards: Card[] = [
  {
    card: "Шут",
    original: "The Fool",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Новый путь, риск, свобода и шаг в неизвестность. Сегодня день, когда можно начать иначе.",
    artwork: "/cards/fool.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Маг",
    original: "The Magician",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "У тебя уже есть ресурсы, чтобы повлиять на ситуацию. Сегодня важны действие, воля и фокус.",
    artwork: "/cards/magician.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Верховная Жрица",
    original: "The High Priestess",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Не всё видно сразу. Сегодня лучше слушать интуицию, а не чужой шум.",
    artwork: "/cards/High_Priestess.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Императрица",
    original: "The Empress",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "День красоты, тела, удовольствия и мягкой силы. Хорошо выбирать себя.",
    artwork: "/cards/Empress.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Император",
    original: "The Emperor",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "Сегодня нужна структура. Не хаос, а ясное решение и контроль над своим пространством.",
    artwork: "/cards/Emperor.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Иерофант",
    original: "The Hierophant",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "День смыслов, традиций и внутреннего учителя. Возможно, тебе нужен не ответ, а система.",
    artwork: "/cards/Hierophant.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Влюблённые",
    original: "The Lovers",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Сегодня день выбора сердцем. Может проявиться химия, желание или важная развилка.",
    artwork: "/cards/Lovers.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Колесница",
    original: "The Chariot",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "Двигайся. Даже если есть сопротивление, сегодня сила в направлении и скорости.",
    artwork: "/cards/Chariot.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Сила",
    original: "Strength",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Твоя сила сегодня не в давлении, а в спокойной уверенности. Мягкость может победить.",
    artwork: "/cards/Strength.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Отшельник",
    original: "The Hermit",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "День тишины, наблюдения и внутреннего света. Ответ лучше искать не снаружи.",
    artwork: "/cards/Hermit.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Колесо Фортуны",
    original: "Wheel of Fortune",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Сегодня может случиться поворот. Не всё под контролем, но момент может сыграть за тебя.",
    artwork: "/cards/Wheel_of_Fortune.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Справедливость",
    original: "Justice",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "Сегодня всё про честность, баланс и последствия. Выбирай то, за что готова отвечать.",
    artwork: "/cards/Justice.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Повешенный",
    original: "The Hanged Man",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.6%",
    weight: 2,
    meaning: "Пауза не значит проигрыш. Сегодня нужно посмотреть на ситуацию с другой стороны.",
    artwork: "/cards/Hanged_Man.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Смерть",
    original: "Death",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.6%",
    weight: 2,
    meaning: "Что-то завершается, чтобы освободить место новому. Не держись за старую версию дня.",
    artwork: "/cards/Death.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Умеренность",
    original: "Temperance",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "День восстановления и баланса. Не надо резко — сегодня работает мягкая настройка.",
    artwork: "/cards/Temperance.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Дьявол",
    original: "The Devil",
    rarity: "ЗАПРЕТНАЯ",
    rarityColor: "text-red-500",
    chance: "0.4%",
    weight: 0.5,
    meaning: "Что-то сегодня будет слишком притягательным. Вопрос — ты выбираешь это или оно выбирает тебя?",
    artwork: "/cards/Devil.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Башня",
    original: "The Tower",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.6%",
    weight: 2,
    meaning: "День резкой правды. То, что шаталось, может показать свою настоящую форму.",
    artwork: "/cards/Tower.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Звезда",
    original: "The Star",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Надежда возвращается. Сегодня важно поверить, что ты не зря идёшь дальше.",
    artwork: "/cards/Star.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Луна",
    original: "The Moon",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.6%",
    weight: 2,
    meaning: "День интуиции, снов, тревожных знаков и скрытых чувств. Не всё является тем, чем кажется.",
    artwork: "/cards/Moon.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Солнце",
    original: "The Sun",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Сегодня день ясности, света и живой энергии. Хорошо делать то, что возвращает радость.",
    artwork: "/cards/Sun.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Суд",
    original: "Judgement",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "Сегодня может прийти осознание. Старый сюжет просит финального решения.",
    artwork: "/cards/Judgement.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Мир",
    original: "The World",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Цикл закрывается красиво. Сегодня есть ощущение завершённости, силы и нового уровня.",
    artwork: "/cards/World.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Туз Кубков",
    original: "Ace of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Эмоции сегодня будут настоящими. День чувств, вдохновения и открытого сердца.",
    artwork: "/cards/Cups01.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Двойка Кубков",
    original: "Two of Cups",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Сегодня может возникнуть сильная связь или эмоциональное совпадение.",
    artwork: "/cards/Cups02.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Тройка Кубков",
    original: "Three of Cups",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "День общения, лёгкости и людей, рядом с которыми можно выдохнуть.",
    artwork: "/cards/Cups03.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Четвёрка Кубков",
    original: "Four of Cups",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня легко застрять в своих мыслях. Попробуй заметить, что жизнь всё ещё предлагает тебе.",
    artwork: "/cards/Cups04.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Пятёрка Кубков",
    original: "Five of Cups",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Что-то может задеть эмоционально. Но не всё потеряно — часть хорошего всё ещё рядом.",
    artwork: "/cards/Cups05.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Шестёрка Кубков",
    original: "Six of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня прошлое может напомнить о себе — через музыку, человека или чувство.",
    artwork: "/cards/Cups06.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Семёрка Кубков",
    original: "Seven of Cups",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня много иллюзий и вариантов. Не всё, что красиво выглядит, реально нужно тебе.",
    artwork: "/cards/Cups07.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Восьмёрка Кубков",
    original: "Eight of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Пришло время уходить от того, что больше не наполняет.",
    artwork: "/cards/Cups08.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Девятка Кубков",
    original: "Nine of Cups",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Карта удовольствия и исполнения желаний. Сегодня можно позволить себе радость.",
    artwork: "/cards/Cups09.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Десятка Кубков",
    original: "Ten of Cups",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Очень тёплая карта. День эмоциональной гармонии, любви и ощущения «дома».",
    artwork: "/cards/Cups10.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Паж Кубков",
    original: "Page of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Неожиданное сообщение, флирт или эмоциональный импульс могут изменить настроение дня.",
    artwork: "/cards/Cups11.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Рыцарь Кубков",
    original: "Knight of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня кто-то может красиво ворваться в твоё пространство — или ты станешь этим человеком.",
    artwork: "/cards/Cups12.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Королева Кубков",
    original: "Queen of Cups",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Очень сильная эмоциональная карта. Сегодня интуиция и чувства будут точнее логики.",
    artwork: "/cards/Cups13.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Король Кубков",
    original: "King of Cups",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Контроль над эмоциями сегодня даст силу. Не подавлять — а понимать себя.",
    artwork: "/cards/Cups14.png",
tracks: ["Mystic Ambient"],
 },
 {
    card: "Туз Жезлов",
    original: "Ace of Wands",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня день импульса, желания и новой искры. Хорошо начинать то, что давно просилось наружу.",
    artwork: "/cards/Wands01.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Двойка Жезлов",
    original: "Two of Wands",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Ты стоишь перед выбором направления. День планов, амбиций и взгляда шире привычного.",
    artwork: "/cards/Wands02.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Тройка Жезлов",
    original: "Three of Wands",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Твой шаг уже сделан. Сегодня важно не сомневаться, а ждать первых сигналов от мира.",
    artwork: "/cards/Wands03.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Четвёрка Жезлов",
    original: "Four of Wands",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "День праздника, дома, людей и маленькой победы. Можно разрешить себе радость.",
    artwork: "/cards/Wands04.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Пятёрка Жезлов",
    original: "Five of Wands",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня может быть шумно: споры, конкуренция, столкновение желаний. Не трать силу на хаос.",
    artwork: "/cards/Wands05.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Шестёрка Жезлов",
    original: "Six of Wands",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Карта признания. Сегодня тебя могут заметить, оценить или дать знак, что ты не зря стараешься.",
    artwork: "/cards/Wands06.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Семёрка Жезлов",
    original: "Seven of Wands",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня важно защищать своё место. Не всем понравится твоя позиция — и это нормально.",
    artwork: "/cards/Wands07.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Восьмёрка Жезлов",
    original: "Eight of Wands",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "События ускоряются. Возможны сообщения, быстрые решения и неожиданный поворот.",
    artwork: "/cards/Wands08.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Девятка Жезлов",
    original: "Nine of Wands",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Усталось, но не сломленность. Сегодня важны границы, выносливость и последний рывок.",
    artwork: "/cards/Wands09.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Десятка Жезлов",
    original: "Ten of Wands",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Слишком много на себе. Сегодня стоит снять хотя бы одну лишнюю ношу.",
    artwork: "/cards/Wands10.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Паж Жезлов",
    original: "Page of Wands",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "День любопытства, флирта с жизнью и новой идеи. Можно пробовать без идеального плана.",
    artwork: "/cards/Wands11.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Рыцарь Жезлов",
    original: "Knight of Wands",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Импульс, страсть, скорость. Сегодня легко загореться — главное не сжечь всё вокруг.",
    artwork: "/cards/Wands12.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Королева Жезлов",
    original: "Queen of Wands",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Очень сильная карта харизмы. Сегодня твоя энергия может притягивать людей без объяснений.",
    artwork: "/cards/Wands13.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Король Жезлов",
    original: "King of Wands",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "День лидерства, огня и уверенного решения. Сегодня важно действовать как человек, который уже выбрал себя.",
    artwork: "/cards/Wands14.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Туз Мечей",
    original: "Ace of Swords",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня всё про ясность. Важная мысль, решение или разговор могут многое изменить.",
    artwork: "/cards/Swords01.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Двойка Мечей",
    original: "Two of Swords",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Ты не хочешь выбирать — но решение всё равно приближается.",
    artwork: "/cards/Swords02.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Тройка Мечей",
    original: "Three of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Что-то может задеть очень глубоко. Но честная боль лучше красивой иллюзии.",
    artwork: "/cards/Swords03.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Четвёрка Мечей",
    original: "Four of Swords",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня нужен отдых. Не всё решается через усилие.",
    artwork: "/cards/Swords04.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Пятёрка Мечей",
    original: "Five of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Не каждый выигранный спор стоит твоей энергии.",
    artwork: "/cards/Swords05.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Шестёрка Мечей",
    original: "Six of Swords",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Ты постепенно выходишь из тяжёлого состояния. Пусть даже не сразу.",
    artwork: "/cards/Swords06.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Семёрка Мечей",
    original: "Seven of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня не всё будет сказано прямо. Кто-то может играть не совсем честно.",
    artwork: "/cards/Swords07.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Восьмёрка Мечей",
    original: "Eight of Swords",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Ограничения сегодня могут быть больше в голове, чем в реальности.",
    artwork: "/cards/Swords08.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Девятка Мечей",
    original: "Nine of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Тревога может искажать реальность. Сегодня важно не верить каждой страшной мысли.",
    artwork: "/cards/Swords09.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Десятка Мечей",
    original: "Ten of Swords",
    rarity: "ЗАПРЕТНАЯ",
    rarityColor: "text-red-500",
    chance: "0.4%",
    weight: 0.5,
    meaning: "Что-то завершилось окончательно. Но дальше — только новое утро.",
    artwork: "/cards/Swords10.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Паж Мечей",
    original: "Page of Swords",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня будет много информации, наблюдений и странных сигналов.",
    artwork: "/cards/Swords11.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Рыцарь Мечей",
    original: "Knight of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня всё ускоряется. Слова и решения могут быть резче обычного.",
    artwork: "/cards/Swords12.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Королева Мечей",
    original: "Queen of Swords",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Очень сильная карта ясности и границ. Сегодня важно сохранять честность прежде всего с собой.",
    artwork: "/cards/Swords13.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Король Мечей",
    original: "King of Swords",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Холодный ум сегодня сильнее эмоций. Решение нужно принимать головой.",
    artwork: "/cards/Swords14.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Туз Пентаклей",
    original: "Ace of Pentacles",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня может появиться шанс, связанный с деньгами, телом или новой стабильностью.",
    artwork: "/cards/Pents01.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Двойка Пентаклей",
    original: "Two of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня придётся балансировать между несколькими вещами одновременно.",
    artwork: "/cards/Pents02.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Тройка Пентаклей",
    original: "Three of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня особенно важны сотрудничество, навыки и люди рядом.",
    artwork: "/cards/Pents03.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Четвёрка Пентаклей",
    original: "Four of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Ты слишком сильно держишься за контроль. Сегодня можно немного расслабить хватку.",
    artwork: "/cards/Pents04.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Пятёрка Пентаклей",
    original: "Five of Pentacles",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня может ощущаться нехватка — денег, энергии или поддержки. Но помощь ближе, чем кажется.",
    artwork: "/cards/Pents05.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Шестёрка Пентаклей",
    original: "Six of Pentacles",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня всё про обмен. Что ты отдаёшь — и что позволяешь себе принимать.",
    artwork: "/cards/Pents06.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Семёрка Пентаклей",
    original: "Seven of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Результат ещё не созрел. Сегодня важно терпение.",
    artwork: "/cards/Pents07.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Восьмёрка Пентаклей",
    original: "Eight of Pentacles",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "День концентрации и мастерства. Хорошо углубляться в работу или навык.",
    artwork: "/cards/Pents08.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Девятка Пентаклей",
    original: "Nine of Pentacles",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Карта удовольствия, красоты и независимости. Сегодня можно почувствовать себя очень «в своей жизни».",
    artwork: "/cards/Pents09.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Десятка Пентаклей",
    original: "Ten of Pentacles",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Очень сильная карта стабильности, семьи и долгосрочной опоры.",
    artwork: "/cards/Pents10.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Паж Пентаклей",
    original: "Page of Pentacles",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня может появиться идея, которая позже превратится во что-то большое.",
    artwork: "/cards/Pents11.png",
tracks: ["Mystic Ambient"],
    },
  {
    card: "Рыцарь Пентаклей",
    original: "Knight of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Медленно — не значит плохо. Сегодня сила в стабильности и последовательности.",
    artwork: "/cards/Pents12.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Королева Пентаклей",
    original: "Queen of Pentacles",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Сегодня особенно важны забота о себе, красота пространства и чувство внутренней ценности.",
    artwork: "/cards/Pents13.png",
tracks: ["Mystic Ambient"],
  },
  {
    card: "Король Пентаклей",
    original: "King of Pentacles",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "День взрослой силы, денег и устойчивости. Сегодня хорошо думать о большом и долгом.",
    artwork: "/cards/Pents14.png",
tracks: ["Mystic Ambient"],
  },
];

function shuffleDeck(deck: Card[]) {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
}

function drawOneCard() {
  const shuffledDeck = shuffleDeck(cards);
  return shuffledDeck[0];
}

function pickRandomTrack(tracks: string[]) {
  return tracks[Math.floor(Math.random() * tracks.length)];
}

export default async function Reading({
  searchParams,
}: {
  searchParams: Promise<{ readingId?: string; shuffle?: string }>;
}) {
  const params = await searchParams;
  const readingId = params.readingId || "";

  const selectedCard = drawOneCard();
  const selectedTrack = pickRandomTrack(selectedCard.tracks);

  if (readingId) {
    await supabase
      .from("intentions")
      .update({
  card_name: selectedCard.card,
  card_original: selectedCard.original,
  card_meaning: selectedCard.meaning,
  card_rarity: selectedCard.rarity,
  card_artwork: selectedCard.artwork,
  track_title: defaultTrack.title,
})
      .eq("reading_id", readingId);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
      <div className="max-w-md w-full rounded-[32px] overflow-hidden bg-zinc-950 border border-zinc-800">
        <div className="bg-black flex items-center justify-center">
          <img
            src={selectedCard.artwork}
            alt={selectedCard.card}
            className="w-full max-h-[520px] object-contain"
          />
        </div>

        <div className="p-6 space-y-5">
          <div className="flex justify-between">
            <p className={`${selectedCard.rarityColor} text-xs tracking-[0.3em] font-bold`}>
              {selectedCard.rarity}
            </p>

            <p className="text-zinc-500 text-xs">КАРТА ДНЯ</p>
          </div>

          <h2 className="text-4xl font-bold">{selectedCard.card}</h2>

          <p className="text-zinc-500 text-sm">{selectedCard.original}</p>

          <p className="text-zinc-300 leading-relaxed">
            {selectedCard.meaning}
          </p>

          <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
            <p className="text-xs text-zinc-500 mb-1">РЕДКОСТЬ</p>

            <p className={`text-lg font-bold ${selectedCard.rarityColor}`}>
              {selectedCard.rarity}
            </p>

            <p className="text-zinc-400 text-sm mt-2">
              Только {selectedCard.chance} пользователей получили эту карту сегодня.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-4 space-y-3">
  <div>
    <p className="text-zinc-500 text-xs mb-1">ТРЕК ДНЯ</p>
    <p className="text-lg">{defaultTrack.title}</p>
  </div>

  <audio controls className="w-full">
    <source src={defaultTrack.audioUrl} type="audio/mpeg" />
  </audio>
</div>

<ShareCardButton readingId={readingId} />

          <a
            href="/intention"
            className="block w-full bg-white text-black py-4 rounded-2xl font-bold text-center"
          >
            Проверить ещё 1 намерение
          </a>
        </div>
      </div>
    </main>
  );
}

  