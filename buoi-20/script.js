var mainGraph = document.getElementById("main-paragraph");
var workingGraph = mainGraph.innerText;
var start = 0;
function changeWords() {
  var end = workingGraph.indexOf(" ", start);
  if (end === -1) {
    end = workingGraph.length;
  }
  var before = workingGraph.slice(0, start);
  var highlightWords = workingGraph.slice(start, end);
  var after = workingGraph.slice(end);
  mainGraph.innerHTML = `${before} <span style="color: red;">${highlightWords}</span> ${after}`;
  start = end + 1;
  if (start >= workingGraph.length) {
    start = 0;
  }
  end = workingGraph.indexOf(" ", start);
  return;
}

setInterval(changeWords, 500);
