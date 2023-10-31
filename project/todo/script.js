function addTask() {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const task = document.getElementById("task").value;
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.textContent = `${date} - ${time}: ${task}`;
    taskList.appendChild(li);
}

function generatePDF() {
    const taskList = document.getElementById("taskList").outerHTML;
    const content = `
        <html>
        <head>
            <title>To-Do List</title>
        </head>
        <body>
            <h1>To-Do List</h1>
            ${taskList}
        </body>
        </html>
    `;

    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todo.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
