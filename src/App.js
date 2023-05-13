import Header from './components/Header';
import HomePage from './Pages/HomePage';
import HelpPage from './Pages/HelpPage/';
import { Routes, Route } from 'react-router-dom';
import TaskFormPage from './Pages/TaskFormPage';
import NotFoundPage from './Pages/NotFoundPage';
import HelpIntroductionPage from './Pages/HelpPage/Introduction';
import HelpAddingTaskPage from './Pages/HelpPage/AddingTasks';
import HelpRemovingTasksPage from './Pages/HelpPage/RemovingTasks';
import HelpChangingStatusPage from './Pages/HelpPage/ChangingStatus';
import { useState, useEffect } from 'react';
import * as database from './database';
import Loading from './components/Loading';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    (async () => {
      //Load the database
      const data = await database.load();
      setTasks(data);
      setIsLoading(false);
    })();
  }, []);

  //To clear all the Tasks
  const handleClearTasks = async () => {
    const data = await database.load();
    const cleared = database.clearAll(data);
    if (cleared) {
      setTasks([]);
      setErrorMessage('');
    } else {
      setErrorMessage("couldn't clear all tasks! Something has gone wrong.");
    }
    //setTasks(updatedTasks);
  };

  // To Remove a task Item
  const handleRemoveTask = async (id) => {
    const updatedTasks = tasks.filter(function (description) {
      return description.id !== id;
    });
    //Remove the document from firebase.
    const removed = await database.remove(id);
    setErrorMessage('');
    if (!removed) {
      setErrorMessage("couldn't remove the task! Something has gone wrong.");
    } else {
      setTasks(updatedTasks);
    }
  };

  // To toggle Status
  const handleChangeStatus = async (id) => {
    let data = {};
    const updatedTasks = [...tasks];
    updatedTasks.forEach((task) => {
      if (task.id === id) {
        if (task.status.toLowerCase() === 'completed') {
          task.status = 'Open';
        } else if (task.status.toLowerCase() === 'open') {
          task.status = 'Completed';
        }
        data = { status: task.status };
      }
    });
    //Update the status in firebase
    const updated = await database.update(id, data);
    if (updated) {
      setTasks(updatedTasks);
      setErrorMessage('');
    } else {
      setErrorMessage("couldn't update the status! Something has gone wrong.");
    }
  };

  //To Add a new Task
  const handleTaskAdd = (description, status, savedId) => {
    const updatedTasks = [...tasks];
    updatedTasks.push({
      id: savedId,
      description,
      status,
    });
    setTasks(updatedTasks);
  };

  //Components to render
  return (
    <>
      {/* <Form onAddTask={handleTaskAdd} /> */}
      <Header />
      {/* If the page is loading, display loading */}
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                tasks={tasks}
                errorMessage={errorMessage}
                onClearTasks={handleClearTasks}
                onRemoveTask={handleRemoveTask}
                onHandleChangeStatus={handleChangeStatus}
              />
            }
          />
          <Route
            path="/help"
            element={<HelpPage />}
          >
            <Route
              path=""
              element={<HelpIntroductionPage />}
            />
            <Route
              path="adding-tasks"
              element={<HelpAddingTaskPage />}
            />
            <Route
              path="removing-tasks"
              element={<HelpRemovingTasksPage />}
            />
            <Route
              path="changing-status"
              element={<HelpChangingStatusPage />}
            />
          </Route>
          <Route
            path="/add"
            element={<TaskFormPage onAddTask={handleTaskAdd} />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      )}
    </>
  );
}
export default App;
