# Curetech Catalogue (free, static)

## 1. Set up (once)
1. Open `config.js`: set `whatsapp` (e.g. `9715XXXXXXXX`) and `siteUrl` (your GitHub Pages URL).
2. In `robots.txt` and `sitemap.xml` replace YOURUSERNAME.

## 2. Publish free on GitHub Pages
1. Create a free account at github.com, then **New repository** named `curetech-catalogue` (Public).
2. **Add file > Upload files**, drag in everything from this folder, **Commit**.
3. **Settings > Pages > Source: Deploy from a branch > main / (root) > Save.**
4. After ~1 minute your link is `https://YOURUSERNAME.github.io/curetech-catalogue/`. Share it on WhatsApp. The QR code at the page footer updates automatically.

## 3. Maintain products (edit `products.csv` in Excel or Google Sheets, save as CSV, re-upload)
- **Add product:** new row. **Update price:** change `Price AED` (numbers only, e.g. 250).
- **Change image:** put the image in an `images/` folder in the repo and write `images/name.jpg` in `Image URL` (or paste a full image link).
- **Noon URL:** paste the exact product page link (must start with `https://www.noon.com/uae-en/`). Blank = no Noon button.
- **Stock:** write `In Stock` or `Out of Stock`. **Featured:** `Yes`/`No`.
- **New category:** type a new name in `Category`; it appears automatically. To place it under a main group, add it in `categories.json`.
- **Remove product:** delete the row. Hundreds of rows work with no code changes.
- Wrap text containing commas in double quotes.
- **Validation:** open `…/#/check` to list products with missing price/image/SKU or bad Noon links.

## Notes
- Sample rows are marked SAMPLE DATA; delete them. Prices/Noon links are blank on purpose.
- Product links look like `…/#/p/apple-led-a2-pro-dental-handpiece` and open that exact product.
- GitHub Pages can't give per-product link previews or separate indexable URLs without a build step; Google indexes the main page.
