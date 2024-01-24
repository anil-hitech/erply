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
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [perPageSize, setPerPageSize] = useState(20);
  const [currentPageNo, setCurrentPageNo] = useState(2);

  const [isLoading, setIsLoading] = useState(true);

  const [params] = useSearchParams();
  const clientDetail = JSON.parse(localStorage?.getItem("clientDetail"));
  const { filters } = useFilterContext();

  const type1 = params?.get("type1");
  const type2 = params?.get("type2");

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
    const locationID = filters.locationID;
    const customerID = filters.customerID;
    const from = filters.fromDate;
    const to = filters.toDate;

    setIsLoading(true);
    await api
      .get(
        `orderReportDetail.php?clientCode=${clientCode}&sessionKey=${sessionKey}&type=${type1}&type2=${type2}&locationID=${locationID}&customerID=${customerID}&from=${from}&to=${to}&perPage=${perPageSize}&pageNo=${currentPageNo}`
      )
      .then((res) => {
        setUsers(res?.data.data ?? []);
        setPagination(res?.data.paginateData);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    getUsersData();
  }, [type1, type2, filters, perPageSize]);

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
              <Paging
                pageSize={perPageSize}
                onPageSizeChange={handlePageSizeChange}
                onPageIndexChange={handleCurrentIndexChange}
                defaultPageIndex={2}
                // pageIndex={2}
              />
              <Pager
                visible={true}
                allowedPageSizes={[2, 5, 100]} // Define available page sizes
                showPageSizeSelector={true} // Display the page size selector
                showInfo={true}
                infoText={`Page ${pagination.from} to ${pagination.to} (${pagination.total} items)`}
                // showNavigationButtons={true}
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
