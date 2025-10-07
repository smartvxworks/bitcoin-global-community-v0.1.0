import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 生成随机手机号
 * @param count 生成数量
 * @returns 手机号数组
 */
export function generateRandomPhoneNumbers(count: number): string[] {
  // 生成国际测试号码示例
  const countryCodes = ['+1', '+44', '+61', '+81', '+49', '+33', '+86', '+91', '+7', '+65'];
  const phoneNumbers: string[] = [];
  
  while (phoneNumbers.length < count) {
    // 随机选择国家代码
    const countryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    // 生成8-12位数字
    const digitsLength = 8 + Math.floor(Math.random() * 5);
    const digits = Math.floor(Math.random() * Math.pow(10, digitsLength)).toString().padStart(digitsLength, '0');
    const phone = `${countryCode}${digits}`;
    
    if (!phoneNumbers.includes(phone)) {
      phoneNumbers.push(phone);
    }
  }
  
  return phoneNumbers;
}

// 生成100个测试手机号
export const testPhoneNumbers = generateRandomPhoneNumbers(100);
