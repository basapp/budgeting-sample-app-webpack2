// @flow

export type FormattedAmount = {
  text: string,
  isNegative: boolean,
};

export default function formatAmount(amount: number, showSign: boolean = true): FormattedAmount {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD',
  });

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}`,
    isNegative,
  };
};

export function formatPercent(amount: number): FormattedAmount {  
  let roundAmount = Math.round(amount * 100) / 100;
  const formatValue = Math.abs(roundAmount).toString();  
  return "%" + `${formatValue}`    
};
