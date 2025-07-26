# Etapa 1: Imagem base com Node.js
FROM node:22-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci

# Copia o restante da aplicação
COPY . .

# Compila o projeto AdonisJS (se usar TypeScript)
# Se o container estiver usando o ambiente local por meio de volumes, essa build não vai ser efetiva
# RUN npm run build

# Dá permissão de execução
RUN chmod +x /app/entrypoint.sh

# Define o script como ponto de entrada
ENTRYPOINT ["/app/entrypoint.sh"]

# Expõe a porta padrão do AdonisJS
EXPOSE 3333