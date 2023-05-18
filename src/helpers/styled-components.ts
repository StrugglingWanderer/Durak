import { StyledConfig } from 'styled-components/index';

export function excludeForwardingProps<Props extends object>(
  ...propKeys: (keyof Props)[]
): StyledConfig<Props> {
  type validator = StyledConfig<Props>['shouldForwardProp'];

  const validator: validator = (propKey, defaultValidator) => {
    return !propKeys.includes(propKey) && defaultValidator(propKey);
  };

  return { shouldForwardProp: validator };
}
