import { memo } from "react";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";

type Props = {
  label: string;
  value: string;
  options: string[];
  helperText: string;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectField = ({
  label,
  value,
  options,
  helperText,
  autoFocus = false,
  onChange,
}: Props): JSX.Element => (
  <Grid item xs={12}>
    <Box mb={1}>
      <Typography variant="body2" component="div">
        {label}
      </Typography>
    </Box>
    <Box mb={1}>
      <TextField
        select
        fullWidth
        value={value}
        helperText={helperText}
        error={Boolean(helperText)}
        onChange={onChange}
        autoFocus={autoFocus}
      >
        {options.map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  </Grid>
);

export default memo(SelectField);
