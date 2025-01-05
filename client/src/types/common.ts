export type FormControlsT = Record<"name" | "label" | "componentType" , string> & { 
    type? : string
    placeholder?: string;
    options?: {
        value: string;
        label: string;
    }[];
    validation?: {required : boolean , maxLength? : number}
};

export type CommonFormPropsT<T = Record<string, string | number | undefined>> = {
    onSubmit: (data: Record<string, string>) => void;
    formControls: FormControlsT[];
    formData?: T;
    setFormData?: React.Dispatch<React.SetStateAction<T>>;
    buttonText? : string
}