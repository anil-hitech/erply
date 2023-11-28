import React, { useEffect, useState } from "react";
import api from "../../api";
import { DataGrid } from "@mui/x-data-grid";
import columns from "./tableColumns";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsersData = async () => {
    await api.get("users").then((data) => setUsers(data.data));
    setIsLoading(false);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const [params] = useSearchParams();
  console.log("clientCodeAnil", params);

  return (
    <div
      style={{
        backgroundColor: "silver",
      }}
    >
      {isLoading ? (
        "Loading..... LOading.."
      ) : (
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </div>
  );
};

export default Dashboard;
