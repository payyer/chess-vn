export interface RegisterSlice  {
    elo: number,
    email: string,
    password: string,
    username: string,
    selectElo : (elo :RegisterSlice['elo']) => void,
    setEmailPassword: (data: Partial<RegisterSlice>) => void;
    setName: (name : RegisterSlice["username"]) => void
}