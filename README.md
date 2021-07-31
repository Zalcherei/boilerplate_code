# boilerplate_code

Creating webserver using node can be hassle. Especially if you are just starting to use Node for web development.

# Packages You need to install:

```Shell
$ npm i nodemon or npm i nodemon --save-dev
$ npm i ws or npm i ws --save-dev
```

_If you dont have package.json file_

```Shell
$ npm init
```

Add this line to package.json:

```json
"scripts": {
  "dev": "nodemon server.js --ext js,html,css"
}
```

Now you can start your server with:

```Shell
$ npm run dev
```

If you want to know more. You can start from here:

- [Node.js® is a JavaScript runtime](https://nodejs.org/en/)
- [nodemon reload, automatically.](https://nodemon.io/)
- [ws: a Node.js WebSocket library](https://github.com/websockets/ws)
