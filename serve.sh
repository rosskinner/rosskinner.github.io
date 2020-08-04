function cleanup {
  docker kill jekyll-serve
}
trap cleanup INT EXIT
docker run --name jekyll-serve --rm -it \
  -p 4000:4000 \
  -p 35729:35729 \
  -v "$(pwd):/srv/jekyll:cached" \
  jekyll/jekyll:3.8.5 \
  sh -c 'bundle check --path vendor/bundle || bundle install --path vendor/bundle ; bundle exec jekyll serve --watch --incremental -H 0.0.0.0'

