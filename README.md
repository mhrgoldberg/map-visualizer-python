# Map Visualizer

## Setup

1. Install dependencies
   _IMPORTANT!_
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

   _OTHERWISE!_

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

2. Create a **.env** file based on the example with proper settings for your
   development environment

3. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

4. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

---

_IMPORTANT!_
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:

```bash
pipenv lock -r > requirements.txt
```

_ALSO IMPORTANT!_
psycopg2-binary MUST remain a dev dependency because you can't install it on alpine-linux.
There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

---

## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

   ```bash
   heroku login
   ```

5. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

8. Release your docker container to heroku

   ```bash
   heroku container:release web -a {NAME_OF_HEROKU_APP}
   ```

9. set up your database:

   ```bash
   heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   heroku run -a {NAME_OF_HEROKU_APP} flask seed all
   ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.

11. profit

## Deploy with Docker

1. Pull down code to server from github and place in the `srv` folder

2. Make a `.env.production.db`:

   ```bash
   POSTGRES_USER="{user}"
   POSTGRES_DB="{db}"
   POSTGRES_PASSWORD="{password}"
   ```

3. Make a `.env.production`:

   ```bash
   FLASK_ENV="production"
   SECRET_KEY="{secret code for your key}"
   DATABASE_URL="postgresql://{user}:{password}@{db_name}"
   CLOUDINARY_URL="{cloudinary env variable url found on your Cloudinary dashboard}"
   ```

4. Run the below command to migrate and seed the database:

   ```bash
      docker-compose up -f "docker-compose-migrate.yml"
   ```

5. Run the below command to start the app running on port 8000:

   ```bash
      docker-compose up
   ```

6. Expose port 8000 behind a reverse proxy of your choice!
