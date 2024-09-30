type TextInputProps = {
  onChange: (userInput: string) => void;
};

export const TextInput = ({ onChange }: TextInputProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange(e.target.value);
  };

  return (
    <textarea
      onChange={handleChange}
      required
      className="w-full mt-2 p-2 bg-zinc-700"
      placeholder="Write your response here..."
    />
  );
};
