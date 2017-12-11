# Camomile UI

[![npm version][npm-img]][npm] [![Dependency Status][dep-img]][dep]
[![Build Status][ci-img]][ci] [![codecov][codecov-img]][codecov]

[npm-img]: https://badge.fury.io/js/%40camomile%2Fcamomile-ui.svg
[npm]: https://www.npmjs.com/package/@camomile/camomile-ui
[ci-img]: https://travis-ci.org/francoisromain/camomile-ui.svg
[ci]: https://travis-ci.org/francoisromain/camomile-ui
[dep-img]: https://david-dm.org/francoisromain/camomile-ui.svg
[dep]: https://david-dm.org/francoisromain/camomile-ui
[codecov-img]: https://codecov.io/gh/francoisromain/camomile-ui/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/francoisromain/camomile-ui

**UI component library for [Camomile](http://camomile-project.github.io/).**

Camomile UI is a front end application only and requires a connection to a
[Camomile API server](https://github.com/camomile-project/camomile-server).

To start using this library, you can use
[camomile-ui-boilerplate](https://github.com/francoisromain/camomile-ui-boilerplate).

---

## Npm scripts

```bash
# Install dependencies.
npm install

# Serve with hot reload at localhost:8080 (with Webpack).
npm run dev

# Build for production with minification (with Rollup).
npm run build

# Run tests (with Jest and vue-test-utils).
npm run test
```

---

## Create a local Camomile API server

For development purposes, you can create a local
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

---

## Contributing

See `contributing.md` for further infos.

---

## Credits

#### Production

* Hervé Bredin, [LIMSI, CNRS](https://www.limsi.fr)

#### Development

* [François Romain](http://francoisromain.com)
