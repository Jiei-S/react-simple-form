import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from "@mui/material";
import { User } from "../hooks/store";
import useForm from "../hooks/form";
import TextField from "./text";
import SelectField from "./select";

type Props = {
  data: User;
};

const Form = ({ data }: Props): JSX.Element => {
  const { roleOptions, nameProps, roleProps, isValid, submit } = useForm(data);

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container alignItems="center" spacing={1}>
          <TextField label="Name" {...nameProps} autoFocus={true} />
          <SelectField label="Role" options={roleOptions} {...roleProps} />
        </Grid>
      </CardContent>
      <CardActions>
        <Box m={1}>
          <Button
            disabled={
              !isValid({
                values: {
                  name: nameProps.value,
                  role: roleProps.value,
                },
                helperTexts: [nameProps.helperText, roleProps.helperText],
              })
            }
            color="primary"
            onClick={() =>
              submit({
                id: data.id,
                name: nameProps.value,
                role: roleProps.value,
              })
            }
          >
            {"Submit"}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Form;
