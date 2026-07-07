import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetUsers } from "../../hooks/userHooks";
import { CircularProgress } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 120 },
  { field: "isVerified", headerName: "Verified", width: 130, type: "boolean" },
  {
    field: "lastLogin",
    headerName: "Last Login",
    width: 180,
    type: "dateTime",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 180,
    type: "dateTime",
  },
  {
    field: "firstname",
    headerName: "First Name",
    width: 150,
  },
  {
    field: "lastname",
    headerName: "Last Name",
    width: 150,
  },
];

const UsersPage = () => {
  const { users, paginationState, isLoading, isError, error } = useGetUsers();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const rows =
    users && users.length > 0
      ? users.map((user) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          lastLogin: user.lastLogin ? new Date(user.lastLogin) : null,
          createdAt: new Date(user.createdAt),
          firstname: user.profile?.firstname || "",
          lastname: user.profile?.lastname || "",
        }))
      : [];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationMode="server"
        initialState={{
          pagination: {
            paginationModel: {
              page: paginationState ? paginationState.currentPage - 1 : 0,
              pageSize: paginationState?.dataPerpage || 10,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        loading={isLoading}
        checkboxSelection
        rowCount={paginationState?.totalData || 0}
        pagination
      />
    </div>
  );
};

export default UsersPage;
