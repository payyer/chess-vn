export interface RegisterSlice  {
    elo: number,
    email: string,
    password: string,
    name: string,
    selectElo : (elo :RegisterSlice['elo']) => void,
    setEmailPassword: (data: Partial<RegisterSlice>) => void;
}