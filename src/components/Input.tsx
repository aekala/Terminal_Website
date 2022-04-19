import React from "react";

const Input = React.forwardRef((props: any, ref: any) => {
	const inputClasses = props.isValidCommand
		? "focus:outline-none text-xs tablet:text-xl laptop:text-2xl border-none caret-theme-border bg-theme-fill text-theme-valid"
		: "focus:outline-none text-xs tablet:text-xl laptop:text-2xl border-none caret-theme-border bg-theme-fill text-theme-error";
	return (
		<>
			<input
				type='text'
				aria-label='command input'
				className={inputClasses}
				onChange={props.onChange}
				onKeyDown={props.onSubmit}
				spellCheck={false}
				value={props.command}
				ref={ref}
			/>
		</>
	);
});

export default Input;
