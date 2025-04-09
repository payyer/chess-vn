import { create } from "zustand";
import { createRegisterSlice } from "./registerStore";
import { RegisterSlice } from "./types";

const useAccountStore = create<RegisterSlice>()((...a)=> ({
    ...createRegisterSlice(...a)
}))

export default useAccountStore