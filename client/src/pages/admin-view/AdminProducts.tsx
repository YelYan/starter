import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import CardSkeleton from "@/components/ui/card-skeleton";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { addProductFormElements } from "@/config";
import CommonForm from "@/components/common/Form";
import Imageuploader from "@/components/admin-view/Imageuploader";
import { ReqProductT, ResProductT } from "@/types/products";
import AdminProductList from "@/components/admin-view/AdminProductList";
import Virtualize from "@/components/common/Vitrualize";
import useResponsiveColumnCount from "@/components/common/useResponsive";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  editProduct,
  getSingleProduct,
} from "@/store/adminSlice/productSlice/productSlice";

const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salePrice: 0,
  totalStock: 0,
};

const AdminProducts = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [openProductsDialog, setOpenProductsDialog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadedImgRes, setuploadedImgRes] = useState({
    url: "",
    message: "",
  });
  const [currentId, setCurrentId] = useState<string | undefined>("");
  const [editFormdata, setEditFormData] =
    useState<ResProductT>(initialFormData);

  const columnCount = useResponsiveColumnCount();
  const commonFormRef = useRef<{
    resetForm: (formData: ResProductT) => void;
  } | null>(null);

  const { isLoading, productList } = useAppSelector(
    (state) => state.adminProduct
  );

  const resetFormfunc = useCallback((formData: ResProductT) => {
    if (commonFormRef.current) {
      commonFormRef.current.resetForm(formData);
    }
  }, []);

  const openAddProductDialog = useCallback(() => {
    setEditFormData(initialFormData);
    setuploadedImgRes({ url: "", message: "" });
    setImageFile(null);
    setCurrentId("");
    resetFormfunc(initialFormData);
    setOpenProductsDialog(true);
  }, [resetFormfunc]);

  const closeProductsDialog = useCallback(() => {
    setOpenProductsDialog((prev) => !prev);
  }, []);

  const checkProductId = useMemo(
    () => currentId && editFormdata?._id === currentId,
    [currentId, editFormdata]
  );

  const handleSubmit = useCallback(
    (data: ReqProductT) => {
      const formData = {
        image: uploadedImgRes.url ? uploadedImgRes.url : null,
        ...data,
      };

      if (checkProductId) {
        dispatch(editProduct({ formData, id: currentId }))
          .unwrap()
          .then((result) => {
            if (result.success) {
              toast({
                title: `Product updated successfully ✅`,
              });
              closeProductsDialog();
              if (!checkProductId) {
                resetFormfunc(initialFormData);
              }
              dispatch(getAllProducts());
            }
          })
          .catch((error) => {
            toast({
              title: error,
              variant: "destructive",
              action: (
                <ToastAction
                  className="bg-white text-black"
                  altText="Try again"
                >
                  Try again
                </ToastAction>
              ),
            });
          });
      } else {
        dispatch(addProduct(formData))
          .unwrap()
          .then((result) => {
            if (result.success) {
              toast({
                title: `Product added successfully ✅`,
              });
              closeProductsDialog();
              if (!checkProductId) {
                resetFormfunc(initialFormData);
              }
              dispatch(getAllProducts());
            }
          })
          .catch((error) => {
            toast({
              title: error,
              variant: "destructive",
              action: (
                <ToastAction
                  className="bg-white text-black"
                  altText="Try again"
                >
                  Try again
                </ToastAction>
              ),
            });
          });
      }
    },
    [
      checkProductId,
      currentId,
      dispatch,
      toast,
      closeProductsDialog,
      resetFormfunc,
      uploadedImgRes.url,
    ]
  );

  const handleDelete = useCallback(
    (productId: string | undefined) => {
      dispatch(deleteProduct(productId))
        .unwrap()
        .then((result) => {
          if (result.success) {
            toast({
              title: `${result.message}✅`,
            });
            setOpenProductsDialog(false);
            dispatch(getAllProducts());
          }
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
            action: (
              <ToastAction className="bg-white text-black" altText="Try again">
                Try again
              </ToastAction>
            ),
          });
        });
    },
    [dispatch, toast]
  );

  const handleEdit = useCallback(
    (productId: string | undefined) => {
      dispatch(getSingleProduct(productId))
        .unwrap()
        .then((result) => {
          if (result.success) {
            setEditFormData(result.data);
            setuploadedImgRes({
              url: result.data.image,
              message: "",
            });
            setImageLoading((prev) => !prev);
            setImageFile(result.data.image);
            setCurrentId(productId);
          }
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
            action: (
              <ToastAction className="bg-white text-black" altText="Try again">
                Try again
              </ToastAction>
            ),
          });
        });
      setOpenProductsDialog((prev) => !prev);
    },
    [dispatch, toast]
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const renderProduct = useCallback(
    (product: ResProductT, style: React.CSSProperties) => (
      <div style={style}>
        <AdminProductList
          key={product._id}
          product={product}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    ),
    [handleDelete, handleEdit]
  );

  if (isLoading) return <CardSkeleton />;

  return (
    <div className="flex flex-col h-screen space-y-4 py-4">
      <div className="flex justify-between items-center py-2">
        <h1 className="font-medium text-2xl">Products</h1>
        <Button variant={"primary"} onClick={openAddProductDialog}>
          Add New Product
        </Button>
      </div>

      <div className="flex-1 no-scrollbar">
        {productList && productList.length > 0 ? (
          <Virtualize
            data={productList}
            renderItem={renderProduct}
            columnCount={columnCount}
          />
        ) : (
          <h3 className="text-center text-black font-medium text-lg my-4">
            There are no products yet!
          </h3>
        )}
      </div>

      <Sheet open={openProductsDialog} onOpenChange={closeProductsDialog}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <SheetDescription>
              Add details to create a complete and engaging product listing.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            <Imageuploader
              imageFile={imageFile}
              setImageFile={setImageFile}
              imageLoading={imageLoading}
              setImageLoading={setImageLoading}
              uploadedImgRes={uploadedImgRes}
              setuploadedImgRes={setuploadedImgRes}
            />
            <CommonForm
              ref={commonFormRef}
              formData={checkProductId ? editFormdata : initialFormData}
              formControls={addProductFormElements}
              onSubmit={handleSubmit}
              buttonText={!currentId ? "Add" : "Update"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default React.memo(AdminProducts);
