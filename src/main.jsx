import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from "./components/HomePage";
import Store from './components/Store';
import Cart from './components/Cart';
import "./css-modules/index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "store",
        element: <Store />
      },
      {
        path: "cart",
        element: <Cart />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)