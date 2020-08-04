echo 'Generating site with Jekyll'

docker run --rm -it \
  -v "$(pwd):/srv/jekyll:cached" \
  jekyll/jekyll:3.8.5 \
  sh -c 'JEKYLL_ENV=production && bundle check --path vendor/bundle || bundle install --path vendor/bundle && bundle exec jekyll clean && bundle exec jekyll build --incremental'
  
npm run build
