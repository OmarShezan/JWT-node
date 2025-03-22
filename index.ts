import express, {Request, Response, NextFunction} from "express"
import * as Auth from './auth'
import {IErrorResponse, ISuccessTokenResponse} from './interfaces'
const app = express();


const myPosts = [
  {
    author: 'Kyle',
    title: 'Post 1'
  },
  {
    author: 'Jim',
    title: 'Post 2'
  }
]
const myServices = [
  {
    author: 'Kyle',
    title: 'Service 1'
  },
  {
    author: 'Jim',
    title: 'Service 2'
  }
]



app.post("/singin", (req: Request, res: Response)=>{
  const strBase64Auth : string | undefined = req.headers.authorization?.toString().split(" ")[1];
  if(strBase64Auth == null || !Auth.IsCorrectCredential(strBase64Auth)) {
    res.status(404).json(getErrorResponse());
      return;
  }
  res.status(200).json(getSuccessTokenResponse());

})

app.post('/refreshToken', (req: Request, res: Response)=>{
  const strBase64Auth : string | undefined = req.headers["x-access-token"]?.toString(); 
  if(strBase64Auth == null || !Auth.IsValidRefreshToken(strBase64Auth)) {
    res.status(404).json(getErrorResponse());
  return;
}
  res.status(200).json(getSuccessTokenResponse());


})

app.get('/products', authenticateAccessToken, (req: Request, res: Response) => {
  res.status(200).json({
    result:{
      code:200,
      posts:myPosts
    }
  });
})

app.get('/services', authenticateAccessToken, (req: Request, res : Response)=>{
  res.status(200).json({
    result:{
      code:200,
      services:myServices
    }
  });
})

function authenticateAccessToken(req: Request, res : Response, next : NextFunction){
  const strBase64Auth : string | undefined = req.headers["x-access-token"]?.toString(); 
  //node js auto converts header to lower case so its x-access-token not X-Access-Token
  if(strBase64Auth == null || !Auth.IsValidAccessToken(strBase64Auth)) {
    res.status(404).json(getErrorResponse());
  return;
}
  next();
}

function getErrorResponse(): IErrorResponse{
  return ({
    result:{
      code: 404,
      message: "Incorrect credentials"
    }
  })
}

function getSuccessTokenResponse(): ISuccessTokenResponse{
  const accessToken : string = Auth.GenerateAccessToken();
  const RefreshToken : string = Auth.GenerateRefreshToken();
  return {
    result:{
      code : 200,
      accessToken: accessToken,
      refreshToken: RefreshToken
    }
  }
}
app.listen(process.env.PORT,()=>{
  console.log(`server started at ${process.env.PORT}`)
})
