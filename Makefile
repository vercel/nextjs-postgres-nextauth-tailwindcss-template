debug:
	docker-compose -f docker-compose-debug.yml up --build

debug-down:
	docker-compose -f docker-compose-debug.yml down

migrate:
	alembic -c ./backend/alembic.ini upgrade head

dev:
	docker-compose -f docker-compose-dev.yml up --build -d

dev-down:
	docker-compose -f docker-compose-dev.yml down

prod:
	docker-compose up --build -d

prod-down:
	docker-compose down

docker-reset:
	docker system prune