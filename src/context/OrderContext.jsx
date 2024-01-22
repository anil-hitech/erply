import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

const initalOrderPageState = { type1: "", type: "" };

const OrderContextProvider = () => {
  const [orderPageState, setOrderPageState] = useState(initalOrderPageState);
  return (
    <OrderContext.provider value={(orderPageState, setOrderPageState)}>
      {" "}
      OrderContext
    </OrderContext.provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrderPageContex = () => useContext(OrderContext);
export default OrderContextProvider;
