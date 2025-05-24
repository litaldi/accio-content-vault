
import React from 'react';
import { render } from './test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

/**
 * A utility function to test a component for accessibility violations
 * @param Component The component to test
 * @param props Props to pass to the component
 */
export async function testComponentForA11yViolations(
  Component: React.ComponentType<any>,
  props: any = {}
) {
  const { container } = render(<Component {...props} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

/**
 * A higher order function that returns a test for accessibility violations
 * @param Component The component to test
 * @param defaultProps Default props to pass to the component
 */
export function createA11yTest(
  Component: React.ComponentType<any>,
  defaultProps: any = {}
) {
  return async (props: any = {}) => {
    await testComponentForA11yViolations(Component, { ...defaultProps, ...props });
  };
}

export { axe };
