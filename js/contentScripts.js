chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // 初始化按钮组
    if (request.cmd == 'init') {
        var res = {
            code: true,
            replace: true,
            debug: true,
            clear: true,
            intention: true,
            condition: true
        }

        var codeBtn = document.getElementsByClassName('code-btn')
        if (codeBtn.length > 0) {
            if (codeBtn[0].style.display == 'block') {
                res.code = false
            }
        }
        var replaceBtn = document.getElementById('replaceBtn')
        if (replaceBtn) {
            res.replace = false
        }
        var debugWindow = document.getElementById('engineWindow')
        if (debugWindow) {
            res.debug = false
        }
        var clearImport = document.getElementById('clearImport20')
        if (clearImport) {
            res.clear = false
        }
        var featureSwitch = document.getElementById('featureSwitch')
        if (featureSwitch) {
            res.intention = false
        }
        var condition = window.localStorage.getItem('showCondition')
        if (condition) {
            res.condition = false
        }
        sendResponse(res);
    }

    // 源码模式指令
    if (request.cmd == 'code') {
        var codeBox = document.getElementsByClassName('code-btn')
        for (var i = 0; i < codeBox.length; i++) {
            if (codeBox[i].style.display === 'block') {
                codeBox[i].style.display = 'none'
            } else {
                codeBox[i].style.display = 'block'
            }
        }
        sendResponse('源码模式指令调用成功');
    }

    // 批量替换指令
    if (request.cmd == 'replace') {
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.innerHTML = 'if(window.batchreplace){if(window.batchreplace.replaceShow){window.batchreplace.hide()}else{window.batchreplace.show()}}';
        document.body.appendChild(newScript);
        document.body.removeChild(newScript);
        sendResponse('批量替换指令调用成功');
    }

    // 高级调试器指令
    if (request.cmd == 'debug') {
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.innerHTML = 'if(window.vue_debug){if(window.vue_debug.showDebugWindow){window.vue_debug.showDebugWindow=false}else{window.vue_debug.showDebugWindow=true}}';
        document.body.appendChild(newScript);
        document.body.removeChild(newScript);
        sendResponse('高级调试器指令调用成功');
    }

    // 清空导入
    if (request.cmd == 'clear') {
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.innerHTML = 'if(window.faq){if(window.faq.clearHide){window.faq.showClear()}else{window.faq.hideClear()}}';
        document.body.appendChild(newScript);
        document.body.removeChild(newScript);
        sendResponse('清空导入指令调用成功');
    }

    // 意图编辑
    if (request.cmd == 'featureSwitch') {
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.innerHTML = 'if(window.intentionSwitch){window.intentionSwitch()}';
        document.body.appendChild(newScript);
        document.body.removeChild(newScript);
        sendResponse('意图指令调用成功');
    }

    // 意图条件
    if (request.cmd == 'condition') {
        if(window.localStorage.getItem('showCondition')) {
            window.localStorage.removeItem('showCondition')
        } else {
            window.localStorage.setItem('showCondition','all')
        }
    }
});