import React from "react";

export default function CheckboxInput({ options }: { options: string[] }) {
  return (
    <>
      {options.map((option, index) => (
        <li key={index}>
          <label className="text-lg">
            <input type="checkbox" value={option} className="mr-1"/>
            {option}
          </label>
        </li>
      ))}
    </>
  );
}
