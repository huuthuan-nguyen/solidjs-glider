import {Glide} from "../types/Glide";
import {createStore} from "solid-js/store";
import {onMount} from "solid-js";
import {getGlides} from "../api/glide";

type State = {
    glides: Glide[];
    loading: boolean;
}

const createInitState = () => ({glides: [], loading: false});

const useGlides = () => {
    const [store, setStore] = createStore<State>(createInitState());

    onMount(() => {
        loadGlides();
    })

    const loadGlides = () => {
        getGlides();
    }

    return {
        loadGlides,
        store,
    }
}

export default useGlides;