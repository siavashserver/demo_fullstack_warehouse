###########################################################
# BUILD Image
###########################################################
FROM node:18-alpine as BUILD
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/
RUN yarn build

###########################################################
# PRODUCTION Image
###########################################################
FROM node:18-alpine as PRODUCTION
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean
COPY --from=BUILD /app/next.config.js ./
COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/.next ./.next

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]