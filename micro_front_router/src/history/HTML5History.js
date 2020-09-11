class HTML5History {
  constructor () {

  }

  init () {
    window.addEventListener('popstate', (event) => {
      console.log("onpopstate, location: " + document.location + ", state: " + JSON.stringify(event.state));
      if (event.state) {
        this.routes[event.state.route].updateEnter();
      } else {
        this.routes['/'].updateEnter();
      }
    });
  }
}