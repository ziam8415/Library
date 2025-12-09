import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  //   {
  //     path: "/",
  //     element: <MainLayout />,
  //     errorElement: <ErrorPage />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       //   {
  //       //     path: '/plant/:id',
  //       //     element: <PlantDetails />,
  //       //   },
  //     ],
  //   },
  //   { path: "/login", element: <Login /> },
  //   { path: "/signup", element: <SignUp /> },
]);
