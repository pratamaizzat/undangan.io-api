SHELL := /bin/bash

.EXPORT_ALL_VARIABLES:

POSTGRES_USER = admin
POSTGRES_PASSWORD = admin
POSTGRES_DB = undangan

up:
	docker compose -f docker/docker-compose.yml up -d

down:
	docker compose -f docker/docker-compose.yml down -v

ps:
	docker compose -f docker/docker-compose.yml ps -a

logs:
	docker compose -f docker/docker-compose.yml logs --tail=100 -f $(c)