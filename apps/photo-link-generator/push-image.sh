#!/bin/bash

URL="654362432770.dkr.ecr.us-east-1.amazonaws.com"
REPO="photo-link-generator"

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin "$URL"
docker tag photo-link-generator:latest "$URL"/"$REPO":latest
docker push "$URL"/"$REPO":latest
