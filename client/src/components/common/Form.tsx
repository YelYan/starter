import React from "react";
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

const CommonForm = ({
  onSubmit,
  formControls,
  buttonText,
}: CommonFormPropsT) => {
  // Define Zod schema based on formControls
  const schema = z.object(
    formControls.reduce<Record<string, z.ZodTypeAny>>((acc, formControl) => {
      const { name, validation } = formControl;
      let rule = z.string();

      if (name === "email") {
        rule = rule.email("Invalid email address");
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
    defaultValues: formControls.reduce<Record<string, string>>(
      (acc, control) => {
        acc[control.name] = ""; // Default all fields to empty string
        return acc;
      },
      {}
    ),
  });

  return (
    //@ts-ignore
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3  w-[15rem] lg:w-[20rem]">
        {formControls.map((formControl) => (
          <div key={formControl.name} className="w-full grid gap-3">
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
                          placeholder={formControl.placeholder}
                        />
                        {errors[formControl.name] && (
                          <p className="text-red-500 text-sm">
                            {errors[formControl.name]?.message?.toString()}
                          </p>
                        )}
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
                        {errors[formControl.name] && (
                          <p className="text-red-500 text-sm">
                            {errors[formControl.name]?.message?.toString()}
                          </p>
                        )}
                      </>
                    );

                  case "select":
                    return (
                      <>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
                        {errors[formControl.name] && (
                          <p className="text-red-500 text-sm">
                            {errors[formControl.name]?.message?.toString()}
                          </p>
                        )}
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
      <Button type="submit" className="mt-4 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
