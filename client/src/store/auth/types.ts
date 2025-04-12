export interface RegisterSlice  {
    elo: number,
    email: string,
    password: string,
    username: string,
    step:  Step,
    selectElo : (elo :RegisterSlice['elo']) => void,
    setEmailPassword: (data: Partial<RegisterSlice>) => void;
    setName: (name : RegisterSlice["username"]) => void;
    setStep: (step: Step) => void;
    resetFiled: () => void
}


export type Step =
  | "main-screen"
  | "skill-level"
  | "login-info"
  | "username"
  | "completed";
