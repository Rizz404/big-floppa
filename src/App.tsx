import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import UsersPage from "./pages/admin/UsersPage";

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index></Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </>
  )
);

export default App;
