let boolean = document.hidden;

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    document.title = "We miss you!";
  } else {
    document.title = "Chingu: Find your K-drama Seoulmate";
  }
  // Set time out pass nog toevoegen
});
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
