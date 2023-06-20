import { InputLabel, MenuItem, FormControl, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Types.
import { CurrencyDataType } from '../../constants/currencyData';

// Styles.
import './SelectField.scss';

interface Props {
  label: string;
  value: string;
  labelId: string,
  id: string,
  onChange: (e: SelectChangeEvent) => void;
  currencyData: CurrencyDataType[];
}

const SelectField = ({ 
  label, 
  value, 
  labelId, 
  id, 
  onChange, 
  currencyData 
}:Props) => {
  return (
    <div className="SelectField">
      <FormControl variant="standard" fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          IconComponent={ExpandMoreIcon}
          labelId={labelId}
          id={id}
          value={value}
          onChange={onChange}
          label={label}
        >
          {currencyData.map((item: CurrencyDataType, index: number) => {
            return (
              <MenuItem value={item.currencyName} key={index}>
                <div className="SelectField__currency-option">
                  <img 
                    className="SelectField__currency-flag" 
                    src={item.currencyFlag} 
                    alt={item.currencyName} 
                  />
                  <Typography variant="h6" sx={{fontWeight: "bold"}}>{item.currencyName}</Typography>
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
    
  )
}

export default SelectField;