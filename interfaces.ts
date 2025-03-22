export interface IMyJwtPayload{
  userID: number;        // Unique identifier for the user
  name: string;          // Name of the user
  accessLevel: string;   // User's access level (e.g., Admin, User)
  iss: string;           // Issuer of the token
  aud: string;           // Audience of the token
  iat: number;           // Issued at (Unix timestamp in seconds)
  exp: number;           // Expiration time (Unix timestamp in seconds)

}

export interface IErrorResponse{
  result:{
    code: number,
    message: string
  }
}
export interface ISuccessTokenResponse{
  result:{
    code: number,
    accessToken: string,
    refreshToken: string
  }
}