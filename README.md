# Frascarelli Trasporti — Website

Live site: [frascarellitrasporti.com](https://frascarellitrasporti.com)

🇬🇧 [English](#english) · 🇮🇹 [Italiano](#italiano) · 🇧🇷 [Português](#português)

---

## English

### About

Static marketing website for **Frascarelli Trasporti**, an Italian logistics company specializing in last-mile delivery, transport, loading/unloading and warehousing across 10+ Italian provinces. The site is a single `index.html` page with smooth-scroll navigation, built-in **IT / PT-BR / EN** language switching, scroll-reveal animations, and an interactive map of the provinces served.

### Tech stack

Plain HTML5, CSS3 and vanilla JavaScript — no build step, no framework, no package manager. The only external dependency is [Leaflet](https://leafletjs.com/) (loaded via CDN) for the interactive map.

### Project structure

```
├── index.html              Main (and only) page
├── css/
│   └── styles.css          All styling
├── js/
│   ├── script.js           i18n, nav, mobile menu, scroll-reveal animations
│   └── map-init.js         Leaflet map of the provinces served
├── assets/
│   ├── images/             Logo and other brand images
│   ├── photos/              Warehouse photography
│   ├── illustrations/       Illustrations used in content sections
│   ├── clients/              Client and partner logos
│   └── data/                 GeoJSON province boundaries for the map
├── documents/               Internal reference files (business plan, master logo, screenshot) — not linked from the site
├── CNAME                   Custom domain for GitHub Pages
├── robots.txt / sitemap.xml SEO
└── site.webmanifest        PWA/icon manifest
```

### Key features

- **Multi-language content**: all copy lives in a translation dictionary in `js/script.js` (`it`, `pt`, `en`); the active language is persisted in `localStorage` and reflected in the URL (`?lang=`).
- **Interactive presence map**: `js/map-init.js` renders an Italy map with the served provinces highlighted, using boundary data from `assets/data/it-provinces.geojson`.
- **Scroll animations & sticky header**: implemented with `IntersectionObserver`, no external animation library.

### Running locally

No build tools required — just serve the folder statically, e.g.:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000`.

### Deployment

The site is deployed via **GitHub Pages** on the `main` branch, with a custom domain configured through the `CNAME` file (`frascarellitrasporti.com`). Pushing to `main` publishes the change directly — there is no CI/build pipeline.

---

## Italiano

### Descrizione

Sito web statico per **Frascarelli Trasporti**, azienda logistica italiana specializzata in consegne last mile, trasporto, carico/scarico e deposito merci in oltre 10 province italiane. Il sito è una singola pagina (`index.html`) con navigazione a scorrimento fluido, cambio lingua integrato **IT / PT-BR / EN**, animazioni di comparsa allo scroll e una mappa interattiva delle province servite.

### Stack tecnologico

HTML5, CSS3 e JavaScript puro — nessun build step, nessun framework, nessun package manager. L'unica dipendenza esterna è [Leaflet](https://leafletjs.com/) (caricata via CDN) per la mappa interattiva.

### Struttura del progetto

```
├── index.html              Pagina principale (e unica)
├── css/
│   └── styles.css          Tutto lo stile
├── js/
│   ├── script.js           Cambio lingua, navigazione, menu mobile, animazioni scroll
│   └── map-init.js         Mappa Leaflet delle province servite
├── assets/
│   ├── images/             Logo e altre immagini del brand
│   ├── photos/              Fotografie del magazzino
│   ├── illustrations/       Illustrazioni usate nelle sezioni di contenuto
│   ├── clients/              Loghi di clienti e partner
│   └── data/                 Confini delle province (GeoJSON) per la mappa
├── documents/               File di riferimento interni (business plan, logo master, screenshot) — non collegati al sito
├── CNAME                   Dominio personalizzato per GitHub Pages
├── robots.txt / sitemap.xml SEO
└── site.webmanifest        Manifest PWA/icone
```

### Funzionalità principali

- **Contenuti multilingua**: tutti i testi vivono in un dizionario di traduzione in `js/script.js` (`it`, `pt`, `en`); la lingua attiva viene salvata in `localStorage` e riflessa nell'URL (`?lang=`).
- **Mappa di presenza interattiva**: `js/map-init.js` mostra una mappa d'Italia con le province servite evidenziate, usando i confini da `assets/data/it-provinces.geojson`.
- **Animazioni allo scroll & header sticky**: realizzate con `IntersectionObserver`, senza librerie di animazione esterne.

### Esecuzione in locale

Non servono strumenti di build — basta servire la cartella staticamente, ad esempio:

```bash
npx serve .
# oppure
python -m http.server 8000
```

Poi aprire `http://localhost:8000`.

### Deploy

Il sito è pubblicato tramite **GitHub Pages** sul branch `main`, con dominio personalizzato configurato tramite il file `CNAME` (`frascarellitrasporti.com`). Ogni push su `main` pubblica direttamente le modifiche — non c'è nessuna pipeline CI/build.

---

## Português

### Sobre

Site institucional estático da **Frascarelli Trasporti**, empresa de logística italiana especializada em entregas de última milha, transporte, carga/descarga e armazenagem em mais de 10 províncias italianas. O site é uma única página (`index.html`) com navegação por rolagem suave, troca de idioma integrada **IT / PT-BR / EN**, animações de revelação ao rolar a página e um mapa interativo das províncias atendidas.

### Stack tecnológica

HTML5, CSS3 e JavaScript puro — sem etapa de build, sem framework, sem gerenciador de pacotes. A única dependência externa é o [Leaflet](https://leafletjs.com/) (carregado via CDN) para o mapa interativo.

### Estrutura do projeto

```
├── index.html              Página principal (e única)
├── css/
│   └── styles.css          Toda a estilização
├── js/
│   ├── script.js           Troca de idioma, navegação, menu mobile, animações de rolagem
│   └── map-init.js         Mapa Leaflet das províncias atendidas
├── assets/
│   ├── images/             Logo e outras imagens da marca
│   ├── photos/              Fotos do armazém
│   ├── illustrations/       Ilustrações usadas nas seções de conteúdo
│   ├── clients/              Logos de clientes e parceiros
│   └── data/                 Limites das províncias (GeoJSON) para o mapa
├── documents/               Arquivos de referência internos (business plan, logo master, screenshot) — não usados pelo site
├── CNAME                   Domínio customizado para o GitHub Pages
├── robots.txt / sitemap.xml SEO
└── site.webmanifest        Manifest PWA/ícones
```

### Principais funcionalidades

- **Conteúdo multilíngue**: todos os textos ficam em um dicionário de tradução em `js/script.js` (`it`, `pt`, `en`); o idioma ativo é salvo no `localStorage` e refletido na URL (`?lang=`).
- **Mapa de presença interativo**: `js/map-init.js` renderiza um mapa da Itália com as províncias atendidas em destaque, usando os limites de `assets/data/it-provinces.geojson`.
- **Animações de rolagem e header fixo**: implementadas com `IntersectionObserver`, sem biblioteca externa de animação.

### Rodando localmente

Não é preciso nenhuma ferramenta de build — basta servir a pasta como arquivos estáticos, por exemplo:

```bash
npx serve .
# ou
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

### Deploy

O site é publicado via **GitHub Pages** no branch `main`, com domínio customizado configurado pelo arquivo `CNAME` (`frascarellitrasporti.com`). Cada push para `main` publica a mudança diretamente — não há pipeline de CI/build.
