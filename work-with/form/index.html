export async function onRequestPost(context) {
  const { request, env } = context;

  // Only allow JSON
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json({ error: "Expected application/json" }, 415);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // Basic validation
  const name = cleanText(body.name, 200);
  const email = cleanText(body.email, 200);
  const company = cleanText(body.company, 200);
  const title = cleanText(body.title, 200);
  const contextText = cleanText(body.context, 5000);
  const prompt = cleanText(body.prompt, 5000);
  const source = cleanText(body.source, 100);
  const notes = cleanText(body.notes, 5000);
  const areasOther = cleanText(body.areas_other, 500);

  const areas = Array.isArray(body.areas)
    ? body.areas.map(a => cleanText(a, 200)).filter(Boolean)
    : [];

  if (!name) return json({ error: "Name is required." }, 400);
  if (!isValidEmail(email)) return json({ error: "Valid email is required." }, 400);
  if (!contextText) return json({ error: "Leadership context is required." }, 400);
  if (!prompt) return json({ error: "Prompt is required." }, 400);
  if (!source) return json({ error: "Source is required." }, 400);

  if (areas.length > 3) return json({ error: "Please select up to 3 areas." }, 400);

  // Capture request metadata
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    "";
  const userAgent = request.headers.get("user-agent") || "";

  // Insert into D1
  try {
    await env.INQUIRIES_DB.prepare(
      `INSERT INTO inquiries
        (created_at, name, email, company, title, context, prompt, areas_json, areas_other, source, notes, ip, user_agent)
       VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        new Date().toISOString(),
        name,
        email,
        company,
        title,
        contextText,
        prompt,
        JSON.stringify(areas),
        areasOther,
        source,
        notes,
        ip,
        userAgent
      )
      .run();
  } catch (e) {
    return json({ error: "Database error. Please try again." }, 500);
  }

  return json({ ok: true }, 200);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function cleanText(v, maxLen) {
  if (typeof v !== "string") return "";
  const s = v.trim();
  if (!s) return "";
  return s.slice(0, maxLen);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
