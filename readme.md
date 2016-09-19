# Avatar Generator

`dist` folder is all static, that is, index.html inside it can be opened directly.
`dist` can also be served from a server as static-files directory. It's meant to
be production-ready, even.


## Usage Notes

 - While testing on a Windows7, downloaded file didn't have .zip extension. It
   was unformatted. Just renaming it to have '.zip' at the end solved the issue
   and file became recognized by the archive software.

 - Didn't test it on a retina device but should work fine. Images aren't doubling
   in retina. You should manually generate 2x images, if you like. Only thing done
   for retina is shrinking preview canvases by half to avoid them look blurry.

 - After manipulating colors, you should click regenerate button for changes to
   take effect.

 - In order not to lose some generated images you liked, you shouldn't change any
   parameter except rotation. Others will auto-generate new images instantly.


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
