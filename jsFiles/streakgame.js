//randomAssignment
// const randomAssignment = Math.floor(Math.random() * 8) + 1; 
randomAssignment = 3;
console.log(randomAssignment + " randomAssignment")

/* 

1 = SoloCircleHigh + GroupSquareLow 
2 = GroupSquareLow + SoloCircleHigh

3 = SoloCircleLow + GroupSquareHigh
4 = GroupSquareHigh + SoloCircleLow

5 = SoloSquareHigh + GroupCircleLow 
6 = GroupCircleLow + SoloSquareHigh 

7 = SoloSquareLow + GroupCircleHigh 
8 = GroupCircleHigh + SoloSquareLow

*/
 

// Define Stimuli
let p = {};

var streakGame = (function() {

    var settings = {
        colorOrder: 0,
        pM: .5, //probability?
        pEM: [10, 10],///???
        gameTypeOrder: 0,
        val: 10, //how much they earn
        nTrials: 62, //number of trials per condition
        basePay: 10,
    };


let isSecondTime = false; 
let trialNumber = 1;

var textNew = {
    game1: [1, 3, 6, 8].includes(randomAssignment) ? 'Circle Game' : 'Square Game',
    shape1: [1, 3, 6, 8].includes(randomAssignment) ? 'circle' : 'square',
    game2: [2, 4, 5, 7].includes(randomAssignment) ? 'Circle Game' : 'Square Game',
    shape2: [2, 4, 5, 7].includes(randomAssignment) ? 'circle' : 'square',
    group: randomAssignment % 2 === 1 ? 'randomly' : 'by someone else', //odd numbers = alone, even = group
    group2: randomAssignment % 2 === 1 ? 'by someone else' : 'randomly' , //odd numbers = alone, even = group
    groupNext: randomAssignment % 2 === 1 ? 'random chance' : `your partner's performance`, //odd numbers = alone, even = group
    groupNext2: randomAssignment % 2 === 1 ? `your partner's performance` : 'random chance', //odd numbers = alone, even = group
    groupAgain: randomAssignment % 2 === 1 ? 'randomly' : '',
    groupAgain2: randomAssignment % 2 === 1 ? '': 'randomly',
    color: randomAssignment % 2 === 1 ? 'yellow' : `#2669ee`, //odd numbers = alone, even = group
    color2: randomAssignment % 2 === 1 ? `#2669ee` : 'yellow', //odd numbers = alone, even = group
    WL: [1, 4, 5, 8].includes(randomAssignment) ? `+6` : `+4`,
    LL: [1, 4, 5, 8].includes(randomAssignment) ? `+2` : `+4`,
    WLSwitch: [1, 4, 5, 8].includes(randomAssignment) ? `+4` : `+4`,
    WLSwitch2: [1, 4, 5, 8].includes(randomAssignment) ? `+6` : `+4`,
    WL2: [1, 4, 5, 8].includes(randomAssignment) ? `+4`:`+6`,
    WL2Switch: [1, 4, 5, 8].includes(randomAssignment) ? `+4`:`+4`,
    WL2Switch2: [1, 4, 5, 8].includes(randomAssignment) ? `+4`:`+6`,
    LL2: [1, 4, 5, 8].includes(randomAssignment) ? `+4`:`+2`,
}

/*
///
AVATAR 
CHOICE 
///
*/



function MakeAvatarSelection() {
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div class='parent'>
                <p> For both games, you'll be playing as one of the following 3 players. </p>
                <p> Please select a player: </p>
                <div class="avatar-selection" style="display: inline-block; justify-content: center; gap: 20px;">
                    <img src="./avatar/1.jpg" class="avatar-option" data-choice="0">
                    <img src="./avatar/2.jpg" class="avatar-option" data-choice="1">
                    <img src="./avatar/3.jpg" class="avatar-option" data-choice="2">
                </div>
            </div>`,
        choices: [],
        response_ends_trial: true,
        on_load: () => {
            // Ensure jsPsych wrapper allows interaction
            let wrapper = document.querySelector(".jspsych-content-wrapper");
            if (wrapper) {
                wrapper.style.pointerEvents = "auto"; 
            }

            // Add click functionality
            document.querySelectorAll('.avatar-option').forEach(img => {
                img.addEventListener('click', function() {
                    let selectedColor = this.getAttribute('data-choice');
                    let avatarResponse; 

                    if (selectedColor === '0') {
                        avatarResponse = '#ff00fe';
                    } else if (selectedColor === '1') {
                        avatarResponse = '#90CD4C';
                    } else if (selectedColor === '2') {
                        avatarResponse = '#800000';
                    }

                    // Finish the trial and store response
                    jsPsych.finishTrial({ response: selectedColor, avatarResponse });
                });
            });
        },
        on_finish: function (data) {
            let avatarResponse;

            if (data.response === '0') {
                avatarResponse = '#ff00fe';
            } else if (data.response === '1') {
                avatarResponse = '#90CD4C';
            } else if (data.response === '2') {
                avatarResponse = '#800000';
            }

            data.avatarResponse = avatarResponse;
            data.isSecondTime = isSecondTime;

            // Add properties globally
            jsPsych.data.addProperties({ avatarResponse, isSecondTime, randomAssignment});

            console.log("Avatar Response:", avatarResponse);
            console.log("isSecondTime:", isSecondTime);
        }
    };
}

/*
    *   INSTRUCTIONS
    *
    */



let avatarResponse = '#2669ee';

    p.intro = {}

    // temporary data
    var compAns1,
        compAns2,
        pages = {
            r1: {
                part1: [
        `<div class='parent'>
          <p> Welcome! </p>
          <p>We're interested in what makes some games more immersive and engaging than others. </p>
          <p> To help us, you'll play two games. </p>
                </div>`,

                `<div class='parent'>
                <p> For both games, you'll earn points. </p>
                <p>Each point is worth 2 cents in bonus money. </p>
                You'll keep all the bonus money you earn on top of the $X you earn for your participation. </p>
                <p>To maximize your earnings, earn as many points as possible!</p>
                </div>`,
                ],

                part1a: [
                `<div class='parent'>
                <p> The first game is called the ${textNew.game1}. </p>
                <p> Click "Next" to learn about the ${textNew.game1}. </p>
                </div>
                </div>`                 
                ],

                part2Group: [
                `<div class='parent'>
                <p> The ${textNew.game1} is a 2-player game.</p> 
                <p> You'll play with another person completing this experiment. </p> 
                <p>If another person is not available, you'll play with an AI bot. </p> 
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> In the ${textNew.game1}, ${textNew.shape1}s will appear on your screen. 
                <p> Initially, the inner ${textNew.shape1} and the outer ${textNew.shape1} are white. </p>
                <p> Your job is to activate the inner ${textNew.shape1}. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                    <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,

                 `<div class='parent'>
                <p>To activate the inner ${textNew.shape1}, press your SPACE BAR as soon as the ${textNew.shape1}s appear on your screen. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                    <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> If you press your SPACE BAR fast enough, the inner ${textNew.shape1} will activate like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p>If you're too slow, the inner ${textNew.shape1} will turn gray.</p> 
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                <div id="inner-shape" class="${textNew.shape1}" style="background-color: gray;"></div>
                </div>
                </div>
                </div>`, 

                `<div class='parent'>
                <p>Your partner's job is to activate the outer ${textNew.shape1}. </p> 
                <p>If your partner presses their SPACE BAR in time, the outer ${textNew.shape2} will activate like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color}">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,


                `<div class='parent'>
                <p>If your partner does NOT press their SPACE BAR in time, the outer ${textNew.shape1} will not activate like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`, 

                `<div class='parent'>
                <p>Whether the outer ${textNew.shape1} is activated\u2014or not\u2014depends on your partner's performance. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`, 

                 `<div class='parent'>
                <p> You'll see one of four possible outcomes depending on: </p> <p> (i) whether you activate the inner ${textNew.shape1} and </p> <p> (ii) whether your partner activates the outer ${textNew.shape1}. </p><p></p>
                <div id="shape-wrapper" style="display: flex; gap: 40px; justify-content: center; align-items: center; margin-bottom: 50px;">

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;",>
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                     <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>
        </div>`
                ],

                part2Solo: [
                `<div class='parent'>
                <p> In the ${textNew.game1}, ${textNew.shape1}s will appear on your screen. 
                <p> Initially, the inner ${textNew.shape1} and the outer ${textNew.shape1} are white. </p>
                <p> Your job is to activate the inner ${textNew.shape1}. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                    <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,

                 `<div class='parent'>
                <p>To activate the inner ${textNew.shape1}, press your SPACE BAR as soon as the ${textNew.shape1}s appear on your screen. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                    <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> If you press your SPACE BAR fast enough, the inner ${textNew.shape1} will activate like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p>If you're too slow, the inner ${textNew.shape1} will turn gray.</p> 
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                <div id="inner-shape" class="${textNew.shape1}" style="background-color: gray;"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p>The outer ${textNew.shape1} will be activated\u2014or not\u2014randomly. </p> 
                <p>If the outer ${textNew.shape1} is activated, it will look like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color}">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,


                `<div class='parent'>
                <p>If the outer ${textNew.shape1} is not activated, it will look like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`, 

                `<div class='parent'>
                <p>Whether the outer ${textNew.shape1} is activated\u2014or not\u2014based on random chance. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`, 

                `<div class='parent'>
                <p> You'll see one of four possible outcomes depending on: </p> <p> (i) whether you activate the inner ${textNew.shape1} and </p> <p> (ii) whether the outer ${textNew.shape1} is activated randomly. </p><p></p>
                <div id="shape-wrapper" style="display: flex; gap: 40px; justify-content: center; align-items: center; margin-bottom: 50px;">

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;",>
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                     <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>
        </div>`
                ],
soloPage: [
    `<div class='specialOnly'>
        <p>You'll earn points based on these rules. Remember that each point is worth 2 cents. </p> 
        <div id="shape-wrapper" style="display: flex; justify-content: center;">
        <div class="table-container">
            <table style="border-collapse: collapse; text-align: center;">
                <!-- First row: Empty first column, Shapes start from the second column -->
                <tr>
                    <td style="padding: 10px;"></td> <!-- Empty first column -->
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: ${textNew.color}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: ${textNew.color}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Row with points -->
                <tr>
                    <td></td> <!-- Empty first column -->
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL}</b></td>
                </tr>
            </table>
        </div>
    </div>
      <p style="text-align: center; margin-top: 20px; margin-bottom: 50px; "><b>Please take a moment to memorize these rules.</b></p>`
],
soloPage2: [
    `<div class='specialOnly'>
        <p>You'll earn points based on these rules. Remember that each point is worth 2 cents. </p> 
        <div id="shape-wrapper" style="display: flex; justify-content: center;">
        <div class="table-container">
            <table style="border-collapse: collapse; text-align: center;">
                <!-- First row: Empty first column, Shapes start from the second column -->
                <tr>
                    <td style="padding: 10px;"></td> <!-- Empty first column -->
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape2}" 
                                 style="background-color: ${textNew.color2}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape2}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape2}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape2}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape2}" 
                                 style="background-color: ${textNew.color2}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape2}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape2}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape2}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Row with points -->
                <tr>
                    <td></td> <!-- Empty first column -->
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL2}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL2}</b></td>
                </tr>
            </table>
        </div>
    </div>
      <p style="text-align: center; margin-top: 20px; margin-bottom: 50px; "><b>Please take a moment to memorize these rules.</b></p>`
],
groupPage: [
`<div class='parent'>
        <p>You'll earn points based on these rules. Remember that each point is worth 2 cents.</p> 
        <div id="shape-wrapper" style="display: flex; justify-content: center;">
        <div class="table-container" style="display: block; clear: both;">
            <table style="border-collapse: collapse; text-align: center;">
                <!-- First row: Empty first column, Shapes start from the second column -->
                <tr>
                    <td style="padding: 10px;"></td> <!-- Empty first column -->
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: ${textNew.color}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: ${textNew.color}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Second row: Points with avatar 3 -->
                <tr>
                    <td rowspan="1" style="padding: 2px; vertical-align: middle;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <img src="{{avatar1}}" style="width: 80px; height: auto;">
                            <span style="font-size: 12px; font-weight: bold;">(you)</span>
                        </div>
                    </td>
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL}</b></td>
                </tr>

                <!-- Third row: Points with avatar 4 -->
                <tr>
                    <td rowspan="1" style="padding: 2px; vertical-align: middle; text-align: left;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <img src="./avatar/4.jpg" style="width: 80px; height: auto;">
                            <span style="font-size: 12px; font-weight: bold;">(your partner)</span>
                        </div>
                    </td>
                    <td><b>+8</b></td>
                    <td><b>${textNew.WLSwitch}</b></td>
                    <td><b>${textNew.WLSwitch2}</b></td>
                    <td><b>${textNew.LL}</b></td>
                </tr>
            </table>
        </div>
    </div>
          <div style="margin-top: 20px; margin-bottom: 50px; text-align: center; width: 100%; display: block; clear: both;">
       <p style="font-size: 18px; font-weight: bold;">Please take a moment to memorize these rules.</p>
</div>`
],
groupPage2: [
`<div class='parent'>
        <p>You'll earn points based on these rules. Remember that each point is worth 2 cents.</p> 
        <div id="shape-wrapper" style="display: flex; justify-content: center;">
        <div class="table-container" style="display: block; clear: both;">
            <table style="border-collapse: collapse; text-align: center;">
                <!-- First row: Empty first column, Shapes start from the second column -->
                <tr>
                    <td style="padding: 10px;"></td> <!-- Empty first column -->
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape2}" 
                                 style="background-color: ${textNew.color2}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape2}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape2}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape2}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape2}" 
                                 style="background-color: ${textNew.color2}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape2}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape2}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape2}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Second row: Points with avatar 3 -->
                <tr>
                    <td rowspan="1" style="padding: 2px; vertical-align: middle;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <img src="{{avatar1}}" style="width: 80px; height: auto;">
                            <span style="font-size: 12px; font-weight: bold;">(you)</span>
                        </div>
                    </td>
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL2}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL2}</b></td>
                </tr>

                <!-- Third row: Points with avatar 4 -->
                <tr>
                    <td rowspan="1" style="padding: 2px; vertical-align: middle; text-align: left;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <img src="./avatar/4.jpg" style="width: 80px; height: auto;">
                            <span style="font-size: 12px; font-weight: bold;">(your partner)</span>
                        </div>
                    </td>
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL2Switch}</b></td>
                    <td><b>${textNew.WL2Switch2}</b></td>
                    <td><b>${textNew.LL2}</b></td>
                </tr>
            </table>
        </div>
    </div>
          <div style="margin-top: 20px; margin-bottom: 50px; text-align: center; width: 100%; display: block; clear: both;">
       <p style="font-size: 18px; font-weight: bold;">Please take a moment to memorize these rules.</p>
</div>`
    ]
    }, 
 r2: {
    part1a: [`<div class='parent'>
                <p> The second game is called the ${textNew.game2}. </p>
                <p> Click "Next" to learn about the ${textNew.game2}. </p>
                </div>
                </div>`
                ], 

    part2Group: [`<div class='parent'>
                <p> Unlike the ${textNew.game1}, The ${textNew.game2} is a 2-player game.</p> 
                <p> You'll play with another person completing this experiment. </p> 
                <p>If another person is not available, you'll play with an AI bot. </p> 
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> In the ${textNew.game2}, ${textNew.shape2}s will appear on your screen. </p>
                <p> Initially, the inner ${textNew.shape2} and the outer ${textNew.shape2} are white. </p>
                <p> Your job is to activate the inner ${textNew.shape2}. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                    <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`,

                 `<div class='parent'>
                <p>To activate the inner ${textNew.shape2}, press your SPACE BAR as soon as the ${textNew.shape2}s appear on your screen. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                    <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> If you press your SPACE BAR fast enough, the inner ${textNew.shape2} will activate like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                <div id="inner-shape" class="${textNew.shape2}" style="background-color: {{avatarResponse}};"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p>If you're too slow, the inner ${textNew.shape2} will turn gray.</p> 
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                <div id="inner-shape" class="${textNew.shape2}" style="background-color: gray;"></div>
                </div>
                </div>
                </div>`, 

                `<div class='parent'>
                <p>Your partner's job is to activate the outer ${textNew.shape2}. </p> 
                <p>If your partner presses their SPACE BAR in time, the outer ${textNew.shape2} will activate like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}" style="background-color: ${textNew.color2}">
                <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p>If your partner does NOT press their SPACE BAR in time, the outer ${textNew.shape1} will not activate like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`, 

                `<div class='parent'>
                <p>Whether the outer ${textNew.shape1} is activated\u2014or not\u2014depends on your partner's performance. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,  

                 `<div class='parent'>
                <p> You'll see one of four possible outcomes depending on: </p> <p> (i) whether you activate the inner ${textNew.shape2} and </p> <p> (ii) whether your partner activates the outer ${textNew.shape2}. </p><p></p>
                <div id="shape-wrapper" style="display: flex; gap: 40px; justify-content: center; align-items: center; margin-bottom: 50px;">
                <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;",>
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape2}" style="background-color: ${textNew.color2};">
                        <div id="inner-shape" class="${textNew.shape2}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape2}" style="background-color: grey;">
                     <div id="inner-shape" class="${textNew.shape2}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape2}" style="background-color: ${textNew.color2};">
                        <div id="inner-shape" class="${textNew.shape2}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape2}" style="background-color: grey;">
                        <div id="inner-shape" class="${textNew.shape2}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>
        </div>`
                ],

    part2Solo: [
                `<div class='parent'>
                <p> Unlike the ${textNew.game1}, the ${textNew.game2} is a 1-player game.</p> 
                <p> You'll play by yourself. </p> 
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> In the ${textNew.game2}, ${textNew.shape2}s will appear on your screen. </p>
                <p> Initially, the inner ${textNew.shape2} and the outer ${textNew.shape2} are white. </p>
                <p> Your job is to activate the inner ${textNew.shape2}. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                    <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`,

                 `<div class='parent'>
                <p>To activate the inner ${textNew.shape2}, press your SPACE BAR as soon as the ${textNew.shape2}s appear on your screen. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                    <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> If you press your SPACE BAR fast enough, the inner ${textNew.shape2} will activate like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                <div id="inner-shape" class="${textNew.shape2}" style="background-color: {{avatarResponse}};"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p>If you're too slow, the inner ${textNew.shape2} will turn gray.</p> 
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}">
                <div id="inner-shape" class="${textNew.shape2}" style="background-color: gray;"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p>The outer ${textNew.shape2} will be activated\u2014or not\u2014randomly. </p> 
                <p>If the outer ${textNew.shape2} is activated, it will look like this. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}" style="background-color: ${textNew.color2}">
                <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`,


                `<div class='parent'>
                <p>If the outer ${textNew.shape2} is not activated, it will look like this. </p>
                <p>Whether the outer ${textNew.shape2} is activated\u2014or not\u2014depends on random chance.</p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape2}" style="background-color: grey;">
                <div id="inner-shape" class="${textNew.shape2}"></div>
                </div>
                </div>
                </div>`, 

                `<div class='parent'>
                <p> You'll see one of four possible outcomes depending on: </p> <p> (i) whether you activate the inner ${textNew.shape2} and </p> <p> (ii) whether the outer ${textNew.shape2} is activated randomly. </p><p></p>
                <div id="shape-wrapper" style="display: flex; gap: 40px; justify-content: center; align-items: center; margin-bottom: 50px;">

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;",>
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape2}" style="background-color: ${textNew.color2};">
                        <div id="inner-shape" class="${textNew.shape2}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape2}" style="background-color: grey;">
                     <div id="inner-shape" class="${textNew.shape2}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape2}" style="background-color: ${textNew.color2};">
                        <div id="inner-shape" class="${textNew.shape2}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape2}" style="background-color: grey;">
                        <div id="inner-shape" class="${textNew.shape2}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>
        </div>`
                ],
        }
    };

    // constructor function for round 1 comprehension check loop
function MakeLoop(group, round) {

function getCorrectAnswers(randomAssignment) {
    let isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
    console.log(randomAssignment + 'randomassignment in getcorrect answers.')
    console.log(isSecondTime + 'in getCorrectAnswers')
    return {
   attnChk0: isSecondTime 
            ? (randomAssignment % 2 === 1 ? `None of the above` : `Random chance`)
            : (randomAssignment % 2 === 1 ? `Random chance` : `None of the above`),

        attnChk1: `Whether or not I pressed SPACE BAR fast enough`,
        attnChk2: `+8`,

        attnChk3: isSecondTime 
            ? ([1, 4, 5, 8].includes(randomAssignment) ? `+4` : `+6`)
            : ([1, 4, 5, 8].includes(randomAssignment) ? `+6` : `+4`),

        attnChk4: `+4`,

        attnChk5: isSecondTime 
            ? ([1, 4, 5, 8].includes(randomAssignment) ? `+4` : `+2`)
            : ([1, 4, 5, 8].includes(randomAssignment) ? `+2` : `+4`),
    };
}

        const errorMessage = {
            type: jsPsychInstructions,
            pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand the game, please re-read the instructions.</p></div>`],
            show_clickable_nav: true,
            allow_keys: false,
        };


        const attnChk = {
            type: jsPsychSurveyMultiChoice,
    preamble: () => {
    const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
    let selectedAvatar = avatarChoices.find(avatar => avatar.code === avatarResponse);
    let selectedAvatarImg = selectedAvatar ? selectedAvatar.img : null;
    let isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
    console.log("is secodntime in attnck" + isSecondTime)

    let attnChkDiv = isSecondTime 
                ? (randomAssignment % 2 === 1 ? `attnChkGrp` : `parent`)
                : (randomAssignment % 2 === 1 ? `parent` : `attnChkGrp`);
    let sologroupPages = isSecondTime 
                ? (randomAssignment % 2 === 1 ? pages.r1.groupPage2 : pages.r1.soloPage2)
                : (randomAssignment % 2 === 1 ? pages.r1.soloPage : pages.r1.groupPage);


       let preambleText = `
        <div class='${attnChkDiv}'> 
            <p> To recap, in the ${isSecondTime ? textNew.game2 : textNew.game1}: </p>
            ${sologroupPages === pages.r1.groupPage2 || sologroupPages === pages.r1.groupPage
                ? `<p> Your partner activates the outer ${isSecondTime ? textNew.shape2 : textNew.shape1}. </p>` 
                : `<p> The outer ${isSecondTime ? textNew.shape2 : textNew.shape1} is activated based on ${isSecondTime ? textNew.groupNext2 : textNew.groupNext}. </p>`}
            <p> You activate the inner ${isSecondTime ? textNew.shape2 : textNew.shape1} with your SPACE BAR. </p>

    `;

    // Replace placeholders in sologroupPages
    const updatedPages = sologroupPages.map(page => 
        page
            .replace(/{{avatarResponse}}/g, avatarResponse)
            .replace(/{{avatar1}}/g, selectedAvatarImg)
            .replace(/Please take a moment to memorize these rules/g, `Before you continue, please answer the following questions`)
            .replace(/specialOnly/g, `special`)
    ).join(""); // Join all the updated HTML sections into a single string

    // Append the updated pages inside a new div to ensure layout stacking
    preambleText += `
            ${updatedPages}
            </div>` 

    return preambleText;
},
            questions: () => {
    let isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
    
    return [
        {
            prompt: `What determines whether the outer ${isSecondTime ? textNew.shape2 : textNew.shape1} is activated?`, 
            name: `attnChk0`, 
            options: ['Whether or not I pressed SPACE BAR fast enough', 'Random chance', `None of the above`],
        },
        {
            prompt: `What determines whether the inner ${isSecondTime ? textNew.shape2 : textNew.shape1} is activated?`,
            name: `attnChk1`, 
            options: ['Whether or not I pressed SPACE BAR fast enough', 'Random chance', `None of the above`],
        },
        {
            prompt: `How many points do you get when the inner ${isSecondTime ? textNew.shape2 : textNew.shape1} and the outer ${isSecondTime ? textNew.shape2 : textNew.shape1} are activated?`,
            name: `attnChk2`, 
            options: ['+2', '+4', '+6', '+8'],
        },
        {
            prompt: `How many points do you get when the inner ${isSecondTime ? textNew.shape2 : textNew.shape1} is activated but the outer ${isSecondTime ? textNew.shape2 : textNew.shape1} is NOT activated?`, 
            name: `attnChk3`, 
            options: ['+2', '+4', '+6', '+8'],
        },
        {
            prompt: `How many points do you get when the inner ${isSecondTime ? textNew.shape2 : textNew.shape1} is NOT activated but the outer ${isSecondTime ? textNew.shape2 : textNew.shape1} is activated?`, 
            name: `attnChk4`, 
            options: ['+2', '+4', '+6', '+8'],
        },
        {
            prompt: `How many points do you get when the inner ${isSecondTime ? textNew.shape2 : textNew.shape1} and the outer ${isSecondTime ? textNew.shape2 : textNew.shape1} are NOT activated?`, 
            name: `attnChk5`, 
            options: ['+2', '+4', '+6', '+8'],
        },
    ];
},
            randomize_question_order: false,
            scale_width: 500,
            on_finish: (data) => {
                  const totalErrors = getTotalErrors(data.response, getCorrectAnswers(randomAssignment));
                  data.totalErrors = totalErrors;
            },
        };

        function getTotalErrors(response, correctAnswers) {
            let errorCount = 0;

            // Compare each response with correct answers
            for (const key in correctAnswers) {
                if (response[key] !== correctAnswers[key]) {
                    errorCount++;
                }
            }
            return errorCount;
        }


        const conditionalNode = {
          timeline: [errorMessage],
          conditional_function: () => {
            const fail = jsPsych.data.get().last(1).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };

        const instLoop = {
          timeline: [attnChk, conditionalNode],
          loop_function: () => {
            const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };



        const introTimeline = {
            timeline: [instLoop],
        }

        this.timeline = [introTimeline];
    }

    // consent form

    const consent = `
    <div class='parent' style='height: 1000px; width: 1000px'>
    <p><b>Consent Form<br>

    <p><b>Description</b><br>
    You are invited to participate in a research study on how humans enjoy different tasks. You'll be asked to participate in a short game that involves hitting a space bar to activate a tile. Then you'll be asked to answer various questions about your experience./p>

    <p><b>Time Involvement</b><br>
    Your participation will take approximately 20 minutes. 

    <p><b>Risks and Benefits</b><br>
    The risks associated with this study are not anticipated to be beyond those involved in normal, daily computer use. There are no foreseeable psychological risks and benefits beyond those involved in normal, daily life. The benefits which may reasonably be expected to result from this study are none. We cannot and do not guarantee or promise that you will receive any benefits from this study.
    
    <p><b>Payment</b><br>
    You will receive $4.60 payment for your participation.

     <p><b>Payment</b><br>
    If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. The alternative is not to participate. You have the right to refuse to answer particular questions. The results of this research study may be presented at scientific or professional meetings or published in scientific journals. Your individual privacy will be maintained in all published and written data resulting from the study.
    In accordance with scientific norms, the data from this study may be used or shared with other researchers for future research (after removing personally identifying information) without additional consent from you.

    <p><b>Contact Information:</b><br>
    Questions: If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact the Protocol Director, Josephine Tan (josetan@stanford.edu) or Assistant Professor David Melnikoff (dmelnik@stanford.edu).
    Independent Contact: If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu. You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306.
    If you agree to participate, press the "Next" button to indicate that you consent to participate in the study.</p>`



    // create instruction variables
    p.intro.preMessage = {
        type: jsPsychInstructions,
        pages: [consent],
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r1part1 = {
        type: jsPsychInstructions,
        pages: pages.r1.part1,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r1part1a = {
        type: jsPsychInstructions,
        pages: pages.r1.part1a,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r2part1a = {
        type: jsPsychInstructions,
        pages: pages.r2.part1a,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };


function makeIntroPart2() {
    return {
        type: jsPsychInstructions,
        pages: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const isSecondTime = lastTrialData ? lastTrialData.isSecondTime : false;
            const avatarResponse = lastTrialData ? lastTrialData.avatarResponse || '' : ''; // Default to empty string if undefined

            const sologroupPages = isSecondTime 
                ? (randomAssignment % 2 === 1 ? pages.r1.part2Group : pages.r1.part2Solo)
                : (randomAssignment % 2 === 1 ? pages.r1.part2Solo : pages.r1.part2Group);

            return sologroupPages.map(page => page.replace(/{{avatarResponse}}/g, avatarResponse));
        },
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}

function makeR2part1() {
    return {
        type: jsPsychInstructions,
        pages: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const isSecondTime = lastTrialData ? lastTrialData.isSecondTime : false;
            const avatarResponse = lastTrialData ? lastTrialData.avatarResponse || '' : ''; // Default to empty string if undefined

            const sologroupPages = isSecondTime 
                ? (randomAssignment % 2 === 1 ? pages.r2.part2Group : pages.r2.part2Solo)
                : (randomAssignment % 2 === 1 ? pages.r2.part2Solo : pages.r2.part2Group);

            return sologroupPages.map(page => page.replace(/{{avatarResponse}}/g, avatarResponse));
        },
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}


/*
function makeR1Part3() {
    return {
        type: jsPsychInstructions,
        pages: () => {
                let lastTrial = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0];
                 const isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
                 const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse;

            const sologroupPages = isSecondTime 
                ? (randomAssignment % 2 === 1 ? pages.r1.part2Group : pages.r1.part2Solo)
                : (randomAssignment % 2 === 1 ? pages.r1.part2Solo : pages.r1.part2Group);

            let updatedPages = sologroupPages.map(page => {
                return page
                .replace(/{{avatarResponse}}/g, avatarResponse)
            });
            return updatedPages;
        },
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}
*/

function makeR1SoloHigh() {
    return {
        type: jsPsychInstructions,
        pages: () => {
            let lastTrial = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0];
            let avatarResponse = lastTrial.avatarResponse; 
            let selectedAvatar = avatarChoices.find(avatar => avatar.code === avatarResponse);
            let selectedAvatarImg = selectedAvatar ? selectedAvatar.img : null;

           const sologroupPages = isSecondTime 
                ? (randomAssignment % 2 === 1 ? pages.r1.groupPage2 : pages.r1.soloPage2)
                : (randomAssignment % 2 === 1 ? pages.r1.soloPage : pages.r1.groupPage);

            console.log(sologroupPages);

            const updatedPages = sologroupPages.map(page => {
                return page
                    .replace(/{{avatarResponse}}/g, avatarResponse)  // Replace with the actual color
                    .replace(/{{avatar1}}/g, selectedAvatarImg);  // Replace with the actual avatar image
            });

            return updatedPages;
        },      
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}

/*
function makeR2part2() {
    return {
        type: jsPsychInstructions,
        pages: () => {
            const isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
            const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 

            let updatedPages = pages.r1.round2part2.map(page => 
                page.replace(/{{avatarResponse}}/g, avatarResponse)
            );
            return updatedPages;
        },
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}
*/

    p.intro.r1check = new MakeLoop('R1', 'Solo');

 //   p.intro.r2part2 = new MakeLoop(text.span2, text.game2, text.color2, 'R2');

   /*
    *
    *   TASK
    *
    */

    p.task = {}

/*
///
variables for plugins
///
*/

let noOfTrials = 5; //so 20 in total

///fake participant's activation time for WL and LL trials, that far exceeds trial duration
let partner_rtL = 20000; //for when partner "loses".

let delayTime = 400;

//trial duration times for WW and WL times: this is the time 
let trialforWins = 750;

//trial duration times for LL and LW times 
let trialforLose = 250;

/* 
//
FOR WW TRIAL WITH PLUG IN 
///
*/


function WWTrial(shape, group) {
    let trialStartTime;
    let trialEndTime;
  
    // Set the shape classes based on the input parameter
    const outerShapeClass = shape;
    const innerShapeClass = shape; 

    return {
        type: jsPsychWWHtmlKeyboardResponse,
        data: { Trial_Type: shape }, // Use the shape passed to the function
        stimulus: `
                <div id="outer-container">
                    <div id="outer-shape" class="${outerShapeClass}"></div>
                    <div id="inner-shape" class="${innerShapeClass}"></div>
                </div>
            `,
        choices: [" "],
        response_duration: trialforWins, 
        selected_color: () => {
            let avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            return avatarResponse;
        },
        trial_duration: 2000, // Fallback duration if no response from participant
        partner_rt: function forWW(min = 225, max = 400) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        ending_time: delayTime, // Must be larger than partner_rt
        on_start: function (trial) {
            trialStartTime = Date.now();
            console.log('Selected color:', trial.selected_color); // Log the selected color

            let color = group === 'solo' ? '#FFFF00' : '#2669ee';

            jsPsych.pluginAPI.setTimeout(() => {
                const outerCircle = document.getElementById('outer-shape');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = color;
                } else {
                    console.log('outer-shape element not found');
                }
            }, trial.partner_rt);
        },
        on_finish: function (data) {
            if (data.response === " ") {
                data.response = true;
            } else {
                data.response = false; 
            };
            data.trialType = 'WW';
            data.partner_outcome = 1;
            data.shape = shape;
            isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
        },
    };
}


/* 
//
FOR WL TRIAL WITH PLUG IN 
///
*/

// WL trial
function WLTrial(shape) {
    let trialStartTime;
    let trialEndTime;

    // Set the shape classes based on the input parameter
    const outerShapeClass = shape;
    const innerShapeClass = shape; 

    return {
        type: jsPsychWWHtmlKeyboardResponse,
        data: { Trial_Type: shape },
        stimulus: `
            <div id="outer-container">
                <div id="outer-shape" class="${outerShapeClass}"></div>
                <div id="inner-shape" class="${innerShapeClass}"></div>
            </div>
        `,
        choices: [" "],
        response_duration: trialforWins,
        selected_color: () => {
            let avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            return avatarResponse;
        },
        trial_duration: 2000,
        partner_rt: function forWW(min = 0, max = 100) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        ending_time: delayTime,
        on_finish: function(data) {
            if (data.response === " ") {
                data.response = true;
            } else {
                data.response = false; 
            };
            data.trialType = 'WL';
            data.partner_outcome = 0;
            data.shape = shape;
            isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
        },
    };
}


/* 
//
FOR LW TRIAL WITH PLUG IN 
///
*/


// LW trial
function LWTrial(shape, group) {
    let trialStartTime;
    let trialEndTime;

    const outerShapeClass = shape;
    const innerShapeClass = shape;

    return {
        type: jsPsychLWHtmlKeyboardResponse,
        data: { Trial_Type: shape },
        stimulus: `
            <div id="outer-container">
                <div id="outer-shape" class="${outerShapeClass}"></div>
                <div id="inner-shape" class="${innerShapeClass}"></div>
            </div>
        `,
        choices: [" "],
        trial_duration: 2000, // Fallback duration if no response from participant
        response_duration: trialforLose, // Ensure trialforLose is defined globally or passed properly

        selected_color: function() {
            const lastTrial = jsPsych.data.get().filter({ trial_type: 'html-button-response' }).last(1).values()[0];
            return lastTrial ? lastTrial.avatarResponse : null;
        },

        partner_rt: function(min = 225, max = 235) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        on_start: function(trial) {
            trialStartTime = Date.now();
            let color = group === 'solo' ? '#FFFF00' : '#2669ee';

            jsPsych.pluginAPI.setTimeout(() => {
                const outerCircle = document.getElementById('outer-shape');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = color;
                } else {
                    console.log('outer-shape element not found');
                }
            }, trial.partner_rt);
        },

        on_finish: function(data) {
            if (data.response === " ") {
                data.response = true;
            } else {
                data.response = 1; 
            };
            data.trialType = 'LW';
            data.partner_outcome = 1;
            data.shape = shape;
            isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
        }
    };
}

/* 
//
FOR LL TRIAL WITH PLUG IN 
///
*/

// LL trial
function LLTrial(shape) {
    let trialStartTime;
    let trialEndTime;

    const outerShapeClass = shape;
    const innerShapeClass = shape; 

    return {
        type: jsPsychLWHtmlKeyboardResponse,
        data: { Trial_Type: shape },
        stimulus: `
            <div id="outer-container">
                <div id="outer-shape" class="${outerShapeClass}"></div>
                <div id="inner-shape" class="${innerShapeClass}"></div>
            </div>
        `,
        choices: [" "],
        response_duration: trialforLose, // Fallback duration if no response from participant
        selected_color: () => {
            let avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            return avatarResponse;
        },
        trial_duration: 2000, // Fallback duration if no response from participant
        partner_rt: partner_rtL,
        response_ends_trial: false,
        on_start: function(trial) {
            trialStartTime = Date.now(); 
            console.log('Outer circle becomes highlighted at partner reaction time: ' + trial.partner_rt);

            jsPsych.pluginAPI.setTimeout(function() {
                const outerCircle = document.getElementById('outer-shape');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = 'grey';
                } else {
                    console.log('outer-circle element not found');
                }
            }, trialforLose);
        },
        on_finish: function(data) {
            if (data.response === " ") {
                data.response = true;
            } else {
                data.response = false; 
            };
            data.trialType = 'LL';
            data.partner_outcome = 0;
            isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
            data.shape = shape;
        }
    };
}


function generateAvatarFeedback(avatar1, avatar1Text, avatar2Text, avatar1TotalPoints, avatar2TotalPoints, color) {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px;">
            <!-- Left Avatar -->
            <div style="text-align: center;">
                <div style="font-size:40px; font-weight: bold; margin-bottom: 5px; color: ${color};">
                    ${avatar1Text}
                </div>
                <img src="${avatar1}" style="width: 200px; height: 200px; margin: 0 10px;">
                <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                    ${avatar1TotalPoints} Points 
                </div>
            </div>
            <!-- Right Avatar -->
            <div style="text-align: center;">
                <div style="font-size:40px; font-weight: bold; margin-bottom: 5px; color: #2669ee;">
                    ${avatar2Text}
                </div>
                <img src="./avatar/4.jpg" style="width: 200px; height: 200px; margin: 0 10px;">
                <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                    ${avatar2TotalPoints} Points 
                </div>
            </div>
        </div>
        <!-- Line at the bottom -->
        <div style="text-align: center; margin-top: 20px; font-size: 24px; font-weight: bold;">
            Get ready for the next tile!
        </div>
    `;
}

function generateSoloAvatarFeedback(avatar1, avatar1Text, avatar1TotalPoints, color) {
    return `
        <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 40px; font-weight: bold; margin-bottom: 5px; color: ${color};">
                ${avatar1Text}
            </div>
            <img src="${avatar1}" style="width: 200px; height: 200px;">
            <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                ${avatar1TotalPoints} Points
            </div>
        </div>
        <!-- Line at the bottom -->
        <div style="text-align: center; margin-top: 20px; font-size: 24px; font-weight: bold;">
            Get ready for the next tile!
        </div>
    `;
}



const avatarChoices = [
    { color: 'Pink', code: '#ff00fe', img: './avatar/1.jpg' },
    { color: 'Green', code: '#90CD4C', img: './avatar/2.jpg' },
    { color: 'Red', code: '#800000', img: './avatar/3.jpg' }
];


function MakeFeedback(mode) {
    let avatar1TotalPoints = 0;
    let avatar2TotalPoints = 0;
    let pointsAddedAvatar1 = 0;
    let pointsAddedAvatar2 = 0;

    const groupOrSolo = mode.includes("group") ? "group" : "solo";
    const MI = mode.includes("High") ? "high" : "low";

    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { type: `${mode}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            let avatarResponse = jsPsych.data.get().filter({ trial_type: 'html-button-response' }).last(1).values()[0].avatarResponse;
            let selectedAvatar = avatarChoices.find(avatar => avatar.code === avatarResponse);
            let selectedAvatarImg = selectedAvatar ? selectedAvatar.img : null;

            const partner_rt = lastTrialData.partner_rt;
            const partner_outcome = lastTrialData.partner_outcome;

            let feedbackText = '';

            if (mode === 'groupHigh') {
                if (lastTrialData.outcome && partner_outcome === 0) {
                    pointsAddedAvatar1 = 6;
                    pointsAddedAvatar2 = 4;
                } else if (lastTrialData.outcome && partner_outcome === 1) {
                    pointsAddedAvatar1 = 8;
                    pointsAddedAvatar2 = 8;
                } else if (!lastTrialData.outcome && partner_outcome === 0) {
                    pointsAddedAvatar1 = 2;
                    pointsAddedAvatar2 = 2;
                } else if (!lastTrialData.outcome && partner_outcome === 1) { 
                    pointsAddedAvatar1 = 4;
                    pointsAddedAvatar2 = 6;
                }
            } else if (mode === 'soloHigh') {
                if (lastTrialData.outcome) {
                    pointsAddedAvatar1 = partner_outcome === 0 ? 6 : 8;
                } else {
                    pointsAddedAvatar1 = partner_outcome === 0 ? 2 : 4;
                }
            } else if (mode === 'groupLow') {
                if (lastTrialData.outcome && partner_outcome === 0) {
                    pointsAddedAvatar1 = 4;
                    pointsAddedAvatar2 = 4;
                } else if (lastTrialData.outcome && partner_outcome === 1) {
                    pointsAddedAvatar1 = 8;
                    pointsAddedAvatar2 = 8;
                } else {
                    pointsAddedAvatar1 = 4;
                    pointsAddedAvatar2 = 4;
                }
            } else if (mode === 'soloLow') {
                pointsAddedAvatar1 = lastTrialData.outcome ? (partner_outcome === 0 ? 4 : 8) : 4;
            }

            avatar1TotalPoints += pointsAddedAvatar1;
            avatar2TotalPoints += pointsAddedAvatar2;

            feedbackText = groupOrSolo === "group"
                ? generateAvatarFeedback(selectedAvatarImg, `+${pointsAddedAvatar1}`, `+${pointsAddedAvatar2}`, avatar1TotalPoints, avatar2TotalPoints, avatarResponse)
                : generateSoloAvatarFeedback(selectedAvatarImg, `+${pointsAddedAvatar1}`, avatar1TotalPoints, avatarResponse);

            return feedbackText;
        },
        choices: "NO_KEYS",
        trial_duration: 3500,
        on_finish: (data) => {
            data.randomAssignment = randomAssignment;
            data.avatar1TotalPoints = avatar1TotalPoints;
            data.avatar2TotalPoints = avatar2TotalPoints;
            data.pointsAddedAvatar1 = pointsAddedAvatar1; 
            data.pointsAddedAvatar2 = pointsAddedAvatar2;
            data.groupOrSolo = groupOrSolo;
            data.MI = MI;
            data.trialNumber = trialNumber;
            trialNumber++;
            data.shape = jsPsych.data.get().last(2).values()[0].shape;
            data.selected_color = jsPsych.data.get().last(2).values()[0].selected_color;
            data.trialType = jsPsych.data.get().last(2).values()[0].trialType;
            data.partner_outcome = jsPsych.data.get().last(2).values()[0].partner_outcome;
            data.rt = jsPsych.data.get().last(2).values()[0].rt;
            isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
            console.log(data); 
        }
    };
}


