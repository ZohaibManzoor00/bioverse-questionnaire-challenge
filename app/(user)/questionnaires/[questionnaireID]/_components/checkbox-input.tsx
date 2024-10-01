type CheckboxInputProps = {
  name: string;
  options: string[];
  onChange: (selectedOptions: string[]) => void;
  selectedOptions: string[];
  disabled: boolean;
};

export const CheckboxInput = ({
  name,
  options,
  onChange,
  selectedOptions,
  disabled,
}: CheckboxInputProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;

    const updatedSelectedOptions = checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);

    onChange(updatedSelectedOptions);
  };

  return (
    <ul>
      {options.map((option) => (
        <li key={option}>
          <label className="text-lg">
            <input
              name={name}
              value={option}
              checked={selectedOptions.includes(option)}
              disabled={disabled}
              onChange={handleChange}
              type="checkbox"
              className={`mr-1 ${disabled ? "cursor-not-allowed" : ""}`}
            />
            {option}
          </label>
        </li>
      ))}
    </ul>
  );
};
