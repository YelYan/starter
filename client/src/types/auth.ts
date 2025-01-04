type AuthFormbaseT = {
    email : string;
    password : string
}

export type LoginFormT = AuthFormbaseT

export type RegisterFormT = AuthFormbaseT & {
    userName : string;
}
   