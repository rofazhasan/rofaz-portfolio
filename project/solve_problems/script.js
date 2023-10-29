function saveSolution() {
    var problemLink = document.getElementById("problem-link").value;
    var sourceCode = document.getElementById("source-code").value;

    if (problemLink && sourceCode) {
        var solutionList = document.getElementById("solution-list");
        var listItem = document.createElement("li");
        listItem.textContent = "Problem Link: " + problemLink + "\n\n" + sourceCode;
        solutionList.appendChild(listItem);

        // Clear the form fields after saving the solution
        document.getElementById("problem-link").value = "";
        document.getElementById("source-code").value = "";
    } else {
        alert("Please enter both problem link and source code!");
    }
}
