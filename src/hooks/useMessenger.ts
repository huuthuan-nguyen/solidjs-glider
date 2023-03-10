import {createStore} from "solid-js/store";
import {GliderInputEvent, MessengerForm} from "../types/Form";
import {useAuthState} from "@context/auth";
import {useUIDispatch} from "@context/ui";
import {createSignal} from "solid-js";
import {createGlide} from "../api/glide";
import {FirebaseError} from "@firebase/app";

const useMessenger = () => {
    const {isAuthenticated, user} = useAuthState()!;
    const {addSnackbar} = useUIDispatch();
    const [loading, setLoading] = createSignal(false);
    const [form, setForm] = createStore<MessengerForm>({
        content: "",
    });

    const handleInput = (e: GliderInputEvent) => {
        const {name, value} = e.currentTarget;
        setForm(name, value);
    }

    const handleSubmit = async () => {

        if (!isAuthenticated) {
            addSnackbar({message: "You are not authenticated!", type: "error"});
            return;
        }

        setLoading(true);

        const glide = {
            ...form,
            uid: user!.uid,
        }

        try {
            const newGlide = await createGlide(glide);
            newGlide.user = {
                nickName: user!.nickName,
                avatar: user!.avatar
            };
            addSnackbar({message: "Glide added!", type: "success"});
            setForm({content: ""});
            return newGlide;
        } catch (error) {
            const message = (error as FirebaseError).message;
            addSnackbar({message, type: "error"});
        } finally {
            setLoading(false);
        }
    }

    return {
        handleInput,
        handleSubmit,
        form,
        loading,
    }
}

export default useMessenger;