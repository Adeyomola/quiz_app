let countDown = document.querySelector("h1");

let count = 3;

setInterval(() => {
  count--;
  if (count > 0) {
    countDown.innerHTML = count;
  } else if (count == 0) {
    countDown.innerHTML = "Go!";
    setInterval(() => {
      return window.location.assign("./game.html");
    }, 1000);
  }
}, 1000);
