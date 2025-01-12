FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY apps/dentist-appointment-booking-v2-client/nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/dentist-appointment-booking-v2-client ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
