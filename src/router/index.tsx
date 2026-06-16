import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Home, Incidents, NotFound } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Home />,
      },
      {
        path: "incidencias",
        element: <Incidents />,
      },
      {
        path: "mapa",
        element: <h1>Map</h1>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
