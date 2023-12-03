const columns = [
  {
    dataField: "number",
    caption: "Order Number",
    width: "auto", // Adjust column width as needed
    alignment: "center",
  },
  {
    dataField: "itemName",
    caption: "Item Name",
    width: "auto", // Adjust column width as needed
    alignment: "center",
  },
  {
    dataField: "code",
    caption: "SKU",
    width: "auto", // Adjust column width as needed
    alignment: "center",
  },
  {
    dataField: "warehouseName",
    caption: "Warehouse Name",
    width: "auto", // Adjust column width as needed
    alignment: "center",
  },
  {
    dataField: "clientName",
    caption: "Client Name",
    width: "auto", // Adjust column width as needed
    alignment: "center",
  },
  {
    dataField: "date",
    caption: "Date",
    width: "auto", // Adjust column width as needed
    alignment: "center",
  },
  {
    dataField: "open",
    caption: "Open",
    width: "auto", // Adjust column width as needed
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
  {
    dataField: "received",
    caption: "Received",
    width: "auto", // Adjust column width as needed
    alignment: "center",
    calculateCellValue: (rowData) => {
      console.log("rowData", rowData);

      return rowData.received !== null
        ? parseInt(rowData.received).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })
        : 0;
    },

    // dataType: "number",
    // format: "currency",
    // customizeText: (data) => data.value.toLocaleString(),
  },
  {
    dataField: "onVA",
    caption: "V.A.",
    width: "auto", // Adjust column width as needed
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
  {
    dataField: "onHold",
    caption: "On Hold",
    width: "auto", // Adjust column width as needed
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
  {
    dataField: "onEmb",
    caption: "embRel",
    width: "auto", // Adjust column width as needed
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
  {
    dataField: "invoiced",
    caption: "Invoiced",
    width: "auto", // Adjust column width as needed
    alignment: "center",
    customizeText: (data) => parseInt(data.value).toLocaleString(),
  },
  // {
  //   dataField: "ordered",
  //   caption: "Ordered",
  //   //flex: 1,
  //   width: "auto", // Adjust column width as needed
  //alignment: 'center',
  // },
];

export const summaryRow = ["open", "onVA", "onHold", "onEmb", "invoiced"];

export default columns;
