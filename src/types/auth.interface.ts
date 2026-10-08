export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export interface VerifyAccountPayload {
  email : string;
  otp: string;

}
export interface LoginPayload {
  email: string;
  password: string;
}