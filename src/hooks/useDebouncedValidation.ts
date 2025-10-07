import { useState, useCallback, useEffect, useRef } from 'react';

export const useDebouncedValidation = (validate: (value: string) => boolean, delay = 300) => {
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string }>({
    isValid: true,
    message: ''
  });
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const debouncedValidate = useCallback((value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      const isValid = validate(value);
      setValidationResult({
        isValid,
        message: isValid ? '' : 'validation.invalidFormat'
      });
    }, delay);
  }, [validate, delay]);
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return { validationResult, debouncedValidate };
};