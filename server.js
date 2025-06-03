const express = require('express');

// Масив усіх чемпіонів League of Legends
const champions = [
  "Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios",
  "Ashe", "Aurelion Sol", "Azir", "Bard", "Bel'Veth", "Blitzcrank", "Brand",
  "Braum", "Briar", "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki",
  "Darius", "Diana", "Dr. Mundo", "Draven", "Ekko", "Elise", "Evelynn", "Ezreal",
  "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas",
  "Graves", "Gwen", "Hecarim", "Heimerdinger", "Hwei", "Illaoi", "Irelia", "Ivern",
  "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx", "K'Sante", "Kai'Sa",
  "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen",
  "Kha'Zix", "Kindred", "Kled", "Kog'Maw", "LeBlanc", "Lee Sin", "Leona", "Lillia",
  "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "Master Yi",
  "Milio", "Miss Fortune", "Mordekaiser", "Morgana", "Naafiri", "Nami", "Nasus",
  "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu & Willump", "Olaf",
  "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan",
  "Rammus", "Rek'Sai", "Rell", "Renata Glasc", "Renekton", "Rengar", "Riven",
  "Rumble", "Ryze", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco",
  "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Smolder", "Sona",
  "Soraka", "Swain", "Sylas", "Syndra", "Tahm Kench", "Taliyah", "Talon", "Taric",
  "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch",
  "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Vel'Koz", "Vex", "Vi", "Viego",
  "Viktor", "Vladimir", "Volibear", "Warwick", "Wukong", "Xayah", "Xerath",
  "Xin Zhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs",
  "Zilean", "Zoe", "Zyra"
];

// Масив пророцтв долі
const fortunes = [
  "Ти здивуєш усіх сьогодні.",
  "Кожен поразка — крок до перемоги.",
  "Твоя команда вірить у тебе.",
  "Віра в себе — ключ до успіху.",
  "Твоя наполегливість переможе.",
  "Ніколи не здавайся.",
  "Ти на правильному шляху.",
  "Ти — не лише гравець, ти — легенда.",
  "Твоя енергія — твоя сила.",
  "Будь лідером своєї команди.",
  
  // Нейтральні і трохи гумористичні
  "Сьогодні твоя гра буде хаотичною.",
  "Твій тиммейт сьогодні не з'явиться.",
  "Найкращий день для AFK.",
  "Твій саппорт — Yuumi, але вона зникне.",
  "FF на 15 — ідеальний план.",
  "Тебе знищать, але ти зробиш пента-кіл!",
  "Тиммейти не прийдуть — як завжди.",
  "Зараз саме час взяти Garen і не паритись.",
  "Пам'ятай: це лише гра.",
  "Вчися на кожній грі.",
  
  // Трохи негативних/жорстких
  "Сьогодні ти програєш, але з честю!",
  "У тебе буде 0/10, але ти MVP у серцях.",
  "Твій ранг піде вниз, готуйся.",
  "Твоя команда сьогодні зламається першою.",
  "Ворог краще тебе, не засмучуйся.",
  "Вчорашні помилки сьогодні повторяться.",
  "Ти знову забудеш купити айтеми.",
  "Ворог буде сміятися над тобою.",
  "Сьогоднішній матч — твій найгірший.",
  "Гра закінчиться швидким фідом.",
  
  // Додаткові варіанти
  "Ранг знизиться, зате настрій підніметься!",
  "Гра буде жорсткою, але ти витримаєш.",
  "Пам'ятай про карту, без неї — нікуди.",
  "Комунікація — ключ до перемоги.",
  "Твоя стратегія буде винагороджена.",
  "Твоя наполегливість змінить гру.",
  "Твій настрій визначає результат.",
  "Прокачай макро, а не мікро.",
  "Використовуй свої сильні сторони.",
  "Не бійся ризикувати.",
  
  "Великий шлях починається з малого кроку.",
  "Ти готовий до викликів.",
  "Твоя інтуїція допоможе прийняти рішення.",
  "Залишайся спокійним у хаосі.",
  "Ти — майстер своєї долі.",
  "Використовуй кожен момент.",
  "Пам'ятай про цілі, але не забувай про процес.",
  "Ти справжній боєць.",
  "Віра у власні сили — твій щит.",
  "Не відступай перед труднощами.",
  
  "Нехай удача супроводжує тебе.",
  "Вчись на поразках і перемогах.",
  "Ти створюєш свою легенду.",
  "Твоя наполегливість — твій щит.",
  "Твоя пристрасть рухає світ.",
  "Твоя рішучість непохитна.",
  "Вір у себе і вперед!",
  "Не зупиняйся на досягнутому.",
  "Будь терплячим, успіх прийде.",
  "Твоя гра змінить світ.",
  
  "Твій дух незламний.",
  "Ти в центрі уваги.",
  "Пам'ятай про відпочинок.",
  "Кожен день — новий шанс.",
  "Ти — лідер у своїй команді.",
  "Нехай кожна гра буде святом.",
  "Знайди баланс між агресією і обережністю.",
  "Твоя команда — це сім'я.",
  "Ти зробиш неймовірні речі.",
  "Будь уважним до деталей.",
  
  "Пам'ятай: навіть чемпіони падають.",
  "Розслабся і насолоджуйся.",
  "Інтуїція врятує тебе.",
  "Слухай команду, але довіряй собі.",
  "Твоя кмітливість — твоє головне зброя.",
  "Знайди свій стиль і дотримуйся його.",
  "Твоя мета ближче, ніж здається.",
  "Навчайся на помилках інших.",
  "Ти створюєш свою історію.",
  "Твоя стратегія приведе до перемоги.",
  
  "Ти справжній боєць!",
  "Твої друзі чекають на твою перемогу.",
  "Пам'ятай, що кожна гра - це досвід.",
  "Не забувай про відпочинок.",
  "Знай, коли варто здаватися.",
  "Сьогоднішній день не твій.",
  "Твоя команда підведе тебе сьогодні.",
  "Ти зробиш максимум, але цього замало.",
  "Навчишся на своїх помилках.",
  "Завтра буде краще.",
  
  "Ти знову забув купити контроль вижання.",
  "Шанс на перемогу — 20%.",
  "Не нервуй — ти все одно програєш.",
  "Твій тиммейт AFK.",
  "Пам'ятай, що це лише гра, хоча й прикра.",
  "Залишайся живим, якщо зможеш.",
  "Твоє золото буде на користь ворогів.",
  "Ворог сьогодні в ударі.",
  "Ти - харчування для ворожих лісників.",
  "Цей матч ти забудеш швидко.",
  
  "Немає сенсу боротися.",
  "Ти сьогодні — тінь самого себе.",
  "Пам'ятай: гра закінчується не на твою користь.",
  "Сьогодні навіть Teemo буде проти тебе.",
  "Удача обійде тебе стороною.",
  "Твоя комунікація сьогодні нульова.",
  "Завжди можна гірше, але не сьогодні.",
  "Ти можеш стати причиною поразки.",
  "Вчорашні навички сьогодні не працюють.",
  "Сьогодні ти втрачаєш і честь, і рейтинг.",
  
  "Гра закінчиться швидко, як і твій настрій.",
  "Немає часу для помилок — ти їх зробиш всі.",
  "Твоя ігрова мишка сьогодні на ремонті.",
  "Пам'ятай: сьогодні ти просто клон ворога.",
  "Ворог вищого рівня, приймай поразку.",
  "Сьогодні ти — лише статист у чужій грі.",
  "Ти забудеш, як грати через 5 хвилин.",
  "Твій тиммейт сьогодні — бот, що не рухається.",
  "Твоя стратегія сьогодні — катастрофа.",
  "FF на 10? Можливо, краще одразу."
];

