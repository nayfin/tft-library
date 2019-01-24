# TftLibrary Schematics

Scaffolding library for Angular applications using TftLibrary. Expands on the akita-schematics by @datorama, to include connecting the feature store to a Firestore Collection.
tft-library-schematics provides CLI commands for generating files when building new features with TftLibrary. Built on top of [`Schematics`](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2), this tool integrates with the [`Angular CLI`](https://cli.angular.io/).

### Installation

Install tft-library-schematics from npm:

`npm install tft-library-schematics --save-dev`

##### OR

`yarn add tft-library-schematics --dev`

## Default Schematics Collection

To use `tft-library-schematics` as the default collection in your Angular CLI project,
add it to your `angular.json`:

```sh
ng config cli.defaultCollection tft-library-schematics
```

The [collection schema](https://github.com/datorama/tft-library-schematics/blob/master/src/collection.json) also has aliases to the most common schematics used to generate files.

The `tft-library-schematics` extend the default `@schematics/angular` collection. If you want to set defaults for schematics such as generating components with scss file, you must change the schematics package name from `@schematics/angular` to `tft-library-schematics` in `angular.json`:

```json
"schematics": {
  "tft-library-schematics:component": {
    "styleext": "scss"
  }
}
```

## Create a New Feature

```sh
ng g tft-library-schematics:feature todos/todos
```

The defauls feature will output an entity feature, but you can also generate the normal:

```sh
ng g tft-library-schematics:feature todos/todos --plain
```

> Note that the `tft-library-schematics:` prefix is only needed when the default collection isn't set to `tft-library-schematics`

## Generate a Store

```sh
ng g tft-library-schematics:as todos
ng g tft-library-schematics:aes todos // entity store
```

## Generate a Query

```sh
ng g tft-library-schematics:query todos
ng g tft-library-schematics:entity-query todos

Alias:
ng g tft-library-schematics:aq todos
ng g tft-library-schematics:aeq todos // entity query
```

## Generate a Model

```sh
ng g tft-library-schematics:model todo

Alias:
ng g tft-library-schematics:am todo
```

## Generate a Service

```sh
ng g tft-library-schematics:service todos

Alias:
ng g tft-library-schematics:asr todos
```

## Generate Tests

Add the `--spec` option. For example:

`ng g af products/products --spec`

## Generate Module

Add the `--withModule` to generate module and with component. (only for entity store)

## TODO

- finish `g feature` i.e. store, query, model
- chain to `angularfire-schematic`
- connect to Firestore in app.module
