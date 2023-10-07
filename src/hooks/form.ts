import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useStore, { User, UserRole } from "./store";

type Validator<T> = (value: T) => string;

const MAX_NAME_LENGTH = 50;

const useForm = (data: User) => {
  const { setUser } = useStore();

  const roleOptions = useMemo(() => [UserRole.ADMIN, UserRole.MEMBER], []);

  const validateName: Validator<string> = (name: string): string => {
    if (!name) return "Name is required";
    if (name.length > MAX_NAME_LENGTH)
      return `Name must be less than ${MAX_NAME_LENGTH} characters`;
    return "";
  };

  const validateRole: Validator<string> = (role: string): string => {
    if (!role) return "Role is required";
    if (Object.values(UserRole).indexOf(role as UserRole) === -1)
      return "Role is invalid";
    return "";
  };

  const isValid = ({
    values,
    helperTexts,
  }: {
    values: Omit<User, "id">;
    helperTexts: string[];
  }): boolean => {
    return (
      helperTexts.every((helperText) => !helperText) &&
      !validateName(values.name) &&
      !validateRole(values.role)
    );
  };

  const useInput = <T>(
    initialValue: T,
    validator: Validator<T>
  ): [
    {
      value: T;
      helperText: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    },
    () => void
  ] => {
    const [value, setValue] = useState<T>(initialValue);
    const [helperText, setHelperText] = useState<string>("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value as T;
      setHelperText(validator(newValue));
      setValue(newValue);
    };
    const reset = () => setValue(initialValue);
    return [{ value, helperText, onChange }, reset];
  };

  const submit = async (data: User) => {
    // Normally, you would send data to the server here.
    const newData = { ...data, id: uuidv4() };
    setUser(newData);
  };

  const [name] = useInput(data.name, validateName);
  const [role] = useInput(data.role, validateRole);

  const nameProps = useMemo(() => name, [name.value]);
  const roleProps = useMemo(() => role, [role.value]);

  return {
    nameProps,
    roleProps,
    roleOptions,
    isValid,
    submit,
  };
};

export default useForm;
