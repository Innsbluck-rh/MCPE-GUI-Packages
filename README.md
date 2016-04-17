# MCPE-GUI-Package
*ver 0.0.1*

## 概要
MCPEのGUIを簡単なコードで呼び出せる組み込みMODです。

### 使用方法
GUI_Packages.jsの内容を使用したいMODの最後尾に追加してください。

### 現在実装されているGUI  
・SlidingWindow
![SlidingWindow](https://github.com/Innsbluck-Redhat/MCPE-GUI-Packages/blob/master/Images/SlidingWindow.png)
    
    activity.runOnUiThread(new java.lang.Runnable() {
        run: function() {
            try {
                var itemInfoWindow = GUI.slidingWindow.getInstance(4, "Hello world!", "Window,window,window!");
                itemInfoWindow.show();
            } catch (error) {
                clientMessage(error);
            }
        }
    });