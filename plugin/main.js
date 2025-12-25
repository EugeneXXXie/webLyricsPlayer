$(function () {
    const lyrics = getLyrics();
    const $wrapper = $(".lyrics-wrapper");
    let lastIndex = -1; // 记录上一行索引

    // 1. 初始化渲染歌词
    function initLyrics() {
        const htmlString = lyrics.map(item => `<ol>${item.lyrics}</ol>`).join('');
        $wrapper.html(htmlString);
    }

    initLyrics();

    // 2. 监听音频播放进度
    $(".songAudio").on("timeupdate", function () {
        const currentTime = this.currentTime;

        // 查找当前应该播放哪一行
        // 原理：找到最后一个时间小于等于当前时间的元素索引
        let currentIndex = lyrics.findIndex((item, i) => {
            return currentTime >= item.time && (!lyrics[i + 1] || currentTime < lyrics[i + 1].time);
        });

        // 3. 性能优化：只有当行数改变时才执行动画
        if (currentIndex !== lastIndex && currentIndex !== -1) {
            
            // 更新样式
            const $allLines = $wrapper.find("ol");
            $allLines.removeClass("active");
            const $currentLine = $allLines.eq(currentIndex);
            $currentLine.addClass("active");

            // 计算滚动位置：
            // 每一行高度50px，为了让当前行居中：
            // 初始偏移(180px) - (当前索引 * 50px)
            const rowHeight = 50;
            const containerCenter = 180; 
            const newTop = containerCenter - (currentIndex * rowHeight);

            // 使用 CSS transition 配合 jQuery 修改 top
            $wrapper.css("top", newTop + "px");

            lastIndex = currentIndex;
        }
    });

    // 4. 进度条拖动同步（seeked 事件）
    $(".songAudio").on("seeked", function() {
        lastIndex = -1; // 重置索引，强制触发一次歌词重定位
    });
});