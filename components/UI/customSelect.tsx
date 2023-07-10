import { FormControl, MenuItem, Select } from "@mui/material";
import style from "../../styles/components/customSelect.module.css";

interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  optionPrefix?: string;
  optionSuffix?: string;
}

export function CustomSelect<T>({ options, value, onChange, optionPrefix, optionSuffix }: SelectProps<T>) {
  return (
    <FormControl>
      <Select
        value={value}
        displayEmpty
        onChange={event => onChange(event.target.value as T)}
        className={`${style.select} text-small`}
        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
      >
        {options.map(option => (
          <MenuItem className="text-small" key={option as string} value={option as string}>{`${optionPrefix} ${option} ${optionSuffix}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}