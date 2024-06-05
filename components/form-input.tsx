interface FormInputProps {
  errors: string[];
  placeholder: string;
  required: boolean;
  type: string;
}

export default function FormInput({
  errors,
  placeholder,
  required,
  type,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="h-10 w-full rounded-md border-none bg-transparent ring-2 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-orange-500"
        placeholder={placeholder}
        required={required}
        type={type}
      />
      {errors.map((error, index) => (
        <span className="font-medium text-red-500" key={index}>
          {error}
        </span>
      ))}
    </div>
  );
}
