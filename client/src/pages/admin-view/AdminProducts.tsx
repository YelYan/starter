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
import Imageuploader from "@/components/admin-view/Imageuploader";
import { ReqProductT } from "@/types/products";

const AdminProducts = () => {
  const [openProductsDialog, setOpenProductsDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  function closeProductsDialog() {
    setOpenProductsDialog(!openProductsDialog);
  }

  function handleSubmit(data: ReqProductT) {
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

          <div className="mt-4 space-y-4">
            <Imageuploader imageFile={imageFile} setImageFile={setImageFile} />
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