function MakeRoundIntro(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `firstRoundIntro_${round}` },
        stimulus: () => {
            if (round === "V1") {
                return `<div style='font-size:35px'><p>Get ready to press your SPACE BAR!</p></div>`; 
            } else {
                return `<div style='font-size:35px'><p>Get ready to press your SPACE BAR!</p></div>`;
            }
        },
        choices: "NO_KEYS",
        trial_duration: 2000,
    };
} 

/*
function MakeRoundIntro(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `firstRoundIntro_${round}` },
        stimulus: () => {
            if (round == 'V1') {
                return settings.gameTypeOrder == 0  
                    ? `<div style='font-size:35px'><p>Get ready for the first round!</p></div>` 
                    : `<div style='font-size:35px'><p>Get ready for the first tile!</p></div>`;
            } else {
                return settings.gameTypeOrder == 0  
                    ? `<div style='font-size:35px'><p>Get ready for the first tile!</p></div>` 
                    : `<div style='font-size:35px'><p>Get ready for the first round!</p></div>`;
            }
        },
        choices: "NO_KEYS",
        trial_duration: 2000,
    };
} */

var ITI = [250, 500, 750, 1000, 1250, 1500, 1750, 2000]

function MakeDelay(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "",
        choices: [' '],  // Spacebar response
        trial_duration: () => jsPsych.randomization.sampleWithoutReplacement(ITI, 1)[0],
        on_finish: (data) => {
            data.TooFast = data.response === " " ? 1 : 0;
            data.trial_Name = 'MakeDelay';
        }
    };
}

