import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsNickNameType(property?: string, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsNickNameType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_])/.test(value)) {
            return true;
          } else {
            return false;
          }
        },
      },
    });
  };
}
