import { useEffect, useState } from "react";
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
import { priceFormatter } from "./helpers";

const Orders = () => {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  const [params] = useSearchParams();
  const clientDetail = JSON.parse(localStorage?.getItem("clientDetail"));

  const type1 = params?.get("type1");
  const type2 = params?.get("type2");

  const clientCode = clientDetail.clientCode;
  const authKey = clientDetail.sessionKey;

  let columns = [];
  if (type1 === "lineItem") {
    const excludedColumns = ["orderedQty"];
    columns = tableColumns.filter(
      (col) => !excludedColumns.includes(col.dataField) //removing unnecessary columns for lineItem type
    );
  } else {
    const excludedColumns = ["itemName", "code", "totalQty"];
    columns = tableColumns.filter(
      (col) => !excludedColumns.includes(col.dataField) //removing unnecessary columns for oder type
    );
  }

  const handleCellClick = (e) => {
    if (e.column.name === "number")
      window.open(
        `https://au.erply.com/${clientCode}/?lang=eng&authKey=${authKey}&section=invoice&edit=${e.data.saleID}`,
        "_blank"
      );
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const getUsersData = async () => {
    const clientCode = clientDetail?.clientCode;
    const sessionKey = clientDetail?.sessionKey;
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
          <>
            <DataGrid
              width={"100%"}
              height={"80vh"}
              dataSource={users}
              showBorders={true}
              columns={columns}
              allowColumnResizing={true}
              rowAlternationEnabled={true}
              onCellClick={handleCellClick}
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
                    displayFormat={(value) =>
                      col !== "netTotal"
                        ? parseInt(value).toLocaleString()
                        : priceFormatter(value)
                    } // Optional formatting
                  />
                ))}
              </Summary>
              <Paging pageSize={pageSize} />
              <Pager
                allowedPageSizes={[20, 50, 100]} // Define available page sizes
                showPageSizeSelector={true} // Display the page size selector
                totalCount={users?.length} // Total count of records
                onPageSizeChange={handlePageSizeChange}
                showInfo={true}
                // enabled={true}
              />
              <Scrolling rowRenderingMode="virtual" />
            </DataGrid>
          </>
        )
      )}
    </div>
  );
};

export default Orders;
