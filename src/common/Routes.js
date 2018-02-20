import welcome from './pages/welcome/welcome';
import addJobPost from './pages/addJobPost/addJobPost';
import Shell from './pages/Shell';
import NotFound from './pages/NotFound';

export default class Routes {
  constructor(store) {
    this.store = store;
  }

  createRoutes() {
    return {
      path: '/',
      component: Shell,
      indexRoute: { onEnter: (nextState, replace) => replace('welcome') },
      childRoutes: [
        { path: 'welcome', component: welcome },
        { path: 'addJobPost', component: addJobPost },
        { path: '*', component: NotFound, status: 404 }
      ]
    };
  }
}

