import Topbar from './components/topbar';
import Sidebar from './components/sidebar';

import sidebarRoutes, { sidebarRouteGroups } from './configs/navigation/pages';

function App() {
  return (
    <div className="App">
      <header className='sticky-top'>
        <Topbar />
      </header>
      <div className='row'>
        <Sidebar routes={sidebarRoutes} groups={sidebarRouteGroups} />
        <main className='col-md-9 ms-sm-auto col-1g-10 px-md-4'>
          {/* <div className='bg-dark col-md-12'>
            Test
          </div> */}
        </main>
      </div>
    </div>
  );
}

export default App;