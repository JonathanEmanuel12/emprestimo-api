#!/bin/sh

# Replicando o código local no container com volumes, é necessário dar permissão de execução local para esse script.
# Em outras palavras, se tiver isso no docker compose "volumes: - .:/app", rodar no terminal "chmod +x entrypoint.sh"

# Roda as migrações
node ace migration:run

# Inicia a aplicação
npm run dev