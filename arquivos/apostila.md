Apostila Completa de Docker para Iniciantes: Do Zero ao Projeto Full Stack

Apresentação do Curso

Esta apostila foi desenvolvida como um guia didático e prático baseado nas 23 aulas do Curso de Docker ministrado pelo canal CFBCursos. O objetivo deste material é capacitar estudantes e profissionais a dominar a tecnologia de conteinerização, desde os conceitos fundamentais de infraestrutura até a orquestração e implantação de aplicações Full Stack completas.

Ao longo deste material, o leitor aprenderá a criar, gerenciar, isolar e conectar containers, além de aplicar boas práticas profissionais de otimização de build, persistência de dados e segurança no ambiente de desenvolvimento e produção.

Módulo 1: Fundamentos e Instalação do Ambiente

Aula 01: Entendendo o Docker e o Fim do "Na Minha Máquina Funciona"

O problema clássico do desenvolvimento de software conhecido como "na minha máquina funciona" ocorre devido às divergências entre os ambientes de desenvolvimento, homologação e produção. Diferenças em versões de sistemas operacionais, bibliotecas, dependências e variáveis de ambiente costumam causar falhas inesperadas na execução do código.

O Docker resolve esse problema através da conteinerização, empacotando a aplicação juntamente com todas as suas dependências, bibliotecas e arquivos de configuração em uma unidade padronizada e isolada denominada container.

Diferença entre Virtualização Tradicional (VMs) e Conteinerização (Docker)

* Máquinas Virtuais (VMs): Cada VM requer um sistema operacional convidado (Guest OS) completo sobre um Hypervisor, consumindo elevado processamento, memória RAM e espaço em disco.
* Containers Docker: Compartilham o mesmo Kernel do sistema operacional hospedeiro (Host OS). O isolamento ocorre no nível de processo usando recursos do Linux como namespaces e cgroups, resultando em inicialização em milissegundos e consumo reduzido de recursos.

Característica	Máquinas Virtuais (VMs)	Containers Docker
Arquitetura	Hypervisor + Guest OS dedicado	Kernel compartilhado do Host
Tempo de Inicialização	Minutos	Segundos ou milissegundos
Consumo de Recursos	Alto (RAM e CPU reservadas)	Leve (utiliza apenas o necessário)
Portabilidade	Grande tamanho de imagem (GBs)	Imagens compactas (MBs)

Aula 02: Preparando o PC para o Docker: Instalação sem Erros

Para executar o Docker no ambiente local, é necessário instalar a ferramenta Docker Desktop (para Windows e macOS) ou o Docker Engine (para distribuições Linux).

Requisitos e Passos de Instalação no Windows

1. Ativação da Virtualização: Certifique-se de que a virtualização de hardware (VT-x/AMD-V) está habilitada na BIOS/UEFI do computador.
2. Instalação do WSL 2 (Windows Subsystem for Linux): O Docker no Windows utiliza o WSL 2 como motor de execução para obter desempenho nativo Linux.

wsl --install


1. Download e Configuração do Docker Desktop: Realize o download pelo site oficial e finalize a instalação marcando a opção de integração com o WSL 2.
2. Verificação da Instalação: Abra o terminal (Prompt de Comando ou PowerShell) e execute os comandos de validação:

docker --version
docker info


Aula 03: Primeiros Passos Práticos: Descobrindo o Poder do docker run

O comando docker run é a porta de entrada para a criação e execução de containers. Ele combina as ações de baixar a imagem (caso não exista localmente), criar o container e iniciá-lo.

Executando um Sistema Linux em Segundos

Para criar e acessar um ambiente Ubuntu Linux interativo diretamente no terminal, utiliza-se a combinação das flags -i (interativo) e -t (terminal TTY):

docker run -it ubuntu bash


Ao executar este comando:

1. O Docker verifica se a imagem ubuntu está disponível localmente.
2. Caso não esteja, ele faz o download (pull) automático do repositório público Docker Hub.
3. O container é inicializado e o terminal do hospedeiro passa a controlar diretamente o shell bash de dentro do container.

Para sair do container e encerrá-lo, digite exit.

Aula 04: Teoria Fundamental: Imagem vs. Container

Compreender a diferença entre Imagem e Container é o alicerce para trabalhar corretamente com Docker.

Imagem Docker (Docker Image)

Uma imagem é um modelo somente leitura (read-only template) que contém as instruções, código fonte, bibliotecas, dependências e configurações necessárias para criar um container. Imagens são compostas por camadas empilhadas (layers).

