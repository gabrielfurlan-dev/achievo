# Dockerfile para Next.js
FROM node:18-alpine


# RUN apk add --no-cache \
#     openssl \
#     libssl1.1 \
#     libc6-compat

# Diretório de trabalho
WORKDIR /usr/src/app

# Instalar pacotes necessários para Prisma
RUN apk add --no-cache openssl

# Copiar arquivos de configuração
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install

# Copiar o restante do projeto
COPY . .

# Construir o projeto para produção
RUN yarn build

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["sh", "-c", "yarn prisma db push && yarn start"]
