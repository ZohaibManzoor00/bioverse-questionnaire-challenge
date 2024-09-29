type ErrorMessages = {
  username?: string;
  password?: string;
  general?: string;
};

export const renderErrors = (errors: ErrorMessages): JSX.Element | null => {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div className="text-red-500 text-md">
      {errors.username && <p>{errors.username}</p>}
      {errors.password && <p>{errors.password}</p>}
      {errors.general && <p>{errors.general}</p>}
    </div>
  );
};
