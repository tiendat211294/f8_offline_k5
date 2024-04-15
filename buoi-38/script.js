const postApi = `https://c9mjzh-3000.csb.app/posts`;
const container = document.querySelector(".container");

const showPost = async () => {
  const response = await fetch(postApi);
  const postData = await response.json();
  let html = ``;
  postData.forEach((post) => {
    html += `<h3>${post.title}</h3>
    <p>${post.text}</p>`;
  });
  const postHtml = document.createElement("div");
  postHtml.innerHTML = html;
  container.append(postHtml);
};
showPost();

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 1
  ) {
    showPost();
  }
});
