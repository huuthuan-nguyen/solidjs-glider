import {createStore, produce} from "solid-js/store";
import {UseGlideState} from "../types/Glide";
import {FirebaseError} from "@firebase/app";
import {createSignal} from "solid-js";
import {getSubGlides} from "../api/glide";

const defaultState = () => ({
    pages: {},
    lastGlide: null,
    loading: false,
})

const useSubGlides = () => {
    const [store, setStore] = createStore<UseGlideState>(defaultState());
    const [page, setPage] = createSignal(1);

    const loadGlides = async (glideLookup: string) => {
        const _page = page();
        if (_page > 1 && !store.lastGlide) {
            return;
        }

        setStore("loading", true);
        try {
            const {glides, lastGlide} = await getSubGlides(glideLookup);

            if (glides.length > 0) {
                setStore(produce(store => {
                    store.pages[_page] = {glides};
                }));

                setPage(_page + 1);
            }

            setStore("lastGlide", lastGlide);
        } catch (error) {
            const message = (error as FirebaseError).message;
            console.log(message);
        } finally {
            setStore("loading", false);
        }
    }

    return {
        store,
        loadGlides,
        page,
    }
}

export default useSubGlides;