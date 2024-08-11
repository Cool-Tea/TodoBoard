# TodoBoard

A light weight swift todo board.

## Deployment

Prerequisite: node.js environment

Use pm2 deploy this project

### Install pm2

```sh
npm install -g pm2
```

### Deploy Backend

Enter `/backend` and run the following command:

```sh
pm2 start ./bootstrap.js --name backend
```

Then the server will run at `localhost:7001`

To stop it, run:

```sh
pm2 stop backend
```

### Deploy Frontend

Enter `/frontend` and run the following command:

```sh
pm2 start --name frontend npm -- run preview
```

Then you can visit `localhost:8080` to use it

To stop it, run:

```sh
pm2 stop frontend
```