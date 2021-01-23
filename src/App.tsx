import Topbar from './components/topbar';
import Sidebar from './components/sidebar';
import Routes from './components/routes';
import routes from './configs/routes';

import sidebarRoutes, { sidebarRouteGroups } from './configs/navigation/pages';

import './App.scss';

const App = () => {
  return (
    <div className="app">
      <header className='sticky-top'>
        <Topbar />
      </header>
      <div className='row w-100'>
        <Sidebar className='col-md-3 col-lg-2 d-md-block bg-light collapse' routes={sidebarRoutes} groups={sidebarRouteGroups} />
        <main className='col p-md-2 content-container'>
          <Routes routes={routes} />
        </main>
      </div>
    </div>
  );
}

export default App;