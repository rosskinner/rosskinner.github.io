# Portfolio - 2020

### Requirements:

1. Install Docker https://docs.docker.com/docker-for-mac/install/
2. That's it!


### Jekyll Commands

`./serve.sh` will install jekyll dependencies and run in serve mode on http://localhost:4000

`./test.sh` runs [html-proofer](https://github.com/gjtorikian/html-proofer).

`./build.sh` builds the jekyll part of the project, outputs to `_site/` and trigger the `npm run build` to build javascript source.


## CSS

The main sass files is in `assets/css/styles.sass` all the partials are inside `_sass/`

This project uses [Tachyons](http://tachyons.io).

At the moment the minified file is in the repo: `assets/css/tachyons.min.css`.

Maybe in the future we can remove the minified file and use [tachyons-sass](https://github.com/tachyons-css/tachyons-sass).

[More info about SASS in Jekill](https://jekyllrb.com/docs/assets/)

## Project Structure

Main Pages:
- index.md
- projects.md
