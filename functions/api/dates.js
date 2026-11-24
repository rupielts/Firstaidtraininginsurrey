// Reads the "Choose date" options from the public registration form. It never reads anyone's answers.
const FORM = "https://docs.google.com/forms/d/e/1FAIpQLSd6vaZjImw5oUv58NsYlstE_fEaAbzJ8Xz3VQoItz8GDVg2LA/viewform";
function walk(n, out) {
  if (!Array.isArray(n)) return;
  if (typeof n[1] === "string" && /choose\s*date/i.test(n[1]) && Array.isArray(n[4])) out.push(n);
  for (const c of n) walk(c, out);
}
function options(root) {
  const queue = [root];
  while (queue.length) {
    const a = queue.shift();
    if (!Array.isArray(a)) continue;
    if (a.length && a.every((o) => Array.isArray(o) && typeof o[0] === "string")) return a.map((o) => o[0]);
    for (const c of a) queue.push(c);
  }
  return [];
}
export async function onRequestGet() {
  const headers = { "content-type": "application/json;charset=utf-8", "cache-control": "public, max-age=60, s-maxage=300" };
  try {
    const r = await fetch(FORM, { headers: { "accept-language": "en-CA,en;q=0.9" }, cf: { cacheTtl: 300, cacheEverything: true } });
    const html = await r.text();
    const m = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(\[[\s\S]*?\]);\s*<\/script>/);
    if (!m) throw new Error("form data not found");
    const found = [];
    walk(JSON.parse(m[1]), found);
    const q = found[0];
    if (!q) throw new Error("question not found");
    const opts = options(q[4]);
    if (!opts.length) throw new Error("no options");
    const first = q[4][0];
    const entry = first && typeof first[0] === "number" ? first[0] : null;
    return new Response(JSON.stringify({ ok: true, entry, options: opts }), { headers });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { headers: { ...headers, "cache-control": "public, max-age=30" } });
  }
}
