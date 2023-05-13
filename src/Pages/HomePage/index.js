import PageContainer from '../../components/PageContainer';
import Tasks from '../../components/Tasks';

export default function HomePage({
  tasks,
  errorMessage,
  onClearTasks,
  onRemoveTask,
  onHandleChangeStatus,
}) {
  return (
    <PageContainer title="These are the tasks">
      <Tasks
        tasks={tasks}
        errorMessage={errorMessage}
        onClearTasks={onClearTasks}
        onRemoveTask={onRemoveTask}
        onChangeStatus={onHandleChangeStatus}
      />
    </PageContainer>
  );
}
