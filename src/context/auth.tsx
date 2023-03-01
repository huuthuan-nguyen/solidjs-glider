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

    onMount(async () => {
        try {
            await authenticateUser();
        } catch (error: any) {
            console.log(error);
        } finally {
            setStore("loading", false);
        }
    })

    const authenticateUser = async () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                setStore("isAuthenticated", true);
                rej("Oopsie we got some problem here");
            }, 3000);
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