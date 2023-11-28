import React, { useEffect, useState } from "react";
import api from "../../api";
import { DataGrid } from "@mui/x-data-grid";
import columns from "./tableColumns";
import { useParams } from "react-router-dom";

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

  const { clientCode, sessionKey } = useParams();
  console.log("clientCodeAnil", clientCode);
  console.log("sessionKeYAnil", sessionKey);

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
