
import React, { useState, useEffect } from "react";
import classNames from "classnames";

import { 
  Paper,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TripOriginIcon from '@mui/icons-material/TripOrigin';

// Api.
import { getConversionData } from "./api/getConversionData";

// Components.
import SelectField from './components/SelectField';
import TextInput from "./components/TextInput";

// Constants.
import { currencyData } from "./constants/currencyData";

// Types.
import { CurrencyDataType } from "./constants/currencyData";

// Styles.
import "./App.scss";

type InputType = "convertFrom" | "convertTo";
interface AmountLimits { 
  [key: string]: number; 
}

const AMOUNT_LIMITS:AmountLimits = {
  PLN: 20000,
  EUR: 5000,
  GBP: 1000,
  UAH: 50000,
}

const ERROR_TEXT:string = "Conversion error";

const App:React.FC = () => {
  const [currencyPair, setCurrencyPair] = useState<string[]>(["EUR", "GBP"]);
  const [amountFrom, setAmountFrom] = useState<string>("1.00");
  const [amountTo, setAmountTo] = useState<string>("0.00");
  const [conversionRate, setConversionRate] = useState<number>(0)
  const [isInitialyConverted, setInitialyConverted] = useState<boolean>(false);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false);

  const currencyFrom = currencyPair[0];
  const currencyTo = currencyPair[1];

  useEffect(() => {
    if (isInitialyConverted) {
      if (!amountInFromCurrency && (Number(amountFrom) > 0)) {
        const conversionFromPromise = Promise.resolve(
          getConversionData(currencyPair[0], currencyPair[1], amountFrom)
        );

        conversionFromPromise.then((data) => {
          if (data.error) {
            setError(true);
          } else {
            setError(false);
            setAmountTo(data.toAmount.toString()); 
            setConversionRate(data.rate)
          }
        }).catch(() => setError(true));
      } else if (amountInFromCurrency && (Number(amountTo) > 0)) {
        const conversionToPromise = Promise.resolve(
          getConversionData(currencyPair[1], currencyPair[0], amountTo)
        );
    
        conversionToPromise.then((data) => {
          if (data.error) {
            setError(true);
          } else {
            setError(false);
            setAmountFrom(data.toAmount.toString())
          }
        }).catch(() => setError(true));
      }
    }
  }, [
    currencyPair, 
    amountFrom, 
    isInitialyConverted, 
    amountInFromCurrency, 
    amountTo, 
    conversionRate
  ]);

  const swapCurrencies = ():void => {
    if (amountInFromCurrency) {
      setAmountInFromCurrency(false);
    }
    setCurrencyPair([...currencyPair].reverse());
  };

  const handleAmountChange = (value: string, inputType: InputType):void => {
    if (inputType === "convertFrom") {
      if (amountInFromCurrency) {
        setAmountInFromCurrency(false);
      }
      setAmountFrom(value);
      if (Number(value) >= AMOUNT_LIMITS[currencyFrom]) {
        setAmountFrom(AMOUNT_LIMITS[currencyFrom].toString())
      } else {
        setAmountFrom(value);
      }
    } else {
      if (!amountInFromCurrency) {
        setAmountInFromCurrency(true);
      }
      setAmountTo(value);
    }
  }

  return (
    <div className="App">
      <div className="App__currency-converter-wrapper">
        <Paper elevation={8} square>
          <div className="App__currency-converter-content">
            <div className="App__input-container">
              <div className="App__currency-select-input-container">
          
                <SelectField
                  labelId="currency-from"
                  id="currency-from-select"
                  value={currencyFrom}
                  onChange={(e: SelectChangeEvent) => setCurrencyPair(
                    [e.target.value, currencyTo] as Array<string>
                  )}
                  label="FROM:"
                  currencyData={currencyData.filter((item: CurrencyDataType) => item.currencyName !== currencyTo)}
                />

                <button 
                  className="App__swap-currencies-button" 
                  type="button" 
                  onClick={() => swapCurrencies()}
                >
                  <SwapHorizIcon sx={{ fill: "blue" }}/>
                </button>
                <SelectField
                  labelId="currency-to"
                  id="currency-to-select"
                  value={currencyTo}
                  onChange={(e: SelectChangeEvent) => 
                    setCurrencyPair([currencyFrom, e.target.value] as Array<string>)
                  }
                  label="TO:"
                  currencyData={currencyData.filter((item: CurrencyDataType) => item.currencyName !== currencyFrom)}
                />
              </div>

              <div className={classNames("App__currency-amount-inputs-container", {
                "App__currency-amount-inputs-container--converted": isInitialyConverted,
              })}>
                <TextInput
                  error={error}
                  helperText={error && ERROR_TEXT}
                  type="number"
                  id="currency-amount-from" 
                  label="AMOUNT:" 
                  value={amountFrom || ""}
                  onChange={(e) => handleAmountChange(e.target.value, "convertFrom")}
                  adornmentText={currencyFrom}
                />
                {isInitialyConverted &&
                  <TextInput 
                    error={error}
                    helperText={error && ERROR_TEXT}
                    type="number"
                    id="currency-amount-to" 
                    label="CONVERTED TO:" 
                    value={amountTo || ""}
                    onChange={(e) => handleAmountChange(e.target.value, "convertTo")}
                    adornmentText={currencyTo}
                  />
                }
              </div>
              {(conversionRate !== 0) &&
                <div className="App__conversion-info-container">
                  <div className="App__conversion-rate-info-container">
                    <TripOriginIcon  sx={{fill: "gold"}}/>
                    <Typography variant="h6">
                      {`1 ${currencyFrom} = ${conversionRate} ${currencyTo}`}
                    </Typography>
                  </div>
         
                  <Typography paragraph sx={{color: "grey"}}>
                    All figures are live mid-market rates, which are for informational purposes only.
                    <br />
                    To see the rates for money transfer, please select sending money option.
                  </Typography>
                </div>
              }
              {!isInitialyConverted && 
                <button
                  disabled={!amountFrom}
                  className="App__initial-convert-button"
                  type="button"
                  onClick={() => setInitialyConverted(true)}
                >
                  Convert
                </button>
              }
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default App;
