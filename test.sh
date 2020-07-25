docker run --rm -it \
  -v "$(pwd):/srv/jekyll:cached" \
  jekyll/jekyll:3.8.5 \
  sh -c 'bundle check --path vendor/bundle || bundle install --path vendor/bundle && bundle exec htmlproofer ./_site  --allow-hash-href  --check-favicon --check-html  --disable-external'
