# Building a JWT Implementation from Scratch

This project demonstrates a simple implementation of JWT authentication in a Node.js + Express application using TypeScript, for educational purposes.

## Installation

Download [Node](https://nodejs.org/en), it comes with the npm package manager. Install Node dependencies.

```bash
npm install
```
## Create a .env File
default `.env` file example
```
PORT=4000
ACESS_TOKEN_EXPIRE_TIME_IN_SECONS = 60  #Time (in seconds) before the access token expires.
REFRESH_TOKEN_EXPIRE_TIME_IN_SECONS = 172800 # 2 days in secons
JWT_ACCESS_SIGN_KEY = "RANDOM STRING" The secret key for signing access tokens.
JWT_REFRESH_SIGN_KEY = "RANDOM STRING" The secret key for signing refresh tokens.

```
## Start Server
```bash
npm run dev
```

## Testing API Endpoints
To simplify testing your API endpoints, a pre-configured TestHttpRequest.http file is included in the project. This file allows you to test your API directly from supported HTTP clients like VS Code's REST Client extension.

**Prerequisites**  
- Install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) Extension for VS Code.  
- Make sure the server is running:


## Todo
- [x] Implement TypeScript
- [x] Use multiple files (Auth.ts) for clean code
- [x] Get Products endpoint
- [x] Get Services endpoint
- [x] Implement middleware
- [x] Move config to .env files
- [x] Watch for ts files while serving .env file
- [ ] Keep track of previous token so user can only use the newest token
- [ ] Implement solution using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package
- [ ] Add automated tests

## Contributing

Pull requests are welcome. For changes, please open an issue first
to discuss what you would like to change or add.

## Features
- JWT Authentication without external libraries.
- Organised TypeScript structure.
- Example endpoints for "Products" and "Services."
## License

[MIT](https://choosealicense.com/licenses/mit/)