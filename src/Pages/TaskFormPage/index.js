import PageContainer from '../../components/PageContainer';
import Form from '../../components/Form';

export default function TaskFormPage({ onAddTask }) {
  return (
    <PageContainer title="New Task">
      <Form onAddTask={onAddTask} />
    </PageContainer>
  );
}
