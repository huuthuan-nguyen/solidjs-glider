import {render} from "solid-js/web";
import App from "./App";
import {Router} from "@solidjs/router";

import "./index.css";
import AuthProvider from "@context/auth";

const root = document.getElementById("root")!;

render(() =>
    <Router>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </Router>, root);