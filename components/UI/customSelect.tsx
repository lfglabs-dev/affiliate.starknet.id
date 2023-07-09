import { FormControl, MenuItem, Select } from "@mui/material";

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
      >
        {options.map(option => (
          <MenuItem key={option as string} value={option as string}>{`${optionPrefix} ${option} ${optionSuffix}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}