Container Docker (Docker Container)

Um container é a instância em execução de uma imagem. Quando um container é iniciado, o Docker adiciona uma camada gravável (read-write layer) no topo das camadas somente leitura da imagem.

+-------------------------------------------------+
|   Camada Gravável do Container (Read-Write)     |  <- Dados temporários da execução
+-------------------------------------------------+
|   Camada de Aplicação (Read-Only)               |  <- Definida no Dockerfile
+-------------------------------------------------+
|   Camada de Dependências / OS (Read-Only)       |  <- Ex: Ubuntu / Node / Python
+-------------------------------------------------+


Módulo 2: Gerenciamento de Containers e Operações Essenciais

Aula 05: Organização e Gerenciamento do Ciclo de Vida dos Containers

Gerenciar o ciclo de vida dos containers envolve listá-los, interrompê-los, reiniciá-los e removê-los do sistema.

Comandos Principais de Gerenciamento

* Listar containers em execução:

docker ps


* Listar todos os containers (incluindo os parados):

docker ps -a


* Parar um container em execução:

docker stop <ID_OU_NOME_DO_CONTAINER>


* Iniciar um container parado:

docker start <ID_OU_NOME_DO_CONTAINER>


* Atribuir um nome personalizado ao container:

docker run --name meu_servidor nginx


Aula 06: Limpeza de Resíduos, Modo Detached (-d) e Nginx

Ao executar um servidor web como o Nginx, não desejamos prender o terminal hospedeiro à execução do processo. Para resolver isso, utiliza-se o modo Detached através da flag -d, que executa o container em segundo plano.

Executando o Nginx em Segundo Plano

docker run -d --name meu_nginx nginx


Limpeza de Resíduos e Manutenção da Máquina

Containers parados e imagens sem uso ocupam espaço em disco. O Docker oferece comandos específicos para higienizar o ambiente:

* Remover um container específico:

docker rm <ID_OU_NOME_DO_CONTAINER>


* Remover automaticamente o container após sua finalização (flag --rm):

docker run --rm ubuntu echo "Executa e limpa automaticamente"


* Limpeza geral de containers e recursos não utilizados:

docker container prune


Aula 07: Executando Comandos Interativos (docker exec) e Monitorando Logs (docker logs)

Depois que um container está rodando em segundo plano (modo detached), é comum a necessidade de inspecionar seus registros de saída ou executar novos processos internamente.

Inspecionando Logs da Aplicação

Para visualizar as saídas de texto e erros gerados pela aplicação dentro do container:

docker logs meu_nginx


Para acompanhar os logs em tempo real (modo follow), adicione a flag -f:

docker logs -f meu_nginx


Entrando em um Container em Execução com docker exec

O comando docker exec permite rodar um novo comando dentro de um container que já está em execução. Para abrir um terminal interativo interno:

docker exec -it meu_nginx bash


Aula 08: Mapeamento de Portas (Port Binding) e a Flag -p

Por padrão, os serviços executados dentro de um container ficam isolados na rede interna do Docker e não podem ser acessados pela máquina hospedeira ou pela rede externa.

Como Funciona o Mapeamento de Portas

Para expor um serviço, utiliza-se a flag -p informando a Porta do Hospedeiro e a Porta do Container no formato HOST_PORT:CONTAINER_PORT.

docker run -d -p 8080:80 --name meu_webserver nginx


Neste exemplo:

