import React from "react";
import { filteroptions } from "@/config";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type FilterOptions = {
  category: { value: string; label: string }[];
  brand: { value: string; label: string }[];
};

const ProductFilter = () => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
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
                    <Checkbox id="terms" />
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
