import { StateCreator } from "zustand"
import { RegisterSlice } from "./types"

export const createRegisterSlice: StateCreator<RegisterSlice, [], [], RegisterSlice> = (set) => ({
    step: "main-screen",
    elo: 400,
    email: "",
    password: "",
    username: "",
    selectElo: (elo) => set(() => ({ elo })),
    setEmailPassword: (data) => set(() => ({ email: data.email, password: data.password })),
    setName: (username) => set(() => ({ username })),
    setStep: (step) => set(() => ({ step })),
    resetFiled : () => set(() => ({step: 'main-screen', elo: 400, email:"", password:"", username : ""}))
})