import {onMount, onCleanup, createContext, ParentComponent, useContext, Accessor, Setter, Show} from "solid-js";
import {createStore} from "solid-js/store";
import Loader from "@components/utils/Loader";

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
            setStore("isAuthenticated", true);
        } catch (error: any) {
            console.log(error);
            setStore("isAuthenticated", false);
        } finally {
            setStore("loading", false);
        }
    })

    const authenticateUser = async () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                // res(true);
                rej("Oopsie we got some problem here");
            }, 1000);
        })
    }

    onCleanup(() => {
        console.log("Cleaning-up AuthProvider!")
    })

    return (
        <AuthStateContext.Provider value={store}>
            <Show when={store.loading} fallback={props.children}>
                <Loader size={100}/>
            </Show>
        </AuthStateContext.Provider>
    )
}

export const useAuthState = () => useContext(AuthStateContext);

export default AuthProvider;