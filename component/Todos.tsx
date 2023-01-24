import { useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Badge,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Todos(): JSX.Element {
  interface TodoType {
    id: number;
    title: string;
    completed: boolean;
  }

  // Generic type set to TodoType[]
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.length === 0) {
      alert("Todo Can't Be Empty");
    } else {
      setTodos([...todos, { id: Date.now(), title: title, completed: false }]);
      setTitle("");
    }
  };

  const handleToggle = (id: any) => {
    let newTodoList = todos.filter((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodoList);
  };

  const handleClearCompleted = () => {
    let newTodoList = todos.filter((todo) => {
      if (!todo.completed) return todo;
    });
    setTodos(newTodoList);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("blue.200", "blue.500")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Create a Todo ({todos.length})
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Write things here which you want to complete.
        </Text>
        <FormControl id="email">
          <Input
            placeholder="Learn HTML"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => handleAdd()}
          >
            Add Todo
          </Button>
        </Stack>
        <Stack>
          <ul>
            {todos.map((todo) => (
              <li style={{ margin: "5px" }} key={todo.id}>
                {todo.title} -{" "}
                <Badge colorScheme={todo.completed ? "green" : "red"}>
                  {todo.completed ? "completed" : "incomplete"}
                </Badge>
                <Button
                  marginX={"5"}
                  size={"sm"}
                  onClick={() => handleToggle(todo.id)}
                >
                  Change Status
                </Button>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => {
              handleClearCompleted();
            }}
          >
            Clear All Completed
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}