function MakeTooFast(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        choices: [],  // Disables any response
        stimulus: () => {
            const lastKeyPress = jsPsych.data.get().last(1).values()[0].response;
            return lastKeyPress === " " ? `<div style='font-size: 20px'><p>Too Fast!</p><p>Please wait for the tile to appear before pressing your SPACE BAR! </p></div>` : '';
        },
        trial_duration: () => {
            const lastKeyPress = jsPsych.data.get().last(1).values()[0].response;
            return lastKeyPress === " " ? 2500 : 0;
        },
        post_trial_gap: () => {
            const lastKeyPress = jsPsych.data.get().last(1).values()[0].response;
            return lastKeyPress === " " ? 1000 : 0;
        }, // <- Added missing comma here
        on_finish: (data) => {
            data.trial_Name = 'MakeTooFast';
        } 
    };
}


/*
p.foundPartner = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Get ready. Loading game now...</p>
            <div class="loading-bar-container">
                <div class="loading-bar"></div>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 10000,  // Total time for loading screen
    on_load: () => {
        const css = `
            #loading-text {
                width: 250px;
                margin: 0 auto;
            }
            .loading-bar-container {
                width: 100%;
                height: 20px;
                background-color: #f3f3f3;
                border-radius: 10px;
                overflow: hidden;
                margin: 20px auto;
            }
            .loading-bar {
                width: 0;
                height: 100%;
                background-color: #6b6d6e;
                animation: load 3s forwards;
            }
            @keyframes load {
                0% { width: 0; }
                100% { width: 100%; }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    },
    on_finish: (data) => {
        data.loading_completed = true;
    }
}; */

