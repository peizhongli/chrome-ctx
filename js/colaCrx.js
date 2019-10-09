var bg = chrome.extension.getBackgroundPage();
window.onload = function() {
    init()
    var codeWrap = document.getElementById("codeWrap"); // 源码模式
    var replaceWrap = document.getElementById("replaceWrap"); // 批量替换
    var debugWrap = document.getElementById("debugWrap"); // 高级调试器
    var clearWrap = document.getElementById("clearWrap"); // 清空导入
    var test1 = document.getElementById("test1"); // 第一套
    var test2 = document.getElementById("test2"); // 第二套
    var test3 = document.getElementById("test3"); // 第三套
    var prd = document.getElementById("prd"); // 生产

    // 点击源码模式
    codeWrap.onclick = function() {
            openFn('code')
            sendMessageToContentScript({ cmd: 'code', value: '源码模式' }, function(response) {
                console.log('来自content的回复：' + response);
            });
        }
        // 点击批量替换
    replaceWrap.onclick = function() {
            openFn('replace')
            sendMessageToContentScript({ cmd: 'replace', value: '批量替换' }, function(response) {
                console.log('来自content的回复：' + response);
            });
        }
        // 点击高级调试器
    debugWrap.onclick = function() {
            openFn('debug')
            sendMessageToContentScript({ cmd: 'debug', value: '高级调试器' }, function(response) {
                console.log('来自content的回复：' + response);
            });
        }
        // 点击清空导入
    clearWrap.onclick = function() {
        openFn('clear')
        sendMessageToContentScript({ cmd: 'clear', value: '清空导入' }, function(response) {
            console.log('来自content的回复：' + response);
        });
    }

    // 第一套
    test1.onclick = function() {
            chrome.tabs.create({ url: 'http://robot.servicetest.lenovo/' });
        }
        // 第二套
    test2.onclick = function() {
            chrome.tabs.create({ url: 'http://robot2.xiqu.servicetest.lenovo/' });
        }
        // 第三套
    test3.onclick = function() {
            chrome.tabs.create({ url: 'http://robot3.xiqu.servicetest.lenovo/' });
        }
        // 生产
    prd.onclick = function() {
        chrome.tabs.create({ url: 'http://x.lenovo.com.cn' });
    }

    // 初始化按钮组
    function init() {
        sendMessageToContentScript({ cmd: 'init', value: 'code' }, function(res) {
            if (res.code) {
                codeWrap.className = 'switch-wrap close'
            } else {
                codeWrap.className = 'switch-wrap open'
            }
            if (res.replace) {
                replaceWrap.className = 'switch-wrap close'
            } else {
                replaceWrap.className = 'switch-wrap open'
            }
            if (res.debug) {
                debugWrap.className = 'switch-wrap close'
            } else {
                debugWrap.className = 'switch-wrap open'
            }
            if (res.clear) {
                clearWrap.className = 'switch-wrap close'
            } else {
                clearWrap.className = 'switch-wrap open'
            }
        });
    }

    // 开关功能
    function openFn(type) {
        var element = document.getElementById(type + "Wrap")
        if (element.className.indexOf('open') > -1) {
            element.className = 'switch-wrap close'
        } else {
            element.className = 'switch-wrap open'
        }
    }

    // 和content.js通信(注意content与页面共享一个dom 但是不共享js环境))
    function sendMessageToContentScript(message, callback) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                if (callback) callback(response);
            });
        });
    }
}