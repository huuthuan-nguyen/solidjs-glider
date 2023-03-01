import {onMount, onCleanup, createContext, ParentComponent, useContext, Accessor, Setter} from "solid-js";
import {createStore} from "solid-js/store";

type AuthStateContextValues = {
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState = () => ({
    isAuthenticated: false,
    loading: true,
})

const AuthStateContext = createContext<AuthStateContextValues>();

const AuthProvider: ParentComponent = (props) => {
    const [store, setStore] = createStore(initialState());

    const authenticateUser = async () => {
        return new Promise(() =>{
            setTimeout(() => {

            }, 1000);
        })
    }

    onCleanup(() => {
        console.log("Cleaning-up AuthProvider!")
    })

    return (
        <AuthStateContext.Provider value={store}>
            {props.children}
        </AuthStateContext.Provider>
    )
}

export const useAuthState = () => useContext(AuthStateContext);

export default AuthProvider;