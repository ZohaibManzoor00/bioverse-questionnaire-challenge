type CheckboxInputProps = {
  options: string[];
  onChange: (selectedOptions: string[]) => void;
  selectedOptions: string[]
};

export const CheckboxInput = ({ options, onChange, selectedOptions }: CheckboxInputProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;

    const updatedSelectedOptions = checked 
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);

    onChange(updatedSelectedOptions)
  }

  return (
    <>
      {options.map((option) => (
        <li key={option}>
          <label className="text-lg">
            <input onChange={handleChange} type="checkbox" value={option} className="mr-1" />
            {option}
          </label>
        </li>
      ))}
    </>
  );
}
