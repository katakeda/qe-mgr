FROM rust:latest as backend
WORKDIR /usr/src/qe-mgr
COPY . .
RUN cargo build --release

FROM node:16-alpine as frontend
WORKDIR /usr/src/qe-mgr
COPY ./frontend .
RUN yarn install
RUN yarn build

FROM debian:stable-slim
RUN mkdir -p /usr/local/bin
COPY --from=backend /usr/src/qe-mgr/target/release/qe-mgr /usr/local/bin/qe-mgr
COPY --from=frontend /usr/src/qe-mgr/dist /usr/local/bin/dist
WORKDIR /usr/local/bin
CMD ["qe-mgr"]
