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

export const formSignUpSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email is string",
      })
      .email("Invalid email address"),
    firstName: z.string({
      required_error: "First Name is required",
      invalid_type_error: "First Name is string",
    }),
    lastName: z.string({
      required_error: "Last Name is required",
      invalid_type_error: "First Name is string",
    }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "password is string",
      })
      .min(8, "At least 6 characters"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
      invalid_type_error: "Confirm Password is string",
    }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type FormSignUpSchemaType = z.infer<typeof formSignUpSchema>;

export const zodSignUpForm = (values: any) => formSignUpSchema.parse(values);

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
      case "register":
        zodSignUpForm(values);
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
