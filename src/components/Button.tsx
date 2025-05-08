import { twMerge } from "tailwind-merge";

import Spinner from "./Spinner";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
};

const Button = ({
  loading = false,
  type = "button",
  className,
  children,
  ...rest
}: Props) => {
  return (
    <button
      type={type}
      className={twMerge(
        "flex justify-center rounded-md bg-blue-700 px-2 pt-2 pb-1.5 text-sm font-medium text-white hover:cursor-pointer hover:bg-blue-800",
        className
      )}
      {...rest}
    >
      {loading && <Spinner />}

      {!loading && children}
    </button>
  );
};

export default Button;