* As requisições direcionadas à porta 8080 do computador hospedeiro (http://localhost:8080) são redirecionadas para a porta 80 interna do container Nginx.

Módulo 3: Imagens Customizadas e Dockerfile

Aula 09: Versionamento e Gerenciamento de Tags (Evitando a tag latest)

As imagens no Docker Hub são organizadas por repositórios e diferenciadas por Tags (versões).

O Perigo da Tag latest

Quando não especificamos uma tag durante o docker pull ou docker run, o Docker busca automaticamente a tag latest. Isso pode introduzir atualizações de código indesejadas e quebrar o ambiente de produção.

Boas Práticas de Versionamento

Sempre especifique explicitamente a versão desejada da imagem:

# Evitar:
docker run node

# Recomendado (versão fixa e previsível):
docker run node:18-alpine


Aula 10: Empacotando Aplicações com Dockerfile e docker build

O Dockerfile é um arquivo de texto sem extensão contendo o script de instruções passo a passo para a criação de uma imagem personalizada.

Exemplo Prático de Dockerfile Básico

# Define a imagem base
FROM node:18-alpine

# Copia os arquivos do projeto para o container
COPY . /app

# Define o comando padrão de execução
CMD ["node", "/app/index.js"]


Gerando a Imagem com docker build

Para compilar o Dockerfile e criar a imagem com o nome (tag) minha-app:1.0, executa-se o comando no diretório do projeto:

docker build -t minha-app:1.0 .


Aula 11: Profissionalizando Dockerfiles com WORKDIR e RUN

Construir Dockerfiles profissionais exige organização de diretórios e tratamento adequado de dependências durante a fase de compilação.

Instruções WORKDIR e RUN

* WORKDIR: Define o diretório de trabalho dentro do container onde os comandos subsequentes serão executados. Caso o diretório não exista, ele é criado automaticamente.
* RUN: Executa comandos no momento da construção da imagem (build time), como instalação de pacotes e compilação de código.

Estrutura Otimizada de Dockerfile

FROM node:18-alpine

# Estabelece o diretório de trabalho interno
WORKDIR /usr/src/app

# Copia apenas o manifesto de dependências primeiro (aproveitamento de cache)
COPY package*.json ./

# Executa a instalação de pacotes durante o build
RUN npm install

# Copia o restante do código fonte
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]


Aula 12: Diferenças Essenciais entre CMD e ENTRYPOINT

Tanto CMD quanto ENTRYPOINT definem o processo que será executado quando o container for iniciado, porém possuem comportamentos distintos quanto à sobrescrita de argumentos.

Instrução	Comportamento Principal	Sobrescrita via Terminal
CMD	Define o comando padrão e/ou seus parâmetros.	Facilmente sobrescrito ao passar argumentos ao docker run.
ENTRYPOINT	Transforma o container em um executável fixo.	Não é sobrescrito por argumentos padrão; argumentos do docker run são anexados a ele.

Combinação Recomendada (Padrão de Mercado)

Utiliza-se o ENTRYPOINT para definir o executável principal e o CMD para definir os argumentos padrão configuráveis:

ENTRYPOINT ["python3"]
CMD ["app.py"]


Ao executar docker run minha-imagem, ele roda python3 app.py. Se o usuário rodar docker run minha-imagem teste.py, o executável python3 é mantido e o argumento é alterado para teste.py.

Módulo 4: Persistência de Dados e Armazenamento

Aula 13: Por que Arquivos Desaparecem? Conceitos de Volumes e Mounts

Por padrão, o sistema de arquivos de um container é temporário (ephemeral). Quando um container é removido, todos os dados gravados em sua camada de escrita são permanentemente perdidos.

Para garantir a persistência de dados, o Docker oferece mecanismos de Mounts que conectam o sistema de arquivos do container ao sistema de arquivos do computador hospedeiro.

Tipos Principais de Armazenamento

1. Bind Mounts: Mapeiam um diretório ou arquivo específico da máquina hospedeira para dentro do container.
2. Named Volumes (Volumes Nomeados): Gerenciados diretamente pelo Docker em uma área isolada do sistema de arquivos (/var/lib/docker/volumes/).

Aula 14: Bind Mounts na Prática para Desenvolvimento em Tempo Real

Os Bind Mounts são ideais para o ambiente de desenvolvimento, pois permitem alterar o código fonte no editor de código da máquina local e refletir as alterações instantaneamente dentro do container sem necessidade de refazer o build da imagem.

Executando um Container com Bind Mount

Utiliza-se a flag -v (ou --mount) passando o caminho absoluto da pasta local e o caminho de destino no container:

docker run -d -p 8080:80 -v $(pwd)/src:/usr/share/nginx/html --name dev_web nginx


Qualquer alteração realizada nos arquivos da pasta local ./src será visível imediatamente ao acessar o servidor web.

Aula 15: Volumes Nomeados e Persistência em Bancos de Dados

Para bancos de dados em produção (como MySQL, PostgreSQL e MongoDB), a prática recomendada é utilizar Volumes Nomeados, pois eles garantem alta performance e isolamento gerenciado pelo Docker Engine.

Gerenciando Volumes Nomeados

* Criar um volume:

docker volume create dados_db


* Listar volumes existentes:

docker volume ls


Subindo um Banco MySQL com Persistência

docker run -d \
  --name meu_mysql \
  -e MYSQL_ROOT_PASSWORD=senha_forte \
  -v dados_db:/var/lib/mysql \
  mysql:8.0


