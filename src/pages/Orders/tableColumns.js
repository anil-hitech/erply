import { priceFormatter } from "./helpers";

const numColWidth = "10%";
const nameColWidth = "20%";

const columns = [
  {
    dataField: "number",
    caption: "Odr. No.",
    width: numColWidth, // Adjust column width as needed
    alignment: "center",
    // cellTemplate: (cellElement) => {
    //   cellElement.style.cursor = "pointer";
    // },
  },
  {
    dataField: "itemName",
    caption: "Item Name",
    width: nameColWidth,
    alignment: "center",
  },
  {
    dataField: "code",
    caption: "SKU",
    width: nameColWidth,
    alignment: "center",
  },
  {
    dataField: "warehouseName",
    caption: "Warehouse Name",
    width: nameColWidth,
    alignment: "center",
  },
  {
    dataField: "clientName",
    caption: "Client Name",
    width: nameColWidth,
    alignment: "center",
  },
  {
    dataField: "date",
    caption: "Date",
    width: numColWidth,
    alignment: "center",
  },
  {
    dataField: "netTotal",
    caption: "Net Total",
    width: numColWidth,
    alignment: "center",
    customizeText: ({ value }) => priceFormatter(value),
  },
  {
    dataField: "ordered",
    caption: "Qty.",
    width: numColWidth,
    alignment: "center",
  },
  {
    dataField: "open",
    caption: "Open",
    width: numColWidth,
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
  {
    dataField: "received",
    caption: "Received",
    width: numColWidth,
    alignment: "center",
    calculateCellValue: (rowData) => {
      return rowData.received !== null
        ? parseInt(rowData.received).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })
        : 0;
    },
  },
  {
    dataField: "onVA",
    caption: "V.A.",
    width: numColWidth,
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
  {
    dataField: "onHold",
    caption: "On Hold",
    width: numColWidth,
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
  {
    dataField: "onEmb",
    caption: "embRel",
    width: numColWidth,
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
    visible: false,
  },
  {
    dataField: "invoiced",
    caption: "Invoiced",
    width: numColWidth,
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
];

export const summaryRow = [
  "netTotal",
  "ordered",
  "open",
  "onVA",
  "onHold",
  "onEmb",
  "invoiced",
];

export default columns;

//some fields to rem:
//flex:1
// dataType: "number",
// format: {
//   type: "currency",
//   precision: 2,
// },
// customizeText: (data) => data.value.toLocaleString(),
