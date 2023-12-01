import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import uniqid from "uniqid";

import api from "../../api";

import { DataGrid } from "@mui/x-data-grid";
import columns from "./tableColumns";

// import { DataGrid } from "devextreme-react";
// import { Column, Pager, Paging } from "devextreme-react/data-grid";
// import columns from "./tableColumnsOne";

const Orders = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [params] = useSearchParams();
  const clientDetail = JSON.parse(localStorage?.getItem("clientDetail"));

  const getUsersData = async () => {
    await api
      .get(
        `orderReportDetail.php?clientCode=${
          clientDetail?.clientCode
        }&sessionKey=${clientDetail?.sessionKey}&type=${params?.get(
          "type1"
        )}&type2=${params.get("type2")}`
      )
      .then((res) => setUsers(res?.data.data));

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
      {
        isLoading
          ? "Loading....."
          : users && (
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
            )
        // <DataGrid dataSource={users} showBorders={true} columns={columns}>
        //   {columns.map((column, index) => (
        //     <Column key={index} {...column} />
        //   ))}
        //   {/* <Column dataField="id" caption="ID" />
        //   {/* Add more Column components as needed */}
        //   <Paging defaultPageSize={10} />
        //   <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />
        // </DataGrid>
      }
    </div>
  );
};

export default Orders;
