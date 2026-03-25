const expected = document.getElementById("expected");
const actual = document.getElementById("actual");
const compareBtn = document.getElementById("compare-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("result");

compareBtn.addEventListener("click", compareTexts);
clearBtn.addEventListener("click", clearAll);

function compareTexts() {
    result.innerHTML = "";
    result.className = "";

    if (expected.value.trim() === "" || actual.value.trim() === "") {
        const li = document.createElement("li");
        li.textContent = "Please enter text in both areas.";
        result.appendChild(li);
        return;
    }

    const expectedLines = expected.value.split("\n");
    const actualLines = actual.value.split("\n");

    let hasDifference = false;
    let diffCount = 1;

    const minLength = Math.min(expectedLines.length, actualLines.length);

    for (let i = 0; i < minLength; i++) {
        if (expectedLines[i] !== actualLines[i]) {
            hasDifference = true;

            const li = document.createElement("li");
            li.textContent =
                diffCount + ". Line " + (i + 1) + ":\n" +
                "   < " + expectedLines[i] + "\n" +
                "   > " + actualLines[i];

            result.appendChild(li);
            diffCount++;
        }
    }

    if (expectedLines.length !== actualLines.length) {
        hasDifference = true;

        const li = document.createElement("li");
        li.textContent = diffCount + ". Lengths differ :" +
            "  < " + expectedLines.length + " ," +
            "  > " + actualLines.length;
        result.appendChild(li);

        diffCount++;
    }

    if (!hasDifference) {
        const ul = document.createElement("ul");  
        ul.style.listStyleType = "disc";  
        ul.style.paddingLeft = "20px";     
        ul.className = "nochange";         

        const li = document.createElement("li");
        li.textContent = "No differences found";

        ul.appendChild(li);
        result.appendChild(ul);
    }
    else {
        result.className = "change";
        const header = document.createElement("li");
        header.textContent = "Texts are different";
        result.insertBefore(header, result.firstChild);
    }
}

function clearAll() {
    expected.value = "";
    actual.value = "";
    result.innerHTML = "";
}