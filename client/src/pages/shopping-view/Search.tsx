import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hook";

import { searchProducts } from "@/store/searchSlice/searchSlice";
import CardSkeleton from "@/components/ui/card-skeleton";

const Search = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { isLoading, searchResult, pagination } = useAppSelector(
    (state) => state.searchProduct
  );

  console.log(pagination);

  // get search aprams
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  useEffect(() => {
    dispatch(searchProducts({ query, page, limit }));
  }, [dispatch, query, page, limit]);

  if (isLoading) return <CardSkeleton />;

  return (
    <div className="h-screen overflow-y-auto">
      <h1 className="text-lg font-medium">
        Search Results : {searchResult?.length}
      </h1>

      {searchResult?.length === 0 && (
        <h1 className="my-10 text-center text-xl text-black font-medium">
          No Product Found!
        </h1>
      )}

      {/* show product list */}
    </div>
  );
};

export default Search;
