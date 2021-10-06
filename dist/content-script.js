const params = new URLSearchParams(window.location.search);

chrome.storage.local.set({ token: params.get('token') });