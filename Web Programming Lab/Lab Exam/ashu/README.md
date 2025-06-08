# finalweblab


docker-compose up --build

docker build -t mynodeapp .

docker run -d --name mymongo -p 27017:27017 -v mongo-data:/data/db mongo:3.2

docker run -it --rm -p 3000:3000 --name myapp --link mymongo:mongo -e MONGO_URL=mongodb://mongo:27017/student_records mynodeapp

docker-compose up --build