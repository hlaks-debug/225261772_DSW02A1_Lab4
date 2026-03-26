document.addEventListener("DOMContentLoaded", () => {
  const pics = document.getElementById("pics");
  const favourites = document.getElementById("favorites");
  const actions = document.getElementById("actions");
  const counter = document.getElementById("counter");

  let selectionOrder = 0;

  pics.querySelectorAll("img").forEach(img => {
    img.title = img.alt.trim();
  });

    pics.querySelectorAll("img").forEach((img, index) => {
        const placeholder = document.createComment(`placeholder-${index}`);
        img.parentNode.insertBefore(placeholder, img.nextSibling);
        img.dataset.placeholderId = index; // store ID for later
    });


 pics.querySelectorAll("img").forEach((img, index) => {
    img.dataset.originalIndex = index;
    img.addEventListener("click", () => {
    if (favourites.contains(img)) {
      return;
    }
    if (!favourites.contains(img)) {
      selectionOrder = favourites.querySelectorAll("img").length + 1;
  
      favourites.appendChild(img);
      img.style.border = "3px solid green";

      const fileName = img.src.split("/").pop();
      const li = document.createElement("li");
      li.textContent = `Moved ${fileName} to favorites`;
      actions.appendChild(li);

      const remaining = pics.querySelectorAll("img").length; 
      if (remaining === 0) {
        alert("All images have been selected!");
      }
      else {
        alert(`Image ${index + 1} selected as favorite number ${selectionOrder}`);
      }   
      updateCounter();
    }
  });
});


favourites.addEventListener("click", (event) => {
  const img = event.target;
  if (img.tagName === "IMG") {
    img.style.border = "none";

    const fileName = img.src.split("/").pop();
    const li = document.createElement("li");
    li.textContent = `Reverted ${fileName} back to the main list`;
    actions.appendChild(li);

    const placeholderId = img.dataset.placeholderId;
    const placeholders = pics.childNodes;
    let targetPlaceholder = null;

    placeholders.forEach(node => {
    if (node.nodeType === Node.COMMENT_NODE && node.nodeValue === `placeholder-${placeholderId}`) {
    targetPlaceholder = node;
    }
    });

    if (targetPlaceholder) {
    pics.insertBefore(img, targetPlaceholder);
    selectionOrder = favourites.querySelectorAll("img").length;
    } else {
    pics.appendChild(img); 
    }
        updateCounter();
    }
});



  function updateCounter() {
    const remaining = pics.querySelectorAll("img").length;
    counter.textContent = `Remaining images: ${remaining}`;
    if (remaining === 0) {
      alert("All images have been selected!");
    }
  }

  updateCounter();
});
