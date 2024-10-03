type TextInputProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
};

export const TextInput = ({ id, label, name,type = "text" }: TextInputProps) => {
  return (
    <div className="flex justify-between">
      <label htmlFor={id} className="mr-2">{label}</label>
      <input id={id} name={name} type={type} className="text-black ml-2 px-1" />
    </div>
  );
};
