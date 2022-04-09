const Input = (props: any) => {
	return (
		<>
			<input
				type='text'
				className='focus:outline-none text-3xl border-none caret-theme-border bg-theme-fill text-theme-base'
				onChange={props.onChange}
				onKeyDown={props.onSubmit}
				value={props.command}
			/>
		</>
	);
};

export default Input;
