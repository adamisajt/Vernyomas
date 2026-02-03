import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const vezetekNevek = [
  "Kovács",
  "Szabó",
  "Tóth",
  "Nagy",
  "Horváth",
  "Varga",
  "Kiss",
  "Molnár",
];

const keresztNevek = [
  "Anna",
  "Bence",
  "Dávid",
  "Eszter",
  "Gábor",
  "Júlia",
  "László",
  "Péter",
];

function randomElem(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function generateName() {
  return `${randomElem(vezetekNevek)} ${randomElem(keresztNevek)}`;
}

function generateBloodPressure() {
  const sys = Math.floor(100 + Math.random() * 60);
  const dia = Math.floor(60 + Math.random() * 30);
  return `${sys}/${dia}`;
}

function generateData(count = 30) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      name: generateName(),
      vernyomas: generateBloodPressure(),
    });
  }
  return items;
}

async function main() {
  const data = generateData(30);
  const json = JSON.stringify(data, null, 2);

  const publicDir = join(process.cwd(), "public");
  const filePath = join(publicDir, "test.json");

  try {
    await mkdir(publicDir, { recursive: true });
    await writeFile(filePath, json, "utf-8");
    console.log(`Sikeresen létrehozva: ${filePath}`);
  } catch (err) {
    console.error("Hiba a test.json létrehozásakor:", err);
    process.exit(1);
  }
}

main();
