#!/bin/bash

docker run --rm \
	-v "$PWD":/var/task \
	-e DB_USER='carwash_user' -e DB_PASSWORD='dtfs53vk9M' -e DB_NAME='carwashdb' -e DB_PORT=3306 -e DB_HOST='carwashdb.clzs6170shcv.us-east-1.rds.amazonaws.com' \
	lambci/lambda:nodejs8.10 index.handler "$( cat event.json )"