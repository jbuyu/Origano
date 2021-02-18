import bcrypt from "bcrypt";
const users = [
  {
    name: "Admin User",
    email: "adminUser@example.com",
    password: bcrypt.hashSync("alufwnimath", 10),
    isAdmin: true,
  },
  {
    name: "Altera User",
    email: "alteraUser@example.com",
    password: bcrypt.hashSync("alteramia", 10),
  },
  {
    name: "Miami User",
    email: "miamiUser@example.com",
    password: bcrypt.hashSync("miamifutan", 10),
  },
  {
    name: "Keli User",
    email: "kelli@example.com",
    password: bcrypt.hashSync("kelifuan", 10),
  },
];

export default users;
