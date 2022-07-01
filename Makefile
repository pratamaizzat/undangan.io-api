SHELL := /bin/bash

.EXPORT_ALL_VARIABLES:

POSTGRES_USER = admin
POSTGRES_PASSWORD = admin
POSTGRES_DB = undangan

.PHONY: build
build:
	docker compose -f docker/docker-compose.yml build

.PHONY: build-and-run
build-and-run:
	docker compose -f docker/docker-compose.yml build
	docker compose -f docker/docker-compose.yml up -d

.PHONY: up
up:
	docker compose -f docker/docker-compose.yml up -d

.PHONY: down
down:
	docker compose -f docker/docker-compose.yml down -v

.PHONY: ps
ps:
	docker compose -f docker/docker-compose.yml ps -a

.PHONY: logs
logs:
	docker compose -f docker/docker-compose.yml logs --tail=100 -f $(c)

.PHONY: inspect
inspect:
	docker compose -f docker/docker-compose.yml exec $(c) -it bash