type RadioInputProps = {
  name: string;
  options: string[];
  onChange: (selectedOption: string) => void;
};

export const RadioInput = ({ name, options, onChange }: RadioInputProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value)
  }

  return (
    <>
      {options.map((option) => (
        <li key={option}>
          <label className="text-lg">
            <input
              onChange={handleChange}
              type="radio"
              name={name}
              value={option}
              className="mr-1"
            />
            {option}
          </label>
        </li>
      ))}
    </>
  );
};
