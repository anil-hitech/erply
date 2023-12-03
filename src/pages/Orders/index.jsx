import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataGrid, LoadPanel } from "devextreme-react";
import tableColumns, { summaryRow } from "./tableColumns";
import "devextreme/dist/css/dx.light.css";
import {
  Column,
  FilterRow,
  Pager,
  Paging,
  Scrolling,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";

import api from "../../api";

const Orders = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [params] = useSearchParams();
  const clientDetail = JSON.parse(localStorage?.getItem("clientDetail"));

  let columns = [];
  if (params?.get("type1") === "order") {
    columns = tableColumns.filter((col) => col.dataField !== "itemName"); //removing columns for oder type
    columns = columns.filter((col) => col.dataField !== "code");
  } else columns = tableColumns;

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
    <div>
      {isLoading ? (
        <LoadPanel
          shadingColor="rgba(0,0,0,0.4)"
          visible={isLoading}
          showIndicator={true}
          shading={true}
        />
      ) : (
        users && (
          <DataGrid
            // width={"100%"}
            height={"80vh"}
            dataSource={users}
            showBorders={true}
            columns={columns}
            allowColumnResizing={true}
            // columnAutoWidth={true}
          >
            {columns.map((column, index) => (
              <Column key={index} {...column} />
            ))}

            <FilterRow visible={true} />
            <Summary>
              {summaryRow.map((col, index) => (
                <TotalItem
                  key={index}
                  column={col}
                  summaryType="sum"
                  displayFormat={(value) => parseInt(value).toLocaleString()} // Optional formatting
                />
              ))}
            </Summary>
            <Paging defaultPageSize={20} />
            <Pager
              showPageSizeSelector={true}
              allowedPageSizes={[20, 50, 100]}
            />
            <Scrolling rowRenderingMode="virtual" />
          </DataGrid>
        )
      )}
    </div>
  );
};

export default Orders;
