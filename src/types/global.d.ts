// Global type declarations for Jest and Testing Library
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeChecked(): R;
      toBeDisabled(): R;
      toBeEmpty(): R;
      toBeEmptyDOMElement(): R;
      toBeEnabled(): R;
      toBeInvalid(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeVisible(): R;
      toContainElement(element: HTMLElement | SVGElement | null): R;
      toContainHTML(htmlText: string): R;
      toHaveAttribute(attr: string, value?: unknown): R;
      toHaveClass(...classNames: Array<string | RegExp>): R;
      toHaveClass(classNames: string, options?: {exact: boolean}): R;
      toHaveDisplayValue(value: string | RegExp | Array<string | RegExp>): R;
      toHaveFocus(): R;
      toHaveFormValues(expectedValues: Record<string, unknown>): R;
      toHaveStyle(css: string | Record<string, unknown>): R;
      toHaveTextContent(text: string | RegExp, options?: {normalizeWhitespace: boolean}): R;
      toHaveValue(value?: string | string[] | number | null): R;
      toBePartiallyChecked(): R;
    }
  }
}