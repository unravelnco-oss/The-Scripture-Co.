/* =====================================================================
   THE SCRIPTURE CO. — script.js
   1) SITE_CONFIG  → brand details (change here, updates every page)
   2) PRODUCTS     → the 5 products (names, prices, images, sizes, 3D models)
   Everything below section 2 normally never needs editing.
   ===================================================================== */

/* ---------- 1. SITE CONFIG ---------- */
const SITE_CONFIG = {
  brandName: "THE SCRIPTURE CO.",
  logo: "assets/logo/the-scripture-co-logo.png",
  email: "thescriptureco0@gmail.com",
  instagramHandle: "@thescripture.co",
  instagramUrl: "https://instagram.com/thescripture.co",
  whatsappNumbers: ["+2348026240186", "+2348025799406"],
  preorderFormUrl: "PASTE_PREORDER_FORM_URL_HERE", // paste your form link here; the button appears automatically
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],        // edit this list to change shirt sizes
  /* SIZE CHART: leave as null to show "Coming Soon". When you have official measurements, replace null with:
     { unit: "inches", columns: ["Chest", "Length"], rows: { XS: ["..", ".."], S: ["..", ".."] } }
     (one row per size, one value per column). The table then replaces "Coming Soon" automatically. */
  sizeChart: null,
  faq: [
    ["How do I order?", "Open a product, pick your size (if it has sizes) and quantity, add any notes, then press Place order. You will then choose one of our WhatsApp numbers to send your order."],
    ["How does payment work?", "Payment is not taken on this website. After you send your order on WhatsApp, we reply there with payment details and confirm everything with you."],
    ["Do you accept pre-orders?", "Yes. Tick “This is a pre-order” on the order form. You then continue on WhatsApp the same way."],
    ["How do I choose my size?", "Shirts come in XS to XXL. A size chart is coming soon. If you are unsure, message us on WhatsApp before you pay."],
    ["How do I contact you?", "Message either WhatsApp number, email us, or send a DM on Instagram. Everything is on the Contact page."],
    ["How long does an order take?", "We will confirm timing with you on WhatsApp, because it depends on the product and your delivery location."],
    ["Can I customize an order?", "Add your request in the notes box on the order form. We will tell you on WhatsApp what we can do."],
    ["How do I know my order is confirmed?", "Your order is confirmed once we reply on WhatsApp and confirm your payment. Submitting the form alone does not confirm an order."]
  ]
};

/* ---------- 2. PRODUCTS ----------
   price: null shows "PRICE: TBA". Put a number (e.g. 15000) to show ₦15,000.
   sizes: [] = no size picker. color: garment/bag colour used in mockups.
   views: where the artwork sits. x = centre, y = top, w = width (400-wide mockup grid).
   model: path to a .glb file (or null). If the file is missing, a placeholder shows.  */
