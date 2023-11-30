// jQuery 的文档就绪函数
$(function () {
    // 处理歌词滚动动画的变量
    var eqTimeTake = 0; // 动画的前一个时间位置
    let eqMarkTop; // 显示歌词的当前顶部位置

    // 使用 getLyrics 函数获取歌词数组
    var lyrics = getLyrics();

    // 初始化一个字符串，用于默认样式的列表项
    var lyricsfinl = '<ol>===</ol>';

    // 遍历歌词数组，为每个歌词创建列表项
    for (i = 0; i < lyrics.length; i++) {
        lyricsfinl += '<ol>' + lyrics[i].lyrics + '</ol>';
    }

    // 将生成的歌词 HTML 设置在具有类名 "lyp" 的段落中
    $(".lyp").html(lyricsfinl);

    // 音频 timeupdate 事件监听器，用于与音频播放同步歌词
    $(".songAudio").on("timeupdate", function () {
        // 获取音频的当前播放时间
        let currentTime = $(".songAudio")[0].currentTime;

        // 初始化用于跟踪当前歌词及其位置的变量
        let eqMark = 0;
        let lengthMax = lyrics.length - 1;

        // 寻找当前播放时间对应的歌词
        for (eqMark; eqMark <= lengthMax && lyrics[eqMark].time <= currentTime; eqMark++) { }

        // 重置所有歌词的透明度和字体大小
        $("ol").css("opacity", .5);
        $("ol").css("font-size", "20px");

        // 获取当前歌词的 jQuery 对象
        let olNow = $("ol").eq(eqMark);

        // 设置当前歌词的透明度和字体大小
        olNow.css("opacity", 1);
        olNow.css("font-size", "24px");

        // 计算当前歌词的顶部位置
        eqMarkTop = (eqMark - 1) * -40;

        // 如果顶部位置发生变化，使用动画滚动歌词
        if (eqTimeTake != eqMarkTop) {
            $(".lyp").animate({
                top: eqMarkTop + 'px',
            });
        }

        // 更新前一个时间位置的变量
        eqTimeTake = eqMarkTop;
    })
})
