import {createSignal, onMount} from "solid-js";
import {User} from "../types/User";
import getUsers from "../api/user";
import {FirebaseError} from "@firebase/app";
import {useUIDispatch} from "@context/ui";
import {useAuthState} from "@context/auth";

const useUsers = () => {
    const {user} = useAuthState()!;
    const {addSnackbar} = useUIDispatch();
    const [users, setUsers] = createSignal<User[]>([]);
    const [loading, setLoading] = createSignal(true);

    onMount(() => {
        loadUsers();
    });

    const loadUsers = async () => {
        try {
            const users = await getUsers(user!);
            setUsers(users);
        } catch (error) {
            const message = (error as FirebaseError).message;
            addSnackbar({message, type: "error"});
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        users,
    }
}

export default useUsers;