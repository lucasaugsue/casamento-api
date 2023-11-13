## Author's notes

(EN-US) Esse projeto foi criado em Node.js com o banco de dados em postgress, para rodar o projeto é necessário criar um banco local, logo após é possível rodar as migrations e as seeds para ter alguns dados de exemplo.

(PT-BR) This project was created in Node.js with the database in postgress, to run the project it is necessary to create a local database, then it is possible to run the migrations and seeds to have some example data.

## Creating the database

If you don't have it on the machine, install postgresql

`sudo apt-get update`
`sudo apt-get install postgresql postgresql-contrib`

Create a database in postgres, in this case, the name was used as anuncios-lucas, but it could be another

`sudo -u postgres createdb anuncios-lucas`

Switch to the postgres account on your server by typing

`sudo -i -u postgres`

You can now access the Postgres prompt immediately by typing

`psql`

List created databases

`\l`

Give all privileges:

`grant all privileges on database "anuncios-lucas" to "user" with grant option;`

Exit the Postgres prompt by typing

`\q`

Use the model in base_env creating an .env to connect with the created database

## Available Scripts

To have the tables in your database

### `knex migrate:latest`

To create a new table using knex

### `knex migrate:make migrate_name`

(EN-US) To have some basic data in the database just use `knex seed:run`. Warning: when using POST type endpoints or creating data in the database, it will return an error related to the ID saying that it is already being used, but it is only a temporary error.

(PT-BR) Para ter alguns dados básicos no banco de dados basta usar o `knex seed:run`. Aviso: quando for utilizar endpoins do tipo POST ou criar dados no banco vai retornar um erro relacionado ao ID dizendo que o mesmo já está sendo utilizado, mas é apenas um erro temporário. 

To create a new seed using knex

### `knex seed:make seed_name`

In the project directory, you can run:

### `yarn start-dev` 

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
