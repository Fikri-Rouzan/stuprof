import type { FormField } from "../types";

export const editProfile: FormField[] = [
  {
    label: "NIM",
    name: "nim",
    editable: false,
    type: "number",
    placeholder: "",
  },
  {
    label: "Full Name",
    name: "name",
    editable: true,
    type: "text",
    placeholder: "Enter your full name",
  },
  { label: "Date of Birth", name: "dob", editable: true, type: "date" },
  {
    label: "Phone Number",
    name: "phone",
    editable: true,
    type: "number",
    placeholder: "Enter your phone number",
  },
  {
    label: "Hobby",
    name: "hobby",
    editable: true,
    type: "text",
    placeholder: "Enter your hobby",
  },
  {
    label: "Address",
    name: "address",
    editable: true,
    type: "textarea",
    placeholder: "Enter your address",
  },
];
