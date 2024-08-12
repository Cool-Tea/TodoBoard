# TodoBoard

A light weight swift todo board.

## Deployment

Prerequisite: node.js environment

Use pm2 to deploy backend and anything you like to deploy frontend (i.e. `serve`)

### Install pm2

```sh
npm install -g pm2
```

### Install serve

```sh
npm install -g serve
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

Enter `/frontend` and run the following command (i.e. `serve`):

```sh
serve -s dist -p 8080
```

Then you can visit `localhost:8080` to use it

## Function

### Basic

- Multiple User (Login && Register)
- Project Creation
- Task Creation
- Task Viewer
- Comment
- Dashboard
- Attachment Addition && Download

### Extra

#### Add Project created by others

After clicking `Add Project`, you can see all other projects created by others, which you can select.

#### Project Deletion

Simple function as the title

#### Group and Task Deletion

Simple function as the title

#### Overdue Reminder

When a task is overdue, a warning sign will be shown on top-left side of that task

#### Move task around groups

You can click arrow button on each task to move that task around

#### Side Bar && Navigator

Buttons on the side bar will change in different pages

You can easily navigate to different pages through those buttons

#### Attachment Deletion

Simple function as the title
