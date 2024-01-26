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
import { useFilterContext } from "../../context/FilterContext";

const Orders = () => {
  const [params] = useSearchParams();
  const type1 = params?.get("type1");
  const type2 = params?.get("type2");

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [perPageSize, setPerPageSize] = useState(20);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [preCalcTotalSummary, setPreCalcTotalSummary] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const clientDetail = JSON.parse(localStorage?.getItem("clientDetail"));
  const { filters } = useFilterContext();

  const clientCode = clientDetail.clientCode;
  const authKey = clientDetail.sessionKey;

  // const classes = useStyles();

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

  const handlePageSizeChange = (newPageSize) => setPerPageSize(newPageSize);

  const handleCurrentIndexChange = (newIndex) => setCurrentPageNo(newIndex);

  const getUsersData = async () => {
    const clientCode = clientDetail?.clientCode;
    const sessionKey = clientDetail?.sessionKey;
    const orderNo = filters.orderNo;
    const locationID = filters.locationID;
    const customerID = filters.customerID;
    const from = filters.fromDate;
    const to = filters.toDate;
    const fetchPerPageSize = type1 === "order" ? perPageSize : 1000;

    setIsLoading(true);
    await api
      .get(
        `orderReportDetail.php?clientCode=${clientCode}&sessionKey=${sessionKey}&type=${type1}&type2=${type2}&orderNo=${orderNo}&locationID=${locationID}&customerID=${customerID}&from=${from}&to=${to}&perPage=${fetchPerPageSize}&pageNo=${currentPageNo}`
      )
      .then((res) => {
        setUsers(res?.data.data ?? []);
        setPagination(res?.data.paginateData);
        setPreCalcTotalSummary(res.data?.totalData);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    getUsersData();
  }, [type1, type2, filters]);

  useEffect(() => {
    if (type1 === "order") getUsersData();
  }, [perPageSize]);

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
              remoteOperations={{ Pager: true, paging: true }}
            >
              {columns.map((column, index) => (
                <Column key={index} {...column} />
              ))}
              <FilterRow visible={true} />
              {/* <Summary totalItems={[{ name: "netTotal", value: "dff" }]}> */}
              <Summary>
                {type1 === "lineItem" &&
                  summaryRow.map((col, index) => (
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

                {type1 === "order" &&
                  summaryRow.map((colName, index) => (
                    <TotalItem
                      key={index}
                      column={colName}
                      summaryType="sum"
                      displayFormat={() =>
                        colName !== "netTotal"
                          ? parseInt(
                              preCalcTotalSummary[colName]
                            ).toLocaleString()
                          : priceFormatter(preCalcTotalSummary[colName])
                      } // Optional formatting
                    />
                  ))}
              </Summary>
              <Paging
                pageSize={perPageSize}
                onPageSizeChange={handlePageSizeChange}
                // defaultPageIndex={5}
                // onPageIndexChange={ handleCurrentIndexChange}
                // pageIndex={5}
              />
              <Pager
                visible={true}
                allowedPageSizes={[20, 50, 100]} // Define available page sizes
                showPageSizeSelector={true} // Display the page size selector
                showInfo={true}
                infoText={
                  type1 === "order"
                    ? `Page ${pagination.from} to ${pagination.to} (${pagination.total} items)`
                    : undefined
                }
                showNavigationButtons={true}
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
