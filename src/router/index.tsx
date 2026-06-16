import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { ProtectedRoute, PublicAuthRoute } from "@/components";
import {
  Home,
  IncidentDetail,
  Incidents,
  Login,
  MapPage,
  NotFound,
} from "@/pages";

export const router = createBrowserRouter([
  {
    element: <PublicAuthRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
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
            path: "incidencias/:incidentId",
            element: <IncidentDetail />,
          },
          {
            path: "mapa",
            element: <MapPage />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
