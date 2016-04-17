var activity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var assetsPath = "";


function newLevel() {
    importSources();
}

function useItem(x, y, z, itemId, blockId, side) {
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
}