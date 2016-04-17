var activity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var assetsPath = "";


function newLevel() {
    importSources();
}

function useItem(x, y, z, itemId, blockId, side) {
    activity.runOnUiThread(new java.lang.Runnable() {
        run: function() {
            try {
                var infoWindow = GUI.slidingWindow.getInstance(4, "Hello world!", "Window,window,window!");
                infoWindow.show();
            } catch (error) {
                clientMessage(error);
            }
        }
    });
}

//-------セットアップ-------

function importSources() {
    activity.runOnUiThread(new java.lang.Runnable() {
        run: function() {
            try {
                var sourcesPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang";
                new java.io.File(sourcesPath).mkdir();

                var zipOutputDir = new java.io.File(sourcesPath, "source");
                var zipFile = new java.io.File(sourcesPath, "source.zip");
                var sourceFile = new java.io.File(sourcesPath);
                assetsPath = zipOutputDir.getAbsolutePath();

                var progressDialog = new android.app.ProgressDialog(activity);
                progressDialog.setTitle("処理中");
                progressDialog.setMessage("しばらくお待ちください");
                progressDialog.setProgressStyle(android.app.ProgressDialog.STYLE_SPINNER);
                progressDialog.setCancelable(false);
                progressDialog.show();

                //遅いzip解凍などの処理はThreadで
                new java.lang.Thread(new java.lang.Runnable({
                    run: function() {

                        //sourceフォルダがなければ
                        if (!zipOutputDir.exists()) {
                            downloadFileFromUrl("https://drive.google.com/uc?export=download&id=0B--Q9jIEQq-KRkxhek1aUXpjdWs", zipFile);
                            sourceFile.mkdir();
                            extractZip(zipFile, sourceFile, 4);
                        }

                        progressDialog.dismiss();

                        GUI.setup();
                    }
                })).start();
            } catch (error) {
                clientMessage(error);
            }
        }
    });
}

