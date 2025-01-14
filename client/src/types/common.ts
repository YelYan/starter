export type FormControlsT = Record<"name" | "label" | "componentType" , string> & { 
    type? : string
    placeholder?: string;
    options?: {
        value: string;
        label: string;
    }[];
    validation?: {required : boolean , maxLength? : number}
};


export type CommonFormPropsT<T> = {
    onSubmit: (data:T) => void;
    formControls: FormControlsT[];
    formData? : T
    buttonText? : string
    isLoading? : boolean
}


