import {Snackbar} from "./index";
import {useUIState} from "@context/ui";
import {For} from "solid-js";

export default function SnackbarContainer() {
    const {snackbars} = useUIState();
    return (
        <div class="fixed z-50 top-0 right-0 p-4 w-ful md:max-w-xs">
            <ul class="flex flex-col space-y-2">
                <For each={snackbars}>
                    {(snackbar) => <Snackbar message={snackbar.message} type={snackbar.type}/>}
                </For>
            </ul>
        </div>
    );
}
