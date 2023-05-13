import NoTasks from '../NoTasks';
import Task from './Task';
import './styles.scss';
import { AiOutlineClear } from 'react-icons/ai';

export default function Tasks({
  tasks,
  errorMessage,
  onClearTasks,
  onRemoveTask,
  onChangeStatus,
}) {
  return (
    <>
      {tasks.length === 0 ? (
        <NoTasks />
      ) : (
        <div className="task-list full-width">
          {errorMessage.length > 0 && (
            <div className="form-validation">{errorMessage}</div>
          )}
          {tasks.map((task, index) => (
            <Task
              key={index}
              {...task}
              onRemoveTask={onRemoveTask} // Check here
              onChangeStatus={onChangeStatus}
            />
          ))}
          <div className="clear-tasks">
            <button onClick={onClearTasks}>
              {' '}
              <AiOutlineClear />
              Clear Tasks{' '}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
