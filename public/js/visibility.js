let boolean = document.hidden;
let link = document.querySelector("link[rel~='icon']");

/*
1: document is een true of false. Bijvoorbeeld: als true, dan gaat de visibility beginnen. Met false niet.
2. let link moet worden gelinkt aan de link rel icon, anders kan de href niet weten wat hij moet veranderen.
*/

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    document.title = "We miss you!";
    link.href = "img/logo-missyou.svg";
  } else {
    document.title = "Chingu: Find your K-drama Seoulmate";
    link.href = "img/logo.svg";
  }
  // TODO: Set time out pass nog toevoegen
});

/*
Bronnen:
https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically
Cat: https://www.dreamstime.com/isolated-cute-sad-cat-emoji-vector-illustration-image225028210
*/
