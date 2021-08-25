import React from "react";

const TextareaController = (props) => {
  const { label, placeholder, id, onChange, value, name, required } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
        id={id}
        rows="2"
        required={required || false}
      />
    </div>
  );
};

export default TextareaController;
