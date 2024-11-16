import './style_title_about_add_button/stylesMain.scss';
import './presentation/addition_task/addition_task.scss';
import "./presentation/creat_task/create_tasks.scss";

import './App.css';

import CreateTask from './presentation/creat_task/create_task.jsx';

function App() {
  return (
    <div>
      <div className="container">
        <CreateTask />
      </div>
    </div>
  );
}

export default App;
