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
    tracks: ["Florence + The Machine — Dog Days Are Over", "M83 — Midnight City", "Empire of the Sun — Walking on a Dream"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_00_Fool.jpg",
  },
  {
    card: "Маг",
    original: "The Magician",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "У тебя уже есть ресурсы, чтобы повлиять на ситуацию. Сегодня важны действие, воля и фокус.",
    tracks: ["The Weeknd — Blinding Lights", "Kavinsky — Nightcall", "Tame Impala — Let It Happen"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_01_Magician.jpg",
  },
  {
    card: "Верховная Жрица",
    original: "The High Priestess",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Не всё видно сразу. Сегодня лучше слушать интуицию, а не чужой шум.",
    tracks: ["Massive Attack — Teardrop", "Lana Del Rey — West Coast", "FKA twigs — Cellophane"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_02_High_Priestess.jpg",
  },
  {
    card: "Императрица",
    original: "The Empress",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "День красоты, тела, удовольствия и мягкой силы. Хорошо выбирать себя.",
    tracks: ["Sade — Smooth Operator", "Beyoncé — CUFF IT", "Lana Del Rey — Radio"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_03_Empress.jpg",
  },
  {
    card: "Император",
    original: "The Emperor",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "Сегодня нужна структура. Не хаос, а ясное решение и контроль над своим пространством.",
    tracks: ["Kanye West — POWER", "Woodkid — Run Boy Run", "The White Stripes — Seven Nation Army"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_04_Emperor.jpg",
  },
  {
    card: "Иерофант",
    original: "The Hierophant",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "День смыслов, традиций и внутреннего учителя. Возможно, тебе нужен не ответ, а система.",
    tracks: ["Hozier — Take Me To Church", "Leonard Cohen — You Want It Darker", "Bon Iver — Holocene"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_05_Hierophant.jpg",
  },
  {
    card: "Влюблённые",
    original: "The Lovers",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Сегодня день выбора сердцем. Может проявиться химия, желание или важная развилка.",
    tracks: ["Arctic Monkeys — I Wanna Be Yours", "Cigarettes After Sex — Apocalypse", "The xx — Angels"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_06_Lovers.jpg",
  },
  {
    card: "Колесница",
    original: "The Chariot",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "Двигайся. Даже если есть сопротивление, сегодня сила в направлении и скорости.",
    tracks: ["Måneskin — Beggin'", "Imagine Dragons — Believer", "The Prodigy — Breathe"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_07_Chariot.jpg",
  },
  {
    card: "Сила",
    original: "Strength",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Твоя сила сегодня не в давлении, а в спокойной уверенности. Мягкость может победить.",
    tracks: ["Sia — Unstoppable", "AURORA — Runaway", "Rihanna — Diamonds"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_08_Strength.jpg",
  },
  {
    card: "Отшельник",
    original: "The Hermit",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "День тишины, наблюдения и внутреннего света. Ответ лучше искать не снаружи.",
    tracks: ["Radiohead — No Surprises", "Bon Iver — Re: Stacks", "Novo Amor — Anchor"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_09_Hermit.jpg",
  },
  {
    card: "Колесо Фортуны",
    original: "Wheel of Fortune",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Сегодня может случиться поворот. Не всё под контролем, но момент может сыграть за тебя.",
    tracks: ["ABBA — Gimme! Gimme! Gimme!", "Daft Punk — Instant Crush", "Coldplay — Adventure of a Lifetime"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  },
  {
    card: "Справедливость",
    original: "Justice",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "Сегодня всё про честность, баланс и последствия. Выбирай то, за что готова отвечать.",
    tracks: ["Lorde — Royals", "Billie Eilish — Therefore I Am", "Depeche Mode — Policy of Truth"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_11_Justice.jpg",
  },
  {
    card: "Повешенный",
    original: "The Hanged Man",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.6%",
    weight: 2,
    meaning: "Пауза не значит проигрыш. Сегодня нужно посмотреть на ситуацию с другой стороны.",
    tracks: ["The Neighbourhood — Sweater Weather", "Radiohead — Exit Music", "James Blake — Retrograde"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_12_Hanged_Man.jpg",
  },
  {
    card: "Смерть",
    original: "Death",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.6%",
    weight: 2,
    meaning: "Что-то завершается, чтобы освободить место новому. Не держись за старую версию дня.",
    tracks: ["Lana Del Rey — Born To Die", "The Doors — The End", "Mitski — Washing Machine Heart"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_13_Death.jpg",
  },
  {
    card: "Умеренность",
    original: "Temperance",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "День восстановления и баланса. Не надо резко — сегодня работает мягкая настройка.",
    tracks: ["Sade — By Your Side", "Air — Playground Love", "Khruangbin — Friday Morning"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_14_Temperance.jpg",
  },
  {
    card: "Дьявол",
    original: "The Devil",
    rarity: "ЗАПРЕТНАЯ",
    rarityColor: "text-red-500",
    chance: "0.4%",
    weight: 0.5,
    meaning: "Что-то сегодня будет слишком притягательным. Вопрос — ты выбираешь это или оно выбирает тебя?",
    tracks: ["Massive Attack — Angel", "Deftones — Change", "The Weeknd — The Hills"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_15_Devil.jpg",
  },
  {
    card: "Башня",
    original: "The Tower",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.6%",
    weight: 2,
    meaning: "День резкой правды. То, что шаталось, может показать свою настоящую форму.",
    tracks: ["Muse — Uprising", "Nine Inch Nails — Hurt", "Linkin Park — Numb"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_16_Tower.jpg",
  },
  {
    card: "Звезда",
    original: "The Star",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Надежда возвращается. Сегодня важно поверить, что ты не зря идёшь дальше.",
    tracks: ["Coldplay — A Sky Full of Stars", "Cigarettes After Sex — Heavenly", "Lana Del Rey — Young and Beautiful"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_17_Star.jpg",
  },
  {
    card: "Луна",
    original: "The Moon",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.6%",
    weight: 2,
    meaning: "День интуиции, снов, тревожных знаков и скрытых чувств. Не всё является тем, чем кажется.",
    tracks: ["Lana Del Rey — West Coast", "Beach House — Space Song", "Massive Attack — Teardrop"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_18_Moon.jpg",
  },
  {
    card: "Солнце",
    original: "The Sun",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "4%",
    weight: 5,
    meaning: "Сегодня день ясности, света и живой энергии. Хорошо делать то, что возвращает радость.",
    tracks: ["Harry Styles — Golden", "Pharrell Williams — Happy", "Empire of the Sun — Alive"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_19_Sun.jpg",
  },
  {
    card: "Суд",
    original: "Judgement",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "8%",
    weight: 10,
    meaning: "Сегодня может прийти осознание. Старый сюжет просит финального решения.",
    tracks: ["Adele — Skyfall", "Woodkid — Iron", "Florence + The Machine — Shake It Out"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_20_Judgement.jpg",
  },
  {
    card: "Мир",
    original: "The World",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Цикл закрывается красиво. Сегодня есть ощущение завершённости, силы и нового уровня.",
    tracks: ["Daft Punk — One More Time", "Björk — All Is Full of Love", "Queen — Don't Stop Me Now"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/RWS_Tarot_21_World.jpg",
  },
];

function pickWeightedCard() {
  const totalWeight = cards.reduce((sum, card) => sum + card.weight, 0);
  let random = Math.random() * totalWeight;

  for (const card of cards) {
    random -= card.weight;
    if (random <= 0) return card;
  }

  return cards[0];
}

function pickRandomTrack(tracks: string[]) {
  return tracks[Math.floor(Math.random() * tracks.length)];
}

export default function ReadingResult() {
  const selectedCard = pickWeightedCard();
  const selectedTrack = pickRandomTrack(selectedCard.tracks);

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
            <p
              className={`${selectedCard.rarityColor} text-xs tracking-[0.3em] font-bold`}
            >
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

          <div className="bg-zinc-900 rounded-2xl p-4">
            <p className="text-zinc-500 text-xs mb-1">ТРЕК ДНЯ</p>
            <p className="text-lg">{selectedTrack}</p>
          </div>

          <a
            href="/"
            className="block w-full bg-white text-black py-4 rounded-2xl font-bold text-center"
          >
            Получить новую карту
          </a>
        </div>
      </div>
    </main>
  );
}