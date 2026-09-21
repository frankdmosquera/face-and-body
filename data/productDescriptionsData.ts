/**
 * Our description for each product, keyed by the slug in `data/products/`.
 *
 * It lives apart from those JSON files because they are Eminence's text,
 * scraped from eminenceorganics.com, and must stay that way to be worth
 * re-scraping. This file is the only product copy that goes on the site.
 * Nothing here is invented: each line says what Eminence's own tagline and
 * description say, in our voice, so the page is not competing with a bigger,
 * older site using its own sentences.
 *
 * The `cardBlurb` field in those JSON files is unusable and must never be
 * rendered. 175 records carry one and there are 26 distinct values between
 * them, so the scraper stamped a handful of cleanser blurbs across everything:
 * Lilikoi Daily Defense Moisturizer SPF 40 is labelled "Gentle, balancing
 * facial cleanser". Of 62 records where the name and the blurb both state a
 * product type, 54 disagree. Use `tagline` as the source; that one is sound,
 * 138 distinct lines across the 138 distinct products that carry it.
 *
 * Claims stay soft on purpose. "Lifts the look of a dark circle" rather than
 * "removes dark circles": she is a clinic, not a laboratory, and a cosmetic
 * claim that reads as a medical one is the one thing on this page that can
 * cost her something.
 */
