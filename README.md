# THE SCRIPTURE CO. website

Open **script.js**. Everything you will want to change is in the first two sections: `SITE_CONFIG` and `PRODUCTS`.

1. **Logo:** replace `assets/logo/the-scripture-co-logo.png` (keep the same file name).
2. **Product images:** put artwork in `assets/products/`. The site draws digital mockups from your artwork. Originals are kept in `assets/products/reference/`.
3. **Change an image:** replace the file (same name), or change the `art:` path of that product in `PRODUCTS`.
4. **Product name:** change `name:` in `PRODUCTS`.
5. **Price:** change `price: null` to a number, e.g. `price: 15000`. It shows as ₦15,000. `null` shows PRICE: TBA.
6. **New product:** copy one block in `PRODUCTS`, paste it with a comma after the one above, give it a new unique `id`, and edit the details. `type` is `shirt`, `tote` or `jar`. Use `sizes: []` for no sizes.
7. **Real 3D model:** export a `.glb`, put it in `models/`, and set `model:` for that product (for example `models/proverbs-shirt.glb`). If the file is missing the site shows a placeholder shirt.
8. **WhatsApp numbers:** edit `whatsappNumbers` in `SITE_CONFIG`.
9. **Instagram:** edit `instagramUrl` and `instagramHandle`.
10. **Email:** edit `email`.
11. **Pre-order form:** paste the link into `preorderFormUrl`. A Pre-order form button then appears after an order is placed.
12. **Publish on GitHub Pages:** create a GitHub repo, upload all files and folders (drag them in), then go to Settings > Pages, choose the `main` branch and `/ (root)`, and Save. Your link appears after a minute.

Notes: sizes are in `SITE_CONFIG.sizes`. FAQ answers are in `SITE_CONFIG.faq`. About text is in `about.html`. The 3D viewer needs an internet connection (it loads three.js from a CDN) and the real site online; opening files directly from your computer may not load images in 3D.

**Size chart:** shirt pages show "Size Chart — Coming Soon". When you have official measurements, edit `sizeChart` in `SITE_CONFIG` (the format is written in a comment right above it) and the table appears automatically.
