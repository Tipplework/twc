import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const safeguard = "C:/Users/rohan/Documents/twc-image-safeguard";

const jobs = [
  [path.join(safeguard, "SULA__8e0b33cb.webp"), "public/work/sula-vineyards-cover.webp"],
  [path.join(safeguard, "Sula__eb6a7e64.webp"), "public/work/sula-vineyards-01.webp"],
  [path.join(safeguard, "FORBES__c8810cc1.webp"), "public/work/forbes-w-power-cover.webp"],
  [path.join(safeguard, "Forbes__bc1b4295.webp"), "public/work/forbes-w-power-01.webp"],
  [path.join(safeguard, "NAAR__12709e58.webp"), "public/work/naar-cover.webp"],
  [path.join(safeguard, "Naar__fb0ad8f6.webp"), "public/work/naar-01.webp"],
  [path.join(safeguard, "PROVOGUE__6e0403a7.webp"), "public/work/provogue-cover.webp"],
  [path.join(safeguard, "Provogue__c6f2db86.webp"), "public/work/provogue-01.webp"],
  [path.join(safeguard, "SPRIG__123e5024.webp"), "public/work/sprig-cover.webp"],
  [path.join(safeguard, "Sprig__ce3cf014.webp"), "public/work/sprig-01.webp"],
  [path.join(safeguard, "ZOMATO__0e6dccf0.webp"), "public/work/zomato-cover.webp"],
  [path.join(safeguard, "Zomato__53905391.webp"), "public/work/zomato-01.webp"],
  ["public/lovable-uploads/SF25.webp", "public/work/sula-fest-cover.webp"],
  ["public/lovable-uploads/Sulafest.webp", "public/work/sula-fest-01.webp"],
  ["public/lovable-uploads/PM.webp", "public/work/paul-and-mike-cover.webp"],
  ["public/lovable-uploads/Paulandmike.webp", "public/work/paul-and-mike-01.webp"],
  ["public/lovable-uploads/YORK.webp", "public/work/york-winery-cover.webp"],
  ["public/lovable-uploads/RASA.webp", "public/work/rasa-cover.webp"],
  ["public/lovable-uploads/SPACE.webp", "public/work/space-cover.webp"],
  ["public/lovable-uploads/Spacecoffee.webp", "public/work/space-01.webp"],
  ["public/lovable-uploads/EM.webp", "public/work/estate-monkeys-cover.webp"],
  ["public/lovable-uploads/Estatemonkeys.webp", "public/work/estate-monkeys-01.webp"],
  ["public/lovable-uploads/SOURCE.webp", "public/work/the-source-cover.webp"],
  ["public/lovable-uploads/Thesourceatsula.webp", "public/work/the-source-01.webp"],
  ["public/lovable-uploads/Thesource.webp", "public/work/thesourcewines-01.webp"],
  ["public/lovable-uploads/ML.webp", "public/work/momoland-cover.webp"],
  ["public/lovable-uploads/BS.webp", "public/work/buns-and-slices-cover.webp"],
  ["public/lovable-uploads/Beyond.png", "public/work/beyond-by-sula-cover.webp"],
  ["public/lovable-uploads/Beyondbysula.webp", "public/work/beyond-by-sula-01.webp"],
  ["public/lovable-uploads/DSG.png", "public/work/dsg-cover.webp"],
  ["public/lovable-uploads/Dsg.webp", "public/work/dsg-01.webp"],
  ["public/lovable-uploads/rohandhirwani.png", "public/team/rohan.webp"],
  ["public/lovable-uploads/SrishtiBhatia.jpg", "public/team/srishti.webp"],
  ["public/lovable-uploads/AnshBhatia.jpeg", "public/team/ansh.webp"],
];

fs.mkdirSync(path.join(root, "public/work"), { recursive: true });
fs.mkdirSync(path.join(root, "public/team"), { recursive: true });

for (const [src, dest] of jobs) {
  const input = path.isAbsolute(src) ? src : path.join(root, src);
  const output = path.join(root, dest);
  if (!fs.existsSync(input)) {
    console.warn("missing", input);
    continue;
  }
  await sharp(input)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 68 })
    .toFile(output);
  const size = fs.statSync(output).size;
  console.log(dest, Math.round(size / 1024) + "kb");
}

await sharp(path.join(root, "public/twc-logo.png"))
  .resize(1200, 630, { fit: "contain", background: "#070707" })
  .jpeg({ quality: 82 })
  .toFile(path.join(root, "public/og.jpg"));

console.log("public/og.jpg", Math.round(fs.statSync(path.join(root, "public/og.jpg")).size / 1024) + "kb");
