import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { addProductFormElements } from "@/config";
import CommonForm from "@/components/common/Form";

const AdminProducts = () => {
  const [openProductsDialog, setOpenProductsDialog] = useState(false);

  function closeProductsDialog() {
    setOpenProductsDialog(!openProductsDialog);
  }

  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <Fragment>
      <div className="flex justify-between items-center py-2">
        <h1 className="font-medium text-2xl">Products</h1>
        <Button variant={"primary"} onClick={closeProductsDialog}>
          Add New Product
        </Button>
      </div>

      <Sheet open={openProductsDialog} onOpenChange={closeProductsDialog}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription>
              Add details to create a complete and engaging product listing.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4">
            <CommonForm
              formControls={addProductFormElements}
              onSubmit={handleSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
