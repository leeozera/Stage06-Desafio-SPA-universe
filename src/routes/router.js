export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }
  background = {
    "/": "/src/assets/mountains-universe-1.png",
    "/ouniverso": "/src/assets/mountains-universe02.png",
    "/exploracao": "/src/assets/mountains-universe-3.png",
  };
  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    const background = this.background[pathname];
    document.querySelector("body").style.background = `url(${background})`;
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.getElementById("content").innerHTML = html;
        document.querySelector("body").style.background = `url(${background})`;
        document.querySelector("body").style.backgroundPosition = "center";
        document.querySelector("body").style.backgroundRepeat = "no-repeat";
        document.querySelector("body").style.backgroundSize = "cover";
      });
  }
}
