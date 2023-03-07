import {RegisterForm} from "../types/Form";
import {registerUser} from "../api/auth";

const useRegister = () => {
    const register = async (registerForm: RegisterForm) => {
        const {user} = await registerUser(registerForm);
        console.log(user);
    }

    return {
        register
    }
}

export default useRegister;