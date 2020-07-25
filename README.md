# Portfolio - 2019

### Requirements:

1. Install Docker https://docs.docker.com/docker-for-mac/install/
2. That's it!


### Jekyll Commands

`./serve.sh` will install jekyll dependencies and run in serve mode on http://localhost:4000

`./test.sh` runs [html-proofer](https://github.com/gjtorikian/html-proofer).

`./build.sh` builds the jekyll part of the project, outputs to `_site/` and trigger the `npm run build` to build javascript source.

### Npm Commands

> You will need to run your npm commands separated.

`octopus:dev`: Dev mode for Octopus

`octopus:build`: Build Octopus

`build`:  run all build tasks, e.g. `npm run ocptus:build && npm run proto1:build`


> All npm commands for final build will need to be added to `npm run build` as this is the command called from the full build 'build.sh'


### Automated build and Deployment

The deployment of the site happens on any commit to `master` branch, which will trigger a CircleCI build.

The CircleCI account is set under the github user 'grumpy-sailor'.

After a successful built, the static site folder is tranferred via Rsync to [gs-cluster](https://github.com/GrumpySailor/gs-cluster) currently hosted on Digital Ocean.

At the moment, this development version is being served from: https://new.grumpysailor.com/

Plugins

[jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag/)

[html-proofer](https://github.com/gjtorikian/html-proofer)


## CSS

The main sass files is in `assets/css/styles.sass` all the partials are inside `_sass/`

This project uses [Tachyons](http://tachyons.io).

At the moment the minified file is in the repo: `assets/css/tachyons.min.css`.

Maybe in the future we can remove the minified file and use [tachyons-sass](https://github.com/tachyons-css/tachyons-sass).

[More info about SASS in Jekill](https://jekyllrb.com/docs/assets/)

## Project Structure

Main Pages:
- index.md
- about.md
- contact.md
- projects.md


### Projects

All projects must be placed into `_projects`.
The project's folder name should always be lowercase and use dashes to separate words, like:
- `my-awesome-project-name`
- `road-to-zero`
- `kings-of-baxter`
- `pixel`


Mandatory files in a project folder:
- index.md
- tb.jpg
- hero.jpg


Mandatory Yaml variables:

```yaml
title: "Lorem Ipsum"
info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
permalink: /projects/lorem-ipsum
date: 2018-10-09 14:00:00 +1000
team: ["Google", "Grumpy Picures"]
delivery: [ "Film Production", "Story Sphere Production", "Audio Production"]
```


### Project Components
