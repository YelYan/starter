import React from "react";
import { filteroptions } from "@/config";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FilterDataT } from "@/types/products";

type FilterOptions = {
  category: { value: string; label: string }[];
  brand: { value: string; label: string }[];
};

type ProductFilterT = {
  handleFilters: (keyItem: string, selectedVal: string) => void;
  handleApplyFilter: () => void;
  filters?: FilterDataT;
};

const ProductFilter = ({
  handleFilters,
  handleApplyFilter,
  filters,
}: ProductFilterT) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Filters</h2>

        <div className="">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => handleApplyFilter()}
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="px-4 py-2 border-b">
        {Object.keys(filteroptions).map((keyItem) => (
          <div key={keyItem}>
            <h3 className="font-medium">{keyItem}</h3>
            <div className="grid gap-2 mt-2">
              {filteroptions[keyItem as keyof FilterOptions].map(
                (option: { value: string; label: string }) => (
                  <Label
                    key={option.value}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox
                      id={option.value}
                      //
                      checked={
                        (filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters?.[keyItem]?.includes(option?.value)) ||
                        false
                      }
                      onCheckedChange={(checked) => {
                        // for check & uncheck
                        if (checked) {
                          handleFilters(keyItem, option.value);
                        } else {
                          handleFilters(keyItem, option.value);
                        }
                      }}
                    />
                    {option.label}
                  </Label>
                )
              )}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
