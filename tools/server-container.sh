#!/bin/bash

source ../apps/dentist-appointment-booking-v2-server/.env

docker run -dp 127.0.0.1:3000:3000 \
  --name dab-v2-server \
  -e REGION="$REGION" \
  -e USER_POOL_ID="$USER_POOL_ID" \
  -e CLIENT_ID="$CLIENT_ID" \
  -e DATABASE_TYPE="$DATABASE_TYPE" \
  -e DATABASE_HOST="$DATABASE_HOST" \
  -e DATABASE_PORT="$DATABASE_PORT" \
  -e DATABASE_USERNAME="$DATABASE_USERNAME" \
  -e DATABASE_PASSWORD="$DATABASE_PASSWORD" \
  -e DATABASE="$DATABASE" \
  dentist-appointment-booking-v2-server
