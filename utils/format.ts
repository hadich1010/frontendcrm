
export const toPersianDigits = (n: string | number): string => {
  if (n === null || n === undefined) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
};

export const formatCurrency = (amount: string | number, unit: 'toman' | 'rial' = 'toman'): string => {
  if (amount === null || amount === undefined || amount === '') return toPersianDigits(0);
  
  let numStr = amount.toString().replace(/,/g, '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
  let num = parseInt(numStr);
  
  if (isNaN(num)) return toPersianDigits(0);
  
  const displayNum = unit === 'rial' ? num * 10 : num;
  return toPersianDigits(displayNum.toLocaleString());
};

export const numberToWords = (amount: string | number, unit: 'toman' | 'rial' = 'toman'): string => {
  if (amount === null || amount === undefined || amount === '') return '';
  
  let numStr = amount.toString().replace(/,/g, '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
  let num = parseInt(numStr);
  
  if (isNaN(num) || num === 0) return '';
  
  const displayNum = unit === 'rial' ? num * 10 : num;

  const units = ['', 'هزار', 'میلیون', 'میلیارد', 'ترلیون'];
  const ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const hundreds = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];

  const convertGroup = (n: number): string => {
    let res = '';
    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const o = n % 10;

    if (h > 0) res += hundreds[h] + (t > 0 || o > 0 ? ' و ' : '');
    if (t === 1) res += teens[o];
    else {
      if (t > 1) res += tens[t] + (o > 0 ? ' و ' : '');
      if (o > 0) res += ones[o];
    }
    return res;
  };

  let result = '';
  let tempNum = displayNum;
  let groupIdx = 0;

  while (tempNum > 0) {
    const group = tempNum % 1000;
    if (group > 0) {
      const groupWords = convertGroup(group);
      result = groupWords + (units[groupIdx] ? ' ' + units[groupIdx] : '') + (result ? ' و ' : '') + result;
    }
    tempNum = Math.floor(tempNum / 1000);
    groupIdx++;
  }

  return result.trim() + (unit === 'rial' ? ' ریال' : ' تومان');
};