p.findingPartner = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Please be patient. <p> <p>This could take a few minutes. </p>
            <div class="spinner-container">
                <div class="spinner-wheel"></div>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 10000,  // Duration of the loading screen in milliseconds
    on_load: () => {
        const css = `
            #loading-text {
                width: 250px;
                margin: 0 auto;
            }
            .spinner-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px auto;
            }
            .spinner-wheel {
                width: 50px;
                height: 50px;
                border: 6px solid #f3f3f3;
                border-top: 6px solid #6b6d6e;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    },
    on_finish: (data) => {
        data.loading_completed = true;
        data.trial_Name = 'findingPartner';
    }
};

/*
p.partnerAvatar = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> You've been paired with another participant. Please get ready. The game will start momentarily.</p>
            <div class="loading-bar-container">
                <div class="loading-bar"></div>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 2000,  // Duration of the loading screen in milliseconds, 15 seconds
    on_load: () => {
        const css = `
            #loading-text {
                width: 250px;
                margin: 0 auto;
            }
            .loading-bar-container {
                width: 100%;
                height: 20px;
                background-color: #f3f3f3;
                border-radius: 10px;
                overflow: hidden;
                margin: 20px auto;
            }
            .loading-bar {
                width: 0;
                height: 100%;
                background-color: #6b6d6e;
                animation: load 1.5s forwards;
            }
            @keyframes load {
                0% { width: 0; }
                80% { width: 80%; }
                100% { width: 100%; }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);

    },
    on_finish: (data) => {
        console.log(data);
        data.loading_completed = true;
    }
}; 

