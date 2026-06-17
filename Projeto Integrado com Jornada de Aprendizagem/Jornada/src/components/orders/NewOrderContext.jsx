import { createContext, useContext } from "react";

const NewOrderContext = createContext({
  openNewOrder: () => {},
  createdOrders: [],
  addCreatedOrder: () => {},
  activeDemand: [],
  activeDemandId: "",
  activeDemandCreatedAt: "",
  demandHistory: [],
  addOrderToDemand: () => {},
  addOrdersToDemand: () => {},
  removeOrderFromDemand: () => {},
  reorderActiveDemand: () => {},
  finalizeDemand: () => null,
  deleteDemand: () => {},
});

export function NewOrderProvider({ value, children }) {
  return (
    <NewOrderContext.Provider value={value}>
      {children}
    </NewOrderContext.Provider>
  );
}

export function useNewOrder() {
  return useContext(NewOrderContext);
}
