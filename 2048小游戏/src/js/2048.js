$(function () {
    var TBBflag=0;
    var $imgList = $('#game img');

    function randomNum(max) {
        return Math.floor(Math.random() * max);
    }
    var newGame = randomNum(16);
    $imgList.eq(newGame).attr('src', 'src/image/score_2.png').attr('value', '2');
    $(window).on('keydown', function (e) {

        function clearSpace(init, increment) {     /**第一行的值 增量 */
            for (let i = init, n = 0; n < 3; i += increment, n++) {
                let iValue = $imgList.eq(i).attr('value');
                if (iValue == 0) {
                    for (let j = i + increment, m = 0; m < 3 - n; j += increment, m++) {
                        let jValue = $imgList.eq(j).attr('value');
                        if (jValue != 0) {
                            iValue = jValue;
                            jValue = 0;
                            $imgList.eq(i).attr('value', iValue);
                            $imgList.eq(j).attr('value', jValue);
                            break;
                        }
                    }
                }
            }
        }
        function checkLoseLeft() {
            for (let i = 0; i < 15; i++) {
                let j = i + 1;
                if(i==3||i==7||i==11){
                    break;
                }
                let iValue = $imgList.eq(i).attr('value');
                let jValue = $imgList.eq(j).attr('value');
                if (iValue == jValue) {
                    return false;

                }
            }
            return true;
        }
        function checkLoseTop() {
            for (let i = 0; i < 12; i++) {
                let j = i + 4;
                let iValue = $imgList.eq(i).attr('value');
                let jValue = $imgList.eq(j).attr('value');
                if (iValue == jValue) {
                    return false;
                }
            }
            return true;
        }
        function judgeLose() {
            var $value0 = $('#game img[value=0]');
            var count = 0;
            $value0.each(function () { count++; });
            if (count == 0 && checkLoseLeft() && checkLoseTop()) {
                var result = confirm("兔比比可爱吗？");
                if (!result) {
                    alert("你失败了");
                    // history.go(0);
                    location.reload();
                } else {
                    if(TBBflag>2){
                        alert("真不要脸！");
                        location.reload();
                    }
                    var clear = randomNum(16);
                    $imgList.eq(clear).attr('src', 'src/image/score_0.png').attr('value', '0');
                    console.log(clear + '....');
                    TBBflag++;
                }

            } else {
                createBlock();
            }


        }

        function judgeVictory() {
            $imgList.each(function (index, imgElement) {
                if ($(imgElement).attr('value') == '2048') {
                    //    $('#mask').css('visibility','visible');         /**用alert实现弹窗不需要遮罩.../
                    alert("恭喜你到达2048！");
                    // history.go(0);
                    location.reload();
                }
            });
        }

        function createBlock() {
            var $value0 = $('#game img[value=0]');
            var count = 0;
            $value0.each(function () { count++; });
            var whichBlock;                   /**随机填充的块数 */
            if (count != 1) {
                whichBlock = randomNum(count);
            } else {
                whichBlock = 0;
            }
            var whichNum = Math.floor(Math.random() * 2);                         /**随机的2或4 */
            var $randomBlock = $value0.eq(whichBlock);         /**随机块 */
            if (whichNum == 0) {
                $randomBlock.attr('value', '2');
                $randomBlock.delay(200).attr('src', 'src/image/score_2.png');
            } else {
                $randomBlock.attr('value', '4');
                $randomBlock.delay(200).attr('src', 'src/image/score_4.png');
            }
        }





        switch (e.which) {                                                  /**在每个case后面判断胜利失败和生成块，以免按其他键也会响应事件 */
            case 37:                                                         /**箭头左 */
                function moveLeft(init) {
                    for (let i = init, n = 0; n < 3; n++, i++) {
                        let iValue = $imgList.eq(i).attr('value');
                        if (iValue == '0')
                            continue;
                        for (let j = i + 1; j < init + 4; j++) {
                            if (iValue == '0') {
                                break;
                            }
                            let jValue = $imgList.eq(j).attr('value');

                            if (iValue == jValue) {
                                iValue = String(Number(iValue) + Number(jValue));
                                jValue = 0;
                                $imgList.eq(i).attr('value', iValue);
                                $imgList.eq(j).attr('value', jValue);
                                break;
                            }
                            if (jValue != '0') {
                                break;
                            }

                        }
                    }
                }


                moveLeft(0); clearSpace(0, 1);
                moveLeft(4); clearSpace(4, 1);
                moveLeft(8); clearSpace(8, 1);
                moveLeft(12); clearSpace(12, 1);





                /*    $imgList.each(function () {
                        console.log($(this).attr('value'));
                    });*/
                $imgList.each(function () {
                    var $value = ($(this).attr('value'));
                    $(this).attr('src', 'src/image/score_' + $value + '.png');
                });
                judgeVictory(); judgeLose();

                break;
            case 38:                                                         /**箭头上 */
                function moveTop(init) {
                    for (let i = init, n = 0; n < 3; n++, i += 4) {
                        let iValue = $imgList.eq(i).attr('value');
                        if (iValue == '0')
                            continue;
                        for (let j = i + 4; j < init + 16; j += 4) {
                            if (iValue == '0') {
                                break;
                            }
                            let jValue = $imgList.eq(j).attr('value');

                            if (iValue == jValue) {
                                iValue = String(Number(iValue) + Number(jValue));
                                jValue = 0;
                                $imgList.eq(i).attr('value', iValue);
                                $imgList.eq(j).attr('value', jValue);
                                break;
                            }
                            if (jValue != '0') {
                                break;
                            }


                        }
                    }
                }
                moveTop(3); clearSpace(3, 4);
                moveTop(2); clearSpace(2, 4);
                moveTop(1); clearSpace(1, 4);
                moveTop(0); clearSpace(0, 4);






                $imgList.each(function () {
                    var $value = ($(this).attr('value'));
                    $(this).attr('src', 'src/image/score_' + $value + '.png');
                });
                judgeVictory(); judgeLose();

                break;
            case 39:                                                         /**箭头右 */
                function moveRight(init) {
                    for (let i = init, n = 0; n < 3; n++, i--) {
                        let iValue = $imgList.eq(i).attr('value');
                        if (iValue == '0')
                            continue;
                        for (let j = i - 1; j > init - 4; j--) {

                            if (iValue == '0') {
                                break;
                            }
                            let jValue = $imgList.eq(j).attr('value');

                            if (iValue == jValue) {
                                iValue = String(Number(iValue) + Number(jValue));
                                jValue = 0;
                                $imgList.eq(i).attr('value', iValue);
                                $imgList.eq(j).attr('value', jValue);
                                break;
                            }
                            if (jValue != '0') {
                                break;
                            }

                        }
                    }
                }
                moveRight(3); clearSpace(3, -1);
                moveRight(7); clearSpace(7, -1);
                moveRight(11); clearSpace(11, -1);
                moveRight(15); clearSpace(15, -1);





                $imgList.each(function () {
                    var $value = ($(this).attr('value'));
                    $(this).attr('src', 'src/image/score_' + $value + '.png');
                });
                judgeVictory(); judgeLose();

                break;
            case 40:                                                         /**箭头下 */
                function moveBottom(init) {
                    for (let i = init, n = 0; n < 3; n++, i -= 4) {
                        let iValue = $imgList.eq(i).attr('value');
                        if (iValue == '0')
                            continue;
                        for (let j = i - 4; j > init - 16; j -= 4) {

                            if (iValue == '0') {
                                break;
                            }
                            let jValue = $imgList.eq(j).attr('value');

                            if (iValue == jValue) {
                                iValue = String(Number(iValue) + Number(jValue));
                                jValue = 0;
                                $imgList.eq(i).attr('value', iValue);
                                $imgList.eq(j).attr('value', jValue);
                                break;
                            }
                            if (jValue != '0') {
                                break;
                            }

                        }
                    }
                }
                moveBottom(15); clearSpace(15, -4);
                moveBottom(14); clearSpace(14, -4);
                moveBottom(13); clearSpace(13, -4);
                moveBottom(12); clearSpace(12, -4);





                $imgList.each(function () {
                    var $value = ($(this).attr('value'));
                    $(this).attr('src', 'src/image/score_' + $value + '.png');
                });
                judgeVictory(); judgeLose();

                break;
        }
    });




});