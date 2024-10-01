type RadioInputProps = {
  name: string;
  options: string[];
  onChange: (selectedOption: string) => void;
  selectedOption: string;
  disabled: boolean;
};

export const RadioInput = ({
  name,
  options,
  onChange,
  disabled,
  selectedOption,
}: RadioInputProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <ul>
      {options.map((option) => (
        <li key={option}>
          <label className={`text-lg ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input
              name={name}
              onChange={handleChange}
              checked={selectedOption === option}
              type="radio"
              value={option}
              required
              disabled={disabled && option !== selectedOption}
              className="mr-1"
            />
            {option}
          </label>
        </li>
      ))}
    </ul>
  );
};
