export const defaultState = {
  users: [
    {
      id: "U1",
      name: "Dev",
    },
  ],
  groups: [
    {
      id: "G1",
      owner: "U1",
      name: "To Do",
    },
  ],
  tasks: [
    {
      id: "T1",
      name: "Start tasks",
      groups: "G1",
      owner: "U1",
      isComplete: false,
    },
  ],
  comments: [
    {
      id: "C1",
      owner: "U1",
      task: "T1",
      cntent: "Almond cooking you got there brother",
    },
  ],
};
