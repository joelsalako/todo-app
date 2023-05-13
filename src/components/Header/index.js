import { FaTasks } from 'react-icons/fa';
import './styles.scss';
import MainMenu from '../MainMenu';

export default function Header() {
  return (
    <>
      <header className="main">
        <div className="brand">
          <div className="app-name">
            <FaTasks />
            <div className="app-title">Todo App</div>
          </div>
          <p>by Joel Salako</p>
        </div>
        {/* <h1>These are the Tasks: </h1> */}
      </header>
      <MainMenu />
    </>
  );
}
