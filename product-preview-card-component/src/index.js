import "./fonts/fraunces-v24-latin-700.woff";
import "./fonts/fraunces-v24-latin-700.woff2";
import "./fonts/montserrat-v25-latin-500.woff";
import "./fonts/montserrat-v25-latin-500.woff2";
import "./fonts/montserrat-v25-latin-700.woff";
import "./fonts/montserrat-v25-latin-700.woff2";
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
