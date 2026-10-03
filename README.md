# Navody.Digital Frontend

navody.digital frontend je knižnica komponentov, ktorá vychádza z open source knižnice [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) (aktuálne v6.5.1) a pridáva k nej vlastné komponenty a štýly Slovensko.Digital. Používajú ju [navody.digital](https://github.com/slovensko-digital/navody.digital) a [priznanie.digital](https://github.com/slovensko-digital/priznanie-digital) cez npm balík `navody-digital-frontend`.

## Štruktúra

Repozitár je GOV.UK Frontend (`packages/govuk-frontend/src/govuk/`), ku ktorému je pridaná naša vrstva v `packages/govuk-frontend/sdn/`:

- `index.scss`, `index.mjs` – vstupy balíka (GOV.UK Frontend + SDN vrstva)
- `settings/` – font Roboto, farby, šírka stránky, doplnkové veľkosti písma
- `helpers/`, `core/` – pomocné mixiny, odkazy, triedy odstránené v novších verziách GOV.UK (`core/_compatibility.scss`)
- `components/` – úpravy GOV.UK komponentov
- `custom/` – vlastné komponenty (header, headline, footer, feedbackbar, timeline, …)
- `utilities/appear-link/`, `assets/images/`

Build vrstvy je v `packages/govuk-frontend/tasks/sdn.mjs`, výstup ide do `dist/sdn/`. GOV.UK súbory sa takmer neupravujú, aby sa dali jednoducho aktualizovať.

## Použitie

```scss
@import "navody-digital-frontend/govuk/all";
```

V projekte s bundlerom (webpack, Next.js, …) sa importuje `initAll` z `navody-digital-frontend` a zavolá sa po načítaní stránky. Bez bundlera:

```html
<script type="module">
  import { initAll } from '/node_modules/navody-digital-frontend/dist/sdn/navody-digital.min.js'
  initAll()
</script>
```

JavaScript sa spustí, len ak má `<body>` triedu `govuk-frontend-supported`:

```html
<body class="govuk-template__body">
  <script>
    document.body.classList.add('js-enabled');
    if ('noModule' in HTMLScriptElement.prototype) document.body.classList.add('govuk-frontend-supported');
  </script>
```

Hotové súbory bez buildu: `dist/sdn/navody-digital.min.css` a `dist/sdn/navody-digital.min.js`.

## Build a vydanie

```sh
npm ci
npm run build:sdn-package
cd package && npm publish
```

Verzia sa nastavuje premennou `SDN_VERSION` (napr. `SDN_VERSION=1.0.0 npm run build:sdn-package`).

## Aktualizácia GOV.UK Frontend

```sh
git remote add upstream https://github.com/alphagov/govuk-frontend.git
git fetch upstream --tags
git merge v6.x.y
npm ci
npm run build:sdn-package
```

Pri novej hlavnej verzii skontrolujte [changelog GOV.UK Frontend](https://github.com/alphagov/govuk-frontend/blob/main/CHANGELOG.md) a varovania Sass pri builde.

## Kontakt na tím

navody.digital frontend vytvára a spravuje komunita okolo slovensko.digital. Kontaktovať nás môžete na [Slacku](https://slovensko-digital.slack.com/messages/CEGR9AZT5) v #navody-frontend.

## Licencia

Ak nie je uvedené inakšie, kódy sú publikované s MIT License. Toto zahŕňa kódy aj ukážky kódov v dokumentácii.
Pôvodná GOV.UK dokumentácia je licencovaná pod &copy; Crown copyright a dostupná podľa podmienok definovaných v
Open Government 3.0 licence.
