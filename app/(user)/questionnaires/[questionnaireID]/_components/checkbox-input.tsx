type CheckboxInputProps = {
  name: string;
  options: string[];
  onChange: (selectedOptions: string[]) => void;
  selectedOptions: string[];
  disabled: boolean;
};

export const CheckboxInput = ({ name, options, onChange, selectedOptions, disabled }: CheckboxInputProps) => {

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
          <label className={`text-lg ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <input
              name={`${name}-${option}`}
              value={option}
              checked={selectedOptions.includes(option)}
              disabled={disabled}
              onChange={handleChange}
              required={selectedOptions.includes(option)}
              type="checkbox"
              className="mr-2"
            />
            {option}
          </label>
        </li>
      ))}
    </ul>
  );
};
