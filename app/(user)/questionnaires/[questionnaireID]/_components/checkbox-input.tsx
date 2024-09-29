type CheckboxInputProps = {
  options: string[];
};

export const CheckboxInput = ({ options }: CheckboxInputProps) => {
  return (
    <>
      {options.map((option) => (
        <li key={option}>
          <label className="text-lg">
            <input type="checkbox" value={option} className="mr-1" />
            {option}
          </label>
        </li>
      ))}
    </>
  );
}
