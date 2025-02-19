import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

function generateErrors(errors: ValidationError[]) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return errors.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [currentValue.property]:
        (currentValue.children?.length ?? 0) > 0
          ? generateErrors(currentValue.children ?? [])
          : Object.values(currentValue.constraints ?? {}).join(', '),
    }),
    {},
  );
}

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    return new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      errors: generateErrors(errors),
    });
  },
};

export default validationOptions;
