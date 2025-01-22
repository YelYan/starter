export type ReqProductT = {
    image? : string | null,
    title : string,
    description : string;
    category : string;
    brand : string;
    price : number;
    salePrice ?: number;
    totalStock : number;
}

export type ResProductT = ReqProductT & {
    _id? : string
}

export type FilterDataT = {
[key : string] : string[] | string;
}