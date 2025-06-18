import { proxy } from "valtio";

export const store = proxy({
    signedIn: false,
    list: []
});