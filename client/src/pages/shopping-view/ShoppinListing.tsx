import { useCallback, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useLocation } from "react-router-dom";
import { debounce } from "lodash";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CardSkeleton from "@/components/ui/card-skeleton";

import useResponsiveColumnCount from "@/components/common/useResponsive";
import { sortOptions } from "@/config";
import { ResProductT } from "@/types/products";
import ProductFilter from "@/components/shopping-view/ProductFilter";
import ProductCard from "@/components/shopping-view/ProductCard";
import Virtualize from "@/components/common/Vitrualize";
import { fetchFilterProducts } from "@/store/shopSlice/productSlice/shopProductSlice";

const ShoppinListing = () => {
  // Retrieve the state from sessionStorage on component mount
  const [sort, setSort] = useState(
    sessionStorage.getItem("sort") || "price-lowtohigh"
  );
  const [filters, setFilters] = useState<{
    [key: string]: string[];
  }>(() => {
    const savedFilters = sessionStorage.getItem("filters");

    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          brand: [],
          category: [],
        };
  });
  const location = useLocation();

  const dispatch = useAppDispatch();
  const columnCount = useResponsiveColumnCount();

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

  const handleApplyFilter = debounce(() => {
    dispatch(fetchFilterProducts(filters));
  }, 800);

  // navigate from home page & get filter value from URL
  useEffect(() => {
    if (location?.state?.filterValue) {
      const filterKey = location.search.includes("brand")
        ? "brand"
        : "category";

      setFilters((prev) => ({
        ...prev,
        [filterKey]: [location.state.filterValue],
      }));
    }
  }, [location.state, location.search]);

  // Save the sort state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("sort", sort);
  }, [sort]);

  // Save the filters state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    dispatch(fetchFilterProducts({ ...filters, sortBy: sort }));
  }, [sort, dispatch]);

  const renderProduct = useCallback(
    (product: ResProductT, style: React.CSSProperties) => (
      <div style={style} className="py-4">
        <ProductCard key={product._id} result={product} />
      </div>
    ),
    []
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
      <ProductFilter
        handleFilters={handleFilters}
        handleApplyFilter={handleApplyFilter}
        filters={filters}
      />

      <div className="bg-background rounded-lg shadow-sm w-full">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-2">
            <span>{productFilterList?.length} products</span>
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

        {isLoading && <CardSkeleton />}

        {/* product list */}
        <div className="no-scrollbar h-screen">
          {productFilterList && productFilterList.length > 0 ? (
            <Virtualize
              data={productFilterList}
              renderItem={renderProduct}
              columnCount={columnCount}
            />
          ) : (
            <h3 className="text-center text-black font-medium text-lg my-4 py-10">
              Sorry we did not found any products!
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppinListing;