*/
p.partnerNext = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p> You've been paired with another participant. <p> The game will start momentarily.</p>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 4000,  // Duration of the loading screen in milliseconds, 15 seconds
    on_finish: (data) => {
        console.log(data);
        data.loading_completed = true;
        data.trial_Name = 'partnerNext'
    }
};

    // trial variables
    var LLTrialCircle = new LLTrial('circle'),
        LLTrialSquare = new LLTrial('square'),
        LWTrialCircleGroup = new LWTrial('circle', 'group'),
        LWTrialCircleSolo = new LWTrial('circle', 'solo'),
        LWTrialSquareGroup = new LWTrial('square', 'group'),
        LWTrialSquareSolo = new LWTrial('square', 'solo'),
        WLTrialCircle = new WLTrial('circle'),
        WLTrialSquare = new WLTrial('square'),
        WWTrialCircleGroup = new WWTrial('circle', 'group'),
        WWTrialCircleSolo = new WWTrial('circle', 'solo'),
        WWTrialSquareGroup = new WWTrial('square', 'group'),
        WWTrialSquareSolo = new WWTrial('square', 'solo'),
        feedbackGroupHigh = new MakeFeedback('groupHigh'),
        feedbackGroupLow = new MakeFeedback('groupLow'),
        feedbackSoloHigh = new MakeFeedback('soloHigh'),
        feedbackSoloLow = new MakeFeedback('soloLow'),
        avatarChoice1 = new MakeAvatarSelection(),
        delayR1 = new MakeDelay('R1'),
        delayR2 = new MakeDelay('R2'),
        tooFastR1 = new MakeTooFast('R1'),
        tooFastR2 = new MakeTooFast('R2'),
        roundIntroV1 = new MakeRoundIntro('V1'),
        roundIntroV2 = new MakeRoundIntro('V2'),
        introPart2 = makeIntroPart2(),
       // introR1Part3 = makeR1Part3(),
        introR1SoloHigh = makeR1SoloHigh(),
        introR2part1 = makeR2part1()
   //     introR2part2 = makeR2part2()

    const delayLoopR1 = {
        timeline:[delayR1, tooFastR1],
        loop_function: function(data) {
            let tooFastArray = jsPsych.data.get().select('TooFast').values;
            let loop = tooFastArray[tooFastArray.length - 1];
            console.log(tooFastArray, loop);
            if (loop) { return true }
            return false
        }
    }

    const delayLoopR2 = {
        timeline:[delayR2, tooFastR2],
        loop_function: function(data) {
            let tooFastArray = jsPsych.data.get().select('TooFast').values;
            let loop = tooFastArray[tooFastArray.length - 1];
            console.log(tooFastArray, loop);
            if (loop) { return true }
            return false
        }
    }

    p.task.round1Intro = {
        timeline: [roundIntroV1],
    }; 

    p.task.round2Intro = {
        timeline: [roundIntroV2],
    }; 

    p.intro.r1part2 = {
        timeline: [introPart2],
    };  