var GUI = {
    guiImage: null,
    minecraftTextView: null,
    slidingWindow: {
        rootWindow: null,
        getInstance: null
    },
    setup: function() {
        var self = this;
        activity.runOnUiThread(new java.lang.Runnable() {
            run: function() {
                try {
                    self.guiImage = function() {
                        var that = {};
                        that.path = assetsPath + "/assets/images/gui/gui.png";
                        that.originBitmap = android.graphics.BitmapFactory.decodeFile(that.path);
                        that.members = {
                            achievement_window: function() {
                                var params = {};
                                params.startX = 130;
                                params.startY = 106;
                                params.sizeX = 120;
                                params.sizeY = 32;
                                params.bitmap = android.graphics.Bitmap.createBitmap(
                                    that.originBitmap, params.startX, params.startY, params.sizeX, params.sizeY
                                );
                                return params;
                            },
                            achievement_icons: function() {
                                var my = {};
                                var parentStartX = 0;
                                var parentStartY = 184;
                                var iconSizeX = 18;
                                var iconSizeY = 18;
                                var icons = [
                                    ["Speed", "Slowness", "Haste", "Mining_Fatigue", "Strength", "Weakness", "Poison", "Regeneration"],
                                    ["Invisibility", "Hunger", "Jump_Boost", "Nausea", "Night_Vision", "Blindness", "Resistance", "Fire_Resistance"],
                                    ["Water_Breathing", "Wither", "Yellow_Heart"]
                                ];
                                for (var cy = 0; cy < icons.length; cy++) {
                                    for (var cx = 0; cx < icons[cy].length; cx++) {
                                        var iconName = icons[cy][cx];
                                        my[iconName] = function() {
                                            var params = {};
                                            params.startX = parentStartX + (iconSizeX * cx);
                                            params.startY = parentStartY + (iconSizeY * cy);
                                            params.sizeX = iconSizeX;
                                            params.sizeY = iconSizeY;
                                            params.bitmap = android.graphics.Bitmap.createBitmap(
                                                that.originBitmap, params.startX, params.startY, params.sizeX, params.sizeY
                                            );
                                            return params;
                                        }();
                                    }
                                }
                                return my;
                            }

                        };
                        return that;
                    }();

                    self.minecraftTextView = function(colorStr, size, droppingShadow) {
                        var my = {};
                        var frame = new android.widget.FrameLayout(activity);
                        var mainText = new android.widget.TextView(activity);
                        var minecraftFont = android.graphics.Typeface.createFromFile(assetsPath + "/font/minecraftia.ttf");
                        mainText.setTypeface(minecraftFont);
                        var textColor = android.graphics.Color.parseColor(colorStr)
                        mainText.setTextColor(textColor);
                        mainText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
                        if (droppingShadow) {
                            var shadowText = new android.widget.TextView(activity);
                            shadowText.setTypeface(minecraftFont);
                            var shadowColor = android.graphics.Color.rgb(
                                android.graphics.Color.red(textColor) * 0.25,
                                android.graphics.Color.green(textColor) * 0.25,
                                android.graphics.Color.blue(textColor) * 0.25
                            );
                            shadowText.setTextColor(shadowColor);
                            shadowText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
                            shadowText.setPadding(size / 8, size / 8, 0, 0);
                        }
                        my.setText = function(str) {
                            mainText.setText(str);
                            if (droppingShadow) {
                                shadowText.setText(str);
                            }
                        };
                        my.setPadding = function(left, top, right, bottom) {
                            frame.setPadding(left, top, right, bottom);
                        }
                        my.getRootView = function() {
                            return frame;
                        }
                        if (droppingShadow) {
                            frame.addView(shadowText);
                        }
                        frame.addView(mainText);
                        return my;
                    };

                    self.slidingWindow.rootWindow = function() {
                        var rootLayout = new android.widget.FrameLayout(activity);
                        var rootLayoutParams = new android.widget.LinearLayout.LayoutParams(
                            android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
                            android.widget.LinearLayout.LayoutParams.MATCH_PARENT
                        );
                        rootLayoutParams.gravity = (android.view.Gravity.RIGHT | android.view.Gravity.TOP);
                        rootLayout.setLayoutParams(rootLayoutParams);
                        rootLayout.setClickable(false);

                        var rootWindow = new android.widget.PopupWindow();
                        rootWindow.setContentView(rootLayout);
                        rootWindow.setWidth(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                        rootWindow.setHeight(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                        rootWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                        rootWindow.showAtLocation(activity.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
                        return rootLayout;
                    }();

                    self.slidingWindow.getInstance = function(size, title, message) {
                        var that = this,
                            my = {},
                            achievement_window = self.guiImage.members.achievement_window(),
                            achievement_icons = self.guiImage.members.achievement_icons(),
                            width = achievement_window.sizeX * size,
                            height = achievement_window.sizeY * size,
                            textSize = 8 * size;

                        var frameImageBitmap = android.graphics.Bitmap.createScaledBitmap(
                            achievement_window.bitmap, width, height, false);
                        var frameImage = new android.widget.ImageView(activity);
                        frameImage.setImageBitmap(frameImageBitmap);

                        var titleText = GUI.minecraftTextView("#ffff00", textSize, false);
                        titleText.setText(title);
                        titleText.setPadding(textSize, 0, 0, 0);

                        var messageText = GUI.minecraftTextView("#ffffff", textSize, false);
                        messageText.setText(message);
                        messageText.setPadding(textSize, 0, 0, 0);

                        var textsLayout = new android.widget.LinearLayout(activity);
                        textsLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
                        textsLayout.setGravity(android.view.Gravity.CENTER_VERTICAL);
                        textsLayout.addView(titleText.getRootView());
                        textsLayout.addView(messageText.getRootView());

                        var windowLayout = new android.widget.FrameLayout(activity);
                        var windowLayoutParams = new android.widget.LinearLayout.LayoutParams(
                            android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
                            android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
                        );
                        windowLayout.setLayoutParams(windowLayoutParams);
                        windowLayout.addView(frameImage);
                        windowLayout.addView(textsLayout);

                        var inAnim = function() {
                            var anim = new android.view.animation.TranslateAnimation(0, 0, -height, 0);
                            anim.setDuration(500);
                            return anim;
                        };

                        var waitAnim = function() {
                            var anim = new android.view.animation.TranslateAnimation(0, 0, 0, 0);
                            anim.setDuration(1000);
                            return anim;
                        };

                        var outAnim = function() {
                            var anim = new android.view.animation.TranslateAnimation(0, 0, 0, -height);
                            anim.setDuration(500);
                            return anim;
                        };

                        my.show = function() {
                            var inAnimation = inAnim();
                            var waitAnimation = waitAnim();
                            var outAnimation = outAnim();

                            inAnimation.setAnimationListener(new android.view.animation.Animation.AnimationListener({
                                onAnimationEnd: function(anim) {
                                    windowLayout.startAnimation(waitAnimation);
                                }
                            }));

                            waitAnimation.setAnimationListener(new android.view.animation.Animation.AnimationListener({
                                onAnimationEnd: function(anim) {
                                    windowLayout.startAnimation(outAnimation);
                                }
                            }));

                            outAnimation.setAnimationListener(new android.view.animation.Animation.AnimationListener({
                                onAnimationEnd: function(anim) {
                                    that.rootWindow.removeView(windowLayout);
                                    windowLayout.setVisibility(android.view.View.GONE);
                                }
                            }));

                            that.rootWindow.addView(windowLayout);
                            windowLayout.startAnimation(inAnimation);
                        };

                        return my;
                    }
                } catch (error) {
                    clientMessage(error);
                }
            }
        });
    }
};
//-------ファイル関連-------

function copyFile(inputFile, outputFile) {
    var input =
        (new java.io.FileInputStream(inputFile))
        .getChannel();
    var output =
        (new java.io.FileOutputStream(outputFile))
        .getChannel();
    output.transferFrom(input, 0, input.size());
}

function extractZip(inputZipFile, outPutDir, bufferLevel) {
    try {
        var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024 * bufferLevel);
        var zis = new java.util.zip.ZipInputStream(new java.io.FileInputStream(inputZipFile));
        var entry;

        while ((entry = zis.getNextEntry()) != null) {
            clientMessage(entry.getName());
            var entryFile = new java.io.File(outPutDir.getAbsolutePath(), entry.getName());
            if (entry.isDirectory()) {
                entryFile.mkdirs();
            } else {
                if (entryFile.getParentFile() != null &&
                    !entryFile.getParentFile().exists()) {
                    entryFile.getParentFile().mkdirs();
                }

                if (!entryFile.exists()) {
                    entryFile.createNewFile();
                }

                var fout = new java.io.FileOutputStream(entryFile);

                var count;
                while ((count = zis.read(buffer)) != -1) {
                    fout.write(buffer, 0, count);
                }

                fout.close();
            }

            zis.closeEntry();
        }
        return true;

    } catch (e) {
        clientMessage(e);
        return false;
    }
}

//-------ネット関連-------

function downloadFileFromUrl(downloadUrl, outputFile) {
    outputFile.createNewFile();

    var url = new java.net.URL(downloadUrl);
    var input = new java.io.BufferedInputStream(url.openStream());

    var fout = new java.io.FileOutputStream(outputFile);

    var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024 * 4);
    var count;
    while ((count = input.read(buffer, 0, 1024 * 4)) != -1) {
        fout.write(buffer, 0, count);
    }
}
