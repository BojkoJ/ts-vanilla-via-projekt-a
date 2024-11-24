# Projekt A - VIA - Interaktivní aplikace počasí

## Požadavky projektu

-   Vytvořit aplikaci, která umožňuje uživatelům zadat město a zobrazit aktuální informace o počasí.
-   Použít veřejné API pro zpracování dat (např. JSON nebo XML).
-   Implementovat formuláře s validací dat a zpracováním uživatelských vstupů.
-   Použít komponenty třetích stran (např. mapy, grafy).
-   Stránky musí být plně statické a spuštěné lokálně bez serverové logiky.

---

## Funkcionality aplikace

1. **Formulář pro zadání města:**

    - Uživatel může zadat název města.
    - Validace vstupu pomocí knihovny **Zod** (kontrola délky názvu).

2. **Interaktivní mapa:**

    - Zobrazení polohy města pomocí knihovny **Leaflet.js**.

3. **Vizualizace dat:**

    - Graf teploty za posledních 8 hodin vytvořený pomocí knihovny **Chart.js**.
    - Data jsou simulována na základě aktuální teploty.

4. **Přehled počasí:**
    - Informace o aktuální teplotě, popisu počasí, vlhkosti a rychlosti větru.

---

## Knihovny a dependencies

-   **vite** - nástroj pro scaffold a vývoj TypeScript projektů.
-   **tailwindCSS** - moderní CSS framework pro styling.
-   **zod** - knihovna pro validaci dat.
-   **axios** - HTTP klient pro práci s WeatherAPI. (lepší než fetchAPI)
-   **chart.js** - knihovna pro vizualizaci dat ve formě grafů.
-   **leaflet.js** - knihovna pro zobrazení interaktivní mapy.

---

## Struktura projektu

-   `./src/api/` - API volání (např. `weatherApi.ts` pro volání WeatherAPI).
-   `./src/components/` - Moduly pro specifické funkce ( `chart.ts`, `map.ts`).
-   `./src/styles/` - Soubor pro TailwindCSS
-   `./src/types/` - Typy pro TypeScript (např. `weather.ts` obsahující typy z WeatherAPI).
-   `./src/main.ts` - Hlavní soubor aplikace.

---

## Jak spustit projekt?

1. **Nainstalujte závislosti:**

```bash
npm install
```

2. **Vytvořte `.env` soubor:**

    - V kořenovém adresáři projektu vytvoř `.env` soubor s následujícím obsahem:

    ```
    VITE_API_BASE_URL=https://api.weatherapi.com/v1/current.json
    VITE_API_KEY=api_key_od_weatherAPI
    ```

    - (nahraďte VITE_API_KEY skutečným api klíčem od WeatherAPI)

3. **Spusťte vývojový server:**

    ```bash
    npm run dev
    ```

4. **Otevřete aplikaci:**
    - Aplikace poběží na adrese: [http://localhost:5173](http://localhost:5173)

---

## Testování

-   Zadej existující město (např. "Praha") a ověř, že se zobrazí:
    -   Teplota.
    -   Popis počasí.
    -   Poloha na mapě.
    -   Graf teplot za posledních 8 hodin.

---

## Technologie a knihovny

-   **Node.js verze:** Doporučuje se použít verzi 18+.
-   **API:** WeatherAPI (https://www.weatherapi.com/).

---

## Další informace

-   **Statické HTML:** Stránky jsou generovány jako plně statické a mohou být spuštěny lokálně.
-   **Závislosti:** TailwindCSS, Zod, Axios, Leaflet.js, Chart.js.
-   **Údržba:** Kód je modularizovaný, což usnadňuje jeho rozšiřování.

---