Mesmo que o container meu_mysql seja apagado com docker rm -f, os dados armazenados em dados_db permanecerão intocados no volume e poderão ser reutilizados por um novo container.

Módulo 5: Redes e Comunicação no Docker

Aula 16: Arquitetura de Redes Docker: Drivers Bridge, Host e None

Os containers comunicam-se entre si e com o mundo externo através do subsistema de redes do Docker.

Drivers de Rede Principais

1. Bridge (Padrão): Cria uma rede virtual privada isolada no hospedeiro. Containers na mesma rede bridge podem se comunicar via IP ou nome.
2. Host: Remove o isolamento de rede entre o container e o hospedeiro, fazendo com que o container utilize diretamente a interface e as portas físicas da máquina local.
3. None: Desabilita completamente a interface de rede do container, isolando-o totalmente de conexões externas.

Driver de Rede	Isolamento	Desempenho	Caso de Uso Principal
Bridge	Alto (Rede Virtual)	Padrão	Aplicações web multicontainer
Host	Nenhum (Compartilha IP)	Máximo	Aplicações de altíssimo tráfego de rede
None	Total	N/A	Processamento batch isolado sem acesso à rede

Aula 17: Conectando Containers pelo Nome em Redes Customizadas

Na rede Bridge padrão do Docker, os containers conseguem se comunicar apenas informando o endereço IP interno. No entanto, os IPs de containers são dinâmicos e alteram a cada reinicialização.

Para resolver isso, criamos uma Rede Customizada, onde o Docker ativa o serviço de resolução de nomes interno (DNS embutido), permitindo a comunicação diretamente pelo nome do container.

Passo a Passo Prático de Conexão por Nome

1. Criar a rede customizada:

docker network create minha_rede


1. Iniciar o container de Banco de Dados na rede:

docker run -d --name meudb --network minha_rede -e POSTGRES_PASSWORD=123 postgres


1. Iniciar a Aplicação Web na mesma rede:

docker run -d --name minhaapp --network minha_rede -p 3000:3000 minha-api


Agora, a aplicação minhaapp pode se conectar ao banco utilizando a string de conexão postgres://meudb:5432 em vez de um endereço IP variável.

Módulo 6: Orquestração Multicontainer com Docker Compose

Aula 18: Introdução ao Docker Compose e Estrutura do docker-compose.yml

Gerenciar múltiplos containers individualmente via terminal utilizando sequências de docker run torna-se inviável em projetos complexos. O Docker Compose é a ferramenta oficial para definir e rodar aplicações multicontainer através de um único arquivo de configuração declarativo em formato YAML (docker-compose.yml).

Exemplo de Arquivo docker-compose.yml

version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    volumes:
      - .:/usr/share/nginx/html
    networks:
      - rede_app

  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: meudb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - rede_app

volumes:
  pgdata:

networks:
  rede_app:


Comandos Básicos do Docker Compose

* Subir toda a aplicação em segundo plano:

docker compose up -d


* Verificar o status dos serviços orquestrados:

docker compose ps


* Derrubar a aplicação e remover containers e redes criadas:

docker compose down


Aula 19: Comunicação de Múltiplos Serviços com Docker Compose

O Docker Compose cria automaticamente uma rede dedicada para todos os serviços definidos no arquivo docker-compose.yml. Todos os containers declarados conseguem se comunicar nativamente usando o próprio nome do serviço definido no YAML como hostname de rede.

Gerenciamento e Escalonamento

* Visualizar logs de todos os serviços unificados:

docker compose logs -f


* Reconstruir as imagens após alterações de código:

docker compose up -d --build


Aula 20: Gestão Profissional de Variáveis de Ambiente e Arquivos .env

Credenciais de banco de dados, chaves de API e tokens secretas nunca devem ser gravadas diretamente no código fonte ou no arquivo docker-compose.yml.

Utilizando Arquivos .env

O Docker Compose lê automaticamente um arquivo chamado .env localizado no mesmo diretório do projeto.

Arquivo .env (Fora do controle de versão Git)

PORTA_EXTERNA=8080
DB_NAME=projeto_db
DB_USER=root
DB_PASS=senha_super_segura_123


Arquivo docker-compose.yml Utilizando as Variáveis

version: '3.8'

services:
  api:
    image: minha-api:1.0
    ports:
      - "${PORTA_EXTERNA}:3000"
    environment:
      - DATABASE_URL=postgres://${DB_USER}:${DB_PASS}@db:5432/${DB_NAME}


