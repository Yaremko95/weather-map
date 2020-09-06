import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";

export default [
  {
    path: "/",
    exact: true,
    layout: MainLayout,
    component: Home,
  },
  {
    path: "/login",
    exact: true,

    layout: MainLayout,
    component: Login,
  },
  {
    path: "/signup",
    exact: true,
    layout: MainLayout,
    component: SignUp,
  },
];
