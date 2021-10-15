#!/bin/bash

function npm() {
  docker-compose run build npm $1
}

case "$1" in
build)
  npm "run build"
  ;;
test)
  npm "run test"
  ;;
demo)
  npm "install"
  npm "run build"
  docker-compose up --remove-orphans -d demo
  npm "run autoreload"
  docker-compose stop demo
  ;;
esac