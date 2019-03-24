FROM node:10 AS app-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM node:10
RUN npm install -g serve
WORKDIR /app
COPY --from=app-build /app/build .
CMD ["serve", "-p", "3000", "-s", "."]