import { IRegisterProps, IRegisterPropsError } from "@/types/types";

export const validateRegister = (input: IRegisterProps): IRegisterPropsError => {
    const errors: IRegisterPropsError = {};

    const regexEmail = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    const regexLettersAndNumbers = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const regexNumbersOnly = /^[0-9]+$/;
    const regexLettersOnlySpace = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const regexStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


      if (input.name.trim().length < 1) {
        errors.name = `El campo nombre es obligatorio`;
      } else if (!regexLettersOnlySpace.test(input.name)) {
        errors.name = `Carácter no admitido, ingrese solo letras`;
      }
      if (input.address.trim().length < 1) {
        errors.address = `El campo de dirección es obligatorio`;
      } else if (!regexLettersAndNumbers.test(input.address)) {
        errors.address = `Carácter no admitido`;
      }
      if (input.phone.trim().length < 1) {
        errors.phone = `El campo de teléfono es obligatorio`;
      } else if (!regexNumbersOnly.test(input.phone)) {
        errors.phone = `Carácter no admitido`;
      }

      if (input.email.trim().length < 1) {
        errors.email = `El campo email es obligatorio`;
      } else if (!regexEmail.test(input.email)) {
        errors.email = `Email inválido`;
      }
      if (input.password.trim().length < 1) {
        errors.password = `El campo password es obligatorio`;
      } else if (!regexStrongPassword.test(input.password)) {
        errors.password = `Contraseña poco segura. Debe contener al menos:
        - Una letra minúscula.
        - Una letra mayúscula.
        - Un número.
        - Un carácter especial de la lista [@$!%*?&].
        - Longitud mínima de 8 caracteres.`;
      }
      if (input.password !== input.confirmPassword) {
        errors.confirmPassword = `Las contraseñas no coinciden`;
      }
     

    return errors;
}