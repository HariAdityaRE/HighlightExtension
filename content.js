document.addEventListener('mouseup', function () {
    let selectedText = window.getSelection().toString();
    if (selectedText) {
      const popup = document.createElement('div');
      popup.style.position = 'absolute';
      popup.style.zIndex = '10000';
      popup.style.backgroundColor = '#fff';
      popup.style.border = '1px solid #ddd';
      popup.style.padding = '15px';
      popup.style.borderRadius = '8px';
      popup.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
      popup.style.maxWidth = '300px';
      popup.style.wordWrap = 'break-word';
      popup.style.fontFamily = 'Arial, sans-serif';
      popup.style.fontSize = '14px';
      popup.style.color = '#333';
  
      const trimmedText = selectedText.length > 100 ? selectedText.substring(0, 100) + '...' : selectedText;
      popup.textContent = trimmedText;

      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.justifyContent = 'space-between';
      buttonContainer.style.marginTop = '10px';
  
      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.style.padding = '8px 16px';
      saveButton.style.cursor = 'pointer';
      saveButton.style.backgroundColor = '#4CAF50';
      saveButton.style.color = '#fff';
      saveButton.style.border = 'none';
      saveButton.style.borderRadius = '5px';
      saveButton.style.transition = 'background-color 0.3s';
  
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.style.padding = '8px 16px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.backgroundColor = '#f44336';
      closeButton.style.color = '#fff';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '5px';
      closeButton.style.transition = 'background-color 0.3s';
  
      saveButton.onmouseover = () => saveButton.style.backgroundColor = '#45a049';
      saveButton.onmouseout = () => saveButton.style.backgroundColor = '#4CAF50';
      closeButton.onmouseover = () => closeButton.style.backgroundColor = '#e53935';
      closeButton.onmouseout = () => closeButton.style.backgroundColor = '#f44336';
  
      buttonContainer.appendChild(saveButton);
      buttonContainer.appendChild(closeButton);
      popup.appendChild(buttonContainer);
  
      const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      popup.style.top = `${rect.top + window.scrollY - 50}px`;
      popup.style.left = `${rect.left + window.scrollX}px`;
  
      document.body.appendChild(popup);
  
      function removePopup() {
        if (popup) {
          popup.remove();
        }
      }

      window.getSelection().removeAllRanges();

      saveButton.addEventListener('click', function () {
        chrome.storage.local.get(['highlights'], function (result) {
          let highlights = result.highlights || [];
          highlights.push(selectedText);
          chrome.storage.local.set({ 'highlights': highlights });
        });
        removePopup();
      });
  
      closeButton.addEventListener('click', function () {
        removePopup();
      });
    }
  });
  