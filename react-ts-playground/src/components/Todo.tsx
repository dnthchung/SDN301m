//rafc
import { Button } from "@mui/material";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";

const IconCheck = ({ isCompleted }: { isCompleted: boolean }) => {
  return isCompleted ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />;
};

const Todo = ({ id, name, isCompleted, markTodoAsCompleted }: { id: string; name: string; isCompleted: boolean; markTodoAsCompleted: (todoId: string) => void }) => {
  return (
    <Button style={{ justifyContent: "space-between" }} fullWidth={true} endIcon={<IconCheck isCompleted={isCompleted} />} onClick={() => markTodoAsCompleted(id)}>
      {name}
    </Button>
  );
};

export default Todo;
