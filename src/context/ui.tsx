import {createContext, ParentComponent, useContext} from "solid-js";
import {createStore} from "solid-js/store";

export type SnackbarMessage = {
    message: string;
    type: "success" | "warning" | "error";
    id?: string;
}

type UIState = {
    snackbars: SnackbarMessage[]
}

const UIStateContext = createContext<UIState>();

const defaultState = (): UIState => ({
    snackbars: [
        {
            message: "Hello World",
            type: "success",
        },
        {
            message: "Ooop, something went wrong",
            type: "error",
        },
        {
            message: "Verify your profile",
            type: "warning",
        }
    ]
})

const UIProvider: ParentComponent = (props) => {
    const [store, setStore] = createStore<UIState>(defaultState());

    return (
        <UIStateContext.Provider value={store}>
            {props.children}
        </UIStateContext.Provider>
    )
}

export const useUIState = () => useContext(UIStateContext)!;

export default UIProvider;