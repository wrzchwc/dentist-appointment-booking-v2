#!/bin/bash

source ./.ecr.env
REPO="client"

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin "$URL"
docker tag dentist-appointment-booking-v2-client:latest "$URL"/"$NAMESPACE"/"$REPO":latest
docker push "$URL"/"$NAMESPACE"/"$REPO":latest
