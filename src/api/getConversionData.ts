export interface ConversionData {
  from: string,
  to: string,
  rate: number,
  fromAmount: number,
  toAmount: number,
  error?: string,
}

export const getConversionData = async (
  currencyFrom: string, 
  currencyTo: string, 
  currencyAmount: string,
) => {
  let amount = parseFloat(currencyAmount).toFixed(2);

  const ENDPOINT_BASE = 'https://my.transfergo.com/api/fx-rates';
  const data = await fetch(`${ENDPOINT_BASE}?from=${currencyFrom}&to=${currencyTo}&amount=${amount}`).then((response) => response.json());

  return data as ConversionData;
}
