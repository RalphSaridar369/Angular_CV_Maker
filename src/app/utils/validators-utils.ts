import { ValidationErrors } from '@angular/forms';

export const getValidatorErrorMessage = (
  validatorName: string,
  validatorErrors?: ValidationErrors
): string | undefined => {
  // Retrieve the corresponding message definition from the Map
  const messageDefinition = messages.get(validatorName);

  if (!messageDefinition) return undefined;

  // Handle pattern validation
  if (validatorName === 'pattern' && validatorErrors?.['requiredPattern']) {
    const patternMessage = messageDefinition.message;
    const requiredPattern = validatorErrors['requiredPattern']; // Regex pattern
    return patternMessage.replace('{0}', requiredPattern);
  }

  // Handle other validators
  const args = messageDefinition.validatorErrorsKey?.map(
    (key) => validatorErrors?.[key]
  );

  return args
    ? stringFormat(messageDefinition.message, ...args)
    : messageDefinition.message;
};

// Updated messages Map to include regex support
const messages = new Map<
  string,
  { message: string; validatorErrorsKey?: string[] }
>([
  ['required', { message: 'This field is required' }],
  [
    'minlength',
    {
      message: 'Password must be at least {0} characters long',
      validatorErrorsKey: ['requiredLength'],
    },
  ],
  [
    'maxlength',
    {
      message: 'Password cannot be more than {0} characters long',
      validatorErrorsKey: ['requiredLength'],
    },
  ],
  ['email', { message: 'Email must be a valid email address' }],
  [
    'pattern',
    {
      message: 'Value must match the requirements',
      validatorErrorsKey: ['requiredPattern'],
    },
  ],
]);

// Utility function to format strings
function stringFormat(template: string | undefined, ...args: any[]) {
  if (template) {
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
  return undefined;
}
