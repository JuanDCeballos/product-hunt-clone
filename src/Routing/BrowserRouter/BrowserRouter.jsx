import App from '../../App';
import { PageNotFound } from '../../ShareUI/Components/PageNotFound';

const BrowserRouter = [
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,

    children: [
      { path: 'Product' },
      { path: 'launches' },
      { path: 'SumbitProduct' },
      { path: 'UserProfile' },
      { path: 'LogIn' },
      { path: 'UnderConstruction' },
    ],
  },
];

export default BrowserRouter;
