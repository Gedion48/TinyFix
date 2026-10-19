import { FixSolution } from '../types';

export const SOLUTIONS: FixSolution[] = [
  // ==========================================
  // PRODUCTIVITY (6 solutions)
  // ==========================================
  {
    id: 'prod-open-doc',
    title: 'The 2-Minute Gateway Kickstart',
    category: 'productivity',
    timeMinutes: 2,
    problem: 'Paralyzed by a looming essay, report, or project you keep delaying',
    tagline: 'Defeat resistance by promising yourself to do ONLY the setup.',
    steps: [
      'Open the blank document or code workspace and give it a temporary file title.',
      'Type just 3 bullet points outlining what the final piece looks like.',
      'Give yourself explicit mental permission to close it immediately if you want to.',
      'Notice how starting broke the hardest emotional friction barrier.'
    ],
    proTip: 'The brain fears indefinite energy expenditure. Promising yourself an instant exit makes opening the document painless.',
    tags: ['procrastinating', 'start', 'writing', 'work', 'stuck', 'resistance', 'focus', 'essay', 'task'],
    difficulty: 'Effortless',
  },
  {
    id: 'prod-tab-graveyard',
    title: 'The Tab Graveyard 5-Minute Purge',
    category: 'productivity',
    timeMinutes: 5,
    problem: 'Dozens of open browser tabs eating memory and causing cognitive clutter',
    tagline: 'Reset your mental bandwidth without losing anything truly essential.',
    steps: [
      'Pin the 1 tab you actually need right now for your immediate task.',
      'Bookmark all open tabs into a single folder named "Archive - [Today\'s Date]".',
      'Hit "Close other tabs" with clean, decisive closure.',
      'Breathe in the calm of an empty browser bar and get to work on that 1 pinned tab.'
    ],
    proTip: '95% of tabs in your archive will never be opened, and that is fine. The archive exists to soothe your fear of loss, not for research.',
    tags: ['tabs', 'browser', 'clutter', 'focus', 'overwhelmed', 'computer', 'screen', 'digital'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'prod-next-physical-action',
    title: 'The Next Physical Action Tiebreaker',
    category: 'productivity',
    timeMinutes: 10,
    problem: 'Staring at a vague to-do list item like "Work on taxes" or "Fix car"',
    tagline: 'Convert abstract dread into a micro-action requiring zero willpower.',
    steps: [
      'Take the task you are avoiding and rewrite it starting with an everyday verb (e.g., "Find", "Click", "Text", "Open").',
      'Shrink it until it describes a literal physical movement (e.g., "Open desk drawer and locate folder labeled Auto").',
      'Set a 5-minute timer and perform ONLY that physical motion.',
      'Stop or keep going — either way, the task is no longer stalled.'
    ],
    proTip: 'You cannot "do" a project. You can only perform physical actions in space and time. Always reduce projects to gestures.',
    tags: ['todo', 'busy', 'next', 'choose', 'overwhelmed', 'priorities', 'clarity', 'list'],
    difficulty: 'Focused Blitz',
  },
  {
    id: 'prod-inbox-surface-skim',
    title: 'The 5-Minute Inbox Zero Surface Skim',
    category: 'productivity',
    timeMinutes: 5,
    problem: 'Inbox count climbing, sparking background dread every time you check mail',
    tagline: 'Clear the junk, star the essentials, and touch nothing else.',
    steps: [
      'Search "unsubscribe" in your search bar and select-all non-personal newsletters.',
      'Archive or bulk-delete everything older than 7 days that doesn\'t require legal/financial reply.',
      'Scan the remaining top 10 emails: reply to any message needing under 30 words immediately.',
      'Star any message needing thought, and close the email app.'
    ],
    proTip: 'Inbox Zero is a triage methodology, not a life philosophy. Most emails are notifications, not responsibilities.',
    tags: ['email', 'inbox', 'messages', 'communication', 'overflow', 'clean'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'prod-frictionless-dump',
    title: 'The Frictionless Brain Dump',
    category: 'productivity',
    timeMinutes: 5,
    problem: 'Mind spinning with ten different worries, chores, and loose threads',
    tagline: 'Offload your mental RAM onto cheap scrap paper in 300 seconds.',
    steps: [
      'Grab a blank scrap paper and an ink pen (digital notes invite app distraction).',
      'Write continuously for 3 minutes everything buzzing in your skull — no grammar, no order.',
      'Circle the single item that, if handled today, relieves 50% of the anxiety.',
      'Park the rest of the list in your pocket or drawer out of sight.'
    ],
    proTip: 'Working memory holds approximately 4-7 chunks at once. A dump moves them to external storage so processing power returns.',
    tags: ['anxiety', 'worried', 'scattered', 'brain', 'mind', 'stress', 'thoughts', 'focus'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'prod-micro-delegate',
    title: 'The 2-Minute Question / Ping Blitz',
    category: 'productivity',
    timeMinutes: 2,
    problem: 'Waiting on someone else or hesitating to send that short status update',
    tagline: 'Fire off the 1 message holding up an entire workflow.',
    steps: [
      'Draft a 2-sentence direct message: state the question clearly and provide a suggested default choice.',
      'Example: "Hey [Name], do you prefer Option A or B for the deck? If I don\'t hear back by 3pm, I will proceed with Option A."',
      'Press send immediately without over-editing.',
      'Cross the waiting dependency off your mental queue.'
    ],
    proTip: 'Default-action messages prevent endless back-and-forth email chains and give the recipient permission to say "looks good".',
    tags: ['message', 'email', 'delegate', 'slack', 'colleague', 'communication', 'quick'],
    difficulty: 'Effortless',
  },

  // ==========================================
  // HOME & ORGANIZATION (6 solutions)
  // ==========================================
  {
    id: 'home-floor-scramble',
    title: 'The 10-Minute Floor Scramble',
    category: 'home',
    timeMinutes: 10,
    problem: 'Room looks like a disaster zone with clothes, bags, and items strewn on the floor',
    tagline: 'Clear the visible floor area first for an instant 80% visual calm.',
    steps: [
      'Grab an empty laundry basket and walk the perimeter of the room.',
      'Toss every piece of fabric/clothing into the basket (dirty or clean, sort later).',
      'Put all trash and food wrappers directly into a garbage bag.',
      'Pick up shoes and slide them into a single line against the wall or closet.',
      'Look at your clear floor — the psychological weight instantly drops.'
    ],
    proTip: 'Human eyes perceive chaos primarily through horizontal surfaces (floors, countertops). Clear the ground first.',
    tags: ['messy', 'room', 'floor', 'clothes', 'cleaning', 'tidy', 'bedroom', 'chaos', 'disorganized'],
    difficulty: 'Focused Blitz',
  },
  {
    id: 'home-entryway-reset',
    title: 'The 5-Minute Entryway Launchpad Reset',
    category: 'home',
    timeMinutes: 5,
    problem: 'Frantic morning searches for keys, wallet, sunglasses, or transit cards',
    tagline: 'Set up an infallible tomorrow-morning exit launchpad right now.',
    steps: [
      'Clear a single small dish, bowl, or tabletop corner near the front door.',
      'Place your everyday carry items there right now: keys, wallet, work badge, headphones.',
      'Hang up your jacket and place tomorrow\'s shoes right beneath it.',
      'Plug your phone charging cable into reach so your phone lands here overnight.'
    ],
    proTip: 'A chaotic morning starts the night before. Dedicating one fixed drop-bowl saves up to 15 minutes of adrenaline every single day.',
    tags: ['keys', 'wallet', 'morning', 'door', 'entryway', 'hallway', 'shoes', 'leave'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'home-one-dirty-drawer',
    title: 'The "One Dirty Drawer" Triage',
    category: 'home',
    timeMinutes: 5,
    problem: 'Junk drawer jammed with cables, dead pens, expired receipts, and mystery screws',
    tagline: 'Transform one micro-zone into an oasis of satisfaction in five minutes.',
    steps: [
      'Dump the drawer onto your desk or bed surface.',
      'Test and toss all dead pens, mystery scraps, and expired papers into the bin.',
      'Group similar remaining items (chargers together, pens together, tools together).',
      'Use small recycled box lids or cardboard strips as mini dividers before returning items.'
    ],
    proTip: 'Do not attempt to organize the whole house. One clean drawer gives your brain a tangible trophy of competence.',
    tags: ['drawer', 'junk', 'organize', 'desk', 'clutter', 'sort', 'mess', 'cables'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'home-speed-dish-blitz',
    title: 'The Speed Dish Blitz',
    category: 'home',
    timeMinutes: 10,
    problem: 'Sink overflowing with dirty plates and glasses, making cooking impossible',
    tagline: 'A battle-tested 10-minute kitchen turnaround without dread.',
    steps: [
      'Run hot water and squirt dish soap onto a sponge to build immediate suds.',
      'Quickly stack all like items together: plates on plates, bowls on bowls, silverware in a tall cup.',
      'Wash or load the biggest items first (pots/pans or plates) — watch the sink empty at double speed.',
      'Wipe down the stainless steel faucet with a dry cloth for a gleaming finish.'
    ],
    proTip: 'Stacking before washing takes 45 seconds but eliminates the chaotic visual feeling of a towering mountain of dishes.',
    tags: ['dishes', 'sink', 'kitchen', 'plates', 'cleaning', 'chores', 'messy'],
    difficulty: 'Focused Blitz',
  },
  {
    id: 'home-trash-bag-sweep',
    title: 'The 2-Minute Trash & Can Sweep',
    category: 'home',
    timeMinutes: 2,
    problem: 'Small scraps, empty bottles, and packaging accumulated on desks and tables',
    tagline: 'Remove pure rubbish to instantly refresh any living space.',
    steps: [
      'Take one standard trash bag and walk through every room briskly.',
      'Throw in empty cans, cardboard deliveries, junk mail, and worn wrappers.',
      'Tie the bag with a double knot and place it by the front door ready to exit.',
      'Check: 2 minutes spent, zero trash remains in your living space.'
    ],
    proTip: 'Never organize trash. Removing pure refuse first cuts room clutter volume by up to 40% before you organize a single real object.',
    tags: ['trash', 'garbage', 'rubbish', 'cans', 'clutter', 'quick', 'clean'],
    difficulty: 'Effortless',
  },
  {
    id: 'home-bed-reset',
    title: 'The 2-Minute Bed & Pillow Reset',
    category: 'home',
    timeMinutes: 2,
    problem: 'Bed tangled in blankets, making the entire bedroom feel sloppy and tired',
    tagline: 'The ultimate habit anchor that instantly makes your room feel like a hotel.',
    steps: [
      'Stand at the foot of the bed and pull the top sheet or duvet taut to the pillows.',
      'Smooth down the crease with both hands.',
      'Give both pillows a firm karate chop or fluff, and prop them upright against the headboard.',
      'Take one step back and admire the immediate order.'
    ],
    proTip: 'The bed covers up to 40% of the surface area in an average bedroom. Making it immediately makes the entire room feel 50% cleaner.',
    tags: ['bed', 'sheets', 'morning', 'bedroom', 'hotel', 'tidy', 'sleep'],
    difficulty: 'Effortless',
  },

  // ==========================================
  // FOOD & COOKING (6 solutions)
  // ==========================================
  {
    id: 'food-single-skillet',
    title: 'The 5-Minute Single-Skillet Scramble',
    category: 'food',
    timeMinutes: 5,
    problem: 'Hungry, low energy, and tempted to spend $20 on greasy food delivery',
    tagline: 'Nutritious hot protein in 5 minutes with only one pan to wash.',
    steps: [
      'Warm a skillet over medium-high heat with a dab of butter or olive oil.',
      'Crack 2 or 3 eggs directly into the pan — no need for a separate bowl.',
      'Toss in a handful of whatever is in the fridge: baby spinach, cheese, canned beans, or chopped lunchmeat.',
      'Stir gently with a spatula for 90 seconds until soft curds form; season with salt and pepper.',
      'Slide onto toast or directly onto a plate and enjoy.'
    ],
    proTip: 'Cracking eggs directly into the warm butter pan creates rustic swirls and saves washing an extra bowl and fork.',
    tags: ['cook', 'hungry', 'eggs', 'fast', 'dinner', 'breakfast', 'cheap', 'lazy', 'food'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'food-garlic-butter-noodles',
    title: 'The "Pantry Hero" 10-Minute Garlic Noodles',
    category: 'food',
    timeMinutes: 10,
    problem: 'Zero fresh groceries in the fridge, but you have dried pasta or noodles',
    tagline: 'Restaurant-worthy comfort food built entirely from dry cupboard staples.',
    steps: [
      'Boil water in an electric kettle (twice as fast as stove) and pour into a shallow pot with noodles or pasta.',
      'While boiling (6-7 mins), melt 2 tablespoons of butter with minced garlic or garlic powder and soy sauce or chili flakes.',
      'Drain pasta, reserving 2 spoonfuls of the starchy cooking water.',
      'Toss noodles in the garlic butter sauce with the reserved pasta water until glossy and rich.'
    ],
    proTip: 'Reserved pasta water contains suspended starches that emulsify with fats, turning simple melted butter into a silky restaurant glaze.',
    tags: ['pasta', 'noodles', 'pantry', 'groceries', 'dinner', 'dinner ideas', 'easy', 'cook'],
    difficulty: 'Focused Blitz',
  },
  {
    id: 'food-power-bowl',
    title: 'The Leftover Grain & Veggie Power Bowl',
    category: 'food',
    timeMinutes: 10,
    problem: 'Random mismatched leftovers (half a cup of rice, roasted veggies, grilled chicken)',
    tagline: 'Unify disparate fridge odds-and-ends into a deliberate cafe-style bowl.',
    steps: [
      'Reheat leftover rice, quinoa, or grains in a wide bowl with a splash of water for moisture.',
      'Top with any leftover proteins, canned chickpeas, or raw sliced cucumber/carrots.',
      'Whisk your "magic binder" dressing in a ramekin: 1 spoon peanut butter or tahini + 1 spoon soy sauce + splash of lemon or vinegar + hot water.',
      'Drizzle liberally over the warm bowl and finish with sesame seeds or crushed chips.'
    ],
    proTip: 'A flavorful, rich sauce bridges disparate ingredients so they taste curated rather than like yesterday\'s leftovers.',
    tags: ['leftovers', 'rice', 'grain', 'vegetables', 'healthy', 'lunch', 'pantry'],
    difficulty: 'Focused Blitz',
  },
  {
    id: 'food-emergency-hydration-nut',
    title: 'The 2-Minute Brain Reboot Snack',
    category: 'food',
    timeMinutes: 2,
    problem: 'Mid-afternoon 3 PM brain fog, headache, or sugar cravings',
    tagline: 'Fix the real biological root cause before reaching for sugary snacks.',
    steps: [
      'Down a large 16-ounce glass of water with a pinch of sea salt or a squeeze of lemon.',
      'Grab a small palmful of almonds, walnuts, or peanut butter on a spoon for steady fat/protein.',
      'Take 3 deep belly breaths while looking out a distant window.',
      'Wait 5 minutes; your sugar craving was likely mild dehydration.'
    ],
    proTip: 'The brain often misinterprets thirst and salt deficiency as urgent sugar hunger. Hydrating first cures 70% of 3 PM fatigue.',
    tags: ['snack', 'tired', 'energy', 'water', 'headache', 'craving', 'afternoon'],
    difficulty: 'Effortless',
  },
  {
    id: 'food-toast-rescue',
    title: 'The Gourmet Toast Rescue',
    category: 'food',
    timeMinutes: 5,
    problem: 'Only have stale or frozen bread and random condiments',
    tagline: 'Turn simple bread slices into a satisfying warm meal.',
    steps: [
      'Toast the bread on high until deep golden brown and crispy.',
      'Rub a cut clove of garlic or drizzle olive oil right over the hot, rough crust.',
      'Spread cream cheese, avocado, mayo, or mustard, then top with a sliced tomato, hardboiled egg, or canned tuna.',
      'Sprinkle flaky salt and black pepper; eat warm.'
    ],
    proTip: 'Toasting stale bread gelatinizes the retrograded starch molecules, restoring crunch and aroma instantly.',
    tags: ['bread', 'toast', 'breakfast', 'lunch', 'quick', 'easy', 'pantry'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'food-wilted-greens-soup',
    title: 'The "Wilted Greens" Broth Reviver',
    category: 'food',
    timeMinutes: 10,
    problem: 'A bag of spinach or herbs starting to droop in your crisper drawer',
    tagline: 'Rescue wilting vegetables from the trash into a soothing broth.',
    steps: [
      'Bring 2 cups of water with a bouillon cube (or broth carton) to a brisk boil.',
      'Chop and throw in wilting spinach, kale, carrots, or scallions.',
      'Add canned white beans, frozen dumplings, or leftover tofu for protein.',
      'Finish with a drop of sesame oil or grated ginger right before serving.'
    ],
    proTip: 'Vegetables lose crispness because cell walls lose water, but their minerals and vitamins remain intact in hot soup broths.',
    tags: ['soup', 'greens', 'spinach', 'vegetables', 'healthy', 'waste', 'dinner'],
    difficulty: 'Focused Blitz',
  },

  // ==========================================
  // STUDY & LEARNING (6 solutions)
  // ==========================================
  {
    id: 'study-blurting-sprint',
    title: 'The 2-Minute "Blurting" Recall Sprint',
    category: 'study',
    timeMinutes: 2,
    problem: 'Re-reading textbook chapters passively without retaining anything',
    tagline: 'Test true recall by blurting what you know on a blank sheet.',
    steps: [
      'Close your notes, books, and browser tabs completely.',
      'Set a timer for 2 minutes and write down every single term, formula, or concept you remember about the topic.',
      'Open your notes: highlight only the 2 or 3 critical gaps you forgot.',
      'Review those specific gaps; you just upgraded passive skimming to active recall.'
    ],
    proTip: 'Cognitive effort during retrieval strengthens neural pathways 3x faster than passive re-reading or highlighter pens.',
    tags: ['memorize', 'exam', 'notes', 'study', 'recall', 'learning', 'school', 'test'],
    difficulty: 'Effortless',
  },
  {
    id: 'study-subheading-skim',
    title: 'The 5-Minute Subheading & Diagram Skim',
    category: 'study',
    timeMinutes: 5,
    problem: 'Dreading reading a dense 40-page technical paper or textbook chapter',
    tagline: 'Map the architectural terrain before diving into paragraph weeds.',
    steps: [
      'Read ONLY the chapter title, the introduction paragraph, and the concluding summary.',
      'Flip through every page and read only bold headings and captions under charts/diagrams.',
      'Formulate 2 simple questions you expect the chapter to answer.',
      'Begin reading; your brain now has mental hooks to hang new details onto.'
    ],
    proTip: 'Pre-reading builds schema. Reading without schema feels like assembling a puzzle without ever seeing the box cover.',
    tags: ['reading', 'textbook', 'chapter', 'paper', 'research', 'speed', 'comprehension'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'study-feynman-translation',
    title: 'The Feynman 5-Minute Kindergarten Test',
    category: 'study',
    timeMinutes: 5,
    problem: 'Struggling to grasp an abstract or jargon-heavy concept',
    tagline: 'Explain it so simply that a 10-year-old would immediately get it.',
    steps: [
      'State the concept at the top of a page (e.g., "How an API works", "Photosynthesis").',
      'Explain it in 4 plain-English sentences using an everyday physical metaphor (e.g., a waiter in a restaurant).',
      'Notice any word where you had to use jargon — that is your exact blindspot.',
      'Look up that single jargon term and rephrase it into plain language.'
    ],
    proTip: 'If you cannot explain something simply, you don\'t understand it yet. Jargon often disguises incomplete understanding.',
    tags: ['understand', 'concept', 'feynman', 'explain', 'simplification', 'physics', 'math', 'code'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'study-flashcard-sprint',
    title: 'The 2-Minute Flashcard Lightning Round',
    category: 'study',
    timeMinutes: 2,
    problem: 'Waiting for an elevator, bus, or microwave with spare idle minutes',
    tagline: 'Transform micro-pockets of wasted waiting into exam superpowers.',
    steps: [
      'Open your flashcard app (Anki, Quizlet) or pick up your paper deck.',
      'Set an intention to review exactly 10 cards at lightning speed.',
      'Rate honesty: if unsure, mark "Again" immediately without arguing with yourself.',
      'Pocket the deck; repeat 3 times throughout the day for 30 daily repetitions.'
    ],
    proTip: 'Spaced repetition works best in frequent, micro-doses throughout the day rather than one giant 2-hour cramming slog.',
    tags: ['flashcards', 'anki', 'vocab', 'language', 'quick', 'memorization', 'practice'],
    difficulty: 'Effortless',
  },
  {
    id: 'study-question-triage',
    title: 'The 10-Minute Practice Question Triage',
    category: 'study',
    timeMinutes: 10,
    problem: 'A massive problem set or exam review packet feels overwhelming',
    tagline: 'Sort questions by difficulty so you rack up quick confidence wins first.',
    steps: [
      'Skim the entire question set and mark each item: Green (instant win), Yellow (need formula), Red (stumped).',
      'Solve 2 Green problems immediately for quick confidence points.',
      'Spend 5 minutes on 1 Yellow problem by looking up the required formula or theorem.',
      'Leave Red problems for office hours or study groups — you now know exactly what to ask.'
    ],
    proTip: 'Stalling on Problem #1 ruins exam morale. Triage protects your confidence and ensures you capture all easy points.',
    tags: ['math', 'exam', 'practice', 'homework', 'problems', 'test', 'grades'],
    difficulty: 'Focused Blitz',
  },
  {
    id: 'study-highlight-filter',
    title: 'The 5-Minute Highlight-to-Summary Filter',
    category: 'study',
    timeMinutes: 5,
    problem: 'Textbook glows neon with random highlights that you will never re-read',
    tagline: 'Condense your colorful book pages into one high-potency cheat card.',
    steps: [
      'Take a 3x5 index card or sticky note.',
      'Flip through your highlighted pages and force yourself to transcribe only the top 3 core rules or formulas.',
      'If it doesn\'t fit on one side of the index card, leave it out.',
      'Stick the card to your monitor or bathroom mirror for the week.'
    ],
    proTip: 'Restricting physical space forces prioritization. Constraints turn scattered highlights into durable insights.',
    tags: ['summary', 'notes', 'cheat sheet', 'highlight', 'revision', 'review'],
    difficulty: 'Quick Sprint',
  },

  // ==========================================
  // DAILY DECISIONS (6 solutions)
  // ==========================================
  {
    id: 'dec-coin-flip',
    title: 'The Coin-Flip Gut Check',
    category: 'decisions',
    timeMinutes: 2,
    problem: 'Torn between two equally balanced choices (Buy A or B? Go to party or stay home?)',
    tagline: 'Use chance not to make the choice, but to reveal your subconscious preference.',
    steps: [
      'Assign Option A to Heads and Option B to Tails.',
      'Flip a coin high in the air and catch it on the back of your hand.',
      'DO NOT look at the coin yet — observe your visceral reaction: what did you secretly hope it landed on?',
      'Choose the option your gut secretly wished for, regardless of the face showing.'
    ],
    proTip: 'The moment the coin is mid-air, your emotional brain drops rationalizations and registers its true intuitive preference.',
    tags: ['indecisive', 'choose', 'coin', 'gut', 'dilemma', 'decision', 'torn'],
    difficulty: 'Effortless',
  },
  {
    id: 'dec-10-10-10-rule',
    title: 'The 10/10/10 Perspective Rule',
    category: 'decisions',
    timeMinutes: 5,
    problem: 'Paralyzed by fear of making the wrong minor decision or offending someone',
    tagline: 'Test whether this decision actually matters on three distinct time horizons.',
    steps: [
      'Write down your decision on paper (e.g., "Say no to this weekend trip").',
      'Ask: "Will I care about this outcome in 10 minutes?" (Often yes, temporary awkwardness).',
      'Ask: "Will I care in 10 months?" (Usually no, forgotten by all parties).',
      'Ask: "Will I care in 10 years?" (Almost certainly negligible).',
      'Act on the long-term truth rather than the 10-minute discomfort.'
    ],
    proTip: 'Most daily decision stress comes from treating 10-minute consequences with 10-year emotional weight.',
    tags: ['stress', 'perspective', 'saying no', 'worry', 'anxiety', 'decision', 'future'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'dec-dinner-veto-game',
    title: 'The 2-Minute Dinner Veto Game',
    category: 'decisions',
    timeMinutes: 2,
    problem: '"What do you want to eat?" "I don\'t know, whatever you want" infinite loop',
    tagline: 'The foolproof "5-2-1" veto protocol for couples, roommates, and groups.',
    steps: [
      'Person A names 5 viable cuisines or spots (e.g., Thai, Tacos, Pizza, Greek, Burgers).',
      'Person B vetos 3 options, leaving exactly 2 finalists.',
      'Person A makes the final pick between the remaining 2.',
      'Decision concluded in under 90 seconds without a single awkward debate.'
    ],
    proTip: 'Generating options and eliminating options require different cognitive muscles. Splitting the roles eliminates tension.',
    tags: ['dinner', 'food', 'restaurant', 'couples', 'friends', 'eat', 'decide'],
    difficulty: 'Effortless',
  },
  {
    id: 'dec-good-enough-cutoff',
    title: 'The "Satisficing" Good-Enough Cutoff',
    category: 'decisions',
    timeMinutes: 5,
    problem: 'Spending 45 minutes comparing 18 nearly identical phone cases or blender models',
    tagline: 'Stop optimizing for the absolute best; pick the first option meeting your baseline.',
    steps: [
      'Write down your 2 non-negotiable criteria (e.g., under $30, 4+ star rating, ships today).',
      'Sort search results by customer rating or best seller.',
      'Pick the VERY FIRST item that satisfies both non-negotiable criteria.',
      'Click purchase and close the tab without looking back.'
    ],
    proTip: 'Psychologist Herbert Simon won a Nobel Prize proving "satisficers" (who pick the first acceptable option) are happier than "maximizers".',
    tags: ['shopping', 'amazon', 'purchase', 'buy', 'compare', 'perfectionism', 'reviews'],
    difficulty: 'Quick Sprint',
  },
  {
    id: 'dec-worst-case-decatastrophize',
    title: 'The Worst-Case De-Catastrophizing Worksheet',
    category: 'decisions',
    timeMinutes: 10,
    problem: 'Avoiding a decision because of an unspoken, catastrophic fear of failure',
    tagline: 'Bring the hidden nightmare into daylight so you can measure its real danger.',
    steps: [
      'Write the absolute worst-case realistic scenario if this decision goes completely wrong.',
      'Rate the probability of that worst case from 1% to 100%.',
      'Write 2 concrete steps you would take to repair the damage if the worst case happened.',
      'Notice that even the worst-case scenario is survivable and fixable in a few days.'
    ],
    proTip: 'Fear loves ambiguity. Defining the worst case in exact ink robs anxiety of its imaginary superpower.',
    tags: ['fear', 'catastrophe', 'risk', 'career', 'choice', 'worry', 'courage'],
    difficulty: 'Focused Blitz',
  },
  {
    id: 'dec-two-option-bracket',
    title: 'The 2-Option Elimination Bracket',
    category: 'decisions',
    timeMinutes: 5,
    problem: 'Overwhelmed by 6 different weekend activities or career tasks to do today',
    tagline: 'Run a March Madness mini-bracket to reveal the clear winner.',
    steps: [
      'List your candidates in pairs (e.g., Task 1 vs Task 2, Task 3 vs Task 4).',
      'For each pair, ask: "If I could ONLY do one today and the other vanishes forever, which one stays?"',
      'Advance the winner of each pair to the final round.',
      'Face off the final two: winner takes your immediate focus right now.'
    ],
    proTip: 'The human brain is terrible at comparing 5 items simultaneously, but remarkable at binary A vs B comparisons.',
    tags: ['priorities', 'bracket', 'tasks', 'weekend', 'options', 'eliminate', 'focus'],
    difficulty: 'Quick Sprint',
  }
];
