import React from "react";

const Input = React.forwardRef((props: any, ref: any) => {
	const inputClasses = props.isValidCommand
		? "focus:outline-none text-xs tablet:text-xl laptop:text-2xl border-none caret-theme-border bg-theme-fill text-theme-valid"
		: "focus:outline-none text-xs tablet:text-xl laptop:text-2xl border-none caret-theme-border bg-theme-fill text-theme-error";
	return (
		<>
			<label htmlFor='commandInput'>
				<input
					type='text'
					name='commandInput'
					className={inputClasses}
					onChange={props.onChange}
					onKeyDown={props.onSubmit}
					spellCheck={false}
					value={props.command}
					ref={ref}
				/>
			</label>
		</>
	);
});

export default Input;
