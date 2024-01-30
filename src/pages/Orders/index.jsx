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
import { Pagination, Stack, Typography } from "@mui/material";

const Orders = () => {
  const [params] = useSearchParams();
  const type1 = params?.get("type1");
  const type2 = params?.get("type2");

  const isType1Order = type1 === "order" ? true : false;

  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [perPageSize, setPerPageSize] = useState(20);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [preCalcTotalSummary, setPreCalcTotalSummary] = useState(null);
  const [isFetchPageNoSet, setIsFetchPageNoSet] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const clientDetail = JSON.parse(localStorage?.getItem("clientDetail"));
  const { filters } = useFilterContext();

  const clientCode = clientDetail.clientCode;
  const authKey = clientDetail.sessionKey;

  const usersLength = users.length;

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

  const getUsersData = async () => {
    const clientCode = clientDetail?.clientCode;
    const sessionKey = clientDetail?.sessionKey;
    const orderNo = filters.orderNo;
    const locationID = filters.locationID;
    const customerID = filters.customerID;
    const from = filters.fromDate;
    const to = filters.toDate;
    const fetchPerPageSize = isType1Order ? perPageSize : 1000;
    const fetchPageNo = isFetchPageNoSet ? currentPageNo : 1;

    setIsLoading(true);
    await api
      .get(
        `orderReportDetail.php?clientCode=${clientCode}&sessionKey=${sessionKey}&type=${type1}&type2=${type2}&orderNo=${orderNo}&locationID=${locationID}&customerID=${customerID}&from=${from}&to=${to}&perPage=${fetchPerPageSize}&pageNo=${fetchPageNo}`
      )
      .then((res) => {
        setUsers(res?.data.data ?? []);
        setPagination(res?.data.paginateData);
        setPreCalcTotalSummary(res.data?.totalData || 0);
        setIsFetchPageNoSet(false);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentPageNo(1);
    getUsersData();
  }, [type1, type2, filters]);

  useEffect(() => {
    if (isType1Order) getUsersData();
  }, [currentPageNo, perPageSize]);

  // console.log(pagination);
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
              // dataSource={customDataSource}
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

                {isType1Order &&
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
                // defaultPageIndex={}
                pageIndex={currentPageNo - 1}
                onPageIndexChange={(newIndex) => setCurrentPageNo(newIndex)}
              />
              <Pager
                visible={true}
                allowedPageSizes={[20, 50, 100]} // Define available page sizes
                showPageSizeSelector={true} // Display the page size selector
                showInfo={true}
                infoText={
                  isType1Order
                    ? `Page ${pagination?.from} of ${pagination?.to} (${pagination?.total} items)`
                    : undefined
                }
                showNavigationButtons={true}
              />

              <Scrolling rowRenderingMode="virtual" />
            </DataGrid>
          </>
        )
      )}
      {!isLoading && (
        <Stack
          sx={{
            float: "right",
            position: "relative",
            top: "-40px",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {!isType1Order && (
            <>
              <Typography sx={{ marginRight: "20px", fontSize: "0.9em" }}>
                Page {currentPageNo} of{" "}
                {usersLength % perPageSize === 0
                  ? parseInt(usersLength / perPageSize)
                  : parseInt(usersLength / perPageSize) + 1}{" "}
                &#40;
                {usersLength.toLocaleString()} items&#41;
              </Typography>
              <Pagination
                count={
                  usersLength % perPageSize === 0
                    ? parseInt(usersLength / perPageSize)
                    : parseInt(usersLength / perPageSize) + 1
                }
                page={currentPageNo}
                onChange={(e, pageNo) => {
                  setCurrentPageNo(pageNo);
                }}
              />
            </>
          )}

          {isType1Order && (
            <>
              <Typography sx={{ marginRight: "20px", fontSize: "0.9em" }}>
                Page {pagination?.from} of {pagination?.to} &#40;
                {pagination?.total.toLocaleString()} Items&#41;
              </Typography>
              <Pagination
                count={pagination?.to || 1}
                page={pagination?.from || 1}
                onChange={(e, pageNo) => {
                  setCurrentPageNo(pageNo);
                  setIsFetchPageNoSet(true);
                }}
              />
            </>
          )}
        </Stack>
      )}
    </div>
  );
};

export default Orders;
