
import type { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
    type:string;
    placeholder?: string;
    name:string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}
export function Input({type, placeholder, name,register,rules,error}: InputProps) {

    return(
        <div>
            <input className="w-full border-2 rounded-md h-11 px-2"
             placeholder={placeholder}
                type={type} 
                {...register(name, rules)}
                id="{name}"
              />
              {error && ( <span className="text-red-500 text-sm mt-1">{error}</span> )}
        </div>
    )
}