/*
    p.intro.r1part3 = {
        timeline: [introR1Part3],
    };  */

    p.intro.r1soloHigh = {
        timeline: [introR1SoloHigh],
    }; 

    p.intro.round1Avatars = {
        timeline: [avatarChoice1],
    }; 

    p.intro.r2part1 = {
        timeline: [introR2part1],
    }; 
 /*
    p.intro.r2part2 = {
        timeline: [introR2part2],
    }; 
*/

//Solo Squares - High
 const LLLoopSoloSquareHigh = {
     timeline: [delayLoopR1, LLTrialSquare, feedbackSoloHigh] 
    };  

    const WWLoopSoloSquareHigh = {
     timeline: [delayLoopR1, WWTrialSquareSolo, feedbackSoloHigh] 
    };

    const LWLoopSoloSquareHigh = {
     timeline: [delayLoopR1, LWTrialSquareSolo, feedbackSoloHigh]
    };  

    const WLLoopSoloSquareHigh = {
     timeline: [delayLoopR1, WLTrialSquare, feedbackSoloHigh]
    };  

//Solo Squares - Low
 const LLLoopSoloSquareLow = {
     timeline: [delayLoopR1, LLTrialSquare, feedbackSoloLow]
    };  

    const WWLoopSoloSquareLow = {
     timeline: [delayLoopR1, WWTrialSquareSolo, feedbackSoloLow] 
    };

    const LWLoopSoloSquareLow = {
     timeline: [delayLoopR1, LWTrialSquareSolo, feedbackSoloLow]
    };  

    const WLLoopSoloSquareLow = {
     timeline: [delayLoopR1, WLTrialSquare, feedbackSoloLow]
    };  

