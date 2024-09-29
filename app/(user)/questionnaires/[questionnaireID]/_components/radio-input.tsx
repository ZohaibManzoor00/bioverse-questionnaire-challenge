export const RadioInput = ({ name, options }: { name: string, options: string[] }) => {
  return (
    <>
      {options.map((option, index) => (
        <li key={index}>
          <label className="text-lg">
            <input type="radio" name={name} value={option} className="mr-1" />
            {option}
          </label>
        </li>
      ))}
    </>
  );
};
