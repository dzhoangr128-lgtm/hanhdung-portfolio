# Cảm hứng phối đồ — DAIZY

## Presentation
Six supplied references replace the previous three-image lookbook. Three paired chapters: ballet (references 2, 3), studio (4, 6), city styling (1, 5). Main brand portrait remains the hero. Links lead to existing wrap and bra categories. Captions distinguish styling references from items in the current assortment.

## Images and tool
Built-in image_gen used for screenshot cleanup. Successful outputs converted to JPEG without retouching:
- assets/images/daizy-style-runway.jpg (reference 1)
- assets/images/daizy-style-ballet.jpg (reference 2)
- assets/images/daizy-style-city.jpg (reference 5)

For references 3, 4 and 6 the tool rejected cleanup; unmodified source images are stored as assets/images/daizy-style-{ribbon,stretch,barre}-source.png. CSS frames hide screenshot controls and the duplicate lower stretch panel. These assets remain source photographs, not generated edits.

## Prompt set
For each supplied reference: "Precise image cleanup for a fashion styling inspiration website. Preserve the original photograph, all people, their identities, clothing, poses and setting exactly. Remove only the browser/search interface overlays, rounded screenshot corners and buttons and reconstruct the background underneath naturally. No new people, no new clothing, no changed styling. Single clean photograph, no added text."
Reference 4 additionally: "Use only the TOP photograph as a single clean wide image; remove the bottom duplicated panel."

## Validation
Browser layout checks at desktop, tablet and mobile widths; six photos, three chapters, no horizontal overflow. Build checks all referenced static assets. Changes are local and have not been published.
