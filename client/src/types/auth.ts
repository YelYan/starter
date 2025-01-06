type ReqAuthFormbaseT = {
    email : string;
    password : string
}

export type ReqLoginFormT = ReqAuthFormbaseT

export type ResLoginFormT = Omit<ReqAuthFormbaseT, 'password'> & {
    role? : string
    id? : string
    userName : string
}

export type ReqRegisterFormT = ReqAuthFormbaseT & {
    userName : string;
}

   