Módulo 7: Boas Práticas de Otimização e Projeto Final Full Stack

Aula 21: Otimização de Cache de Build em Aplicações Python

O processo de build do Docker executa cada instrução em camada e armazena o resultado em cache. Se uma camada for alterada, todas as camadas subsequentes serão reconstruídas do zero.

O Truque de Caching ao Dockerizar Python

Ao trabalhar com Python, copiar o código fonte antes de rodar o pip install faz com que o Docker reinstale todas as dependências do requirements.txt a cada pequena alteração no código.

Dockerfile Ineficiente (Sem reaproveitamento de cache)

# RUIM: Qualquer alteração no app.py invalida o cache do pip install
COPY . /app
RUN pip install -r /app/requirements.txt


Dockerfile Otimizado (Reaproveitamento de cache inteligente)

# BOM: O pip install só roda se o requirements.txt for modificado
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .


Aula 22: Boas Práticas em Node.js: Nunca Copie a Pasta node_modules

Em projetos Node.js, copiar a pasta node_modules local para dentro da imagem causa inconformidades de compilação entre diferentes sistemas operacionais (ex: dependências nativas compiladas para Windows sendo copiadas para o container Linux).

Arquivo .dockerignore

Assim como o .gitignore, o arquivo .dockerignore impede que arquivos e pastas desnecessários sejam enviados para o contexto de build do Docker.

Conteúdo Recomendado do .dockerignore

node_modules
npm-debug.log
.git
.env
dist


Dockerfile Padronizado para Node.js

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
USER node
CMD ["node", "index.js"]


Aula 23: Projeto Final de Graduação: Aplicação Full Stack Completa

Para consolidar os conhecimentos adquiridos ao longo das 23 aulas do curso, o projeto final consiste na construção e implantação de uma arquitetura Full Stack completa, integrando um frontend web, uma API backend e um banco de dados relacional.

Arquitetura do Projeto Final

* Frontend: Aplicação Web servida via Nginx.
* Backend: API de serviços (Node.js/Python).
* Database: Banco de Dados PostgreSQL com volume persistente.

                  +-----------------------------------+
                  |        Navegador do Usuário       |
                  +-----------------------------------+
                                    |
                            (Porta 80 / HTTP)
                                    v
+-------------------------------------------------------------------+
| Rede Docker Customizada: fullstack_net                              |
|                                                              |
|   +-------------------+       +-------------------------------+   |
|   | Container Web     | ----> | Container API                 |   |
|   | (Frontend Nginx)  |       | (Backend Node/Python)         |   |
|   +-------------------+       +-------------------------------+   |
|                                               |                   |
|                                     (Porta Interna 5432)          |
|                                               v                   |
|                               +-------------------------------+   |
|                               | Container Banco de Dados      |   |
|                               | (PostgreSQL + Volume)         |   |
|                               +-------------------------------+   |
+-------------------------------------------------------------------+


Arquivo docker-compose.yml da Aplicação Full Stack Completa

version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - fullstack_net

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=database
      - DB_USER=${POSTGRES_USER}
      - DB_PASSWORD=${POSTGRES_PASSWORD}
      - DB_NAME=${POSTGRES_DB}
    depends_on:
      - database
    networks:
      - fullstack_net

  database:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - fullstack_net

volumes:
  db_data:

networks:
  fullstack_net:
    driver: bridge


Glossário de Comandos e Referência Rápida

Comando	Descrição e Finalidade
docker run -it <imagem> bash	Executa um container em modo interativo com terminal TTY.
docker run -d -p <host>:<cont> <imagem>	Executa um container em background (detached) com mapeamento de porta.
docker ps -a	Lista todos os containers da máquina (em execução e parados).
docker exec -it <container> bash	Executa um terminal interativo dentro de um container que já está rodando.
docker logs -f <container>	Acompanha a saída de logs do container em tempo real.
docker build -t <nome>:<tag> .	Constrói uma nova imagem Docker a partir de um Dockerfile no diretório atual.
docker volume create <nome>	Cria um volume nomeado para persistência de dados.
docker network create <nome>	Cria uma rede virtual para comunicação interna entre containers.
docker compose up -d	Sobe todos os serviços declarados no arquivo docker-compose.yml em background.
docker compose down	Encerra e remove containers, redes e volumes criados pelo Docker Compose.
docker system prune -a	Remove containers parados, redes sem uso e imagens sem referência para liberar espaço.
