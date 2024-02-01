var mainGraph = document.getElementById("main-paragraph");
var workGraph = String(mainGraph.innerHTML).replaceAll("  ", " ");
var start = 3;
var end = workGraph.indexOf(" ", start + 1);

function changeWords() {
  if (end < 0) {
    start = 2;
    end = workGraph.indexOf(" ", start + 1);
  }
  var highlightWords = workGraph.slice(start, end);
  workGraph = workGraph.replace(
    highlightWords,
    `<span>${highlightWords}</span>`
  );
  mainGraph.innerHTML = workGraph;
  workGraph = String(mainGraph.innerHTML).replaceAll("  ", " ");
  workGraph = workGraph.replaceAll("<span>", "");
  workGraph = workGraph.replaceAll("</span>", "");
  start = end;
  end = workGraph.indexOf(" ", start + 1);
  return;
}

setInterval(changeWords, 500);
