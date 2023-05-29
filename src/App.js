import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import { useDispatch } from "react-redux";
import { check_token } from "./Redux/AuthSlice";
import { useEffect, Suspense } from "react";

const LazyLoad = React.lazy(() => import("./Components/LazyLoad/LazyLoad"));
const Home = React.lazy(() => import("./Components/Home/Home"));
const Login = React.lazy(() => import("./Components/Authentication/Login"));
const Registration = React.lazy(() =>
  import("./Components/Authentication/Registration")
);

const FrontPage = React.lazy(() =>
  import("./Components/Home/FrontPage")
);
const Header = React.lazy(() => import("./ShareModule/Header/Header"));
const Footer = React.lazy(() => import("./ShareModule/Footer/Footer"));
const AddProduct = React.lazy(() => import("./Components/Products/AddProduct"));
const ProductList = React.lazy(() =>
  import("./Components/Products/ProductList")
);
const EditProduct = React.lazy(() =>
  import("./Components/Products/EditProduct")
);
const ProfileDetails = React.lazy(() =>
  import("./Components/ProfileDetails/ProfileDetails")
);

function App() {
  function PrivateRoute({ children }) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/welcome" />
    );
  }

  const PublicRouteNames = [
    {
      path: "/welcome",
      Component: <FrontPage />,
    },
    {
      path: "/login",
      Component: <Login />,
    },
    {
      path: "/registration",
      Component: <Registration />,
    },
  ];

  const PrivateRouteNames = [
    {
      path: "/",
      Component: <Home />,
    },
    {
      path: "/addproduct",
      Component: <AddProduct />,
    },
    {
      path: "/productlist",
      Component: <ProductList />,
    },
    {
      path: "/edit-product/:id",
      Component: <EditProduct />,
    },
    {
      path: "/profile-details",
      Component: <ProfileDetails />,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check_token());
  });

  return (
    <div className="App">
      <Suspense fallback={<LazyLoad />}>
        <Router>
          <Header />
          <Routes>
            {PublicRouteNames?.map((route, index) => {
              return <Route path={route.path} element={route.Component} />;
            })}
            {PrivateRouteNames?.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route.Component}</PrivateRoute>}
                />
              );
            })}
          </Routes>
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
