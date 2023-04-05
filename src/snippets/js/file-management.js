let readFileOnFileInputChange = (elemId) => {
    let fileInput = document.getElementById(elemId);

    fileInput.addEventListener("change", async function () {
        let file = this.files[0];
        // let fileContent = await readFileContent(file);
    });
};

// let fileContent = await readFileContent(file);
const readFileContent = (file) => {
    return new Promise((res, rej) => {
        let reader = new FileReader();

        reader.readAsText(file, "UTF-8");
        reader.onload = (evt) => res(evt.target.result);
        reader.onerror = (evt) => rej(evt);
    });
};

// downloadFile("test.txt", "content");
function downloadFile(fileName, fileContent) {
    let element = document.createElement("a");

    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(fileContent)
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
