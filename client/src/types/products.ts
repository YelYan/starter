export type ReqProductT = {
    title : string,
    description : string;
    category : string;
    brand : string;
    price : number;
    salePrice ?: number;
    totalStock : number;
}