# Coffee Finder (coffeeaust.in)

Web app that shows users one coffee recommendation based on their usual order and location. No browsing, no decisions - just go.

## User Flow

1. Allow location access
2. Enter usual order (text input)
3. Choose walk or drive
4. Get single result with reasoning + navigate button

## Scoring Algorithm

**Quality Score:** `rating * (reviewCount / (reviewCount + 100))`
- Higher review count = more confidence in the rating

**Combined Score:** `70% quality + 30% time proximity`
- Time proximity inverted (closer = better)

**Travel Limits:**
- Walking: max 20 minutes
- Driving: max 15 minutes

## Project Structure

```
coffeeaust.in/
├── data/
│   └── austin-coffee-shops.json  # Curated shop database
├── src/
│   ├── types/
│   │   └── coffee-shop.ts        # TypeScript interfaces
│   └── utils/
│       └── scoring.ts            # Scoring algorithm
└── README.md
```

## Coffee Shop Database

Currently seeded with 24 curated Austin coffee shops including:
- **Award Winners:** Desnudo Coffee (2025 CultureMap Tastemaker)
- **Top Rated:** Fleet Coffee (5.0), Terrible Love (4.9), Greater Goods (4.9)
- **MICHELIN Featured:** Mercado Sin Nombre
- **Specialty Drink Spots:** Civil Goat (cortados), CaPhe.in (Vietnamese phin)

## TODO

- [ ] React frontend
- [ ] Backend API
- [ ] Admin interface for shop management
- [ ] Order-to-specialty matching logic
