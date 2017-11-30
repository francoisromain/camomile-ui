# Camomile UI

> UI Components library for [Camomile](http://camomile-project.github.io/).

## Credits

#### Production

* Hervé Bredin, [LIMSI, CNRS](https://www.limsi.fr)

#### Development

* [François Romain](http://francoisromain.com)

---

Camomile UI is a UI library for [camomile](https://github.com/camomile-project).

To start using this library, you can use
[camomile-ui-boilerplate](https://github.com/francoisromain/camomile-ui-boilerplate)

---

## Npm scripts

```bash
# Install dependencies.
npm install

# Serve with hot reload at localhost:8080.
npm run dev

# Build for production with minification.
npm run dist
```

---

## Contributing

See `contributing.md` for further infos.

---

## Create a local API server

Create a local
[Camomile API server](https://github.com/camomile-project/camomile-server).

Create one additional `camomile-data` folder next to this one, resulting in the
following structure:

```txt
.
+-- camomile-ui
+-- camomile-server
+-- camomile-data
    +-- mongodb
        +-- files
    +-- camomile
        +-- logs
    +-- media
    +-- upload
```

Start the server (from the _camomile-ui_ directory):

```bash
export CMML_DB=../camomile-data/mongodb/files && export CMML_LOGS=../camomile-data/camomile/logs && export CMML_MEDIA=../camomile-data/media && export CMML_UPLOAD=../camomile-data/upload && export CMML_PORT=3000 && export CMML_PASSWORD=roO7p4s5wOrD && docker-compose -f ../camomile-server/docker-compose.dev.yml up --build -d
```
