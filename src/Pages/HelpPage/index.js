import PageContainer from '../../components/PageContainer';
import { NavLink, Outlet } from 'react-router-dom';
import './styles.scss';

export default function HelpPage() {
  return (
    <PageContainer
      title="Help"
      className="help-page"
    >
      <article>
        <Outlet />
      </article>

      {/* Help Container */}
      <div className="help-container">
        {/* <NavLink to="/help">Help</NavLink> */}
        <NavLink
          to="/help"
          end
        >
          Introduction
        </NavLink>
        <NavLink to="/help/adding-tasks">Adding Tasks</NavLink>
        <NavLink to="/help/removing-tasks">Removing Tasks</NavLink>
        <NavLink to="/help/changing-status">Changing Status</NavLink>
      </div>
    </PageContainer>
  );
}
