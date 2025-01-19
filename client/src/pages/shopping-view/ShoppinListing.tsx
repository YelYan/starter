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
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchFilterProducts } from "@/store/shopSlice/productSlice/shopProductSlice";
// import ShoppingProducts from "@/components/shopping-view/ShoppingProducts";
import { sortOptions } from "@/config";
import CardSkeleton from "@/components/ui/card-skeleton";

const ShoppinListing = () => {
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState<{
    [key: string]: string[];
  }>({
    brand: [],
    category: [],
  });

  const dispatch = useAppDispatch();

  const { isLoading, productFilterList } = useAppSelector(
    (state) => state.shopProductFilter
  );

  function handleSort(value: string) {
    setSort(value);
  }

  function handleFilters(keyItem: string, selectedVal: string) {
    setFilters((prev) => {
      const currentSelectedVals = prev[keyItem];

      const updatedSelectedVals = currentSelectedVals.includes(selectedVal)
        ? currentSelectedVals.filter((val) => val !== selectedVal)
        : [...currentSelectedVals, selectedVal];

      return {
        ...prev,
        [keyItem]: updatedSelectedVals,
      };
    });
  }

  function handleApplyFilter() {
    dispatch(fetchFilterProducts(filters));
  }

  if (isLoading) return <CardSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
      <ProductFilter
        handleFilters={handleFilters}
        handleApplyFilter={handleApplyFilter}
      />

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
