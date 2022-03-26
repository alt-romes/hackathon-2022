#!/usr/bin/env bash

mkdir -p _build

# Clean up
rm -rf app_static/node_modules
rm -rf app_static/backend/database.db

# Rebuild database
rm -rf _build/backend/database.db

cp -rf app_static/* _build/

FIELDS=$(cabal run | tail -n 1)

cd _build/

npm i

node backend/backend.js main $FIELDS &

npm run start
