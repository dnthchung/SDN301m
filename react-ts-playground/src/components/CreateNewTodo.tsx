import { Button, TextField, Box } from "@mui/material";

type Props = {
  newTodoString: string;
  onNewTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddingBtnClick: () => void;
};

export const CreateNewTodo = ({ newTodoString, onNewTodoChange, onAddingBtnClick }: Props) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
      <TextField label="Add Todo" value={newTodoString} onChange={onNewTodoChange} variant="outlined" fullWidth style={{ marginRight: "1rem" }} />
      <Button variant="contained" color="primary" onClick={onAddingBtnClick}>
        Add
      </Button>
    </Box>
  );
};
