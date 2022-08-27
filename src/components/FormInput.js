function FormInput({
  label,
  type = "text",
  handleChange,
  value,
  id,
  ...otherProps
}) {
  return (
    <div className="flex flex-col gap-2 ">
      <label htmlFor={id}>{label}</label>
      <input
        className=" rounded-sm p-2 bg-[#07070736] border-[1px] border-[#E6E6E633]"
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  );
}

export default FormInput;
