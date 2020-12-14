import { proxy } from "valtio"
import firebase from "../services/firebase"

const store = proxy({
    phone: "",
    showPass: false,
    loading: false,
    user: null,
    showLogin: false
})

export default store