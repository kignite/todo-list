import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useEffect } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPermission } from 'api/auth'; 

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  const handleChange = (value) => {
    setInputValue(value)
  }

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      })
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: false,
          },
        ];
      });
      setInputValue('');

    } catch (error) {
      console.error(error)
    }

  };

  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id)
    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      })
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });

    } catch (error) {
      console.error(error)
    }
  };

  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      })
      setTodos((prevTodos) => {

        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              id,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error)
    }
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleDelete = async({ id }) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        navigate('/login')
      }
      const result = await checkPermission(authToken)
      if (result) {
        return
      }
    }
    checkTokenIsValid()
  }, [navigate])

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onSave={handleSave}
        onChangeMode={handleChangeMode}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );

};

export default TodoPage;
