# MCPE-GUI-Packages

## 概要
MCPEの標準GUIを呼び出せる組み込みMODです。

### バージョン情報
[リリースノート](https://github.com/Innsbluck-Redhat/MCPE-GUI-Packages/blob/master/RELEASENOTE.md "RELEASENOTE.md") を参照してください。

### 使用方法
GUI_Packages.jsの内容を使用したいMODの最後尾に追加してください。

### 現在実装されているGUI

* text
  ![text](https://github.com/Innsbluck-Redhat/MCPE-GUI-Packages/blob/master/Images/text.png)

  ```js
    GUI.runUiCode(function() {
        var infoText = GUI.text.create({
            size: 4,
            text: "It is text",
            textColor: "#ffff00",
            droppingShadow: true,
            xOffset: 150,
            yOffset: 200,
            gravity: (GUI.gravity.CENTER_HORIZONTAL | GUI.gravity.TOP)
        });
        infoText.show();
    }, this);
  ```

* SlidingWindow

  ![SlidingWindow](https://github.com/Innsbluck-Redhat/MCPE-GUI-Packages/blob/master/Images/SlidingWindow.png)

  ```js
    GUI.runUiCode(function() {
                var infoWindow = GUI.slidingWindow.create({
                    size: 4,
                    title: "Hello world!",
                    message: "window!",
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
    }, this);
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