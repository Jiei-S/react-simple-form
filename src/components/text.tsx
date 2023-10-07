import { memo } from "react";
import {
  Box,
  Grid,
  TextField as MUITextField,
  Typography,
} from "@mui/material";

type Props = {
  label: string;
  value: string;
  helperText: string;
  required?: boolean;
  multiline?: boolean;
  autoFocus?: boolean;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextField = ({
  label,
  value,
  helperText,
  required = true,
  multiline = false,
  autoFocus = false,
  rows,
  onChange,
}: Props): JSX.Element => (
  <Grid item xs={12}>
    <Box mb={1}>
      <Typography variant="body2" component="div">
        {label}
      </Typography>
    </Box>
    <Box mb={1}>
      <MUITextField
        value={value}
        error={Boolean(helperText)}
        helperText={helperText}
        fullWidth
        autoFocus={autoFocus}
        required={required}
        multiline={multiline}
        rows={rows}
        onChange={onChange}
      />
    </Box>
  </Grid>
);

export default memo(TextField);
