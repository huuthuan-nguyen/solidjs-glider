import {RegisterForm} from "../types/Form";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {firebaseAuth} from "../db";

const registerUser = (form: RegisterForm) => {
    return createUserWithEmailAndPassword(firebaseAuth, form.email, form.password);
}

export {registerUser};