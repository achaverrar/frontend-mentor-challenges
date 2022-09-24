import "./sass/main.scss";

import "./js/broken_image";

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
