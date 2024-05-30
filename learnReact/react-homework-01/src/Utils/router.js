import Navigo from "navigo";
const newNavigo = new Navigo("/", { linksSelector: "a", hash: false });
const root = document.querySelector("#root");
const naviagte = (path) => {
  newNavigo.navigate(path);
};
export const router = (routes, defaultLayout) => {
  routes.forEach(({ path, component }) => {
    newNavigo.on(path, () => {
      root.innerHTML = defaultLayout().replace("body", component);
    });
  });
  newNavigo.resolve();
};

export default naviagte;
