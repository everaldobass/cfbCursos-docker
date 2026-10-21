# Curso de Docker 
### Aula #01
- Introdução

### Aula #02
- Instalação do docker no wsl
- docker --version
- docker run hello-word

### Aula #03 - Docker run
- docker run hello-word


### Docker run
- docker run ubuntu
- docker run -it ubuntu bash
- docker run -it --name ubuntu ubuntu:24.04

#### Aula 04 - Containers
- docker ps -a
- docker start -ai "Número container"


### Aula 05
- dokcer ps -a
- docker run -it --name debian /bin/bash
- docker start -ai 08dd97acb343 
- docker attach debian

### Cria um container com nome 
- docker run -it --name debian debian:13 /bin/bash

### Rodar um container
- docker start debian
- docker attach debian


### Iniciar e anexar um container
- docker start -ai ubuntu

### Parar um container
- docker stop ubuntu

### Alterar o nome do container
- docker rename nome_antigo nome_novo


### Comando emergencial se bloquear o container
- docker kill nome_container 

### Aula 06
- Antes de remover verificar se container está parado

### Remover Container
- docker ps -a

- dicker rm "numero_container"
- docker rm 990e13347b24
- docker rm -f numero_container

### Remover todos os container parados
- docker container prune

### Remover images 
- docker images

- docker rm nome_images
- docker rmi id_image

- docker rmi meuarquivo:1.0
- docker rmi -f meuarquivo:1.0
- docker rm 3b68f1db5776

### Remover TODAS as imagens que não estão sendo usadas por nenhum container 
- docker image prune
- docker image prune -a


### Rodar o container nginx
- docker run -it --name servidor nginx
- docker run -d --name serv-web nginx

### Logs
docker logs -f servidor

### Aula 07 Monitorar Container
- docker ps -a
- docker start servidor

### Entrar no servidor
- docker exec -it servidor bash
- docker exec servidor ls

### Logs
- docker logs servidor
- docker logs -f servidor


### Aula 08 - Acessando o servidor no navegador
- docker stop servidor
- docker rm servidor
- docker rmi servidor

### Criando container com a porta 8080
- docker run -d -p 8080:80 --name WebNginx nginx

### Acessando o Servidor webnginx
- docker exec -it webnginx bash

### Aula 09 - Tags
- https://hub.docker.com/

- docker pull python:3.13-alpine3.23
- docker run -it --name python python:3.13-alpine3.23 python

### Aula 10 - Docker com Dockerfile e Build
- FROM nginx:stable-trixie
- COPY . /usr/share/nginx/html/index.html

- docker build -t meuarquivo:1.0 .

- docker run -d -p 8081:80 --name site-nginx meuarquivo:1.0

### Aula 11 - WORKDIR & RUN

- FROM ubuntu:24.04
- WORKDIR /workspace
- RUN apt-get update && apt-get install -y curl vim
- COPY app.txt .
- EXPOSE 80


- docker build -t ubuntu:lts1.0 .
- docker run -it -d --name ubuntu ubuntu:lts1.0 bash
- docker attach ubuntu

### Aula 12 - CMD & ENTRYPOINT
- Como Instalar o Docker no Linux Ubuntu

### Criando imagens
- docker build -t teste-cmd .
- docker images

### Criando container
- docker run teste-cmd

- CMD -> Deixa fazer uma alteração
- ENTRYPOINT -> Deixa, para fazer alteração


### Aula 13 - Volumes e Mounts ou bind Mounts, Tmpfs
### Aula 14 - Bind Mounts na Prática: Atualize seu código no Docker SEM dar Rebuild - Anbiente de Desenvolvimento
- docker run -d -p 8080:80 -v $(pwd):/usr/sahre/nginx/html --name site-nginx nginx 

### Aula 15 - Volumes na Prática: Usando Banco de Dados no Docker e persistindo as informações
- docker run -d -p 8080:80 meu-volume:/usr/sahre/nginx/html --name site-nginx nginx
- docker cp .  site-nginx:/usr/sahre/nginx/html

- docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=123 mysql
- dokcer ps -a
- docker stop site-nginx
- docker exec -it mysql mysql -p

### Criando Banco com Volume
- docker run -d --name mysql-pro -e MYSQL_ROOT_PASSWORD=123 -v meus-dados:/var/lib/mysql
- docker volume ls
- docker exec -it mysql mysql-pro -p

### Criando banco
- create database cfbcursos
- use cfbcursos
- create table alunos(nome varchar(50));
- insert into alunos values("Everaldo");

### Excluindo volume
docker volume inspect meus-dados
docker volume rm meus-dados
docker volume prune

### Aula 16 - Bridge, Host ou None? Aprenda sobre as redes do seu Container Docker
- docker network ls
- docker run -dit --name container alpine
- docker run -dit --name container1 alpine
- docker inspect container1

### Ping no container1
- docker exec -it container1 ping 172.17.0.4

- docker run -dit --network host --name nginxdireto nginx
- docker run -dit --name container3 --network host alpine
- docker exec -it container3 ping google.com

### Aula 17 - Pare de sofrer com IPs que mudam! Conecte Containers pelo NOME 
- docker network
- docker network create redeTeste
- docker network ls

### Utilizar a rede criada
- docker run -dit  --name ctrede1 --network redeTeste alpine ash
- docker run -dit  --name ctrede2 --network redeTeste alpine ash

#### Fazendo o ping na Rede 2
- dcker exec -it ctrede1 ping ctrede2

#### Associando uma rede a um container que já existe
- docker network
- docker network connect redeTeste redeIntruso
- docker network inspect redeTeste

### Aula 18 - Pare de usar "docker run"! Aprenda a mágica do Docker Compose 
- docker compose up -t

### Remover compose
- docker compose down

### Aula 19 - A Mágica do Docker Compose: Comunicação entre Containers na prática 
- Adminer
- docker compose up -d

### Aula 20 - O Segredo dos Profissionais: O Guia Definitivo de Variáveis de Ambiente no Docker - .env
- docker compose up -d

### Aula 21 - O Segredo do Cache ao Dockerizar Python e Acelerar seu Build
- docker build -t python-bass:v1 .
- docker images -a
- docker run 
- docker run 

### Aula 22 - NUNCA copie a pasta node_modules! O jeito certo de Dockerizar Node.js
- docker build -t api-node:v1 .
- docker images
- docker run -d -p 3000:3000 --name node-api api-nodejs:v1


























