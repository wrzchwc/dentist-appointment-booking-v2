FROM public.ecr.aws/lambda/nodejs

WORKDIR /var/task

COPY dist/apps/photo-uploader/package.json ./

COPY dist/apps/photo-uploader/package-lock.json ./

RUN npm install

COPY dist/apps/photo-uploader/main.js ./

ENV REGION=${REGION}

ENV BUCKET=${BUCKET}

CMD ["main.handler"]
