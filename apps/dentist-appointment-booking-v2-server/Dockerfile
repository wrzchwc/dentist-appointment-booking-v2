FROM node:lts-alpine AS builder

WORKDIR /app

COPY dist/apps/dentist-appointment-booking-v2-server/package*.json ./dentist-appointment-booking-v2-server/

RUN npm --prefix dentist-appointment-booking-v2-server --omit=dev install

COPY dist/apps/dentist-appointment-booking-v2-server/main.js ./dentist-appointment-booking-v2-server/

FROM node:lts-alpine

WORKDIR /app

RUN addgroup --system dentist-appointment-booking-v2-server && \
    adduser --system -G dentist-appointment-booking-v2-server dentist-appointment-booking-v2-server

COPY --from=builder /app/dentist-appointment-booking-v2-server ./app/

RUN chown -R dentist-appointment-booking-v2-server:dentist-appointment-booking-v2-server .

USER dentist-appointment-booking-v2-server

ENV REGION=${REGION}
ENV USER_POOL_ID=${USER_POOL_ID}
ENV CLIENT_ID=${CLIENT_ID}
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV DATABASE=${DATABASE}
ENV ORIGIN=${ORIGIN}

EXPOSE 3000

CMD [ "node", "app/main.js" ]
