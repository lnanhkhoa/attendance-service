export interface Attendance {
  id: string;
  capturePhotoUrl: string;
  temperature: string;
  type: "checkin" | "checkout";
  user: User;
}

export interface School {
  id: string;
  schoolPhotoUrl: string;
  schoolName: string;
  country: string;
  city: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userPhotoUrl: string;
}
