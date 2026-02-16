# TierTrade Simulator 🎮

Egy React SPA spreadsheet alapú üzleti szimulációs játék, ahol tier-alapú itemeket vásárolhatsz és eladhatsz.

## 🚀 Telepítés és futtatás

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Production build készítése
npm run build

# Production build preview
npm run preview
```

A játék elérhető: [http://localhost:5173](http://localhost:5173)

## 🎯 Játékleírás

A TierTrade Simulator egy üzleti szimulációs játék, ahol a cél minél több profitot termelni tier-alapú itemek vásárlásával és eladásával.

### Főbb jellemzők:
- **5 érték minden itemhez:**
  - Tier (1-5)
  - Vételár
  - Eladási ár
  - Készlet
  - Upgrade szint
- **10×10 spreadsheet** szerkeszthető cellákkal
- **Dinamikus piaci rendszer:** kereslet, infláció, véletlen események
- **Item fejlesztés:** minden upgrade csökkenti a vételárat 5%-kal, növeli az eladási árat 10%-kal
- **Automatikus mentés:** LocalStorage segítségével

## 📊 Játékmechanika

### 1. Item vásárlás és eladás
- Válassz egy itemet, állítsd a mennyiséget, és kattints a "Vásárlás" vagy "Eladás" gombra
- Figyeld a piaci árakat: vásárolj alacsony áron, add el magas áron!

### 2. Piaci információk
- **Kereslet:** befolyásolja az eladási árakat
- **Infláció:** befolyásolja a vételárakat
- **Események:** jó/rossz időjárás, amely rövid távon befolyásolja az árakat

### 3. Item fejlesztés
- Fejleszd az itemeket, hogy jobb áron vedd és add el őket
- Minden fejlesztés 100 Ft × (aktuális szint + 1) ba kerül

### 4. Spreadsheet használata
- Használd a 10×10-es spreadsheetet számításokhoz
- Kattints egy cellára a szerkesztéshez
- Használj képleteket pl.: `=SUM(A1:A10)`

### 5. Következő nap
- Nyomd meg a "Következő nap" gombot a piaci változások aktiválásához
- A piaci körülmények minden nap változnak

## 🏗️ Technológiai stack

- **Frontend:** React 19
- **Build eszköz:** Vite
- **Stílusozás:** Tailwind CSS
- **State management:** React Context API + useReducer
- **Storage:** LocalStorage (automatikus mentés)

## 📁 Projekt struktúra

```
src/
├── components/          # React komponensek
│   ├── SpreadsheetGrid.jsx
│   ├── ItemCard.jsx
│   ├── MarketPanel.jsx
│   ├── FinancePanel.jsx
│   ├── UpgradePanel.jsx
│   └── StatsPanel.jsx
├── context/            # State management
│   ├── GameContext.jsx
│   └── gameReducer.js
├── App.jsx            # Fő alkalmazás komponens
└── main.jsx           # Alkalmazás belépési pont
```

## 🎮 Játék tippek

1. **Vásárolj alacsony infláció mellett**, add el magas kereslet mellett
2. **Fejleszd a magas tierű itemeket** először, mert több profitot hoznak
3. **Használd a spreadsheetet** a nyereség számításához
4. **Figyeld a piaci eseményeket** - jó időjárás csökkenti a vételárakat
5. **Diverzifikáld a portfóliód** - ne tarts mindent egy itemben

## 🔧 Fejlesztői információk

A projekt teljesen SPA (Single Page Application), nincs routing. Az állapotot a React Context API kezeli useReducer segítségével. A játék állapota automatikusan mentődik a böngésző LocalStorage-jába.

### Következő fejlesztési lehetőségek:
- Több item típus és tier
- Spreadsheet képletek támogatása
- Több játékos mód
- Online ranglista
- Export/import mentés

## 📄 Licenc

MIT License