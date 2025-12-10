import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import Signup from "../pages/SingUp/SingUp";
import DashboardLayout from "../layouts/DashboardLayout";
import MyOrders from "../pages/Dshboard/User/MyOrders";
import UserProfile from "../pages/Dshboard/User/UserProfile";
import Invoices from "../pages/Dshboard/User/Invoices";
import AddBook from "../pages/Dshboard/librarian/AddBook";
import MyBooks from "../pages/Dshboard/librarian/MyBooks";
import Orders from "../pages/Dshboard/librarian/Orders";
import AllUsers from "../pages/Dshboard/admin/AllUsers";
import ManageBooks from "../pages/Dshboard/admin/ManageBooks";
import AdminProfile from "../pages/Dshboard/admin/AdminProfile";
import EditBook from "../pages/Dshboard/librarian/EditBook";
import AllBooks from "../pages/Books/AllBooks";
import BookDetails from "../pages/Books/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/book_details/:id",
        element: <BookDetails />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  //dashboard
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      // user
      { path: "my-orders", element: <MyOrders /> },
      { path: "profile", element: <UserProfile /> },
      { path: "invoices", element: <Invoices /> },

      // librarian
      { path: "add-book", element: <AddBook /> },
      { path: "my-books", element: <MyBooks /> },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      { path: "orders", element: <Orders /> },

      // admin
      { path: "all-users", element: <AllUsers /> },
      { path: "manage-books", element: <ManageBooks /> },
      { path: "profile", element: <AdminProfile /> },
    ],
  },
]);
