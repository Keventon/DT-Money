import { FormLoginParams } from "@/screens/Login/LoginForm";
import { api } from "../api";
import { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";
import { FormRegisterParams } from "@/screens/Register/RegisterForm";

export async function authenticate(
  userData: FormLoginParams
): Promise<IAuthenticateResponse> {
  const { data } = await api.post<IAuthenticateResponse>(
    "/auth/login",
    userData
  );

  return data;
}

export async function registerUser(
  userData: FormRegisterParams
): Promise<IAuthenticateResponse> {
  const { data } = await api.post<IAuthenticateResponse>(
    "/auth/register",
    userData
  );

  return data;
}
