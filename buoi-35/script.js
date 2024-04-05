class F8 {
  static component(component, action = {}) {
    class Element extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        let html = action.template;
        const results = html.match(/{{.+?}}/g);
        results.forEach((result) => {
          const variableResult = result.match(/{{(.+?)}}/);
          if (action.data) {
            Object.keys(action.data).forEach((key) => {
              window[key] = action.data[key];
              if (variableResult[1].trim() === key) {
                html = html.replace(result, `${window[key]}`);
              }
            });
          }
        });
        const template = document.createElement("template");
        template.innerHTML = html;
        const shadow = this.attachShadow({ mode: "open" });
        let templateNode = template.content.cloneNode(true);
        for (let i = 0; i < templateNode.children.length; i++) {
          if (templateNode.children[i].attributes["v-on:click"]) {
            templateNode.children[i].addEventListener("click", function () {
              templateNode = template.content.cloneNode(true);
              eval(templateNode.children[i].attributes["v-on:click"].nodeValue);
              shadow.querySelector("h2").innerText = title;
              shadow.querySelector("h3").innerText = `Đã đếm: ${count} lần`;
            });
          }
        }
        shadow.append(templateNode);
      }
    }
    customElements.define(component, Element);
  }
}

F8.component("counter-app", {
  data: {
    count: 0,
    title: "Counter App",
  },
  template: `<h2>{{ title }}</h2>
        <h3>Đã đếm: {{ count }} lần</h3>
        <button v-on:click="count--">-</button>
        <button v-on:click="count++">+</button>
        <button v-on:click="title = 'Changed'">Change Title</button>`,
});
