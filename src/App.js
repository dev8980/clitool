import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import './App.css';


const App = () => {
  const [evenTodos, setEvenTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosResponse = await axios.get(
          'https://jsonplaceholder.typicode.com/todos'
        );

        const evenTodos = todosResponse.data.slice(0, 20).filter(todo => todo.id % 2 === 0);
        setEvenTodos(evenTodos);
      } catch (error) {
        console.error('Error fetching todos:', error.message);
      }
    };

    fetchTodos();
  }, []);

  return (
    <Container className="parentContainer">
      <Typography className="headingText" variant="h3" align="center" >
        Even Numbered TODOs
      </Typography>
      <div className="todoContainer">
        {evenTodos.map((todo) => (
          <Card
            key={todo.id}
            className="todoCard"
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {todo.title}
              </Typography>
              <Typography className="completedIconContainer" color="textSecondary" >
                <strong>Completed:</strong>
                <span>
                  {todo.completed ? <CheckCircleIcon color="success" /> : <CancelRoundedIcon color="error" />}
                </span>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default App;
