

$(function () {
    // var topheight = document.getElementById('top').clientHeight;
    // var bottomheight = document.getElementById('bottom').clientHeight;
    // console.log("botton"+bottomheight)
    // var bodyheight = document.documentElement.clientHeight;
    // var musiclist = document.getElementById('music-list');
    // console.log((bodyheight - topheight - bottomheight)/3.75)
    // musiclist.style.height = (bodyheight - topheight - bottomheight)/3.75+"vw";
    // document.getElementById('playing').style.height = (bodyheight - topheight - bottomheight)/3.75+"vw";
    // console.log("height"+document.documentElement.clientHeight)
    var current_music_name = document.getElementById('current-music-name');
    var current_music_time = document.getElementById('current-music-time');
    var audio = document.getElementById('audio');
    var music_play_btn = document.getElementById('music-play-btn');
    var play_progress_box = document.getElementById('play-progress-box');
    var play_progress = document.getElementById('play-progress');
    var play_progress_point = document.getElementById('play-progress-point');
    var volume_box = document.getElementById('music-control-volume-box');
    var volume_progress = document.getElementById("music-control-volume-progress");
    var volume_point = document.getElementById('music-control-volume-progress-point');

    var musis = ['a', 'b'];

    var musics = [{
        path: "music/房东的猫-云烟成雨.mp3",
        name: "云烟成语-房东的猫",
        auth: "房东的猫",
        lrc: "lrc/yunyanchengyu.lrc",
        photo: "img/yunyanchengyu.jpg"
    }, {
        path: "music/Olly Murs-That Girl.mp3",
        name: "Olly Murs-That Girl",
        auth: "Olly Murs",
        lrc: "lrc/thatgirl.lrc",
        photo: "img/thatgirl.jpg"
    }, {
        path: "music/可能否-鹿予.mp3",
        name: "可能否-鹿予",
        auth: "鹿予",
        lrc: "lrc/kenengfou.lrc",
        photo: "img/kenengfou.jpg"
    },
        {
            path: "music/说散就散-JC.mp3",
            name: "说散就散-JC",
            auth: "JC",
            lrc: "lrc/shuosanjiusan.lrc",
            photo: "img/shuosanjiusan.jpg"
        },
        {
            path: "music/体面-于文文.mp3",
            name: "体面-于文文",

            lrc: "lrc/timian.lrc",
            auth: "于文文",
            photo: "img/timian.jpg"
        },
        {
            path: "music/往后余生-马良.mp3",
            name: "往后余生-马良",

            lrc: "lrc/wanghouyusheng.lrc",
            auth: "马良",
            photo: "img/wanghouyusheng.jpg"
        },
        {
            path: "music/周杰伦-晴天.mp3",
            name: "周杰伦-晴天",

            lrc: "lrc/qingtian.lrc",
            auth: "周杰伦",
            photo: "img/qingtian.jpg"
        },

        {
            path: "music/任然-空空如也.mp3",
            name: "任然-空空如也",

            lrc: "lrc/kongkongruye.lrc",
            auth: "空空如也",
            photo: "img/kongkongruye.jpg"
        }
    ]
    var isplay = false;
    var lrcs = [];
    function setmusiclrc(url) {


        var request = new XMLHttpRequest();

        request.open('GET', url, true);

        request.responseType = 'text';

        request.onload = function () {

            var lyric = request.response;

            var lrc = lyric.split('\n');
            for (var i = 0; i < lrc.length; i++) {
                var t = lrc[i].split(']');
                lrcs[i] = t[0].split('[')[1] + "," + t[1];
                // console.log(lrcs[i])
            }
        };

        request.send();

    }


    audio.addEventListener("timeupdate", function () {

        var duration = Math.floor(audio.duration);
        var curtime = Math.floor(audio.currentTime);
        var rate = curtime / duration;
        var s = duration % 60;
        var m = Math.floor(duration / 60);
        var s1 = curtime % 60;
        var m1 = Math.floor(curtime / 60);
        var str = "";
        str = str + (m1 < 10 ? '0' + m1 : m1) + ":" + (s1 < 10 ? "0" + s1 : s1) + "/";
        str = str + (m < 10 ? '0' + m : m) + ":" + (s < 10 ? "0" + s : s);
        current_music_time.innerText = str;
        var maxleft = play_progress_box.clientWidth / 3.75;
        play_progress.style.width = maxleft * rate + "vw";
        play_progress_point.style.left = maxleft * rate + "vw";

        for (var i = 0; i < lrcs.length; i++) {

            if (audio.currentTime > getSecends(lrcs[i].split(',')[0])) {
                document.getElementById('lrc')
                    .innerText = lrcs[i].split(',')[1];
            }
        }
        if (audio.ended) {
            setnextmusic();
        }

    })

    function getSecends(time) {

        var minute = parseInt(time.split(":")[0]);
        var secend = parseInt(time.split(':')[1]);
        var milliSecend = parseInt(time.split(".")[1]);

        return milliSecend / 1000 + secend + minute * 60;
    }

    function setnextmusic() {
        var index = getcurrentmusicindex();
        if ($('.menu').find('#randplay').hasClass('fa-random')) {
            var i = (Math.floor(Math.random() * (musics.length - 1)) + 1) % musics.length
            if (i == index) {
                setCurrentMusic((i + 1) % musics.length)
            } else {
                setCurrentMusic(i)
            }
        } else if ($('.menu').find('#randplay').hasClass('fa-close')) {
            setCurrentMusic(index)
        } else {
            setCurrentMusic((index + 1) % musics.length)
        }
        showplaying();
    }

    function setforwardmusic() {
        var index = getcurrentmusicindex();
        if ($('.menu').find('#randplay').hasClass('fa-random')) {
            var i = (Math.floor(Math.random() * (musics.length - 1)) + 1) % musics.length
            if (i == index) {
                setCurrentMusic((i - 1) % musics.length)
            } else {
                setCurrentMusic(i)
            }
        } else if ($('.menu').find('#randplay').hasClass('fa-close')) {
            setCurrentMusic(index)
        } else {
            setCurrentMusic((index - 1 + musis.length) % musics.length)
        }
        showplaying();
    }

    function getcurrentmusicindex() {
        var path = $('#audio').attr("src");
        for (var i = 0; i < musics.length; i++) {
            if (path == musics[i].path) {
                return i;
            }
        }
    }
     function showplaying(){
         var music = musics[getcurrentmusicindex()];
         $('#playing .title marquee').text(music.name)
         $('.playing-photo img').attr('src',music.photo);
         setmusiclrc(music.lrc);

     }
    $("#show-playing").click(function () {
   showplaying();
         $("#playing").show();
    })
    $("#music-control-img").click(function () {
          showplaying();
         $("#playing").show();
    })

    $('#hide-playing').click(function () {
        $('#playing').hide()
    })
//控制播放暂停
    music_play_btn.onclick = function a() {
        if (isplay) {
            pausemusic();
        } else {
            playmusic();
        }
        isplay = !isplay;
    }
//控制上一首
    document.getElementById('music-backward').onclick = function () {
        setnextmusic();
    }
//控制下一首
    document.getElementById('music-forward').onclick = function () {
        setforwardmusic();
    }
    $('.menu:has("#randplay")').click(function () {
        if ($(this).find('#randplay').hasClass('fa-random')) {
            $(this).find('#randplay').removeClass('fa-random').addClass('fa-retweet');
            $(this).find('p').text("顺序播放");
        } else if ($(this).find('#randplay').hasClass('fa-retweet')) {
            $(this).find('#randplay').removeClass('fa-retweet').addClass('fa-close');
            $(this).find('p').text("单曲循环");
        } else {
            $(this).find('#randplay').removeClass('fa-close').addClass('fa-random');
            $(this).find('p').text("随机播放");
        }

    })
    // $('#play-progress-box').mousedown( function (e) {
        $('#play-progress-box').bind("mousedown",function (e) {
        var event = e || window.event;
        console.log('点击')
        var leftVal = event.clientX / 3.75 - this.offsetLeft / 3.75 - play_progress_point.clientWidth / 7.5;
        play_progress.style.width = leftVal + "vw";
        play_progress_point.style.left = leftVal + "vw";
        console.log(leftVal)
        var changerate = (leftVal + play_progress_point.clientWidth / 7.5) / (this.clientWidth / 3.75);
        audio.currentTime = changerate * audio.duration;

    });


    volume_box.onmousedown = function (e) {
        var event = e || window.event;
        var leftVal = event.clientX / 3.75 - this.offsetLeft / 3.75 - play_progress_point.clientWidth / 7.5;
        var changerate = (leftVal + play_progress_point.clientWidth / 7.5) / (this.clientWidth / 3.75);
        volume_progress.style.width = leftVal + "vw";
        volume_point.style.left = leftVal + "vw";
        audio.volume = changerate;
    }


    for (var i = 0; i < musics.length; i++) {
        var music = ' <div class="music">\n' +
            '        <p  class="music-name">' + musics[i].name + '</p>\n' +
            '        <p  class="music-index">' + (i + 1) + '</p>\n' +
            '        <p   class="music-auth">' + musics[i].auth + '</p>\n' +
            '    </div>';
        $('#music-list').append(music);
    }
    $('.music').click(function () {
        var index = $(this).find(".music-index").text() - 1;
        console.log(index)
        setCurrentMusic(index)
    });

    function playmusic() {
        audio.play();
        $(".playing-photo img").css("animationPlayState" ,'running');
        music_play_btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';

    }
    $(".playing-photo img").css("animationPlayState" ,'paused');
    function pausemusic() {

        $(".playing-photo img").css("animationPlayState" ,'paused');
        audio.pause();
        music_play_btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';

    }

    function setCurrentMusic(index) {
        $('#audio').attr('src', musics[index].path)
        $('#current-music-name').text(musics[index].name);
        $('.music-control-img').find('img')
            .attr('src', musics[index].photo);
        playmusic();
    }

    //下载
    $('#download').click(function () {
        var index = getcurrentmusicindex();
        console.log(index)
        $("#music_down").attr('href', musics[index].path)
            .attr('download', musics[index].name);
    })


    // volume_point.onmousedown = function (e) {
//     var event = e || window.event;
//     var constant = event.clientX/3.75 - this.offsetLeft/3.75;
//     document.onmousemove = function (event) {
//         var event = event || window.event;
//         // clientx 获取鼠标的位置
//         var leftVal = event.clientX/3.75 - constant;
//         var maxleft = play_progress_box.clientWidth/3.75;
//         var changerate = (leftVal + this.clientWidth/7.5)/maxleft;
//         if (leftVal <= volume_box.clientWidth/3.75-this.clientWidth/7.5&&leftVal>this.clientWidth/7.5*(-1)) {
//             volume_progress.style.width = leftVal + "vw";
//             this.style.left = leftVal + "vw";
//         }
//         audio.volume = changerate;
//         window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
//     }
//     document.onmouseup = function () {
//         this.onmousemove = null;
//         this.onmouseup = null;
//
//     }
//     return false;
// }
// play_progress_point.onmousedown = function (e) {
//     // var event = e || window.event;
//     // var constant = event.clientX/3.75 - this.offsetLeft/3.75;
//     document.onmousemove = function (event) {
//         console.log('d')
//         var event = event || window.event;
//         // clientx 获取鼠标的位置
//         var leftVal = event.clientX/3.75 - constant;
//         var maxleft = play_progress_box.clientWidth/3.75;
//         var changerate = (leftVal + this.clientWidth/7.5)/maxleft;
//         if (leftVal <= play_progress_box.clientWidth/3.75-this.clientWidth/7.5&&leftVal>this.clientWidth/7.5*(-1)) {
//             play_progress.style.width = leftVal + "vw";
//             this.style.left = leftVal + "vw";
//         }
//
//         audio.currentTime = changerate*audio.duration;
//         setCurrentMusicTime();
//         window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
//     }
//     document.onmouseup = function () {
//         this.onmousemove = null;
//         this.onmouseup = null;
//
//     }
//     return false;
//
// }
})



