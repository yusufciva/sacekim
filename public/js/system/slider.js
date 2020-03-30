$(document).ready(() => {
    let socket = io();
    let current = 1;
    let maxLen = imgArr.length;
    const sliderAnimation = () => {
        if (current != maxLen) {
            $(".rslides img:eq(" + (current - 1) + ")").fadeOut(200);
            $(".rslides img:eq(" + current + ")").fadeIn(1500);
            current++;
        }
        else {
            $(".rslides img:eq(" + (current - 1) + ")").fadeOut(200);
            $(".rslides img:eq(" + current + ")").fadeIn(1500);
            current = 0;
        }
        setTimeout(function () {
            sliderAnimation()
        }, 5000)
    };
    const imgManagement = (imgArr) => {
        if (imgArr.length > 0) {
            for (let i = 0; i < imgArr.length; i++) {
                $(".rslides").append(`
                    <img style="display:none" id="`+ imgArr[i]._id + `" src="` + imgArr[i].imageBase64 + `" alt="" />
                `);
            };

            setTimeout(function () {
                sliderAnimation()
            }, 3000)
        };
    };
    imgManagement(imgArr);
    socket.on("Update_Images", (data) => {
        location.reload();
    });
});