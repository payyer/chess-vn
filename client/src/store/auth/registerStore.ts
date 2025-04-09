import { StateCreator } from "zustand"
import { RegisterSlice } from "./types"

export const createRegisterSlice : StateCreator<RegisterSlice,[],[], RegisterSlice> = (set) => ({
    elo: 400,
    selectElo: (elo) => set(() => ({ elo  }))
})