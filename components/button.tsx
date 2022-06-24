type ButtonProps = {
  title: string;
  action: any;
  primary?: boolean;
};

const Button = ({ title, action, primary }: ButtonProps) => {
  return (
    <>
      {primary ? (
        <button
          className="text-green-600 font-normal border-2 rounded-lg py-2 px-2 w-60"
          onClick={action}
        >
          {title}
        </button>
      ) : (
        <button
          className="text-red-600 font-normal border-2 rounded-lg py-2 px-2 w-60"
          onClick={action}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
