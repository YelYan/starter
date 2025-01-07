import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommonFormPropsT } from "@/types/common";
import LoadingSpinner from "@/components/ui/loadingSpinner";

type DefaultValuesT = Record<string, string | number | undefined>;

const CommonForm = ({
  onSubmit,
  formControls,
  buttonText,
  isLoading,
}: CommonFormPropsT<any>) => {
  // Define Zod schema based on formControls
  const schema = z.object(
    formControls.reduce<Record<string, z.ZodTypeAny>>((acc, formControl) => {
      const { name, validation, type } = formControl;
      let rule = z.string();

      if (name === "email") {
        rule = rule.email("Invalid email address");
      }
      if (type === "number") {
        rule = z
          .number({ invalid_type_error: "Must be a number" })
          .min(0, "Value must be zero or above");
      }
      if (name === "password") {
        rule = rule.min(8, "Password must be at least 8 characters long");
      }

      if (validation?.required) {
        rule = rule.min(1, "This field is required");
      }
      if (validation?.maxLength) {
        rule = rule.max(
          validation.maxLength,
          `Max length is ${validation.maxLength}`
        );
      }

      acc[name] = rule;
      return acc;
    }, {})
  );

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formControls.reduce<DefaultValuesT>((acc, control) => {
      if (control.type === "number") {
        acc[control.name] = 0; // Default all number fields to 0
      } else {
        acc[control.name] = ""; // Default all fields to empty string
      }
      return acc;
    }, {}),
  });

  // error message animation
  const renderError = (name: string) => (
    <AnimatePresence mode="wait">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15, type: "tween" }}
        className="absolute text-red-500 text-sm -bottom-5"
      >
        {errors[name]?.message?.toString()}
      </motion.p>
    </AnimatePresence>
  );

  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3  w-[15rem] lg:w-[20rem]">
        {formControls.map((formControl) => (
          <div
            key={formControl.name}
            className="w-full grid gap-3 relative mb-3"
          >
            <Label htmlFor={formControl.name}>{formControl.label}</Label>
            <Controller
              name={formControl.name}
              control={control}
              render={({ field }) => {
                switch (formControl.componentType) {
                  case "input":
                    return (
                      <>
                        <Input
                          {...field}
                          id={formControl.name}
                          type={formControl.type}
                          min={formControl.type === "number" ? 0 : undefined}
                          placeholder={formControl.placeholder}
                          //prevent from focusing on input when scrolling
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          onChange={(e) => {
                            if (formControl.type === "number") {
                              const value = parseInt(e.target.value, 10);
                              field.onChange(
                                isNaN(value) || value < 0 ? "" : value
                              ); // Prevent negative values
                            } else {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                        {errors[formControl.name] &&
                          renderError(formControl.name)}
                      </>
                    );

                  case "textarea":
                    return (
                      <>
                        <Textarea
                          {...field}
                          id={formControl.name}
                          placeholder={formControl.placeholder}
                        />
                        {errors[formControl.name] &&
                          renderError(formControl.name)}
                      </>
                    );

                  case "select":
                    return (
                      <>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString()}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={formControl.placeholder}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {formControl.options &&
                              formControl.options.map(
                                (option: { value: string; label: string }) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                )
                              )}
                          </SelectContent>
                        </Select>
                        {errors[formControl.name] &&
                          renderError(formControl.name)}
                      </>
                    );

                  default:
                    return <></>;
                }
              }}
            />
          </div>
        ))}
      </div>
      <Button
        disabled={isLoading}
        variant={"primary"}
        type="submit"
        className="mt-4 w-full relative"
      >
        {isLoading ? <LoadingSpinner /> : <>{buttonText || "Submit"}</>}
      </Button>
    </form>
  );
};

export default CommonForm;
