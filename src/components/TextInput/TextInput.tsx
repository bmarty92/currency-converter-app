import { 
  TextField, 
  InputAdornment,
} from '@mui/material';

interface Props {
  type: string;
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  adornmentText: string;
  error?: boolean;
  helperText?: string | boolean; 
}

const TextInput = ({
  type,
  id,
  label,
  value,
  onChange,
  adornmentText,
  error,
  helperText,
}: Props) => {
  return (
    <TextField
      error={error}
      helperText={helperText}
      type={type}
      id={id}
      label={label}
      variant="standard"
      fullWidth={true}
      value={value}
      onChange={onChange}
      InputProps={{
        sx: {
          fontSize: "30px"
        },
        endAdornment: 
          <InputAdornment
            disableTypography
            position="end"
            sx={{
              fontSize: 18
            }}
          >
            {adornmentText}
          </InputAdornment>,
      }}
      inputProps={{
        inputMode: "decimal",
        step: 0.01,
      }}
    />
  );
};

export default TextInput;