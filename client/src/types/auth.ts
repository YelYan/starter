type ReqAuthFormbaseT = {
    email : string;
    password : string
}

export type LoginFormT = ReqAuthFormbaseT

export type ResLoginFormT = Omit<ReqAuthFormbaseT, 'password'> & {
    role? : string
    id? : string
    userName : string
}

export type ReqRegisterFormT = ReqAuthFormbaseT & {
    userName : string;
}

   