#!/bin/bash

if [ -d ./node_modules ]
then
	rm -fr ./node_modules
fi

docker run --rm -v "$PWD":/root node:8.12-slim /root/install_libs.sh