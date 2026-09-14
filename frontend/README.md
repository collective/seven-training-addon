# Aurora Training Project (aurora-training-project)

Plone Aurora training project with a Python CMFPlone backend.

[![npm](https://img.shields.io/npm/v/aurora-training-project)](https://www.npmjs.com/package/aurora-training-project)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://collective.github.io/aurora-training-project/)
[![Code analysis checks](https://github.com/collective/aurora-training-project/actions/workflows/code.yml/badge.svg)](https://github.com/collective/aurora-training-project/actions/workflows/code.yml)
[![Unit tests](https://github.com/collective/aurora-training-project/actions/workflows/unit.yml/badge.svg)](https://github.com/collective/aurora-training-project/actions/workflows/unit.yml)

## Features

<!-- List your awesome features here -->

## Installation

To install your project, you must choose the method appropriate to your version of Volto.


### Volto 17 and earlier

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon aurora-training-project
cd my-volto-project
```

Add `aurora-training-project` to your package.json:

```JSON
"addons": [
    "aurora-training-project"
],

"dependencies": {
    "aurora-training-project": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start volto with:

```
yarn start
```

### Volto 18 and later

Add `aurora-training-project` to your `package.json`:

```json
"dependencies": {
    "aurora-training-project": "*"
}
```

Add `aurora-training-project` to your `volto.config.js`:

```javascript
const addons = ['aurora-training-project'];
```

If this package provides a Volto theme, and you want to activate it, then add the following to your `volto.config.js`:

```javascript
const theme = 'aurora-training-project';
```

## Test installation

Visit http://localhost:3000/ in a browser, login, and check the awesome new features.


## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha).


### Pre-requisites

-   [Node.js](https://6.docs.plone.org/install/create-project.html#node-js)
-   [Make](https://6.docs.plone.org/install/create-project.html#make)
-   [Docker](https://6.docs.plone.org/install/create-project.html#docker)

Install and enable the latest Corepack. Corepack will resolve the pnpm version
pinned by this repository's `packageManager` field.

```shell
npm install --global corepack@latest
corepack enable
```


### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
install-acceptance               Install the Playwright browsers used by the acceptance tests
acceptance-test                  Start the acceptance tests in interactive (UI) mode
ci-acceptance-test               Run the acceptance tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the acceptance test runner (Playwright UI).

```shell
make acceptance-test
```

## License

The project is licensed under the MIT license.

## Credits and Acknowledgements 🙏

Crafted with care by **Generated using [Cookieplone (2.0.0b3)](https://github.com/plone/cookieplone) and [cookieplone-templates (662183a)](https://github.com/plone/cookieplone-templates/commit/662183adfd8f2271ed2c6c65419171737723430a) on 2026-09-13 11:51:27.245162**. A special thanks to all contributors and supporters!
