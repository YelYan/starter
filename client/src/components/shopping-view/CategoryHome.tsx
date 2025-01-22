import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { User, Baby, Shirt, Footprints, UserRoundMinus } from "lucide-react";

import Nike from "/brands/nike.svg";
import Levis from "/brands/levis.svg";
import Puma from "/brands/puma.svg";
import Zara from "/brands/zara.svg";
import Adidas from "/brands/adidas.svg";
import HM from "/brands/h&m.svg";

const filteroptions = {
  category: [
    { value: "men", label: "Men", icon: <User /> },
    { value: "women", label: "Women", icon: <UserRoundMinus /> },
    { value: "kids", label: "Kids", icon: <Baby /> },
    { value: "accessories", label: "Accessories", icon: <Shirt /> },
    { value: "footwear", label: "Footwear", icon: <Footprints /> },
  ],
  brand: [
    { value: "nike", label: "Nike", logo: Nike },
    { value: "adidas", label: "Adidas", logo: Adidas },
    { value: "puma", label: "Puma", logo: Puma },
    { value: "levi", label: "Levi's", logo: Levis },
    { value: "zara", label: "Zara", logo: Zara },
    { value: "h&m", label: "H&M", logo: HM },
  ],
};

const CategoryHome = () => {
  return (
    <div className="py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-xl font-bold">Shop By Brands</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full sm:w-[90%] md:w-4/5 mx-auto">
          {filteroptions?.brand?.map((b) => (
            <Link
              key={b.value}
              to={`/shop/listing?brand=${b.value}`}
              state={{ from: "Home Page", filterValue: b.value }}
            >
              <Card className="h-32 hover:border-none hover:shadow-none">
                <CardContent className="text-center flex items-center justify-center h-full">
                  <div className="flex flex-col gap-4 items-center">
                    <img
                      src={b.logo}
                      alt="logo image of brands"
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                    <h2 className="text-black font-bold">{b.label}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-xl font-bold">Shop By Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full sm:w-[90%] md:w-4/5 mx-auto">
          {filteroptions?.category?.map((c) => (
            <Link
              key={c.value}
              to={`/shop/listing?category=${c.value}`}
              state={{ from: "Home Page", filterValue: c.value }}
            >
              <Card className="h-32 hover:border-none hover:shadow-none">
                <CardContent className="text-center flex items-center justify-center h-full">
                  <div className="flex flex-col gap-4 items-center">
                    {c.icon}
                    <h2 className="text-black font-bold">{c.label}</h2>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryHome;
