# MCPE-GUI-Packages

## 概要
MCPEの標準GUIを呼び出せる組み込みMODです。

### 現在のバージョン
`0.0.1`

### 使用方法
GUI_Packages.jsの内容を使用したいMODの最後尾に追加してください。

### 現在実装されているGUI

* SlidingWindow

  ![SlidingWindow](https://github.com/Innsbluck-Redhat/MCPE-GUI-Packages/blob/master/Images/SlidingWindow.png)

  ```js
  activity.runOnUiThread(new java.lang.Runnable() {
        run: function() {
            try {
                var infoWindow = GUI.slidingWindow.create({
                    size: 4,
                    title: "Hello world!",
                    message: "Window,window,window!",
                    horizontal_gravity: GUI.gravity.RIGHT
                });
                infoWindow.show();
                /*
                GUI.slidingWindow.create({
                    size: 4,
                    title: "Hello world!",
                    message: "Window,window,window!",
                    horizontal_gravity: GUI.gravity.RIGHT
                }).show();
                */
            } catch (error) {
                clientMessage(error);
            }
        }
    });
  ```

### 未実装
・Text  
・Button  
・ItemSlot  
・SelectableItemSlots  
・Window

順次追加されます。

## Copyright
(C) 2016 Innsbluck-Redhat