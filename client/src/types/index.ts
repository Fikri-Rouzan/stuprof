export interface Student {
  id: string;
  nim: string;
  name: string;
  dob: string;
  phone: string | null;
  address: string | null;
  hobby: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryRecord {
  id: string;
  lastLogin: string | null;
  lastLogout: string | null;
  student: {
    nim: string;
    name: string;
  } | null;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "password" | "number" | "date" | "textarea";
  placeholder?: string;
  autoComplete?: string;
  editable?: boolean;
  required?: boolean;
}
