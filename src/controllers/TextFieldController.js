import React from "react";

const TextFieldController = (props) => {
    const { label, type, placeholder, id, onChange, value, name, readOnly, required } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{ label }</label>
            <input type={ type || "text" }
                   value={value}
                   name={name}
                   id={id}
                   placeholder={placeholder}
                   onChange={onChange}
                   className="form-control form-control-sm"
                   required={required || false}
                   readOnly={readOnly || false}
            />
        </div>
    );
};

export default TextFieldController;
