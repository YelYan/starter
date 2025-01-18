import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import ProductFilter from "@/components/shopping-view/ProductFilter";
import ShoppingProducts from "@/components/shopping-view/ShoppingProducts";
import { sortOptions } from "@/config";

const ShoppinListing = () => {
  const [sort, setSort] = useState("");
  function handleSort(value: string) {
    setSort(value);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
      <ProductFilter />

      <div className="bg-background rounded-lg shadow-sm w-full">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-2">
            <span>4 products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                  size={"sm"}
                  variant={"outline"}
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="text-sm">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions?.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* product list */}
      {/* <div className="no-scrollbar">
        {productList && productList.length > 0 ? (
          <Virtualize
            data={productList}
            renderItem={renderProduct}
            columnCount={4}
          />
        ) : (
          <h3 className="text-center text-black font-medium text-lg my-4">
            There are no products yet!
          </h3>
        )}
      </div> */}
    </div>
  );
};

export default ShoppinListing;
