## Postgres image in docker

### Step 1: Create a database in postgres

`docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres`

### Step 2: Install postgres-admin

`docker pull dpage/pgadmin4`

### Step 3: Run pg admin

`docker run --name pgadmin-container -p 5050:80 -e PGADMIN_DEFAULT_EMAIL=admin@example.com -e PGADMIN_DEFAULT_PASSWORD=admin123 -d dpage/pgadmin4`

## Step 4: In order to add new server in pg admin

Hostname/Address -> {

1. run commond `docker ps`
2. `docker inspect <container image>`
   }

## Step 5 -> Add Db url in .env file

`DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/myuser"`

## Step 6: Run some following prisma command to setup

`npm i prisma`

`npm i @prisma/client`

`npx prisma init`

`npx prisma generate`

`npx prisma migrate dev`

`npx prisma generate`

## (Optional setp): Visualise your data

`npx prisma studio`

## Judge0

You can follow the documentation step by step [Link](https://github.com/judge0/judge0/blob/master/CHANGELOG.md)

### Specially for windows 10

1. Download the file attached to the [Link](https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip)

2. Go to the paticular folder where the "judge0-v1.13.1" have been downloaded and please extract the folder from the zip file. (Recomended, In the same folder)

3. Open the Terminal on that paticular folder, where "judge0-v1.13.1" have been downloaded, and write the following line of code.
   `wsl --install`

4. After installation of wsl, type again `wsl` and press enter

5. Either your ubuntu terminal will start or docker-desktop terminal will start

6. do `cd judge0-v1.13.1` and then do ls, you will see to things there "docker-compose.yml" and "judge0.conf" file.

7. We have to access the config file, so you can type `vi judge0.config` and then press on i button, this enables your insert mode.

8. Now, Please find "Redis Configuration" and "PostgresSQL Configration" and only add the password to that. And then to save and exit press `esc` then `:wq` and press enter, it will save and exit.

9. Close the ubuntu or docker-desktop container and open a new Terminal on the same folder and do the following steps: STEP BY STEP

   1. cd judge0-v1.13.1
   2. docker-compose up -d db redis
   3. timeout /t 10
   4. docker-compose up -d
   5. timeout /t 10

10. and then on the browser run this `http://localhost:2358/docs`

#### When You create new database do the following in order

`npx prisma generate`
`npx prisma migrate dev`
`npx prisma db push`

### Connect Neon db

Adding the Database Url value of neondb just run the following command to sync
`npx prisma migrate dev --name init`
