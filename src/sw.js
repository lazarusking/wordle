self.addEventListener("fetch", function (event) {
  console.log(event);
});

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./sw.js")
//     .then(function (registration) {
//       console.log("ServiceWorker Registered with scope:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log("ServiceWorker registration failed:", err);
//     });
// }
