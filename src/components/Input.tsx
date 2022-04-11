const Input = (props: any) => {
	const inputClasses = props.isValidCommand
		? "focus:outline-none text-3xl border-none caret-theme-border bg-theme-fill text-theme-valid"
		: "focus:outline-none text-3xl border-none caret-theme-border bg-theme-fill text-theme-error";
	return (
		<>
			<input
				type='text'
				className={inputClasses}
				onChange={props.onChange}
				onKeyDown={props.onSubmit}
				value={props.command}
			/>
		</>
	);
};

export default Input;
