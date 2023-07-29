export type HumanType = {
  name: string;
  description: string[];
};

export type Simulation = {
  _id: string;
  simId: number;
  humans: HumanType[];
  conversation: String[];
};
