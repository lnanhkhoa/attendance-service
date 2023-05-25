import { Field } from "react-final-form";

const MyTextInput = (props: any) => {
  const { name, label, ...rest } = props;
  return (
    <Field name={name}>
      {(props) => {
        const {
          meta: { error, submitError, dirtySinceLastSubmit, touched },
        } = props;
        const hasError = (error || (submitError && !dirtySinceLastSubmit)) && touched;
        const errorText = error || submitError;
        return (
          <>
            <label className="block uppercase text-slate-600 text-xs font-bold mb-1">{label}</label>
            <input
              className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              {...props.input}
              {...rest}
            />
            <span className="inline-block text-xs text-red-600 dark:text-red-400">{hasError && errorText}</span>
          </>
        );
      }}
    </Field>
  );
};

export default MyTextInput;
