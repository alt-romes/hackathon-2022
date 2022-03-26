#!/usr/bin/env bash

rm -rf _build
mkdir -p _build
cp -r app_static/* _build/
cabal run
