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

const app = express();
const PORT = process.env.PORT || 3000;

// Логування запитів
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Основний ендпойнт для Nightbot
app.get("/random-champion", (req, res) => {
  const randomIndex = Math.floor(Math.random() * champions.length);
  const champion = champions[randomIndex];
  const message = `Ти схожий на ${champion}`;
  
  console.log(`Відправлено: ${message}`);
  res.type("text/plain").send(message);
});

// Тестовий ендпойнт JSON
app.get("/api/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * champions.length);
  const champion = champions[randomIndex];
  res.json({ 
    champion, 
    message: `Ти схожий на ${champion}`,
    timestamp: new Date().toISOString()
  });
});

// Головна сторінка
app.get("/", (req, res) => {
  res.send(`
    <h1>🎮 Nightbot Champion API</h1>
    <p>API працює!</p>
    <ul>
      <li><a href="/random-champion">Випадковий чемпіон (для Nightbot)</a></li>
      <li><a href="/api/random">JSON версія</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
  console.log(`📡 Nightbot URL: http://localhost:${PORT}/random-champion`);
  console.log(`\nДля тестування відкрийте: http://localhost:${PORT}`);
});