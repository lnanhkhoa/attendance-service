import { z } from "zod";
import { forEach, get, set } from "lodash";

export const formLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password is string",
    })
    .min(6, "At least 6 characters"),
});
export type FormLoginSchemaType = z.infer<typeof formLoginSchema>;
export const zodLoginForm = (values: any) => formLoginSchema.parse(values);

export const formCheckinSchema = z.object({
  type: z.string({
    required_error: "Field is required",
    invalid_type_error: "Field is string",
  }),
  date: z.string(),
});
export type FormCheckinSchemaType = z.infer<typeof formCheckinSchema>;
export const zodCheckinForm = (values: any) => formCheckinSchema.parse(values);

export const formSchema = (values: any, pageName: any) => {
  const formSchemaValue: { [k: string]: any } = {};
  values?.fields?.forEach((field: any) => {
    if (field.validations) {
      field.validations.forEach((validationItem: any) => {
        switch (validationItem.validationType) {
          case "string":
            formSchemaValue[field.name] = z.string({
              required_error: validationItem.params.required_error,
              invalid_type_error: validationItem.params.invalid_type_error,
            });
            break;
          case "email":
            formSchemaValue[field.name] = z
              .string({
                required_error: validationItem.params.required_error,
                invalid_type_error: validationItem.params.invalid_type_error,
              })
              .email({ message: validationItem.params.message });
            break;
          case "min":
            formSchemaValue[field.name] = z
              .string({
                required_error: validationItem.params.required_error,
                invalid_type_error: validationItem.params.invalid_type_error,
              })
              .min(validationItem.value, { message: validationItem.params.message });
            break;
          case "max":
            formSchemaValue[field.name] = z
              .string({
                required_error: validationItem.params.required_error,
                invalid_type_error: validationItem.params.invalid_type_error,
              })
              .max(validationItem.value, { message: validationItem.params.message });
            break;
        }
      });
    }
  });

  if (values.refine && values.refine.required && values.refine.type === "equal") {
    return z.object(formSchemaValue).refine((data) => data[values.refine.value[0]] === data[values.refine.value[1]], {
      message: values.refine.message,
      path: [values.refine.value[1]],
    });
  }

  return z.object(formSchemaValue);
};

export const zodForm = (values: any, pageName: any) => formSchema(values, pageName).parse(values);

export const zodPageSchema = (values: any, pageName: string) => {
  try {
    switch (pageName) {
      case "login":
        zodLoginForm(values);
        break;
      case "checkin":
        zodCheckinForm(values);
        break;
      default:
        zodForm(values, pageName);
        break;
    }
  } catch (error) {
    const messages = JSON.parse(get(error, ["message"], []));
    if (messages.length > 0) {
      const errors = {};
      forEach(messages, (messageItem: any) => {
        const message = get(messageItem, ["message"]);
        const path = get(messageItem, ["path"]);
        set(errors, path, message);
      });
      return errors;
    }
    return;
  }
};
