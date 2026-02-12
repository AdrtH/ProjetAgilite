# Groupe : Les Gourmands

* Tom BUATHIER : BuathierTom
* Théo CARTHAGOT : carthagott
* Quentin GILLERON : QuentinGilleron
* Jean Baptiste RAGUES : JeanBaptisteRAGUES
* Astrée TOULOTTE : astreetlt
* Adrien TRUY : AdrtH

# Mise en place

Il faut installer `uv` sur votre machine pour utiliser le back-end : 

- Windows : https://docs.astral.sh/uv/getting-started/installation/#__tabbed_1_2

- MacOs : `brew install uv` dans un terminal

## Back-end (Django)

Se placer dans le dossier back:

```bash
cd projetagilite
```

### 1) Migrations

```bash
rm db.sqlite3
uv run manage.py migrate
```

### 2) Importer les produits en base SQLite

```bash
sqlite3 db.sqlite3
.read seed_products.sql
.exit
```

### 3) Charger les donnees Django

```bash
uv run manage.py loaddata dumpdjango.json
```

### 4) Lancer le serveur back

```bash
uv run manage.py runserver
```

Le back est disponible sur `http://127.0.0.1:8000`.

La docs swagger est disponible sur `http://127.0.0.1:8000/docs`.

## Front-end (React + Vite)

Ouvrir un second terminal, puis:

```bash
cd front
npm install
npm run dev
```

Il faut aussi faire un fichier `.env` dans le front avec comme valeur du `.env.example`: 
et remplacer `api-key` par :
`DEEPL_API_KEY : 9f4141df-d01b-456a-912b-e03689af3616:fx`

Le front est disponible sur `http://localhost:5173`.

Des tests sont disponible : 

```bash
npm run test
```
