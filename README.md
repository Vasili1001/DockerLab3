**Создать сеть для контейнеров**

docker network create todo-network

Эта сеть позволит контейнерам взаимодействовать друг с другом по именам (todo-mysql, todo-backend и т. д.), а также правильно работать с пробросом портов.

**Запуск MySQL контейнера**

docker run --name todo-mysql \
 --network todo-network \
 -e MYSQL_ROOT_PASSWORD=123456 \
 -e MYSQL_DATABASE=tododb \
 -p 3307:3306 \
 -d mysql:8

**Сборка и запуск backend**

cd backend
docker build -t todo-backend .

docker run --name todo-backend \
 --network todo-network \
 -e DB_HOST=todo-mysql \
 -e DB_USER=root \
 -e DB_PASSWORD=123456 \
 -e DB_NAME=tododb \
 -e DB_PORT=3306 \
 -p 3001:3001 \
 -d todo-backend

Проверка бэкенда: http://localhost:3001/api/tasks

**Сборка и запуск frontend**

cd backend
docker build -t todo-frontend .

docker run --name todo-frontend \
 --network todo-network \
 -p 3000:3000 \
 -d todo-frontend

Проверка фронтенда: http://localhost:3000

**Проверка запущенных контейнеров**

docker ps
Должны быть запущены: todo-mysql todo-backend todo-frontend

**Остановка и удаление контейнеров**

docker stop todo-frontend todo-backend todo-mysql

docker rm todo-frontend todo-backend todo-mysql

**Удаление образов**

docker rmi todo-frontend todo-backend

**Если нужно удалить созданную сеть**

docker network rm todo-network

**Полный список команд для очистки контейнеров и образов**

docker stop todo-frontend todo-backend todo-mysql
docker rm todo-frontend todo-backend todo-mysql
docker rmi todo-frontend todo-backend
docker network rm todo-network

**Пересборка и запуск frontend**

docker build -t todo-frontend .
docker stop todo-frontend
docker rm todo-frontend
docker run --name todo-frontend --network todo-network -p 3000:3000 -d todo-frontend

Проверка фронтенда: http://localhost:3000

**Пересборка и запуск backend**

docker build -t todo-backend .
docker stop todo-backend
docker rm todo-backend
docker run --name todo-backend --network todo-network -p 3001:3001 -d todo-backend

Проверка бэкенда: http://localhost:3001/api/tasks

**Full script to rebuild and run the entire application**

docker stop todo-frontend todo-backend todo-mysql 2>/dev/null || true
docker rm todo-frontend todo-backend todo-mysql 2>/dev/null || true
docker rmi todo-frontend todo-backend 2>/dev/null || true
docker network rm todo-network 2>/dev/null || true
docker network create todo-network
docker run --name todo-mysql \
 --network todo-network \
 -e MYSQL_ROOT_PASSWORD=123456 \
 -e MYSQL_DATABASE=tododb \
 -p 3307:3306 \
 -d mysql:8
docker build -t todo-backend ./backend
docker run --name todo-backend \
 --network todo-network \
 -e DB_HOST=todo-mysql \
 -e DB_USER=root \
 -e DB_PASSWORD=123456 \
 -e DB_NAME=tododb \
 -e DB_PORT=3306 \
 -p 3001:3001 \
 -d todo-backend
docker build -t todo-frontend ./frontend
docker run --name todo-frontend \
 --network todo-network \
 -p 3000:3000 \
 -d todo-frontend
