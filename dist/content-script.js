if (window.location.href.indexOf("localhost:3000/callback") > -1) {
	const params = new URLSearchParams(window.location.search);

	chrome.storage.local.set({ token: params.get('token') });

	window.close();
}