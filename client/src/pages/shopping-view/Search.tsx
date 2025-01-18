import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { searchProducts } from "@/store/searchSlice/searchSlice";
import CardSkeleton from "@/components/ui/card-skeleton";
import ProductCard from "@/components/shopping-view/ProductCard";

const Search = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, searchResult, pagination } = useAppSelector(
    (state) => state.searchProduct
  );

  // get search aprams
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  function handlePageChange(newPage: number) {
    searchParams.set("page", newPage.toString());
    searchParams.set("limit", limit);
    navigate(`?${searchParams.toString()}`);
  }

  useEffect(() => {
    dispatch(searchProducts({ query, page, limit }));
  }, [dispatch, query, page, limit]);

  if (isLoading) return <CardSkeleton />;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">
        Search Results : {searchResult?.length}
      </h1>

      {searchResult?.length === 0 && (
        <h1 className="py-20 text-center text-xl text-black font-medium">
          No Product Found!
        </h1>
      )}

      {/* show product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {searchResult?.map((result) => (
          <ProductCard key={result._id} result={result} />
        ))}
      </div>

      {/* pagination */}
      {pagination && pagination?.totalPages > 1 && (
        <div className="mx-auto py-6">
          <Pagination>
            <PaginationContent>
              {/* previous button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(parseInt(page) - 1)}
                  className={
                    !pagination.hasPreviousPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
              {/* calculate the totalpages & change it into iterable array then use map function */}
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={pageNumber === parseInt(page)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(parseInt(page) + 1)}
                  className={
                    !pagination.hasNextPage
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Search;
