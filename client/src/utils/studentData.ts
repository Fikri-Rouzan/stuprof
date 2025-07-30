import type { FormField } from "../types";

export const getStudentFormFields = (isEditing: boolean): FormField[] => [
  {
    name: "nim",
    label: "NIM",
    type: "number",
    required: true,
    placeholder: "Enter the student's NIM",
    autoComplete: "nim",
  },
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter the student's full name",
    autoComplete: "name",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: !isEditing,
    placeholder: isEditing
      ? "Leave blank to keep current"
      : "Enter the student password",
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
    placeholder: "Enter the student's phone number",
    autoComplete: "phone",
  },
  {
    name: "hobby",
    label: "Hobby",
    type: "text",
    placeholder: "Enter the student's hobby",
    autoComplete: "hobby",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter the student's address",
    autoComplete: "address",
  },
];
