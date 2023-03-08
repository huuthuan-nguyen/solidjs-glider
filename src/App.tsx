import {Component} from "solid-js";
import AppRoutes from "./router";
import {useAuthState} from "@context/auth";
import SnackbarContainer from "@components/snackbar/Container";

const App: Component = () => {
    const authState = useAuthState()!;
    return (
        <>
            <div id="popups"/>
            <SnackbarContainer/>
            <AppRoutes/>
        </>
    )
};

export default App;
