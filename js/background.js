// background.js https://github.com/sxei/chrome-plugin-demo
chrome.runtime.onInstalled.addListener(function () {
    console.log("插件安装成功.");
	// storage中设置值
    chrome.storage.sync.set({ color: "#3aa757" }, function () {
        // storage init color value
    });
	
	chrome.storage.onChanged.addListener(function (changes, namespace) {
	  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		console.log('Storage key "${key}" in namespace "${namespace}" changed.', 'Old value was "${oldValue}", new value is "${newValue}".');
	  }
	});
	
	chrome.tabs.onActiveChanged.addListener(function (tabId) {
		console.log("onActiveChanged tabId: " + tabId);
		window.tabId = tabId;
	});
	
    chrome.tabs.onActivated.addListener(function (tab) {
		console.log("onActivated: " + JSON.stringify(tab));
	});
		
	chrome.tabs.onCreated.addListener(function (tab) {
		console.log("onCreated url: " + JSON.stringify(tab));
	});
	
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("content sender：", JSON.stringify(sender));
    console.log("content send：", message);
    sendResponse("后台收到，用户加载的是[" + sender.url + "]");
	
	chrome.tabs.sendMessage(window.tabId, "页面加载完成.", function (response) {
		console.log("content response: " + response);
	});
});

chrome.browserAction.setTitle({ title: "This is Tooltip title." });

chrome.browserAction.setBadgeText({ text: "1" });
//chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
//chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});

chrome.contextMenus.create({
	title: '使用度娘搜索：%s', // %s表示选中的文字
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params) {
		chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
	}
});

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	
	console.log("onBeforeRequest " + JSON.stringify(details));
	
	return {redirectUrl: chrome.extension.getURL("js/hacked.js")};
},{
	// hackjac this script to fuck log it
	urls: ["https://player.polyv.net/jssdk/polyv-chatroom.min.js"],
	types: ["script"]
},[
	"blocking"
]);

window.setTimeout(function() {
	console.log("this is timeout job.");
	chrome.browserAction.setBadgeText({ text: "" });
	chrome.notifications.create(null, {
	    type: "basic",
	    iconUrl: "images/logo.png",
	    title: "喝水小助手",
	    message: "看到此消息的人可以和我一起来喝一杯水",
	});
}, 1000 * 9);


