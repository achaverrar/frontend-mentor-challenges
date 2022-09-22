import "./sass/main.scss";

const person = {
  firstName: "Ayxa",
  lastName: "Chaverra",
  birthYear: 1997,
};

const hi = () => {
  console.log(`hello ${person.firstName}!`);
  console.log("Are the following your data?");
  console.table(person);
};

hi();