export const productDescriptionsData: Record<string, string> = {
  // Cleansing and clearing - cleansers
  "stone-crop-cleansing-oil":
    "A non-greasy cleansing oil that lifts makeup and the day off with it. Sunflower and jojoba leave skin soft rather than squeaky.",
  "monoi-age-corrective-exfoliating-cleanser":
    "A refining cleanser that washes off the day and smooths the surface with it. Monoi oil and fruit acids, aimed at normal to dry skin.",
  "stone-crop-gel-wash":
    "A gentle gel cleanser that takes the day off without stripping. Mild enough for sensitive skin, with botanicals that even out tone.",
  "mangosteen-daily-resurfacing-cleanser":
    "A milky gel that exfoliates with lactic acid instead of grit, so nothing is scrubbed. Made to carry on the work of a peel between appointments.",
  "clear-skin-probiotic-cleanser":
    "A cream-gel cleanser for oily and breakout-prone skin, with cucumber and tea tree. Almond milk and yoghurt keep it from stripping moisture on the way.",
  "barbados-cherry-enzyme-cleansing-powder":
    "A powder that foams in wet hands, cleansing and exfoliating in one pass. Fruit enzymes do the exfoliating, so there is nothing abrasive in it.",
  "kombucha-microbiome-foaming-cleanser":
    "A liquid that turns to foam, using micelles to lift grime rather than detergent. Kombucha and white tea settle the redness that comes with dryness.",
  "tulsi-snow-mushroom-cleansing-milk":
    "A milky cleanser that lathers lightly and cleans deeply without stripping. Tulsi and snow mushroom calm the redness that city air leaves behind.",
  "coconut-milk-cleanser":
    "A gentle cream cleanser built around coconut milk, for dry or irritated skin. Leaves a dewy finish rather than a tight one.",
  "charcoal-exfoliating-gel-cleanser":
    "A gel that works up into an exfoliating lather, with charcoal drawing out congestion. For oily skin with visible pores and a dull surface.",
  "lemon-grass-cleanser":
    "A hypoallergenic cream cleanser on a base of olive, sunflower and flax oils. Made for sensitive or dehydrated skin, with herbs that settle it down.",
  "firm-skin-acai-cleanser":
    "A cream cleanser for mature skin, with acai, seabuckthorn and hyaluronic acid. Cleans without taking the bounce out of the skin.",
  "calm-skin-chamomile-cleanser":
    "A calming cream cleanser with chamomile, arnica and rosemary. For sensitive skin that flushes easily, including skin with rosacea.",
  "acne-advanced-cleansing-foam":
    "A light liquid-to-foam wash with time-release salicylic acid to clear blocked pores. Herbs soothe alongside it, so acne-prone skin is not left raw.",
  "bright-skin-cleanser":
    "The first step of a pigmentation routine, with licorice root and bearberry. For normal to dry skin working on dark spots and uneven tone.",

  // Cleansing and clearing - toners and mists
  "stone-crop-hydrating-mist":
    "A hydrating mist for uneven skin, spritzed after cleansing. It gives whatever goes on next something to hold to.",
  "neroli-age-corrective-hydrating-mist":
    "A toner for mature skin, with apple stem cells and a plant alternative to retinol. Neroli oil carries the scent, and skin feels smoother for it.",
  "kombucha-microbiome-balancing-essence":
    "An essence that primes skin before the rest of the routine, using pre and postbiotics. White tea and jasmine settle dry, dull skin at the same time.",
  "pineapple-refining-tonique":
    "A mild exfoliating tonique with PHA, bromelain and tranexamic acid. It works on dull, textured skin daily without the sting of a stronger acid.",
  "shiitake-ashwagandha-bi-phase-mist":
    "A two-layer mist you shake before use, hydrating and shielding in one spritz. Shiitake and ashwagandha are there for skin under environmental strain.",
  "soothing-chamomile-tonique":
    "A calming toner of comforting herbs, for skin that needs settling rather than treating. It also neutralises skin after a peel, at home or in clinic.",
  "birch-water-purifying-essence":
    "A light essence that purifies with birch water and firms with botanical collagen. Its real job is helping everything after it absorb properly.",
  "mangosteen-revitalizing-mist":
    "An antioxidant mist of red clover, ribose and mangosteen. Revives skin through the day and refines the look of pores.",
  "lime-refresh-tonique":
    "A refreshing vitamin C toner for normal to oily skin, made with lime juice. Tones and balances without drying things out.",
  "hawthorn-tonique":
    "For dehydrated, irritated and sensitive skin, with hawthorn, chamomile and marjoram. Takes the edge off visible irritation and leaves skin balanced.",

  // Eye, lip and SPF - eye care
  "neroli-age-corrective-eye-serum":
    "A hydrating serum for the thin skin around the eye, built on neroli and apple stem cells. Aimed at crow's feet and fine lines on mature skin.",
  "wild-plum-eye-cream":
    "Iron-rich wild plum, worked into a cream for the look of dark circles. Leaves the eye area looking brighter and less tired.",
  "marine-flower-peptide-eye-cream":
    "A rich eye cream using plant peptides and algae on wrinkles, puffiness and dark circles. Holds hydration long enough to wear day or night.",
  "snow-mushroom-moisture-cloud-eye-cream":
    "A light, whipped eye cream that loads the area with water via snow mushroom. Botanical peptides smooth roughness and take down puffiness and bags.",
  "hibiscus-ultra-lift-eye-cream":
    "A cooling steel rollerball that massages hibiscus and ice wine around the eye. De-puffs quickly, and softens the look of lines and dark circles.",
  "vitamin-c-eye-cream":
    "A light eye cream on stable vitamin C, with cloudberry and yerba mate caffeine. Softens dark circles and fine lines, with a faint illuminating finish.",
  "lavender-night-eye-cream":
    "A rich night cream for the eye area, doing its work while you sleep. Lavender and evening primrose scent it, argan stem cells target crow's feet.",
  "bearberry-eye-repair-cream":
    "An ultra-hydrating cream for the fragile skin of the eye contour. Eyebright, hops and bearberry work on the visible signs of ageing.",
  "herbal-eye-make-up-remover":
    "A pH-balanced remover that takes eye makeup off without scrubbing. Cucumber, lavender, calendula and chamomile keep it calm enough for sensitive eyes.",

  // Eye, lip and SPF - lip care
  "marine-flower-peptide-lip-serum":
    "A silky serum for smoother, fuller-looking lips and the fine lines around them. Wear it alone or under a balm or lipstick.",
  "rosehip-lemongrass-lip-balm-spf-15":
    "A lip balm carrying SPF 15, for dry lips that also need sun protection. Rosehip relieves the dryness and lavender restores the softness.",
  "citrus-lip-balm":
    "A citrus balm that skips petroleum entirely, carried on shea butter and sunflower oil. Heavy on hydration, with a light sheen and peptides that plump over time.",
  "lip-trio":
    "A three-step treatment for winter-dry lips: enzymes to refine, a rich masque to hydrate, then a minty balm to finish.",

  // Eye, lip and SPF - sun care
  "sun-defense-minerals":
    "A brush-on mineral powder at SPF 30, lightly tinted and buildable. Feather-light and mattifying, covering UVA, UVB and blue light.",
  "radiant-protection-spf-fluid":
    "A hydrating SPF 30 fluid that finishes dewy rather than flat. For combination to dry skin, and it softens the look of fine lines as it goes.",
  "lilikoi-mineral-defense-sport-sunscreen-spf-30":
    "A sport SPF 30 for face and body, non-greasy and water resistant for 40 minutes. Made for swimming and anything else that makes you sweat.",
  "lilikoi-daily-defense-moisturizer-spf-40":
    "A light daily moisturiser with mineral SPF 40 built in, so it is one step not two. Cocoa seed and mandarin peel work on blue light and pollution.",
  "daily-defense-tinted-spf":
    "A tinted all-mineral SPF 50+, light enough for daily wear and non-comedogenic. Antioxidants hydrate while it covers broad spectrum and blue light.",
  "bright-skin-moisturizer-spf-40":
    "A brightening daily moisturiser carrying mineral SPF 40 in the same step. Licorice root and bearberry target dark spots, for normal to combination skin.",

  // Resurfacing - exfoliants and peels
  "strawberry-rhubarb-dermafoliant":
    "A powder you mix in your palm, so you decide how gritty it gets. Lactic acid and polishing flours lift excess oil and leave the surface smooth.",
  "stone-crop-oxygenating-fizzofoliant":
    "A powder that fizzes into a foam as it exfoliates, with rice and adzuki flour. Aimed at congested skin, and it brightens as it clears.",
  "radish-seed-refining-peel":
    "A hypoallergenic peel of nettle, oat and willow bark, working on breakouts and lines. Not one for active acne or very sensitive skin.",
  "yam-pumpkin-enzyme-peel-5":
    "An enzyme peel of yam and pumpkin that speeds up how fast dead skin clears. Works on pigmentation, fine lines and sun damage. Keep it off active acne.",
  "calm-skin-chamomile-exfoliating-peel":
    "Pre-soaked pads using lactic and mandelic acids, mild enough for sensitive skin. Chamomile, calendula and arnica calm redness as it exfoliates.",
  "clear-skin-willow-bark-exfoliating-peel":
    "Pre-soaked pads with salicylic acid and willow bark for blocked pores. Azelaic acid and biosulphur work alongside on the look of problem skin.",
  "bright-skin-licorice-root-exfoliating-peel":
    "Pre-soaked pads with lactic and mandelic acids for uneven pigmentation. Licorice root and a plant alternative to hydroquinone work on dark spots.",

  // Hydrating and brightening - moisturisers
  "strawberry-rhubarb-hyaluronic-hydrator":
    "A light vegan gel-cream that locks water into dull skin for a dewy finish. Botanical hyaluronic acid and panthenol do the holding.",
  "coconut-age-corrective-moisturizer":
    "A moisturiser for mature skin that tightens and lifts as it goes on. Coconut, shea butter and apple stem cells, for normal to dry skin.",
  "bakuchiol-niacinamide-moisturizer":
    "A gel-cream pairing bakuchiol, a plant stand-in for retinol, with niacinamide. Smooths wrinkles and tightens pores without the irritation retinol brings.",
  "monoi-age-corrective-night-cream-for-face-neck":
    "A night cream rich enough for the neck and decolletage as well as the face. Monoi, evening primrose and argan stem cells smooth the look of wrinkles overnight.",
  "calm-skin-chamomile-moisturizer":
    "Chamomile and arnica for sensitive skin that reddens easily, including rosacea. Shea butter and calendula oil hydrate while the redness settles.",
  "ceramide-repair-balm":
    "A rich balm of ceramides, allantoin and calendula for skin that has dried out. Cupuacu butter and elderberry seed oil leave it soft and supple.",
  "arctic-berry-peptide-radiance-cream":
    "A daily moisturiser carrying a peptide complex aimed at evenness and glow. It is the third step of Eminence's three-part Arctic Berry system.",
  "ashwagandha-ultra-rich-restorative-cream":
    "A rich cream for face and body, with ashwagandha, reishi and snow mushroom. Deep hydration and barrier support, with a calm, woodsy scent.",
  "blueberry-soy-night-recovery-cream":
    "An overnight cream working while skin does its own repair, which is mostly at night. Firmness and tone come back by morning, on blueberry and soy milk.",
  "apricot-whip-moisturizer":
    "Apricot and carrot juice, rich in vitamins A, B, C and D, whipped light. For normal to dry skin that needs feeding rather than treating.",
  "firm-skin-acai-moisturizer":
    "A richer moisturiser for mature skin, on shea butter and botanical hyaluronic acid. Plumps, and improves the look of elasticity.",
  "marine-flower-peptide-night-cream":
    "A rich overnight cream made for delicate, crepey skin. Locks moisture in and softens the look of fine lines while you sleep.",
  "apricot-calendula-nourishing-cream":
    "For dehydrated, sensitive skin, on apricot, echinacea and aloe. Flax seed helps it regenerate, and the ingredients are biodynamically grown.",
  "hibiscus-ultra-lift-neck-cream":
    "A firming cream for the delicate skin of the neck and decolletage. Hibiscus and botanical hyaluronic acid tighten while paprika and edelweiss lift.",
  "bright-skin-overnight-correcting-cream":
    "The night half of a pigmentation routine, ultra-rich and worked while you sleep. Licorice root and bearberry reduce the look of dark spots.",
  "clear-skin-probiotic-moisturizer":
    "An ultra-light daily moisturiser for breakout-prone skin that still needs water. Cucumber and tea tree calm blemishes, probiotics keep pores clear.",
  "stone-crop-whip-moisturizer":
    "Light enough for daytime, and it disappears rather than sitting on top. Stone crop calms irritation and clarifies the skin as it hydrates.",
  "mangosteen-gel-moisturizer":
    "A gel-cream that goes on dewy and settles to a smooth matte finish. Minimises the look of pores as it hydrates.",
  "acne-advanced-clarifying-hydrator":
    "An ultra-light lotion for oily, acne-prone skin, finishing matte. Lotus cuts the shine and time-release salicylic acid works on the breakouts.",
  "echinacea-recovery-cream":
    "A fluid cream of echinacea, yarrow and evening primrose that never feels greasy. Suits oily or sensitive skin that is dehydrated or irritated.",

  // Hydrating and brightening - serums, oils and concentrates
  "facial-recovery-oil":
    "A hydrating facial oil of herbs and plant oils, for sensitive or ageing skin. Biodynamically grown, and it soothes as much as it hydrates.",
  "rosehip-triple-ce-firming-oil":
    "A firming facial oil on rosehip, seabuckthorn and jojoba, heavy on hydration. Built as the partner to the Citrus and Kale C+E Serum.",
  "bamboo-firming-fluid":
    "A light firming fluid for skin that has lost some bounce. Bamboo and coconut hydrate deeply while apple stem cells work on the tightness.",
  "strawberry-rhubarb-hyaluronic-serum":
    "A hydrating serum for skin that has gone dry or dehydrated. Botanical hyaluronic acid and cica leave it visibly smoother and softer.",
  "citrus-kale-potent-ce-serum":
    "Vitamin C and E, held stable by ferulic acid so the antioxidants keep working. Brightens, and softens the look of fine lines over time.",
  "copper-tripeptide-serum":
    "A light gel serum for skin just after a treatment, when it needs calming. Copper tripeptide and resveratrol settle redness and support elasticity.",
  "camellia-glow-solid-face-oil":
    "A face oil in solid form, melted in the palm before it goes on. Camellia and marula soften and hydrate dull, tired skin.",
  "marine-flower-peptide-concentrate":
    "A cream-gel concentrate that firms and works on the signs of ageing. Made to layer with the Marine Flower Peptide Serum rather than replace it.",
  "vitamin-c-serum":
    "A gel-cream serum of cloudberry, glutathione and mulberry. Over months it softens dark spots and fine lines and brings firmness back.",
  "charcoal-black-seed-clarifying-oil":
    "A non-greasy clarifying oil for congested, oily or combination skin. Activated charcoal and black seed absorb excess sebum and even out tone.",
  "bright-skin-licorice-root-booster-serum":
    "Licorice root at booster strength, for uneven tone and dark spots. Works alone or added to another product to push it further.",
  "firm-skin-acai-booster-serum":
    "Acai and hyaluronic acid at booster strength, aimed at the signs of ageing. Works alone or mixed into the moisturiser you already use.",
  "stone-crop-serum":
    "An intense hydrator with antioxidants behind it, for reactive or dehydrated skin. Also suits skin that is sensitive or unevenly pigmented.",
  "clear-skin-willow-bark-booster-serum":
    "Willow bark is where salicylic acid comes from, and this is it at concentrate strength. Tea tree works alongside it on irritation and breakouts.",
  "lavender-age-corrective-night-concentrate":
    "An overnight concentrate of argan oil, jojoba and shea butter. Builds the look of density back into mature skin and softens wrinkles.",
  "calm-skin-arnica-booster-serum":
    "Arnica, chamomile and lavender at booster strength, for skin prone to rosacea. Calms and balances, and tightens the look of pores.",
  "eight-greens-youth-serum":
    "Plant phytoestrogens from yucca, chasteberry and flax seed. Aimed at hormonal skin, and at the tightness and brightness that go with age.",
  "marine-flower-peptide-serum":
    "A potent gel serum of plant peptides that absorbs fast. Softens fine lines and wrinkles, leaving skin looking plumper.",
  "mangosteen-daily-resurfacing-concentrate":
    "A leave-on concentrate that resurfaces gently and refines the look of pores. Lactic acid clears buildup and keeps it from coming back.",
  "cornflower-recovery-serum":
    "Cornflower, chamomile and hibiscus, for skin that needs recovering rather than pushing. Improves the look of elasticity, from biodynamic ingredients.",
  "kombucha-microbiome-luminosity-serum":
    "A light gel serum on kombucha, ginger and jasmine, with pre and postbiotics. Evens out tone and lifts dullness, and it can be used daily.",

  // Lifting and firming
  "bamboo-age-corrective-masque":
    "A repairing masque for mature skin, on bamboo, argan oil and apple stem cells. Leaves skin looking toned and firmer once it comes off.",
  "tetrapeptide-lifting-gel":
    "An oil-free lifting gel with tetrapeptides and hyaluronic acid. Doubles as the conductive gel for microcurrent devices, or works on its own.",
  "snow-mushroom-reishi-masque":
    "A de-puffing masque that contours and tightens as it sets. Clay pulls out impurities while paracress firms the surface.",
  "linden-calendula-treatment":
    "A treatment cream you can use as a masque or leave on overnight. Linden and calendula nourish, and herbal oils work on the look of elasticity.",
  "citrus-kale-potent-ce-masque":
    "The masque in the Citrus and Kale C+E line, on stabilised vitamins C and E. Brightens dull skin and works on the damage daily exposure leaves.",
  "eight-greens-phyto-masque-hot":
    "A phytoestrogen masque that warms on the skin, which is what the name means. Works on hydration, elasticity, breakouts and oiliness at once.",
  "firm-skin-acai-exfoliating-peel":
    "Pre-soaked pads with lactic and glycolic acid, for mature or dry skin. Acai, grapefruit and goji hydrate while the acids work on fine lines.",
  "chocolate-mousse-hydration-masque":
    "An antioxidant cocoa masque with macadamia, almond and jojoba oils. Deep hydration for skin that has gone dry or dehydrated.",
  "hibiscus-instant-line-filler":
    "A line filler with a curved tip applicator, worked into individual lines. Botanical peptides smooth and tighten, with an effect you see straight away.",

  // Body - lotions and oils
  "yuzu-solid-body-oil":
    "A body oil in solid form, so nothing leaks in a bag. Yuzu and camu camu feed dry, dull skin, and PHA refines it as it hydrates.",
  "strawberry-rhubarb-hyaluronic-body-lotion":
    "A vegan body lotion that absorbs fast instead of sitting on the skin. Botanical hyaluronic acid hydrates, panthenol stops the moisture escaping.",
  "monoi-age-corrective-night-body-cream":
    "An ultra-rich body cream for overnight, on monoi and argan stem cells. Shea butter and jojoba repair dry skin while you sleep.",
  "apricot-body-oil":
    "Apricot kernel oil blended with grape seed and jojoba, for very dry skin. Slippery enough to double as a massage oil.",
  "stone-crop-body-oil":
    "A light body oil that absorbs fast and finishes matte rather than slick. Stone crop and arnica soothe, and it works well for massage.",
  "stone-crop-contouring-body-cream":
    "A contouring cream that firms and smooths the look of cellulite. Use it all over, or on the one area you want tightened.",
  "stone-crop-body-lotion":
    "Stone crop in a body lotion, evening out tone and unevenness. Suits sensitive skin, and skin that has been marked by sun.",
  "mangosteen-body-lotion":
    "A light body lotion carrying lactic acid, so it resurfaces as well as hydrates. Absorbs quickly to a satin finish.",
  "coconut-firming-body-lotion":
    "Grape seed oil with coconut and shea butter, for body skin that has lost firmness. Deep, lasting hydration, and skin feels tighter for it.",
  "quince-nourishing-body-lotion":
    "A hydrating body lotion of bioactive herbs, made for sensitive skin. The ingredients are biodynamically grown.",

  // Body - scrubs and hands
  "cranberry-pomegranate-sugar-scrub":
    "A natural sugar scrub that buffs as it exfoliates. Cranberry and pomegranate feed the skin vitamins on the way through.",
  "stone-crop-revitalizing-body-scrub":
    "Sugar and salt together, lathering into a creamy foam as you work it in. Stone crop and lemon peel brighten while the grains smooth.",
  "coconut-sugar-scrub":
    "A sugar scrub carried in coconut oil, so it hydrates while it exfoliates. High in antioxidants, and skin is left fed rather than stripped.",
  "mangosteen-replenishing-hand-cream":
    "A silky hand cream that gently resurfaces as well as hydrates. Mangosteen and lactic acid, and it holds for a long time.",

  // Skin - masques and treatments
  "kombucha-microbiome-leave-on-masque":
    "A rich leave-on masque for skin that has gone dry and tight. Nothing to rinse, it just absorbs, and the biotics support the barrier.",
  "mango-exfoliating-enzyme-masque":
    "A gel masque that exfoliates with fruit enzymes rather than grains. Pineapple, mango and Kakadu plum brighten with a load of vitamin C.",
  "clear-skin-probiotic-masque":
    "Cooling cucumber and refining yoghurt, for oily and acne-prone skin. Exfoliates gently while it works on the look of blemishes.",
  "strawberry-rhubarb-masque":
    "A replenishing cream masque that plumps as it gently exfoliates. Botanical hyaluronic acid and shea butter, for normal to dry skin.",
  "charcoal-black-seed-clay-masque":
    "A purifying clay masque with activated charcoal, drawing out what sits in the pore. Absorbs excess oil without leaving congested skin parched.",
  "bright-skin-masque":
    "The masque in the pigmentation routine, on licorice root and bearberry. Works on dark spots and uneven tone, for normal to dry skin.",
  "calm-skin-arnica-masque":
    "Arnica, calendula and ivy for visible redness and irritation. Useful after a treatment, and useful for skin prone to rosacea.",
  "firm-skin-acai-masque":
    "Acai with blueberry, raspberry and blackberry, feeding mature skin. Antioxidants plump and firm the surface over a course of use.",
  "turmeric-energizing-treatment":
    "A golden powder you mix with water until it whips into a mousse. Turmeric and zeolite warm the skin as they exfoliate, for dull or tired skin.",
  "superfood-booster-powder":
    "An ultra-fine powder you stir into your own moisturiser by the spoonful. Vitamin-rich superfoods, aimed at uneven tone and dark spots.",
  "raspberry-pore-refining-masque":
    "Raspberry, blueberry and blackberry, astringent enough to tighten the look of pores. Antioxidants alongside, for skin with visible pores.",
  "seabuckthorn-balancing-masque":
    "A creamy balancing masque of seabuckthorn, carrot juice and calendula. Conditions dry, sensitive skin, and jojoba revives it without clogging pores.",
  "acne-advanced-clarifying-masque":
    "A clay masque that doubles as a spot treatment, so it works whole face or dabbed on. Salicylic acid and sulphur treat, basil oil keeps irritation down.",
  "stone-crop-masque":
    "Ten minutes for skin that looks tired rather than problematic. Stone crop and honey put moisture back and leave it looking brighter.",
  "yellow-sweet-clover-anti-redness-masque":
    "Sweet clover and stone crop on visible redness, with jojoba on fine lines. Biodynamically grown, and mild enough for skin with rosacea.",
  "lime-stimulating-masque":
    "Phytohormones and vitamins that get the circulation going and leave skin rosy. It reddens the skin for an hour or two afterwards, which is normal.",
  "eight-greens-phyto-masque-not-hot":
    "The same phytoestrogen masque as the Hot version, without the warming sensation. Works on hydration, elasticity, breakouts and oiliness.",
  "pumpkin-latte-hydration-masque":
    "A pumpkin puree masque that puts the moisture balance back. Vitamin E and omega-9 work on ageing and the wear of daily exposure.",

  // Spa only. These are back-bar: she uses them ON you during a treatment, and
  // Eminence keeps trade pricing behind a stockist login, so they carry no
  // price and do not belong on a page that sells things. Written anyway,
  // because the place they earn their keep is the treatment pages, as evidence
  // of what is actually going on your face.
  "squalane-pro-multi-oil":
    "A professional slip oil on squalane and bisabolol, used through massage and dermaplaning. Gives the treatment its glide, then absorbs rather than sitting there.",
  "charcoal-black-seed-pro-desincrustation-gel":
    "The gel that goes on before extractions, softening skin so the pores give way. Binchotan charcoal and black seed absorb oil while it works.",
  "arctic-berry-enzyme-exfoliant":
    "An enzyme exfoliant that dissolves dead skin rather than scrubbing it off. Step one of the three-part Arctic Berry treatment, and not for active acne.",
  "yam-pumpkin-pro-enzyme-peel-20":
    "The professional strength of the yam and pumpkin enzyme peel. Works on pigmentation, fine lines and sun damage in a single treatment.",
  "chocolate-truffle-body-wrap":
    "A body wrap of cocoa and nut oils, worked over dry, dehydrated skin. Antioxidant-rich, and it refines the surface across the treatment.",
  "lip-comfort-plumping-masque":
    "The lip masque used in treatment, deeply hydrating and plumping. Also sold for home use as part of the Lip Trio.",
  "barbados-cherry-superfood-pro-enzyme-exfoliant":
    "A jam-textured enzyme exfoliant that warms as it works. Barbados cherry brightens and tightens while the enzymes refine the surface.",
  "mangosteen-lactic-pro-peel-10":
    "A professional-only lactic acid peel that refines the surface and the pores. Self-neutralising, and gentle enough for sensitive skin.",
  "menthol-rosehip-treatment":
    "A cooling treatment of menthol, rosehip and honey. For sensitive, reactive or blemished skin that needs settling mid-treatment.",
  "arctic-berry-pro-advanced-peel-activator-ma20":
    "Step two of the three-part Arctic Berry treatment, and the strongest of them. Deep exfoliation that evens tone, with antioxidants to hold redness down.",
  "citrus-enzyme-lip-exfoliator":
    "The lip exfoliator used in treatment, refining and plumping the lip area. Also sold for home use as part of the Lip Trio.",
  "paprika-herbal-treatment":
    "An active herbal treatment built on paprika, for mature, uneven or problem skin. Honey, sage, lavender and St John's Wort soothe alongside it.",
  "aha-fruit-pulp-treatment":
    "Whole apple and grape pulp with lactic acid, clearing dead skin as it brightens. It opens the way for whatever is applied after it.",
  "blueberry-detox-firming-peel":
    "A berry peel with lactic acid that cleans deep into the pore and tones. For dry, mature or sun-damaged skin, and not for rosacea.",
  "pineapple-nourishing-pro-enzyme-exfoliant":
    "A creamy enzyme exfoliant on ripe pineapple, for normal to dry skin. Polyglutamic acid hydrates while the enzymes refine the surface.",
  "amla-berry-oil-control-pro-enzyme-exfoliant":
    "An enzyme exfoliant for oily and combination skin, using lipase to break down sebum. Bromelain and papain resurface, leaving the skin smooth.",
  "herbal-cellulite-treatment":
    "A toning body wrap for cellulite and skin that has lost elasticity. Paprika and stinging nettle stimulate, honey keeps it hydrated.",
  "mango-enzyme-body-wrap":
    "A body wrap of mango and pineapple enzymes, hydrating and exfoliating at once. Gentle enough for any skin type.",
  "stone-crop-restorative-body-wrap":
    "A gel body wrap built on stone crop and aloe, head to toe. Hydrates, brightens and settles the skin across the treatment.",
};