//Group Squares - High
    const LLLoopGroupSquareHigh = {
     timeline: [delayLoopR1, LLTrialSquare, feedbackGroupHigh]
    };  

    const WWLoopGroupSquareHigh = {
     timeline: [delayLoopR1, WWTrialSquareGroup, feedbackGroupHigh]
    };

    const LWLoopGroupSquareHigh = {
     timeline: [delayLoopR1, LWTrialSquareGroup, feedbackGroupHigh]
    };  

    const WLLoopGroupSquareHigh = {
     timeline: [delayLoopR1, WLTrialSquare, feedbackGroupHigh]
    };


//Group Squares - Low
    const LLLoopGroupSquareLow = {
     timeline: [delayLoopR1, LLTrialSquare, feedbackGroupLow]
    }; 

    const WWLoopGroupSquareLow = {
     timeline: [delayLoopR1, WWTrialSquareGroup, feedbackGroupLow] 
    };

    const LWLoopGroupSquareLow = {
     timeline: [delayLoopR1, LWTrialSquareGroup, feedbackGroupLow] 
    };  

    const WLLoopGroupSquareLow = {
     timeline: [delayLoopR1, WLTrialSquare, feedbackGroupLow]
    };

//Solo Circles - High
    const LLLoopSoloCircleHigh = {
     timeline: [delayLoopR1, LLTrialCircle, feedbackSoloHigh]
    };

    const WWLoopSoloCircleHigh = {
     timeline: [delayLoopR1, WWTrialCircleSolo, feedbackSoloHigh]
    };

    const LWLoopSoloCircleHigh = {
     timeline: [delayLoopR1, LWTrialCircleSolo, feedbackSoloHigh]
    };  

    const WLLoopSoloCircleHigh = {
     timeline: [delayLoopR1, WLTrialCircle, feedbackSoloHigh]
    };  

