"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

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
{
    card: "Туз Кубков",
    original: "Ace of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Эмоции сегодня будут настоящими. День чувств, вдохновения и открытого сердца.",
    tracks: ["Lana Del Rey — Video Games", "Frank Ocean — Pink + White", "Sade — No Ordinary Love"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups01.jpg",
  },
  {
    card: "Двойка Кубков",
    original: "Two of Cups",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Сегодня может возникнуть сильная связь или эмоциональное совпадение.",
    tracks: ["The xx — Intro", "Cigarettes After Sex — Nothing's Gonna Hurt You Baby", "Rhye — Open"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups02.jpg",
  },
  {
    card: "Тройка Кубков",
    original: "Three of Cups",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "День общения, лёгкости и людей, рядом с которыми можно выдохнуть.",
    tracks: ["Dua Lipa — Levitating", "Charli XCX — Boom Clap", "Calvin Harris — Feel So Close"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups03.jpg",
  },
  {
    card: "Четвёрка Кубков",
    original: "Four of Cups",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня легко застрять в своих мыслях. Попробуй заметить, что жизнь всё ещё предлагает тебе.",
    tracks: ["Billie Eilish — everything i wanted", "Joji — Slow Dancing in the Dark", "James Blake — Limit To Your Love"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups04.jpg",
  },
  {
    card: "Пятёрка Кубков",
    original: "Five of Cups",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Что-то может задеть эмоционально. Но не всё потеряно — часть хорошего всё ещё рядом.",
    tracks: ["Radiohead — Creep", "Phoebe Bridgers — Funeral", "Lana Del Rey — Black Beauty"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups05.jpg",
  },
  {
    card: "Шестёрка Кубков",
    original: "Six of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня прошлое может напомнить о себе — через музыку, человека или чувство.",
    tracks: ["The Neighbourhood — Daddy Issues", "Coldplay — Yellow", "Taylor Swift — cardigan"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups06.jpg",
  },
  {
    card: "Семёрка Кубков",
    original: "Seven of Cups",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня много иллюзий и вариантов. Не всё, что красиво выглядит, реально нужно тебе.",
    tracks: ["Tame Impala — The Less I Know The Better", "Melanie Martinez — Soap", "Grimes — Oblivion"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups07.jpg",
  },
  {
    card: "Восьмёрка Кубков",
    original: "Eight of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Пришло время уходить от того, что больше не наполняет.",
    tracks: ["Bon Iver — Holocene", "Lord Huron — The Night We Met", "Daughter — Youth"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups08.jpg",
  },
  {
    card: "Девятка Кубков",
    original: "Nine of Cups",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Карта удовольствия и исполнения желаний. Сегодня можно позволить себе радость.",
    tracks: ["Harry Styles — Watermelon Sugar", "Doja Cat — Kiss Me More", "Jamiroquai — Virtual Insanity"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups09.jpg",
  },
  {
    card: "Десятка Кубков",
    original: "Ten of Cups",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Очень тёплая карта. День эмоциональной гармонии, любви и ощущения «дома».",
    tracks: ["Fleetwood Mac — Everywhere", "The Beatles — Here Comes The Sun", "Rex Orange County — Sunflower"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups10.jpg",
  },
  {
    card: "Паж Кубков",
    original: "Page of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Неожиданное сообщение, флирт или эмоциональный импульс могут изменить настроение дня.",
    tracks: ["Clairo — Sofia", "Beabadoobee — Glue Song", "Men I Trust — Show Me How"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups11.jpg",
  },
  {
    card: "Рыцарь Кубков",
    original: "Knight of Cups",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня кто-то может красиво ворваться в твоё пространство — или ты станешь этим человеком.",
    tracks: ["The Weeknd — Earned It", "Arctic Monkeys — 505", "Chase Atlantic — Swim"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups12.jpg",
  },
  {
    card: "Королева Кубков",
    original: "Queen of Cups",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Очень сильная эмоциональная карта. Сегодня интуиция и чувства будут точнее логики.",
    tracks: ["Lana Del Rey — Mariners Apartment Complex", "Sade — Kiss of Life", "Adele — Love In The Dark"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups13.jpg",
  },
  {
    card: "Король Кубков",
    original: "King of Cups",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Контроль над эмоциями сегодня даст силу. Не подавлять — а понимать себя.",
    tracks: ["Frank Ocean — Nights", "The Weeknd — After Hours", "Chet Faker — Gold"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Cups14.jpg",
  },
 {
    card: "Туз Жезлов",
    original: "Ace of Wands",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня день импульса, желания и новой искры. Хорошо начинать то, что давно просилось наружу.",
    tracks: ["Måneskin — I Wanna Be Your Slave", "Muse — Supermassive Black Hole", "Tame Impala — Let It Happen"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands01.jpg",
  },
  {
    card: "Двойка Жезлов",
    original: "Two of Wands",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Ты стоишь перед выбором направления. День планов, амбиций и взгляда шире привычного.",
    tracks: ["M83 — Midnight City", "Coldplay — Adventure of a Lifetime", "Empire of the Sun — Walking on a Dream"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands02.jpg",
  },
  {
    card: "Тройка Жезлов",
    original: "Three of Wands",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Твой шаг уже сделан. Сегодня важно не сомневаться, а ждать первых сигналов от мира.",
    tracks: ["Florence + The Machine — Shake It Out", "OneRepublic — Counting Stars", "Phoenix — Lisztomania"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands03.jpg",
  },
  {
    card: "Четвёрка Жезлов",
    original: "Four of Wands",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "День праздника, дома, людей и маленькой победы. Можно разрешить себе радость.",
    tracks: ["Daft Punk — One More Time", "Dua Lipa — Levitating", "Harry Styles — Golden"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands04.jpg",
  },
  {
    card: "Пятёрка Жезлов",
    original: "Five of Wands",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня может быть шумно: споры, конкуренция, столкновение желаний. Не трать силу на хаос.",
    tracks: ["The Prodigy — Firestarter", "Linkin Park — Faint", "Imagine Dragons — Believer"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands05.jpg",
  },
  {
    card: "Шестёрка Жезлов",
    original: "Six of Wands",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Карта признания. Сегодня тебя могут заметить, оценить или дать знак, что ты не зря стараешься.",
    tracks: ["Queen — Don't Stop Me Now", "Kanye West — POWER", "Survivor — Eye of the Tiger"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands06.jpg",
  },
  {
    card: "Семёрка Жезлов",
    original: "Seven of Wands",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня важно защищать своё место. Не всем понравится твоя позиция — и это нормально.",
    tracks: ["Bishop Briggs — River", "Muse — Uprising", "Royal Blood — Figure It Out"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands07.jpg",
  },
  {
    card: "Восьмёрка Жезлов",
    original: "Eight of Wands",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "События ускоряются. Возможны сообщения, быстрые решения и неожиданный поворот.",
    tracks: ["The Weeknd — Blinding Lights", "Calvin Harris — Feel So Close", "Avicii — The Nights"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands08.jpg",
  },
  {
    card: "Девятка Жезлов",
    original: "Nine of Wands",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Усталось, но не сломленность. Сегодня важны границы, выносливость и последний рывок.",
    tracks: ["Sia — Elastic Heart", "Florence + The Machine — Dog Days Are Over", "Woodkid — Run Boy Run"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands09.jpg",
  },
  {
    card: "Десятка Жезлов",
    original: "Ten of Wands",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Слишком много на себе. Сегодня стоит снять хотя бы одну лишнюю ношу.",
    tracks: ["Radiohead — Karma Police", "Billie Eilish — bury a friend", "Twenty One Pilots — Stressed Out"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands10.jpg",
  },
  {
    card: "Паж Жезлов",
    original: "Page of Wands",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "День любопытства, флирта с жизнью и новой идеи. Можно пробовать без идеального плана.",
    tracks: ["Billie Eilish — bad guy", "Doja Cat — Woman", "Charli XCX — 360"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands11.jpg",
  },
  {
    card: "Рыцарь Жезлов",
    original: "Knight of Wands",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Импульс, страсть, скорость. Сегодня легко загореться — главное не сжечь всё вокруг.",
    tracks: ["Arctic Monkeys — Do I Wanna Know?", "The Weeknd — The Hills", "Chase Atlantic — Swim"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands12.jpg",
  },
  {
    card: "Королева Жезлов",
    original: "Queen of Wands",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Очень сильная карта харизмы. Сегодня твоя энергия может притягивать людей без объяснений.",
    tracks: ["Beyoncé — ALIEN SUPERSTAR", "Rihanna — Needed Me", "Lady Gaga — Bad Romance"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands13.jpg",
  },
  {
    card: "Король Жезлов",
    original: "King of Wands",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "День лидерства, огня и уверенного решения. Сегодня важно действовать как человек, который уже выбрал себя.",
    tracks: ["The Rolling Stones — Paint It Black", "Woodkid — Iron", "Kanye West — Black Skinhead"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Wands14.jpg",
  },
  {
    card: "Туз Мечей",
    original: "Ace of Swords",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня всё про ясность. Важная мысль, решение или разговор могут многое изменить.",
    tracks: ["Depeche Mode — Policy of Truth", "Billie Eilish — Therefore I Am", "Woodkid — Iron"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords01.jpg",
  },
  {
    card: "Двойка Мечей",
    original: "Two of Swords",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Ты не хочешь выбирать — но решение всё равно приближается.",
    tracks: ["The xx — Angels", "London Grammar — Wasting My Young Years", "James Blake — Retrograde"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords02.jpg",
  },
  {
    card: "Тройка Мечей",
    original: "Three of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Что-то может задеть очень глубоко. Но честная боль лучше красивой иллюзии.",
    tracks: ["Adele — Someone Like You", "Lana Del Rey — Black Beauty", "Radiohead — Exit Music"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords03.jpg",
  },
  {
    card: "Четвёрка Мечей",
    original: "Four of Swords",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня нужен отдых. Не всё решается через усилие.",
    tracks: ["Bon Iver — Holocene", "Novo Amor — Anchor", "Cigarettes After Sex — K."],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords04.jpg",
  },
  {
    card: "Пятёрка Мечей",
    original: "Five of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Не каждый выигранный спор стоит твоей энергии.",
    tracks: ["Linkin Park — Numb", "Nine Inch Nails — Hurt", "Muse — Psycho"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords05.jpg",
  },
  {
    card: "Шестёрка Мечей",
    original: "Six of Swords",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Ты постепенно выходишь из тяжёлого состояния. Пусть даже не сразу.",
    tracks: ["Daughter — Youth", "Coldplay — Fix You", "The Cinematic Orchestra — To Build A Home"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords06.jpg",
  },
  {
    card: "Семёрка Мечей",
    original: "Seven of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня не всё будет сказано прямо. Кто-то может играть не совсем честно.",
    tracks: ["Arctic Monkeys — Why'd You Only Call Me When You're High?", "The Weeknd — Often", "BANKS — Beggin For Thread"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords07.jpg",
  },
  {
    card: "Восьмёрка Мечей",
    original: "Eight of Swords",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Ограничения сегодня могут быть больше в голове, чем в реальности.",
    tracks: ["Billie Eilish — everything i wanted", "Radiohead — No Surprises", "Joji — Glimpse of Us"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords08.jpg",
  },
  {
    card: "Девятка Мечей",
    original: "Nine of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Тревога может искажать реальность. Сегодня важно не верить каждой страшной мысли.",
    tracks: ["Phoebe Bridgers — Funeral", "Lorde — Liability", "The Neighbourhood — Sweater Weather"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords09.jpg",
  },
  {
    card: "Десятка Мечей",
    original: "Ten of Swords",
    rarity: "ЗАПРЕТНАЯ",
    rarityColor: "text-red-500",
    chance: "0.4%",
    weight: 0.5,
    meaning: "Что-то завершилось окончательно. Но дальше — только новое утро.",
    tracks: ["The Doors — The End", "Lana Del Rey — Born To Die", "Mitski — Nobody"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords10.jpg",
  },
  {
    card: "Паж Мечей",
    original: "Page of Swords",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня будет много информации, наблюдений и странных сигналов.",
    tracks: ["Doja Cat — Agora Hills", "Olivia Rodrigo — vampire", "Billie Eilish — NDA"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords11.jpg",
  },
  {
    card: "Рыцарь Мечей",
    original: "Knight of Swords",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня всё ускоряется. Слова и решения могут быть резче обычного.",
    tracks: ["The Prodigy — Breathe", "Muse — Hysteria", "Kanye West — Black Skinhead"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords12.jpg",
  },
  {
    card: "Королева Мечей",
    original: "Queen of Swords",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Очень сильная карта ясности и границ. Сегодня важно сохранять честность прежде всего с собой.",
    tracks: ["Lorde — Royals", "Sia — Chandelier", "Rihanna — Needed Me"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords13.jpg",
  },
  {
    card: "Король Мечей",
    original: "King of Swords",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Холодный ум сегодня сильнее эмоций. Решение нужно принимать головой.",
    tracks: ["Depeche Mode — Enjoy The Silence", "Daft Punk — Derezzed", "Hans Zimmer — Time"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Swords14.jpg",
  },
  {
    card: "Туз Пентаклей",
    original: "Ace of Pentacles",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня может появиться шанс, связанный с деньгами, телом или новой стабильностью.",
    tracks: ["Drake — Passionfruit", "FKJ — Ylang Ylang", "Sade — Kiss of Life"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents01.jpg",
  },
  {
    card: "Двойка Пентаклей",
    original: "Two of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня придётся балансировать между несколькими вещами одновременно.",
    tracks: ["Dua Lipa — Houdini", "Tame Impala — Borderline", "Jamiroquai — Little L"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents02.jpg",
  },
  {
    card: "Тройка Пентаклей",
    original: "Three of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Сегодня особенно важны сотрудничество, навыки и люди рядом.",
    tracks: ["Coldplay — Viva La Vida", "Daft Punk — Harder Better Faster Stronger", "Phoenix — 1901"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents03.jpg",
  },
  {
    card: "Четвёрка Пентаклей",
    original: "Four of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Ты слишком сильно держишься за контроль. Сегодня можно немного расслабить хватку.",
    tracks: ["The Weeknd — Starboy", "Arctic Monkeys — R U Mine?", "Billie Eilish — you should see me in a crown"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents04.jpg",
  },
  {
    card: "Пятёрка Пентаклей",
    original: "Five of Pentacles",
    rarity: "ЭПИЧЕСКАЯ",
    rarityColor: "text-fuchsia-400",
    chance: "1.5%",
    weight: 2,
    meaning: "Сегодня может ощущаться нехватка — денег, энергии или поддержки. Но помощь ближе, чем кажется.",
    tracks: ["Radiohead — Street Spirit", "Phoebe Bridgers — Scott Street", "Daughter — Medicine"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents05.jpg",
  },
  {
    card: "Шестёрка Пентаклей",
    original: "Six of Pentacles",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня всё про обмен. Что ты отдаёшь — и что позволяешь себе принимать.",
    tracks: ["Sade — By Your Side", "Bonobo — Kerala", "Tom Misch — Movie"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents06.jpg",
  },
  {
    card: "Семёрка Пентаклей",
    original: "Seven of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Результат ещё не созрел. Сегодня важно терпение.",
    tracks: ["Novo Amor — State Lines", "Lorde — Supercut", "Frank Ocean — Ivy"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents07.jpg",
  },
  {
    card: "Восьмёрка Пентаклей",
    original: "Eight of Pentacles",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "День концентрации и мастерства. Хорошо углубляться в работу или навык.",
    tracks: ["Kanye West — Stronger", "Tyler, The Creator — DOGTOOTH", "The Blaze — Territory"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents08.jpg",
  },
  {
    card: "Девятка Пентаклей",
    original: "Nine of Pentacles",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Карта удовольствия, красоты и независимости. Сегодня можно почувствовать себя очень «в своей жизни».",
    tracks: ["Lana Del Rey — Brooklyn Baby", "Sade — Smooth Operator", "Harry Styles — Golden"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents09.jpg",
  },
  {
    card: "Десятка Пентаклей",
    original: "Ten of Pentacles",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "0.8%",
    weight: 1,
    meaning: "Очень сильная карта стабильности, семьи и долгосрочной опоры.",
    tracks: ["Fleetwood Mac — Dreams", "The Beatles — Let It Be", "Coldplay — Yellow"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents10.jpg",
  },
  {
    card: "Паж Пентаклей",
    original: "Page of Pentacles",
    rarity: "РЕДКАЯ",
    rarityColor: "text-cyan-400",
    chance: "3%",
    weight: 4,
    meaning: "Сегодня может появиться идея, которая позже превратится во что-то большое.",
    tracks: ["Clairo — Bags", "Rex Orange County — Pluto Projector", "Mac Miller — Good News"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents11.jpg",
  },
  {
    card: "Рыцарь Пентаклей",
    original: "Knight of Pentacles",
    rarity: "ОБЫЧНАЯ",
    rarityColor: "text-zinc-300",
    chance: "7%",
    weight: 8,
    meaning: "Медленно — не значит плохо. Сегодня сила в стабильности и последовательности.",
    tracks: ["Khruangbin — Friday Morning", "Chet Faker — Gold", "Tame Impala — Eventually"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents12.jpg",
  },
  {
    card: "Королева Пентаклей",
    original: "Queen of Pentacles",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "Сегодня особенно важны забота о себе, красота пространства и чувство внутренней ценности.",
    tracks: ["Beyoncé — Virgo’s Groove", "Sade — Cherish The Day", "Lana Del Rey — Cinnamon Girl"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents13.jpg",
  },
  {
    card: "Король Пентаклей",
    original: "King of Pentacles",
    rarity: "ЛЕГЕНДАРНАЯ",
    rarityColor: "text-pink-400",
    chance: "1%",
    weight: 1,
    meaning: "День взрослой силы, денег и устойчивости. Сегодня хорошо думать о большом и долгом.",
    tracks: ["Jay-Z — Empire State of Mind", "The Weeknd — Reminder", "Frank Ocean — Nights"],
    artwork: "https://commons.wikimedia.org/wiki/Special:FilePath/Pents14.jpg",
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

export default function Reading() {
  const searchParams = useSearchParams();
  const readingId = searchParams.get("readingId");

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  useEffect(() => {
    const card = drawOneCard();
    const track = pickRandomTrack(card.tracks);

    setSelectedCard(card);
    setSelectedTrack(track);
  }, []);

  useEffect(() => {
    if (!readingId || !selectedCard) return;

    const updateCard = async () => {
      const { data, error } = await supabase
        .from("intentions")
        .update({
          card_name: selectedCard.card,
        })
        .eq("reading_id", readingId)
        .select();

      console.log("CARD UPDATE DATA:", data);
      console.log("CARD UPDATE ERROR:", error);
    };

    updateCard();
  }, [readingId, selectedCard]);

  if (!selectedCard) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-5">
        <p className="text-zinc-500">Открываю карту...</p>
      </main>
    );
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