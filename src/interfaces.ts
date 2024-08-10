export interface loginFormShape {
  email: string;
  password: string;
}

export interface MyButtonShape {
  onPressed?: () => void;
  loading?: boolean;
  type: "submit" | "button" | undefined;
  caption: string;
}

export interface DialogShape {
  visibility: boolean;
  onRequestClose: () => void;
}

export interface userShape {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}
