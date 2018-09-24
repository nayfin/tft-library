## Setup

tft-library is easy to install and serve if you'd like to contribute or just want to take a closer look at the source.

1. Fork the  `tft-library` repo
2. Clone your fork. Recommendation: name your git remotes upstream for tft-library and <your-username> for your fork.
3. From root of project run `npm install`
4. From anywhere `npm install -g compodoc` to get documentation tooling
5. Build library in watch mode `npm run build-lib`
6. After library has built out, serve sandbox app with `ng serve`

## Documentation

We use compodoc to make our code self-documenting. It's great. You should use them too.

1. `npm run compodoc:lib` to serve library docs on `localhost:8080`
1. `npm run compodoc:app` to serve app docs on `localhost:8081`



