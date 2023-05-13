import './styles.scss';
import { FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function Task({
  id,
  description,
  status,
  onRemoveTask,
  onChangeStatus,
}) {
  //Call the method to remove task
  const handleTaskRemoval = () => {
    onRemoveTask(id);
  };

  const handleStatusToggle = () => {
    onChangeStatus(id);
  };

  const statusStyle = status === 'Completed' ? 'status-complete' : '';
  //console.log(statusStyle);

  return (
    <div className="task-component">
      <h2>{description}</h2>
      <div className="description">
        <p id="task-id">{id}</p>
        <p>
          <strong>Status: </strong>
          <span className={statusStyle}>{status}</span>
        </p>
        <div className="function-buttons">
          <button onClick={handleStatusToggle}>
            {status === 'Completed' ? (
              <FaToggleOn id="toggle" />
            ) : (
              <FaToggleOff id="toggle" />
            )}
            Change Status
          </button>
          <button onClick={handleTaskRemoval}>
            {' '}
            <FaTrash id="remove" />
            Remove Task
          </button>
        </div>
      </div>
    </div>
  );
}
