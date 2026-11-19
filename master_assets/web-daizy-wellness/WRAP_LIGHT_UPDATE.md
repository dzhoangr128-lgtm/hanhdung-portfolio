# Wrap Pilates — lightweight image update

Tool: built-in image_gen (five individual edits).
Final assets: assets/images/wrap_{vanilla,pink,yellow,cement,mocha}_light.jpg.
Original assets preserved. References updated in app.js, storefront.js and server/catalog.json.

Prompt set: for each of vanilla, pink, yellow, cement and mocha, use its original wrap photo as edit target and daizy-brand-muse.png as material reference. Replace only the thick ribbed wrap fabric with thin, lightweight, smooth, softly translucent stretch jersey; preserve color, model, pose, bra, leggings, background, crossover cut and waist tie. Fine edges and cuffs, soft small folds, no heavy ribbing or sweater bulk. Photorealistic portrait catalog image, no collage or added text.

Validation: inspected all five generated portraits; npm run build passed, 26 image paths verified.
Deployment: local workspace update only.
