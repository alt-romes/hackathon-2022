#!/usr/bin/env bash

# Clear previous build
mkdir -p _build
cp -rf app_static/* _build/
cabal run

cd _build/

npm i

npm run start
