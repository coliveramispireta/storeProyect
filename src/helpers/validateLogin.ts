import { ILoginProps, ILoginPropsError } from "@/types/types";

export const validateLogin = (input: ILoginProps): ILoginPropsError => {
    const errors: ILoginPropsError = {};
    const regexEmail = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    const regexStrongPassword = /^[A-Za-z0-9@$!%*?&]+$/;

    if (input.email.trim().length < 1) {
        errors.email = `El campo email es obligatorio`;
      } else if (!regexEmail.test(input.email)) {
        errors.email = `Email inválido`;
      }

      if (input.password.trim().length < 1) {
        errors.password = `El campo password es obligatorio`;
      } else if (!regexStrongPassword.test(input.password)) {
        errors.password = `Carácter no admitido`;
      }

    return errors;
}