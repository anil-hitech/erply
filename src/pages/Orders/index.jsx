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
    const clientCode = clientDetail?.clientCode;
    const sessionKey = clientDetail?.sessionKey;
    const type1 = params?.get("type1");
    const type2 = params?.get("type2");
    const locationID = params?.get("locationID");
    const customerID = params?.get("customerID");
    const from = params?.get("from");
    const to = params?.get("to");

    await api
      .get(
        `orderReportDetail.php?clientCode=${clientCode}&sessionKey=${sessionKey}&type=${type1}&type2=${type2}&locationID=${locationID}&customerID=${customerID}&from=${from}&to=${to}`
      )
      .then((res) => setUsers(res?.data.data ?? []));

    setIsLoading(false);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  // console.log(users);
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
            width={"100%"}
            height={"80vh"}
            dataSource={users}
            showBorders={true}
            columns={columns}
            allowColumnResizing={true}
            // showIndicator={true}
            // showPageSizeSelector={true}
            paging={{ pageSize: 20, enabled: true }}
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

            <Pager
              allowedPageSizes={[20, 50, 100]} // Define available page sizes
              showPageSizeSelector={true} // Display the page size selector
              showInfo={true}
              enabled={true}
            />
            <Scrolling rowRenderingMode="virtual" />
          </DataGrid>
        )
      )}
    </div>
  );
};

export default Orders;
