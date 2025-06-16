import { proxy } from "valtio";

export const state = proxy({
    signedIn: false
});