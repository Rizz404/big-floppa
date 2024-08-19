import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import UsersPage from "./pages/admin/UsersPage";
import HomePage from "./pages/user/HomePage";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<UsersPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </>
  )
);

export default App;
