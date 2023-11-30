export const PreviewDataField = (data) => {
  return {
    byItem: {
      itemNotOnOrder: {
        name: "notOnOrder", //used for navigation purpose
        label: "Not on Order", //for view label
        value: data?.itemNotOnOrder,
      },
      itemOnPO: {
        name: "onPO",
        label: "On Purchase Order",
        value: data?.itemOnPO,
      },
      itemOpen: { name: "open", label: "Open", value: data?.itemOpen },
      itemOnHold: { name: "onHold", label: "On Hold", value: data?.itemOnHold },
      itemOnEmb: {
        name: "onEmb",
        label: "On Embroidery",
        value: data?.itemOnEmb,
      },
    },
    byOrder: {
      orderNotOnOrder: {
        name: "notOnOrder",
        label: "Not on Order",
        value: data?.orderNotOnOrder,
      },
      orderOnPO: {
        name: "onPO",
        label: "On Purchase Order",
        value: data?.orderOnPO,
      },
      orderOpen: { name: "open", label: "Open", value: data?.orderOpen },
      orderOnHold: {
        name: "onHold",
        label: "On Hold",
        value: data?.orderOnHold,
      },
      orderOnEmb: {
        name: "onEmb",
        label: "On Embroidery",
        value: data?.orderOnEmb,
      },
    },
  };
};
