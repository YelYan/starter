export const registerformControls = [
    {
        name : "userName",
        label : "Username",
        placeholder : "Enter your username",
        componentType : "input",
        type : "text",
        validation : {required : true}
    },
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : "input",
        type : "email",
        validation : {required : true}
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        componentType : "input",
        type : "password",
        validation : {required : true, maxLength : 20}
    },
]
export const loginformControls = [
    {
        name : "email",
        label : "Email",
        placeholder : "Enter your email",
        componentType : "input",
        type : "email",
        validation : {required : true}
    },
    {
        name : "password",
        label : "Password",
        placeholder : "Enter your password",
        componentType : "input",
        type : "password",
        validation : {required : true, maxLength : 20}
    },
]

export const shoppingHeaderMenuItems = [
    {
        id : "home",
        label : "Home",
        path : '/shop/home'
    },
    {
        id : "products",
        label : "Products",
        path : '/shop/products'
    },
    {
        id : "men",
        label : "Men",
        path : '/shop/listing'
    },
    {
        id : "women",
        label : "Women",
        path : '/shop/listing'
    },
    {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
    },
    {
        id: "footwear",
        label: "Footwear",
        path: "/shop/listing",
    },
    {
        id: "accessories",
        label: "Accessories",
        path: "/shop/listing",
    },
    {
        id: "search",
        label: "Search",
        path: "/shop/search",
    },
]

export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
      validation : {required : true}
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
      validation : {required : true}
    },
    {
      label: "Category",
      name: "category",
      placeholder: "Select product category",
      componentType: "select",
      validation : {required : true},
      options: [
        { value: "men", label: "Men" },
        { value: "women", label: "Women" },
        { value: "kids", label: "Kids" },
        { value: "accessories", label: "Accessories" },
        { value: "footwear", label: "Footwear" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      placeholder: "Select brand category",
      options: [
        { value: "nike", label: "Nike" },
        { value: "adidas", label: "Adidas" },
        { value: "puma", label: "Puma" },
        { value: "levi", label: "Levi's" },
        { value: "zara", label: "Zara" },
        { value: "h&m", label: "H&M" },
      ],
      validation : {required : true}
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
      validation : {required : true}
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
      validation : {required : true}
    },
];

export const filteroptions = {
  category : [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "kids", label: "Kids" },
    { value: "accessories", label: "Accessories" },
    { value: "footwear", label: "Footwear" },
  ],
  brand : [
    { value: "nike", label: "Nike" },
    { value: "adidas", label: "Adidas" },
    { value: "puma", label: "Puma" },
    { value: "levi", label: "Levi's" },
    { value: "zara", label: "Zara" },
    { value: "h&m", label: "H&M" },
  ],
}

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];