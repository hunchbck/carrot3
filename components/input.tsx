import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface InputProps {
  errors?: string[];
  name: string;
}

const _Input = (
  {
    errors = [],
    name,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="h-10 w-full rounded-md border-none bg-transparent ring-2 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-orange-500"
        name={name}
        ref={ref}
        {...rest}
      />
      {errors.map((error, index) => (
        <span className="font-medium text-red-500" key={index}>
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
