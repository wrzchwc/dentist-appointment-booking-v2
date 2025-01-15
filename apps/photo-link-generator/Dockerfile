FROM public.ecr.aws/lambda/nodejs

WORKDIR /var/task

COPY dist/apps/photo-link-generator/package.json ./

COPY dist/apps/photo-link-generator/package-lock.json ./

RUN npm install

COPY dist/apps/photo-link-generator/main.js ./

ENV BUCKET=${BUCKET}

CMD ["main.handler"]
