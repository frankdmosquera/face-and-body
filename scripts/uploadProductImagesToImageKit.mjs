/**
 * Uploads the Eminence packshots to the ImageKit media library.
 *
 *   node scripts/uploadProductImagesToImageKit.mjs
 *   node scripts/uploadProductImagesToImageKit.mjs --dry-run
 *
 * `public/images/` is gitignored, so the 193 packshots exist on one machine
 * and would 404 on Vercel. This puts them where every other photograph on the
 * site already lives.
 *
 * The folder structure is mirrored exactly, minus the `/images` prefix, so
 * `public/images/product-images/facials/cleansing/x.jpg` becomes
 * `face-and-body/product-images/facials/cleansing/x.jpg`. That mirroring is
 * what lets `toMediaPath` in `data/productsData.ts` be a one-line string
 * replace instead of a lookup table, so do not flatten the folders here
 * without changing that function too.
 *
 * Safe to re-run: `overwriteFile` replaces a file in place and
 * `useUniqueFileName` is off, so filenames stay predictable and nothing is
 * ever duplicated with a `_ABC123` suffix. Re-running after replacing a photo
 * means bumping MEDIA_VERSION in `lib/imagekitConfig.ts`, or browsers keep
 * showing the old one for a year.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "public", "images", "product-images");
const REMOTE_ROOT = "face-and-body/product-images";
const ENDPOINT = "https://upload.imagekit.io/api/v1/files/upload";
const CONCURRENCY = 4;
const DRY_RUN = process.argv.includes("--dry-run");

const TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

/** Minimal .env.local reader. The key is used and never printed. */
async function readPrivateKey() {
  const raw = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*IMAGE_KIT_PRIVATE_KEY\s*=\s*(.+)\s*$/);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  }
  throw new Error("IMAGE_KIT_PRIVATE_KEY is not in .env.local");
}

async function collectImages(dir) {
  const found = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectImages(full)));
    } else if (TYPES[path.extname(entry.name).toLowerCase()]) {
      found.push(full);
    }
  }
  return found;
}

async function upload(file, auth) {
  const relative = path.relative(SOURCE, file).split(path.sep);
  const fileName = relative.pop();
  const folder = [REMOTE_ROOT, ...relative].join("/");

  if (DRY_RUN) return { file, folder, fileName, ok: true, skipped: true };

  const body = new FormData();
  const bytes = await fs.readFile(file);
  const type = TYPES[path.extname(fileName).toLowerCase()];
  body.append("file", new Blob([bytes], { type }), fileName);
  body.append("fileName", fileName);
  body.append("folder", folder);
  body.append("useUniqueFileName", "false");
  body.append("overwriteFile", "true");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}` },
    body,
  });

  if (!response.ok) {
    const detail = await response.text();
    // The key is in the Authorization header, never in the response, so this
    // is safe to print. Keep it that way.
    throw new Error(`${response.status} ${detail.slice(0, 200)}`);
  }

  return { file, folder, fileName, ok: true };
}

async function main() {
  const key = await readPrivateKey();
  const auth = Buffer.from(`${key}:`).toString("base64");

  const files = await collectImages(SOURCE);
  files.sort();
  console.log(
    `${files.length} images in public/images/product-images${DRY_RUN ? " (dry run, nothing will be sent)" : ""}`,
  );

  let done = 0;
  const failures = [];
  const queue = [...files];

  async function worker() {
    for (;;) {
      const next = queue.shift();
      if (!next) return;
      try {
        const result = await upload(next, auth);
        done += 1;
        if (done % 20 === 0 || done === files.length) {
          console.log(`  ${done}/${files.length}  ${result.folder}/${result.fileName}`);
        }
      } catch (error) {
        failures.push({ file: next, message: String(error.message ?? error) });
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, files.length) }, worker),
  );

  console.log(`\nuploaded ${done}, failed ${failures.length}`);
  for (const failure of failures) {
    console.log(`  FAILED ${path.relative(ROOT, failure.file)}: ${failure.message}`);
  }
  if (failures.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(String(error.message ?? error));
  process.exitCode = 1;
});
