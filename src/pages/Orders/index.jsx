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
  const clientDetail = localStorage.getItem("clientDetail");

  const getUsersData = async () => {
    await api
      .get(
        `orderReportDetail.php?clientCode=${
          cleientDetail?.clientCode
        }&sessionKey=${clientDetail?.sessionKey}&type=${clientDetail?.get(
          "type1"
        )}&type2=${params.get("type2")}`
        // `orderReportDetail.php?clientCode=606950&sessionKey=dc568baf7e419a1da6a104438a65718555d48d2d8174&type=${params.get(
        //   "type1"
        // )}&type2=${params.get("type2")}`
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
