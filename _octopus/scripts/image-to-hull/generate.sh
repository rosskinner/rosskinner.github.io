#!/bin/bash

for file in ../../src/assets/images/octopus/*.png; do
  [ -e "$file" ] || continue
  node image-to-Hull.js "$file"
done