//Solo Circles - Low
    const LLLoopSoloCircleLow = {
     timeline: [delayLoopR1, LLTrialCircle, feedbackSoloLow]
    };

    const WWLoopSoloCircleLow = {
     timeline: [delayLoopR1, WWTrialCircleSolo, feedbackSoloLow]
    };

    const LWLoopSoloCircleLow = {
     timeline: [delayLoopR1, LWTrialCircleSolo, feedbackSoloLow]
    };  

    const WLLoopSoloCircleLow = {
     timeline: [delayLoopR1, WLTrialCircle, feedbackSoloLow] 
    };  

//Group Circle High

    const LLLoopGroupCircleHigh = {
     timeline: [delayLoopR1, LLTrialCircle, feedbackGroupHigh]
    };  

    const WWLoopGroupCircleHigh = {
     timeline: [delayLoopR1, WWTrialCircleGroup, feedbackGroupHigh]
    };

    const LWLoopGroupCircleHigh = {
     timeline: [delayLoopR1, LWTrialCircleGroup, feedbackGroupHigh]
    };  

    const WLLoopGroupCircleHigh = {
     timeline: [delayLoopR1, WLTrialCircle, feedbackGroupHigh]
    };

  //Group Circle Low  

    const LLLoopGroupCircleLow = {
     timeline: [delayLoopR1, LLTrialCircle, feedbackGroupLow]
    };  

    const WWLoopGroupCircleLow = {
     timeline: [delayLoopR1, WWTrialCircleGroup, feedbackGroupLow]
    };

    const LWLoopGroupCircleLow = {
     timeline: [delayLoopR1, LWTrialCircleGroup, feedbackGroupLow]
    };  

    const WLLoopGroupCircleLow = {
     timeline: [delayLoopR1, WLTrialCircle, feedbackGroupLow]
    };


    p.task.SoloCircleLow = {
        timeline: [WWLoopSoloCircleLow, LLLoopSoloCircleLow, LWLoopSoloCircleLow, WLLoopSoloCircleLow],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.SoloCircleHigh = {
        timeline: [WWLoopSoloCircleHigh, LLLoopSoloCircleHigh, LWLoopSoloCircleHigh, WLLoopSoloCircleHigh],
        randomize_order: true,
        repetitions: noOfTrials,
    }; 

    p.task.GroupCircleLow = {
        timeline: [WWLoopGroupCircleLow, LLLoopGroupCircleLow, LWLoopGroupCircleLow,  WLLoopGroupCircleLow],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.GroupCircleHigh = {
        timeline: [WWLoopGroupCircleHigh, LLLoopGroupCircleHigh, LWLoopGroupCircleHigh,  WLLoopGroupCircleHigh],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.SoloSquareLow = {
        timeline: [WWLoopSoloSquareLow, LLLoopSoloSquareLow, LWLoopSoloSquareLow, WLLoopSoloSquareLow],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.SoloSquareHigh = {
        timeline: [WWLoopSoloSquareHigh, LLLoopSoloSquareHigh, LWLoopSoloSquareHigh, WLLoopSoloSquareHigh],
        randomize_order: true,
        repetitions: noOfTrials,
    };  

    p.task.GroupSquareLow = {
        timeline: [WWLoopGroupSquareLow, LLLoopGroupSquareLow, LWLoopGroupSquareLow,  WLLoopGroupSquareLow],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.GroupSquareHigh = {
        timeline: [WWLoopGroupSquareHigh, LLLoopGroupSquareHigh, LWLoopGroupSquareHigh,  WLLoopGroupSquareHigh],
        randomize_order: true,
        repetitions: noOfTrials,
    };


   /*
    *
    *   QUESTIONS
    *
    */

    p.Qs = {};

    const FlowScale = ['0<br>Not at all', '1<br>', '2<br>', '3<br>', '4<br>', '5<br>', '6<br>', '7<br>','8<br>Extremely'];
    
p.flowMeasure = {
    type: jsPsychSurveyLikert,
    preamble: () => {
    let isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
    console.log(isSecondTime + 'isSecondTime');
    
    return `<div style='padding-top: 50px; width: 900px; font-size:16px'> 
        <p> Throughout the ${isSecondTime ? textNew.game2 : textNew.game1}, to what extent did you feel immersed 
        and engaged in what you were doing? 
        <p>To report how immersed and engaged you felt, please answer the following questions.</p>
        </div>`;
},
            questions: () => {
                let isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
                return [
        {
            prompt: `How <b>immersed</b> did you feel playing the ${isSecondTime ? textNew.game2 : textNew.game1}?`,
            name: `flow_0`,
            labels: FlowScale,
            required: true,
        },
        {
            prompt: `How <b>engaged</b> did you feel playing the ${isSecondTime ? textNew.game2 : textNew.game1}?`,
            name: `flow_1`,
            labels: FlowScale,
            required: true,
        },
        {
            prompt: `How <b>engrossed</b> did you feel playing the ${isSecondTime ? textNew.game2 : textNew.game1}?`,
            name: `flow_2`,
            labels: FlowScale,
            required: true,
        },
        {
            prompt: `How <b>absorbed</b> did you feel playing the ${isSecondTime ? textNew.game2 : textNew.game1}?`,
            name: `flow_3`,
            labels: FlowScale,
            required: true,
        },
        {
            prompt: `How <b>bored</b> did you feel playing the ${isSecondTime ? textNew.game2 : textNew.game1}?`,
            name: `flow_4`,
            labels: FlowScale,
            required: true,
        },
    ];
},
    randomize_question_order: false,
    scale_width: 600,
    on_finish: function(data) {
        data.randomAssignment = randomAssignment;
        data.trialNumber = trialNumber;
        data.isSecondTime = isSecondTime;
        data.shape = jsPsych.data.get().last(2).values()[0].shape;
        data.MI = jsPsych.data.get().last(2).values()[0].MI;
        data.groupOrSolo = jsPsych.data.get().last(2).values()[0].groupOrSolo;
        data.selected_color = jsPsych.data.get().last(2).values()[0].selected_color;
        data.avatar1TotalPoints = jsPsych.data.get().last(2).values()[0].avatar1TotalPoints;
        data.avatar2TotalPoints = jsPsych.data.get().last(2).values()[0].avatar2TotalPoints;


        isSecondTime = true;
        data.isSecondTime = isSecondTime;
        jsPsych.data.addProperties({isSecondTime});

         const flowKeys = Object.keys(data.response); 
         const flowResponses = {};
         flowKeys.forEach(key => {
         flowResponses[key] = data.response[key];
     });

    Object.assign(data, flowResponses);

    console.log(data)
    }
};


const html = {        
    postTask: [
            `<div class='parent'>
                <p>Thank you!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ]
}

  p.end = {
        type: jsPsychHtmlButtonResponse,
        stimulus: '<p>Thank you! Please press the button to submit your response and exit the page. </p>',
        choices: ['Submit!'],
        on_finish: (data) => {
            saveSurveyData(data); 
            },
        };


    p.save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "c0WEQcyEu6GO",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
    }; 


 p.demographics = (function() {


        const taskComplete = {
            type: jsPsychInstructions,
            pages: html.postTask,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const gender = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your gender?</p>',
            choices: ['Male', 'Female', 'Other'],
            on_finish: (data) => {
                data.gender = data.response;
            }
        };

        const age = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Age:", name: "age"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const ethnicity = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your race?</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
            on_finish: (data) => {
                data.ethnicity = data.response;
            }
        };

        const english = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
            on_finish: (data) => {
                data.english = data.response;
            }
        };  

        const sus = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Did you find anything suspicious during the experiment?", rows: 10, columns: 100, name: "sus"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 


        const finalWord = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Questions? Comments? Complaints? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const pid = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Please enter your Prolific ID in the space below to receive payment.", rows: 1, columns: 50, name: "pid"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [taskComplete, gender, age, ethnicity, english, sus, finalWord, pid]
        };

        return demos;

    }());


    return p;

}());
