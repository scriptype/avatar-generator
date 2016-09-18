# Avatar Generator

`dist` folder is all static, that is, index.html inside it can be opened directly.
It's production-ready, so it can also be served from a server as static-files directory.

## Development

Node and npm must be installed on the machine - which has unix shell to run `make` (Mac, Linux).

#### Install dependencies

```sh
npm i
```

#### Before touching any code, start dev server and watchers

```sh
make
```

You can preview changes on `localhost:8080`

#### After changes are done, to produce final minified assets and run a dummy prod server

```sh
make release
```

When finished, head over to `localhost:8080`
