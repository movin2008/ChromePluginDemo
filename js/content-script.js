// contentScript.js
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("background send: ", message);
    sendResponse("前台收到.");
});

chrome.runtime.sendMessage("用户加载了新网址", function (response) {
    console.log("background response：" + response);
});

// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js';
	var inject = document.createElement('script');
	inject.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	inject.src = chrome.extension.getURL(jsPath);
	inject.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.body.appendChild(inject);
}

injectCustomJs();
console.log('content-script.js has loaded.');
