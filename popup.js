document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['highlights'], function (result) {
      const highlights = result.highlights || [];
      const list = document.getElementById('highlights-list');
      list.innerHTML = '';
      highlights.forEach((highlight, index) => {
        const li = document.createElement('li');
        li.textContent = highlight;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
          highlights.splice(index, 1);
          chrome.storage.local.set({ 'highlights': highlights });
          li.remove();
        };
        li.appendChild(deleteButton);
        list.appendChild(li);
      });
    });
  });
  