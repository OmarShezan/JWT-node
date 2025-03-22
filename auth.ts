import crypto, { BinaryLike } from 'node:crypto'
import {IMyJwtPayload} from './interfaces'

function becodeBase64(strEncryptedString? : string):string{
  if(strEncryptedString === null || strEncryptedString === '')
    return "";

  const buff : Buffer<ArrayBuffer> = Buffer.from(strEncryptedString || '', "base64");
  const typeBae64: BufferEncoding = "ascii";
  const strDecode = buff.toString(typeBae64);
  return strDecode;
}

function GetUserNamePasswordArr(strBase64Auth : string) : string[]{
  const strUserNamePass : string[] = becodeBase64(strBase64Auth).split(":");
  return strUserNamePass
}
function isValidToken(strToken: string, strTokenSign : string) : boolean{
  const [headerEncoded, payloadEncoded, tokenSign] = strToken.split(".");
  const sign = crypto.createHmac("sha256", strTokenSign)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest("base64url");
  if(sign === tokenSign)
  {
    return !hasTokenExpired(payloadEncoded)
  }
  return false
}

export function IsCorrectCredential(strBase64Auth : string) : boolean{
  //TODO send credential to DB and preform checks
  const [strUserName, strEncryptedPassword] = GetUserNamePasswordArr(strBase64Auth);
  return true;
}
export function IsValidAccessToken(strToken: string) : boolean{
  return isValidToken(strToken, process.env.JWT_ACCESS_SIGN_KEY!)
}
export function IsValidRefreshToken(strToken: string) : boolean{
  return isValidToken(strToken, process.env.JWT_REFRESH_SIGN_KEY!)
}


function hasTokenExpired(payloadEncoded: string): boolean{
  const payLoad : IMyJwtPayload = JSON.parse(becodeBase64(payloadEncoded) )as IMyJwtPayload;
  console.log(payLoad.exp)
  const currentTime = Math.floor(Date.now() / 1000);
  console.log(currentTime)
  return payLoad.exp <= currentTime
}
export function GenerateAccessToken(): string{
  const expTime : number = parseInt(process.env.ACESS_TOKEN_EXPIRE_TIME_IN_SECONS!)
  const jwtAccessTokenKey : BinaryLike = process.env.JWT_ACCESS_SIGN_KEY!
  return generateToken(expTime, jwtAccessTokenKey);
}
export function GenerateRefreshToken(): string{
  const expTime : number = parseInt(process.env.ACESS_TOKEN_EXPIRE_TIME_IN_SECONS!)
  const jwtRefreshTokenKey : BinaryLike = process.env.JWT_REFRESH_SIGN_KEY!

  return generateToken(expTime, jwtRefreshTokenKey);
}

function generateToken(expireInSecond: number, jwtKey : BinaryLike) : string{
  const issuedTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds
  const expirationTimeInSeconds = issuedTimeInSeconds + expireInSecond; // 60 seconds * 60 minutes = 1 hour later
  const jwtHeader = JSON.stringify({
    typ:"JWT",
    alg: "HS256"
  })
  const jwtPayLoad : IMyJwtPayload = ({
    userID : 1,
    name: "user",
    accessLevel: "Admin",
    iss: "your-app.com", //Issuer
    aud: "your-app-api", //Audience
    iat: issuedTimeInSeconds, //ssued At
    exp: expirationTimeInSeconds //Expiration Time
  } )
  const headerEncoded = base64UrlEncode(jwtHeader);
  const payloadEncoded = base64UrlEncode(jwtPayLoad);
  const sign = crypto.createHmac("sha256", jwtKey)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest("base64url");
  return `${headerEncoded}.${payloadEncoded}.${sign}`
}
function base64UrlEncode (obj: string | IMyJwtPayload) {
  return Buffer.from(JSON.stringify(obj))
    .toString("base64url");
};