const app = express();
const PORT = process.env.PORT || 3000;

// Логування запитів
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Функція для отримання випадкового елемента з масиву
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Основний ендпойнт для Nightbot - випадковий чемпіон
app.get("/random-champion", (req, res) => {
  const champion = getRandomElement(champions);
  const message = `Ти схожий на ${champion}`;
  
  console.log(`Відправлено чемпіона: ${message}`);
  res.type("text/plain").send(message);
});

// Новий ендпойнт для Nightbot - випадкове пророцтво долі
app.get("/random-fortune", (req, res) => {
  const fortune = getRandomElement(fortunes);
  
  console.log(`Відправлено пророцтво: ${fortune}`);
  res.type("text/plain").send(fortune);
});

// Комбінований ендпойнт - чемпіон + доля
app.get("/random-both", (req, res) => {
  const champion = getRandomElement(champions);
  const fortune = getRandomElement(fortunes);
  const message = `Ти схожий на ${champion}. ${fortune}`;
  
  console.log(`Відправлено комбо: ${message}`);
  res.type("text/plain").send(message);
});

// Тестові ендпойнти JSON
app.get("/api/random-champion", (req, res) => {
  const champion = getRandomElement(champions);
  res.json({ 
    champion, 
    message: `Ти схожий на ${champion}`,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/random-fortune", (req, res) => {
  const fortune = getRandomElement(fortunes);
  res.json({ 
    fortune,
    timestamp: new Date().toISOString()
  });
});

app.get("/api/random-both", (req, res) => {
  const champion = getRandomElement(champions);
  const fortune = getRandomElement(fortunes);
  res.json({ 
    champion,
    fortune,
    message: `Ти схожий на ${champion}. ${fortune}`,
    timestamp: new Date().toISOString()
  });
});

// Головна сторінка
app.get("/", (req, res) => {
  res.send(`
    <h1>🎮 Nightbot Champion & Fortune API</h1>
    <p>API працює!</p>
    <h2>Ендпойнти для Nightbot:</h2>
    <ul>
      <li><a href="/random-champion">Випадковий чемпіон</a></li>
      <li><a href="/random-fortune">Випадкове пророцтво долі</a></li>
      <li><a href="/random-both">Чемпіон + Доля</a></li>
    </ul>
    <h2>JSON API для тестування:</h2>
    <ul>
      <li><a href="/api/random-champion">JSON - Чемпіон</a></li>
      <li><a href="/api/random-fortune">JSON - Пророцтво</a></li>
      <li><a href="/api/random-both">JSON - Комбо</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
  console.log(`📡 Nightbot URLs:`);
  console.log(`   Чемпіон: http://localhost:${PORT}/random-champion`);
  console.log(`   Доля: http://localhost:${PORT}/random-fortune`);
  console.log(`   Комбо: http://localhost:${PORT}/random-both`);
  console.log(`\nДля тестування відкрийте: http://localhost:${PORT}`);
});
