import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"input"> & {
  error?: string;
};

const TextInput = ({ type, className, error, ...rest }: Props) => {
  return (
    <>
      <input
        type="text"
        className={twMerge(
          "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...rest}
      />

      {error && <div className="mt-1 px-2 text-xs text-red-600">{error}</div>}
    </>
  );
};

export default TextInput;
