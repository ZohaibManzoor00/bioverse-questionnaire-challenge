type TextInputProps = {
  selectedOption: string;
  onChange: (userInput: string) => void;
  disabled: boolean;
};

export const TextInput = ({
  onChange,
  selectedOption,
  disabled,
}: TextInputProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(e.target.value);
  };

  return (
    <textarea
      onChange={handleChange}
      required
      value={selectedOption}
      disabled={disabled}
      className="w-full mt-2 p-2 bg-zinc-700"
      placeholder="Write your response here..."
    />
  );
};
