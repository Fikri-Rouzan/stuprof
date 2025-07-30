import type { FormField } from "../types";

export const registerFormFields: FormField[] = [
  {
    name: "nim",
    label: "NIM (Username)",
    type: "number",
    placeholder: "Enter your NIM",
    autoComplete: "nim",
    required: true,
  },
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
    autoComplete: "name",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "number",
    placeholder: "Enter your phone number",
    autoComplete: "phone",
  },
  {
    name: "hobby",
    label: "Hobby",
    type: "text",
    placeholder: "Enter your hobby",
    autoComplete: "hobby",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter your address",
    autoComplete: "address",
  },
];
