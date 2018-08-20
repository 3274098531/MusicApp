$(function () {
    console.log("height"+document.body.clientHeight)
    var bodywidth = document.body.clientWidth;
    var music_box= document.getElementById('music-box');
    var music_width = music_box.clientWidth;

    music_box.style.left = (bodywidth-music_width)/7.5+"vw";
    // var topheight = document.getElementsByClassName('top')[0].clientHeight;

    // music_box.style.top = (topheight-music_box.clientHeight)/3.75+"vw";

    $('.star').click(function () {
        var index = parseInt($(this).attr('name'));
        console.log(index)
        for(var i = index+1;i<=5;i++){
            console.log('remove red'+i)
            $('.star[name='+i+']').removeClass("red").addClass("spay");
        }
        for(var i = 1;i<=index;i++){

            $('.star[name='+i+']').addClass("red").removeClass("spay");
        }

    })

})