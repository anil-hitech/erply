import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import uniqid from "uniqid";

import api from "../../api";
import columns from "./tableColumns";
import { useSearchParams } from "react-router-dom";

const Orders = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [params] = useSearchParams();
  const clientDetail = JSON.parse(localStorage.getItem("clientDetail"));

  const getUsersData = async () => {
    await api
      .get(
        `orderReportDetail.php?clientCode=${
          clientDetail?.clientCode
        }&sessionKey=${clientDetail?.sessionKey}&type=${params?.get(
          "type1"
        )}&type2=${params.get("type2")}`
      )
      .then((res) => setUsers(res.data.data));

    setIsLoading(false);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  console.log(users);
  return (
    <div
      style={{
        backgroundColor: "silver",
      }}
    >
      {isLoading ? (
        "Loading....."
      ) : (
        <DataGrid
          rows={users}
          getRowId={(row) => uniqid()}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
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

export default Orders;
