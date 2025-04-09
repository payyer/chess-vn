export interface RegisterSlice  {
    elo: number,
    selectElo : (elo :RegisterSlice['elo']) => void
}