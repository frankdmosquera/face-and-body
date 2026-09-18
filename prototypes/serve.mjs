// Static server for the prototypes. No packages. Throwaway with this folder.
// node prototypes/serve.mjs  ->  http://localhost:5050/home.html
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  // /ig/* is served from the reference folder so the photos live in one place only
  const rel = path === "\\" || path === "/" ? "home.html" : path;
  const file = /^[\\/]ig[\\/]/.test(rel)
    ? join(root, "..", "blueprint", "reference", rel)
    : join(root, rel);
  try {
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end("not found");
  }
}).listen(5050, () => console.log("prototypes at http://localhost:5050/home.html"));
