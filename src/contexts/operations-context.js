import { createContext, useContext, useReducer } from "react";
import { initialOperationValues, operationsReducerFunction } from "../reducers";

const OperationContext = createContext(initialOperationValues);

const OperationProvider = ({ children }) => {
    const [ operationState, operationDispatch ] = useReducer(operationsReducerFunction, initialOperationValues);
    
    return(
        <OperationContext.Provider value={{ operationState, operationDispatch }}>
            { children }
        </OperationContext.Provider>
    );
}

const useOperation = () => useContext(OperationContext);

export { OperationProvider, useOperation };