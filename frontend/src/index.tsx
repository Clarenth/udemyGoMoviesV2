// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Components
import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home'
import Movies from './components/Movies/Movies';
import Movie from './components/Movies/Movie/Movie';
import Genres from './components/Genres/Genres';
import Login from './components/Login/Login';
import ManageCatalogue from './components/Admin/ManageCatalogue';
import EditMovie from './components/Admin/EditMovie';
import GraphQL from './components/GraphQL/GraphQL';

// Styles

const siteRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />},
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/:id",
        element: <Movie />,
      },
      {
        path: "/genres",
        element: <Genres />,
      },
      {
        path: "/admin/movie/0",
        element: <EditMovie />,
      },
      {
        path: "/manage-catalogue",
        element: <ManageCatalogue />,
      },
      {
        path: "/graphql",
        element: <GraphQL />,
      },
    ],
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={siteRouter} />
  </React.StrictMode>
);