const PRODUCTS = [
  { id: "yeshua-tote", name: "Yeshua Tote Bag", type: "tote", price: null, color: "#d8cdb4", sizes: [], model: null, primary: "front",
    short: "The Yeshua. wordmark, printed on a tote.",
    desc: "A tote bag carrying the Yeshua. artwork. Add any notes about your order in the form.",
    info: ["Tote bag (not a shirt)", "Artwork: Yeshua. wordmark"],
    views: { front: { art: "assets/products/yeshua-art.png", x: 200, y: 272, w: 210 } } },
  { id: "proverbs-3-5-6", name: "Proverbs 3:5–6 T-Shirt", type: "shirt", price: null, color: "#121212", sizes: SITE_CONFIG.sizes, model: "models/proverbs-shirt.glb", primary: "back",
    short: "Black tee. Plain front. White Proverbs 3:5–6 on the back.",
    desc: "A black T-shirt with a plain front. The Proverbs 3:5–6 design is printed in white on the back.",
    info: ["Shirt colour: black", "Front: plain", "Back: white Proverbs 3:5–6 design"],
    views: { front: { art: null }, back: { art: "assets/products/proverbs-art-white.png", x: 200, y: 82, w: 96 } } },
  { id: "ezekiel-36-26", name: "Ezekiel 36:26 / New Heart T-Shirt", type: "shirt", price: null, color: "#e6dfcf", sizes: SITE_CONFIG.sizes, model: "models/ezekiel-shirt.glb", primary: "back",
    short: "Small anatomical heart on the front. Full Ezekiel 36:26 design on the back.",
    desc: "A small anatomical heart sits on the upper-left chest. The large anatomical heart with the Ezekiel 36:26 design is on the back.",
    info: ["Front: small anatomical heart, upper-left chest", "Back: large anatomical heart with Ezekiel 36:26"],
    views: { front: { art: "assets/products/ezekiel-heart.png", x: 246, y: 78, w: 34 }, back: { art: "assets/products/ezekiel-art.png", x: 200, y: 78, w: 170 } } },
  { id: "psalm-23", name: "Psalm 23 T-Shirt", type: "shirt", price: null, color: "#ebe6da", sizes: SITE_CONFIG.sizes, model: null, primary: "front",
    short: "Psalm 23. The Lord is my Shepherd.",
    desc: "A T-shirt with the Psalm 23 artwork, exactly as designed.",
    info: ["Design: Psalm 23, The Lord is my Shepherd"],
    views: { front: { art: "assets/products/psalm23-art.png", x: 200, y: 86, w: 150 } } },
  { id: "scripture-jars", name: "Scripture Jars", type: "jar", price: null, color: "#e9f0ef", sizes: [], model: null, primary: "front",
    short: "Colour-coded Bible verses in a jar. Concept mockup.",
    desc: "A jar of colour-coded Bible verses to read when you are sad, anxious, thankful, stressed, joyful or lonely. The picture shown is a concept mockup, not a photo of the final product.",
    info: ["Concept mockup, not a final product photo", "Colour-coded verses: sad, anxious, thankful, stressed, joyful, lonely"],
    views: {} }
];

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const byId = id => PRODUCTS.find(p => p.id === id);
const fmt = p => p.price == null ? "PRICE: TBA" : "₦" + Number(p.price).toLocaleString("en-NG");
const waLink = (num, text) => `https://wa.me/${num.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
const tagText = p => p.type === "jar" ? "Concept mockup" : "Digital mockup";
const NAV = [["index.html","Home"],["shop.html","Shop"],["3d-studio.html","3D Studio"],["about.html","About"],["faq.html","FAQ"],["contact.html","Contact"]];

/* ---------- digital mockups (SVG; swap for real photos later) ---------- */
let uid = 0;
const SHIRT = "M110 395L290 395L290 160L335 180L370 120L280 60L250 28Q200 62 150 28L120 60L30 120L65 180L110 160Z";
function mock(p, view) {
  const id = "g" + (++uid), alt = `${p.name} ${tagText(p).toLowerCase()}${p.type === "jar" ? "" : ", " + (view || p.primary) + " view"}`;
  if (p.type === "jar") return jarSVG(alt);
  const v = (p.views[view] || p.views[p.primary]) || {};
  const img = v.art ? `<image href="${v.art}" x="${v.x - v.w / 2}" y="${v.y}" width="${v.w}" height="${v.w * 3}" preserveAspectRatio="xMidYMin meet"/>` : "";
  const dark = parseInt(p.color.slice(1, 3), 16) < 90, fold = dark ? "#fff" : "#000";
  const grad = `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-opacity="0"/><stop offset=".7" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".32"/></linearGradient></defs>`;
  if (p.type === "tote") return `<svg viewBox="0 0 400 460" role="img" aria-label="${alt}">${grad}<ellipse cx="200" cy="452" rx="140" ry="7" opacity=".2"/><path d="M140 135C140 30 260 30 260 135" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="22"/><path d="M140 135C140 30 260 30 260 135" fill="none" stroke="${p.color}" stroke-width="16"/><path d="M80 120L320 120L336 440L64 440Z" fill="${p.color}" stroke="#000" stroke-opacity=".4" stroke-width="2"/><path d="M80 120L320 120L336 440L64 440Z" fill="url(#${id})"/><path d="M86 136L314 136" stroke="#000" stroke-opacity=".3" stroke-dasharray="5 5" fill="none"/>${img}</svg>`;
  const body = SHIRT.replace("Q200 62", "Q200 " + (view === "back" ? 40 : 62));
  return `<svg viewBox="0 0 400 420" role="img" aria-label="${alt}">${grad}<ellipse cx="200" cy="412" rx="130" ry="7" opacity=".2"/><path d="${body}" fill="${p.color}" stroke="#000" stroke-opacity=".4" stroke-width="2"/><path d="${body}" fill="url(#${id})"/><path d="M150 28Q200 ${view === "back" ? 44 : 64} 250 28" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="6"/><path d="M135 250Q170 275 150 335M265 235Q232 285 255 345M110 160Q140 190 134 218M290 160Q262 190 268 220" fill="none" stroke="${fold}" stroke-opacity=".12" stroke-width="5" stroke-linecap="round"/>${img}</svg>`;
}
function jarSVG(alt) {
  const strips = [["#cdbfe3",58,92,48,110],["#f6c9d0",100,100,40,100],["#f6e58f",190,96,52,106],["#bfe0c9",150,92,38,110],["#f3c79a",230,100,20,90],["#a9cdea",70,340,50,64],["#cdbfe3",118,350,44,54],["#f6e58f",190,342,50,62],["#bfe0c9",236,350,18,54]];
  const boxes = [["SAD","#4a90c8",58,252],["THANKFUL","#e07a86",58,274],["JOYFUL","#e2c230",58,296],["ANXIOUS","#8a73c4",166,252],["STRESSED","#e8903a",166,274],["LONELY","#52a878",166,296]];
  return `<svg viewBox="0 0 300 440" role="img" aria-label="${alt}"><ellipse cx="150" cy="428" rx="110" ry="7" opacity=".2"/><rect x="45" y="22" width="210" height="34" rx="10" fill="#b98b52" stroke="#000" stroke-opacity=".4" stroke-width="2"/><rect x="55" y="56" width="190" height="18" fill="#c9a06a"/>${strips.map(s => `<rect x="${s[1]}" y="${s[2]}" width="${s[3]}" height="${s[4]}" fill="${s[0]}"/>`).join("")}<rect x="45" y="74" width="210" height="340" rx="22" fill="#e9f0ef" fill-opacity=".45" stroke="#000" stroke-opacity=".5" stroke-width="3"/><rect x="45" y="190" width="210" height="150" fill="#fbf9f3" stroke="#000" stroke-width="3"/><text x="150" y="212" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="14" letter-spacing="2">THE SCRIPTURE CO.</text><text x="150" y="240" text-anchor="middle" font-family="Permanent Marker,cursive" font-size="22" fill="#7a1523">Read Me When…</text>${boxes.map(b => `<rect x="${b[2]}" y="${b[3]}" width="76" height="16" fill="none" stroke="${b[1]}" stroke-width="2.5"/><text x="${b[2] + 38}" y="${b[3] + 12}" text-anchor="middle" font-family="Inter,sans-serif" font-size="8.5" font-weight="700" letter-spacing="1">${b[0]}</text>`).join("")}<text x="150" y="328" text-anchor="middle" font-family="Inter,sans-serif" font-size="8.5" font-weight="700" letter-spacing="1.5">COLOR CODED BIBLE VERSES</text></svg>`;
}

/* ---------- shared header / footer ---------- */
function chrome() {
  const page = document.body.dataset.page, cur = page === "product.html" ? "shop.html" : page;
  $("#site-header").innerHTML = `<div class="wrap bar"><a class="logo-crop" href="index.html" aria-label="${SITE_CONFIG.brandName} home"><img src="${SITE_CONFIG.logo}" alt="${SITE_CONFIG.brandName} logo" onerror="this.replaceWith(document.createTextNode('${SITE_CONFIG.brandName}'))"></a><button class="menu" aria-expanded="false" aria-controls="nav-list">Menu</button><nav aria-label="Main"><ul id="nav-list">${NAV.map(n => `<li><a href="${n[0]}" ${n[0] === cur ? 'aria-current="page"' : ""}>${n[1]}</a></li>`).join("")}</ul></nav></div>`;
  const b = $(".menu"), l = $("#nav-list");
  b.onclick = () => { const o = l.classList.toggle("open"); b.setAttribute("aria-expanded", o); };
  $("#site-footer").innerHTML = `<div class="wrap"><div><div class="sticker"><img src="${SITE_CONFIG.logo}" alt="${SITE_CONFIG.brandName} logo" loading="lazy"></div><p style="margin-top:1rem;max-width:34ch">Christian merch and streetwear. Faith you can wear.</p></div><div><h3>Pages</h3>${NAV.map(n => `<a href="${n[0]}">${n[1]}</a>`).join("")}</div><div><h3>Reach us</h3><a href="${SITE_CONFIG.instagramUrl}" target="_blank" rel="noopener">Instagram ${SITE_CONFIG.instagramHandle}</a><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>${SITE_CONFIG.whatsappNumbers.map(n => `<a href="${waLink(n, "Hi The Scripture Co.!")}" target="_blank" rel="noopener">WhatsApp ${n}</a>`).join("")}</div></div>`;
}
function contactButtons() {
  return SITE_CONFIG.whatsappNumbers.map(n => `<a class="btn" target="_blank" rel="noopener" href="${waLink(n, "Hi The Scripture Co.! I have a question.")}">WhatsApp ${n}</a>`).join("") +
    `<a class="btn alt" href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a><a class="btn alt" target="_blank" rel="noopener" href="${SITE_CONFIG.instagramUrl}">Instagram ${SITE_CONFIG.instagramHandle}</a>`;
}
function card(p) {
  const u = "product.html?id=" + p.id;
  return `<article class="card rv"><a href="${u}" aria-label="View ${p.name}"><div class="mock">${mock(p, p.primary)}<span class="tag">${tagText(p)}</span></div></a><h3><a href="${u}">${p.name}</a></h3><p class="price">${fmt(p)}</p><p>${p.short}</p><div class="row" style="margin:0"><a class="btn alt" href="${u}">View product</a><a class="btn" href="${u}#order">Order</a></div></article>`;
}

/* ---------- 3D viewer (Three.js) ----------
   Loads p.model (.glb/.gltf) if the file exists; otherwise builds a placeholder
   shirt with the artwork on the correct front/back. If WebGL/three fails → mockup image. */
function mountViewer(el, p, say = () => {}) {
  if (el._stop) el._stop();
  el.innerHTML = "";
  const none = { front() {}, back() {}, reset() {}, auto() {} };
  const fallback = () => { el.innerHTML = `<div class="mock">${mock(p, p.primary)}<span class="tag">3D unavailable: showing mockup</span></div>`; say("3D could not start on this device. Showing the product mockup instead."); return none; };
  if (!window.THREE || !THREE.OrbitControls) return fallback();
  let r; try { r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return fallback(); }
  const w = el.clientWidth || 340, h = el.clientHeight || 380;
  r.setPixelRatio(Math.min(devicePixelRatio, 2)); r.setSize(w, h); el.appendChild(r.domElement);
  r.domElement.setAttribute("aria-label", p.name + " 3D viewer. Drag to rotate, pinch or scroll to zoom."); r.domElement.tabIndex = 0;
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(32, w / h, .1, 60), group = new THREE.Group(); scene.add(group);
  const ctl = new THREE.OrbitControls(cam, r.domElement);
  Object.assign(ctl, { enableDamping: true, enablePan: false, minDistance: 3.5, maxDistance: 12, autoRotateSpeed: 2.5 });
  scene.add(new THREE.HemisphereLight(0xffffff, 0x555555, .7));
  const key = new THREE.DirectionalLight(0xffffff, .7); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, .45); rim.position.set(-4, 3, -5); scene.add(rim);
  const view = back => { ctl.autoRotate = false; cam.position.set(0, 0, back ? -7.5 : 7.5); ctl.target.set(0, -.1, 0); ctl.update(); };
  view(false);
  let dead = false; el._stop = () => { dead = true; r.dispose(); };
  (function loop() { if (dead || !el.isConnected) return; ctl.update(); r.render(scene, cam); requestAnimationFrame(loop); })();
  if (window.ResizeObserver) new ResizeObserver(() => { const W = el.clientWidth, H = el.clientHeight; if (W && H && !dead) { r.setSize(W, H); cam.aspect = W / H; cam.updateProjectionMatrix(); } }).observe(el);

  const placeholder = () => {
    const t = (x, y) => [(x - 200) * .01, (200 - y) * .01], s = new THREE.Shape();
    s.moveTo(...t(110, 395)); [[290,395],[290,160],[335,180],[370,120],[280,60],[250,28]].forEach(a => s.lineTo(...t(...a)));
    s.quadraticCurveTo(...t(200, 62), ...t(150, 28)); [[120,60],[30,120],[65,180],[110,160]].forEach(a => s.lineTo(...t(...a))); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: .1, bevelEnabled: true, bevelThickness: .02, bevelSize: .02, bevelSegments: 2 }); g.translate(0, 0, -.05);
    group.add(new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: p.color, roughness: .95 })));
    const tl = new THREE.TextureLoader();
    ["front", "back"].forEach(side => { const v = p.views[side]; if (!v || !v.art) return;
      tl.load(v.art, tex => { tex.anisotropy = 4; const pw = v.w * .01, ph = pw * tex.image.height / tex.image.width;
        const m = new THREE.Mesh(new THREE.PlaneGeometry(pw, ph), new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: .9, polygonOffset: true, polygonOffsetFactor: -2 }));
        const sign = side === "back" ? -1 : 1; m.position.set(sign * (v.x - 200) * .01, (200 - v.y) * .01 - ph / 2, sign * .082); if (side === "back") m.rotation.y = Math.PI; group.add(m); });
    });
    say(p.model ? `Placeholder shirt. Add your file at ${p.model} to show the real 3D model.` : "Placeholder shirt. Set a model path for this product in PRODUCTS to use a real 3D model.");
  };
  if (p.model && THREE.GLTFLoader) {
    fetch(p.model, { method: "HEAD" }).then(x => { if (!x.ok) throw 0;
      new THREE.GLTFLoader().load(p.model, gl => { const o = gl.scene, b = new THREE.Box3().setFromObject(o); o.scale.setScalar(3.4 / b.getSize(new THREE.Vector3()).y); b.setFromObject(o); o.position.sub(b.getCenter(new THREE.Vector3())); group.add(o); say("Real 3D model loaded."); }, undefined, placeholder);
    }).catch(placeholder);
  } else placeholder();
  return { front: () => view(false), back: () => view(true), reset: () => view(false), auto: () => { ctl.autoRotate = !ctl.autoRotate; } };
}

/* ---------- page: product detail + order form ---------- */
function sizeChartHTML() {
  const c = SITE_CONFIG.sizeChart;
  const body = c && c.rows ? `<div style="overflow-x:auto;margin-top:.8rem"><table><caption class="note">Measurements in ${c.unit || "official units"}</caption><thead><tr><th scope="col">Size</th>${c.columns.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${Object.keys(c.rows).map(k => `<tr><th scope="row">${k}</th>${c.rows[k].map(v => `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
    : `<p style="margin-top:.5rem">Official measurements are on the way. Not sure which size to pick? Message us on WhatsApp before you order.</p>`;
  return `<section class="sizechart" aria-labelledby="sc-h"><h3 id="sc-h">Size Chart${c && c.rows ? "" : " — Coming Soon"}</h3>${body}</section>`;
}
function productPage() {
  const p = byId(new URLSearchParams(location.search).get("id")) || PRODUCTS[0], root = $("#pdp");
  document.title = p.name + " — THE SCRIPTURE CO.";
  const views = Object.keys(p.views), canViz = p.type === "shirt";
  root.innerHTML = `<div><div id="stage"></div><div class="tabs" role="group" aria-label="Product views">${views.length > 1 ? views.map(v => `<button type="button" data-v="${v}" aria-pressed="${v === p.primary}">${v}</button>`).join("") : ""}${canViz ? '<button type="button" data-v="3d" aria-pressed="false">3D view</button>' : ""}</div><p class="note" id="vnote"></p></div>
  <div><h1 style="font-size:clamp(2.6rem,9vw,4.6rem)">${p.name}</h1><p class="price" style="font-size:1.3rem;margin:.6rem 0">${fmt(p)}</p><p>${p.desc}</p><ul style="margin:1rem 0 0 1.2rem">${p.info.map(i => `<li>${i}</li>`).join("")}</ul>
  ${p.sizes.length ? sizeChartHTML() : ""}<div class="notice">Place your order and we will confirm your order and payment details with you on WhatsApp. No payment is taken on this website.</div>
  <form id="order" aria-label="Order form"><label>Full name<input name="name" required autocomplete="name"></label><label>Phone / WhatsApp number<input name="phone" type="tel" required autocomplete="tel"></label>
  <label>Product<select name="product">${PRODUCTS.map(x => `<option value="${x.id}" ${x.id === p.id ? "selected" : ""}>${x.name}</option>`).join("")}</select></label><div id="sizeBox"></div>
  <label>Quantity<input name="qty" type="number" min="1" max="50" value="1" required></label><label>Delivery location<input name="loc" required autocomplete="street-address"></label>
  <label>Order / customization notes<textarea name="notes" rows="3"></textarea></label><label style="display:flex;gap:.6rem;align-items:center;text-transform:none;font-size:1rem"><input type="checkbox" name="pre" style="width:auto"> This is a pre-order</label>
  <button class="btn" type="submit">Place order</button></form><div id="result" aria-live="polite"></div></div>`;
  const stage = $("#stage"), show = v => {
    document.querySelectorAll(".tabs button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === v));
    if (v === "3d") { stage.innerHTML = '<div class="viewer" id="v3"></div><div class="ctl"><button type="button" data-a="front">Front</button><button type="button" data-a="back">Back</button><button type="button" data-a="auto">Spin</button><button type="button" data-a="reset">Reset</button></div>'; const c = mountViewer($("#v3"), p, t => $("#vnote").textContent = t); stage.querySelectorAll("[data-a]").forEach(b => b.onclick = () => c[b.dataset.a]()); }
    else { if (stage.firstChild && $("#v3")) $("#v3")._stop && $("#v3")._stop(); stage.innerHTML = `<div class="mock">${mock(p, v)}<span class="tag">${tagText(p)}</span></div>`; $("#vnote").textContent = ""; }
  };
  show(p.primary); root.querySelectorAll(".tabs button").forEach(b => b.onclick = () => show(b.dataset.v));
  const f = $("#order"), sizeBox = $("#sizeBox");
  const sizes = () => { const q = byId(f.product.value); sizeBox.innerHTML = q.sizes.length ? `<fieldset style="border:0;padding:0"><legend style="font-weight:800;font-size:.85rem;text-transform:uppercase;margin-bottom:.4rem">Size</legend><div class="sizes">${q.sizes.map((s, i) => `<label><input type="radio" name="size" value="${s}" ${i === 0 ? "required" : ""}><span>${s}</span></label>`).join("")}</div></fieldset>` : ""; };
  sizes(); f.product.onchange = sizes;
  f.onsubmit = e => { e.preventDefault(); const d = new FormData(f), q = byId(d.get("product")), ref = "TSC-" + Date.now().toString(36).toUpperCase().slice(-6), size = d.get("size");
    const msg = [`Hi The Scripture Co.! I'd like to place ${d.get("pre") ? "a pre-order" : "an order"}.`, "", `Order ref: ${ref}`, `Name: ${d.get("name")}`, `Phone/WhatsApp: ${d.get("phone")}`, `Product: ${q.name}`, size ? `Size: ${size}` : null, `Quantity: ${d.get("qty")}`, `Delivery location: ${d.get("loc")}`, `Notes: ${d.get("notes") || "None"}`, "", "Please send me the payment details."].filter(x => x !== null).join("\n");
    const pre = SITE_CONFIG.preorderFormUrl.startsWith("http") ? `<a class="btn alt" href="${SITE_CONFIG.preorderFormUrl}" target="_blank" rel="noopener">Pre-order form</a>` : "";
    $("#result").innerHTML = `<div class="ok"><h3>Almost done: send it on WhatsApp</h3><p>Your order is <strong>not confirmed or paid yet</strong>. Choose a number below to send this message. We will reply with payment details.</p><pre></pre><div class="row" style="margin:0">${SITE_CONFIG.whatsappNumbers.map(n => `<a class="btn" target="_blank" rel="noopener" href="${waLink(n, msg)}">WhatsApp ${n}</a>`).join("")}${pre}<a class="btn alt" href="mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("Order " + ref)}&body=${encodeURIComponent(msg)}">Email instead</a></div></div>`;
    $("#result pre").textContent = msg; $("#result").scrollIntoView({ behavior: "smooth", block: "center" }); };
}

/* ---------- page: 3D studio ---------- */
function studioPage() {
  const shirts = PRODUCTS.filter(p => p.type === "shirt"); let cur = byId(new URLSearchParams(location.search).get("id")) || shirts[0], c;
  $("#chips").innerHTML = shirts.map(s => `<button type="button" data-id="${s.id}" aria-pressed="${s.id === cur.id}">${s.name}</button>`).join("");
  const pick = p => { cur = p; document.querySelectorAll("#chips button").forEach(b => b.setAttribute("aria-pressed", b.dataset.id === p.id)); $("#side").innerHTML = `<h2 style="font-size:2rem">${p.name}</h2><p>${p.desc}</p><p class="note">Model file: <code>${p.model || "none set"}</code></p><div class="row"><a class="btn" href="product.html?id=${p.id}#order">Order this</a></div>`; c = mountViewer($("#viewer"), p, t => $("#status").textContent = t); };
  $("#chips").onclick = e => { const b = e.target.closest("button"); if (b) pick(byId(b.dataset.id)); };
  document.querySelectorAll("[data-a]").forEach(b => b.onclick = () => c && c[b.dataset.a]());
  pick(cur);
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  chrome();
  document.querySelectorAll("[data-slot]").forEach(el => { const s = el.dataset.slot;
    if (s === "products") el.innerHTML = PRODUCTS.map(card).join("");
    if (s === "featured") el.innerHTML = PRODUCTS.slice(0, 3).map(card).join("");
    if (s === "contact") el.innerHTML = contactButtons();
    if (s === "faq") el.innerHTML = SITE_CONFIG.faq.map(f => `<details><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("");
    if (s === "mock") el.innerHTML = mock(byId(el.dataset.id), el.dataset.view) + `<span class="tag">Digital mockup</span>`;
    if (s === "email") { el.href = "mailto:" + SITE_CONFIG.email; el.textContent = SITE_CONFIG.email; }
  });
  const pg = document.body.dataset.page; if (pg === "product.html") productPage(); if (pg === "3d-studio.html") studioPage();
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1 }) : null;
  document.querySelectorAll(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));
  if (location.hash === "#order") setTimeout(() => $("#order") && $("#order").scrollIntoView(), 100);
});
