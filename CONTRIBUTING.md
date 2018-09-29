## Setup

tft-library is easy to install and serve if you'd like to contribute or just want to take a closer look at the source.

1. Fork the  `tft-library` repo
2. Clone your fork. Recommendation: name your git remotes upstream for tft-library and <your-username> for your fork.
    i.e. ``
3. From root of project run `npm install`
4. (Optional) From anywhere `npm install -g compodoc` to install documentation tooling
5. Build library in watch mode `npm run build-lib`
6. After library has built out, serve sandbox app with `ng serve` ( working on a script to streamline 5 and 6 )

## Documentation

Generate docs locally using
1. `npm run compodoc:lib` to serve library docs on `localhost:8080`
2. `npm run compodoc:app` to serve sandbox app docs on `localhost:8081`

We use [compodoc](https://compodoc.app) to make our code self-documenting. It's great. You should use it too.


