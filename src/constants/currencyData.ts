import EU from '../assets/svg/flags/EU.svg';
import UK from '../assets/svg/flags/UK.svg';
import PL from '../assets/svg/flags/PL.svg';
import UA from '../assets/svg/flags/UA.svg';

export interface CurrencyDataType {
  currencyName: string,
  currencyFlag: string,
}

export const currencyData: CurrencyDataType[] = [
  {
    currencyName: "EUR",
    currencyFlag: EU,
  },
  {
    currencyName: "GBP",
    currencyFlag: UK,
  },
  {
    currencyName: "PLN",
    currencyFlag: PL,
  },
  {
    currencyName: "UAH",
    currencyFlag: UA,
  },
];