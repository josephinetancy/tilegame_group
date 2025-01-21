// Define Stimuli
let p = {};

var streakGame = (function() {

    //CREATE VARIABLES FOR PARTICIPANT LOSE DURATION


    // randomly assign to conditions
    var settings = {
        colorOrder: 0,
        pM: .5, //probability?
        pEM: [10, 10],///???
        gameTypeOrder: 0,
        val: 10, //how much they earn
        nTrials: 62, //number of trials per condition
        basePay: 10,
    };

    // create text variables for instructions
    

    var text = {
        game1: settings.colorOrder == 1 ? 'Green Game' : 'Blue Game', //text.game1 = blue game
        color1: settings.colorOrder == 1 ? 'green' : 'blue', 
        hex1: settings.colorOrder == 1 ? '#00aa00' : '#1067e8',
        span1: settings.colorOrder == 1 ? 'a-span' : 'b-span',
        game2: settings.colorOrder == 0 ? 'Green Game' : 'Blue Game',
        color2: settings.colorOrder == 0 ? 'green' : 'blue',
        hex2: settings.colorOrder == 0 ? '#00aa00' : '#1067e8',
        span2: settings.colorOrder == 0 ? 'a-span' : 'b-span',
        value: settings.val.toString(),
        plural: settings.val == 1 ? '' : 's', 
        wasWere: settings.val == 1 ? 'was' : 'were'
    }; 


 const outerCircleActivation = Math.random() < 0.5 ? 'gray' : 'yellow';


// Function to update the stim colors dynamically


var stim = {
    r1: {
        m0: `<div class="box" style="background-color:white"> </div>`, // both didn't hit it
        m1: `<div class="outer-circle" style="background-color: blue; 
            width: 150px; height: 150px; border-radius: 50%; 
            border: 5px solid black; display: flex; align-items:center; justify-content:center;">
            <div class="inner-circle" style="background-color:blue; border: 5px solid black;
                width: 100px; height: 100px; border-radius: 50%;"></div>
        </div>`, // both hit it
        m2: `<div class="outer-circle" style="background-color: gray; 
            width: 150px; height: 150px; border-radius: 50%; 
            border: 5px solid black; display: flex; align-items:center; justify-content:center;">
            <div class="inner-circle" style="background-color:blue; border: 5px solid black;
                width: 100px; height: 100px; border-radius: 50%;"></div>
        </div>`, // I hit it, you didn't
        m3: `<div class="outer-circle" style="background-color: blue; 
            width: 150px; height: 150px; border-radius: 50%; 
            border: 5px solid black; display: flex; align-items:center; justify-content:center;">
            <div class="inner-circle" style="background-color:gray; border: 5px solid black;
                width: 100px; height: 100px; border-radius: 50%;"></div>
        </div>`, // You hit it, I didn't
    }
};  


function updateStimColors(backgroundColor) {
    stim.r1.m0 = `<div class="box" style="background-color:white"> </div>`;
    stim.r1.m1 = `<div class="outer-circle" style="background-color: #2669ee; 
        width: 150px; height: 150px; border-radius: 50%; 
        border: 5px solid black; display: flex; align-items:center; justify-content:center;">
        <div class="inner-circle" style="background-color: ${backgroundColor}; border: 5px solid black;
            width: 100px; height: 100px; border-radius: 50%;"></div>
    </div>`;

    stim.r1.m2 = `<div class="outer-circle" style="background-color: gray; 
        width: 150px; height: 150px; border-radius: 50%; 
        border: 5px solid black; display: flex; align-items:center; justify-content:center;">
        <div class="inner-circle" style="background-color: ${backgroundColor}; border: 5px solid black;
            width: 100px; height: 100px; border-radius: 50%;"></div>
    </div>`;

    stim.r1.m3 = `<div class="outer-circle" style="background-color: #2669ee; 
        width: 150px; height: 150px; border-radius: 50%; 
        border: 5px solid black; display: flex; align-items:center; justify-content:center;">
        <div class="inner-circle" style="background-color: gray; border: 5px solid black;
            width: 100px; height: 100px; border-radius: 50%;"></div>
    </div>`;
} 


   /*
    *
    *   INSTRUCTIONS
    *
    */


    p.intro = {}

    // temporary data
    var compAns1,
        compAns2,
        pages = {
            r1: {
                part1: [`<div class='parent'>
                <p> Welcome to the "Tile Game"! </p>
                <p>We are interested in your response in playing a game. </p> 
                <p>After playing two versions of the game, you'll report how immersed and engaged you felt.</p>
                </div>`,

                `<div class='parent'>
                <p>The goal of the game is to win as much money as possible.</p>
                <p>All of the money you win during the game will be added to a "bonus fund,"<br>which you'll receive at the end of the study.</p>
                <p>Your total payment will be $X for your participation, plus all of the money in your bonus fund.</p>
                </div>`,

                `<div class='parent'>
                <p>In each version of the game, you'll have 50 chances to "activate" tiles like this one per each version of the game.<br>
                <p>The tiles will appear on your screen, then disappear very quickly.</p> 
                <p> To activate a tile, you must press your SPACE BAR before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible. </p>
                <p>Watch the video below to see how it works. </p>
                <p>INSERT GIF HERE?</p>
                </div>`,

                `<div class='parent'>
                <p>The more tiles you activate, the more money you'll earn.</p>
                <p>Specifically, X cents will be added to your bonus fund for each round you win.</p>               
                </div>`,

                `<div class='parent'>
                <p>In the round game, the tiles are round.</p>
                <p>We will randomly assign you to either play the outer circle or the inner circle. </p>
                <p>To activate the round tile, you must press your SPACE BAR before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible.
                <p>Insert GIF HERE</p></div>
                </div>`,

                `<div class='parent'>
                <p>In the square game, the tiles are square.</p>
                <p>We will randomly assign you to either play the outer square or the inner square. </p>
                <p>To activate the square tile, you must press your SPACE BAR before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible.
                <p>Insert GIF HERE</p></div>
                </div>`,

                `<div class='parent'>
                <p>You may also play with a partner or play without a partner. </p> </div> </div>`], 


                part2Bern: [`<div class='parent'>
                <p>To earn money, you must achieve wins.<br>
                The more wins you achieve, the more money you'll earn.</p>
                </div>`,

                `<div class='parent'>
                <p>To achieve wins, you'll try to "activate" tiles like this one.<br>
                Activating a tile results in a win.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Wins are worth money. The more tiles you activate, the more money you'll earn.<br>
                Specifically, ${settings.val} cent will be added to your bonus fund for each tile you activate.</p>               
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Tiles will appear on your screen, then disappear very quickly. To activate a tile, you must press your SPACE BAR 
                before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>In the tiles turn 
                when activated.</p>
                <div class='box' style='background-color:#1067e8'></div>
                </div>`,

                `<div class='parent'>
                <p>If you activate a tile, you'll see that ${text.value} cent${text.plural} ${text.wasWere} added to your bonus fund.<br>
                The next tile will appear immediately after.</p>
                <div style='font-size:35px'><p>You activated it!</p><p>+${settings.val} cent${text.plural}</p><p><br></p><p>(Get ready for the next tile!)</p></div>
                </div>`,

                `<div class='parent'>
                <p>If you miss a tile, you'll see that no money was added to your bonus fund.<br>
                The next tile will appear immediately after.</p>
                <div style='font-size:35px'><p>You missed</p><p>+0 cents</p><p><br></p><p>(Get ready for the next tile!)</p></div>
                </div>`],

                part3: [`<div class='parent'>
                <p>You are now ready to play the <span class='${text.span1}'>${text.game1}</span>.</p>
                <p>Once you proceed, the <span class='${text.span1}'>${text.game1}</span> will start immediately, 
                so get ready to press your SPACEBAR.</p>
                <p>Continue to the next screen to begin.</p>
                </div>`]
            },
            r2: {
                part1: [`<div class='parent'>
                <p>Thank you for playing the <span class='${text.span1}'>${text.game1}</span>!</p>
                When you're ready, continue to learn about and play the <span class='${text.span2}'>${text.game2}</span>.</p>
                </div>`,

                `<div class='parent'>
                <p>The <span class='${text.span2}'>${text.game2}</span> is identical to the 
                <span class='${text.span1}'>${text.game1}</span> with two exceptions.</p>
                </div>`],

                part2Chunk: [`<div class='parent'>
                <p>First, in the <span class='${text.span2}'>${text.game2}</span>, tiles turn <span class='${text.span2}'>${text.color2}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex2}'></div>
                </div>`,

                `<div class='parent'>
                <p>Second, the <span class='${text.span2}'>${text.game2}</span> is divided into multiple, short rounds.</p>
                <p>In each round, you'll have five chances to activate a tile.<br>
                If you activate a tile before your five chances are up, you'll win the round.</p>
                </div>`,

                `<div class='parent'>
                <p>The more rounds you win, the more money you'll earn.<br>
                Specifically, ${settings.val} cent${text.plural} will be added to your bonus fund for each round you win.</p>               
                </div>`,

                `<div class='parent'>
                <p>If you activate a tile before your five chances are up, you'll see that you won the round<br>
                and ${text.value} cent${text.plural} ${text.wasWere} to your bonus fund. The next round will start immediately after.</p>
                <div style='font-size:35px'><p>You won the round!</p><p>+${settings.val} cent${text.plural}</p><p><br></p><p>(Get ready for the next round!)</p></div>
                </div>`,

                `<div class='parent'>
                <p>If you fail to activate a tile before your five chances are up, you'll see that you lost the round<br>
                and no money was added to your bonus fund. The next round will start immediately after.</p>
                <div style='font-size:35px'><p>You lost the round</p><p>+0 cents</p><p><br></p><p>(Get ready for the next round!)</p></div>
                </div>`,

                `<div class='parent'>
                <p>Each time you miss a tile, you'll see how many more chances you have left in the current round.<br>
                For example, if you have three chances left to activate a tile in the current round, you'll see this message:</p>
                <div style='font-size:35px'><p><span style='color:${text.color2}; font-size:60px'>3</span></p><p>Chances left</p></div>
                </div>`],

                part2Bern: [`<div class='parent'>
                <p>First, in the <span class='${text.span2}'>${text.game2}</span>, tiles turn <span class='${text.span2}'>${text.color2}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex2}'></div>
                </div>`,

                `<div class='parent'>
                <p>Second the <span class='${text.span2}'>${text.game2}</span> is not divided into multiple, short rounds.<br>
                Instead, it in played in a single, long round.<p>
                </div>`,

                `<div class='parent'>
                <p>Throughout the single, long round of the <span class='${text.span2}'>${text.game2}</span>,<br>you'll earn ${settings.val} cent${text.plural} for each tile you activate.<br>
                </div>`,

                `<div class='parent'>
                <p>Each time you activate a tile, you'll see that ${text.value} cent${text.plural} ${text.wasWere} added to your bonus fund.<br>
                The next tile will appear immediately after.</p>
                <div style='font-size:35px'><p>You activated it!</p><p>+${settings.val} cent${text.plural}</p><p><br></p><p>(Get ready for the next tile!)</p></div>
                </div>`,

                `<div class='parent'>
                <p>Each time you miss a tile, you'll see that no money was added to your bonus fund.<br>
                The next tile will appear immediately after.</p>
                <div style='font-size:35px'><p>You missed</p><p>+0 cents</p><p><br></p><p>(Get ready for the next tile!)</p></div>
                </div>`],

                part3: [`<div class='parent'>
                <p>You are now ready to play the <span class='${text.span2}'>${text.game2}</span>.</p>
                <p>Once you proceed, the <span class='${text.span2}'>${text.game2}</span> will start immediately, 
                so get ready to press your SPACEBAR.</p>
                <p>Continue to the next screen to begin.</p>
                </div>`]
            }
        };

/*
    // constructor function for round 1 comprehension check loop
    function MakeLoop(span, game, color, round) {
        
        var attnChk1Scale = ['True', 'False'];
        var attnChk1Prompt = `The <span class='${span}'>${game}</span> is played in multiple rounds, and you have five chances to activate a tile per round.`
        var attnChk1Name = `attnChk1_${round}`
        var attnChk2Ans = `${text.value} cent${text.plural}`;
        var attnChk2Scale = ["0 cents", "1 cent", "2 cents", "5 cents", "8 cents", "10 cents"];
        var attnChk2Name = `attnChk2_${round}`;
        var attnChk1Ans = settings.gameTypeOrder == 0 ? `True` : `False`
        var attnChk2Prompt = (settings.gameTypeOrder == 0) ? `How much money is added to your bonus fund for each round you win?` : `How much money is added to your bonus fund for each tile you activate?`;
        var instPage = (settings.gameTypeOrder == 0) ? pages.r1.part2Chunk : pages.r1.part2Bern

        var errorMessage = {
            type: "instructions",
            pages: [`<div class='parent'><p>You provided a wrong answer.<br>To make sure you understand the game, please continue to re-read the instructions.</p></div>`],
            show_clickable_nav: true,
        };

        var info = {
            type: "instructions",
            pages: instPage,
            show_clickable_nav: true,
        };

        var compChk1 = {
            type: 'survey-multi-choice',
            preamble: `<div style="font-size:16px"><p>To make sure you understand the <span class='${span}'>${game}</span>, please indicate whether the following statement is true or false:</p></div>`,
            questions: [{prompt: attnChk1Prompt, name: attnChk1Name, options: attnChk1Scale}],
            scale_width: 500,
            on_finish: function(data){
                compAns1 = JSON.parse(data.responses)[attnChk1Name];
            }
        };

        var compChk2 = {
            type: 'survey-multi-choice',
            preamble: `<div style="font-size:16px"><p>To make sure you understand the <span class='${span}'>${game}</span>, please answer the following question:</p></div>`,
            questions: [{prompt: attnChk2Prompt, name: attnChk2Name, options: attnChk2Scale}],
            scale_width: 500,
            on_finish: function(data){
                compAns2 = JSON.parse(data.responses)[attnChk2Name];
            }
        };

        var conditionalNode = {
            timeline: [errorMessage],
            conditional_function: function() {
                return compAns1 != attnChk1Ans || compAns2 != attnChk2Ans;
            }
        };

        this.timeline = [info, compChk1, compChk2, conditionalNode];
        this.loop_function = function(){
            return compAns1 != attnChk1Ans || compAns2 != attnChk2Ans;
        };
    }; */

    // consent form

    const consent = `
    <div class='parent' style='height: 1000px; width: 1000px'>
    <p><b>Adult Consent for Participation in a Research Project<br>
    200 FR 2 (2017-1)</b><br>
    Study Title: Choices, decisions, and pursuits<br>
    Investigator: Josephine Tan & David Melnikoff<br>
    HSC #: 2000023892</p>

    <p><b>Purpose:</b><br>
    You are invited to participate in a research study designed to examine judgment and decision-making.</p>

    <p><b>Procedures:</b><br>
    If you agree to take part, your participation in this study will involve answering a series of questions as well as making choices between different options that will be presented to you as part of study activities. We anticipate that your involvement will require 12-15 minutes.</p>

    <p><b>Compensation:</b><br>
    You will receive $${settings.basePay} in exchange for your participation at the Yale SOM Lab.</p>

    <p><b>Risks and Benefits:</b><br>
    There are no known or anticipated risks associated with this study. Although this study will not benefit you personally, we hope that our results will add to the knowledge about judgment and decision-making.</p>

    <p><b>Confidentiality:</b><br>
    All of your responses will be anonymous.  Only the researchers involved in this study and those responsible for research oversight will have access to any information that could identify you/that you provide. The researcher will not know your name, and no identifying information will be connected to your survey answers in any way. The survey is therefore anonymous.</p>

    <p><b>Voluntary Participation:</b><br>
    Your participation in this study is voluntary. You are free to decline to participate, to end your participation at any time for any reason, or to refuse to answer any individual question without penalty.</p>

    <p><b>Questions:</b><br>
    If you have any questions about this study, you may contact the principal investigator, Paul Stillman, (paul.stillman@yale.edu). If you would like to talk with someone other than the researchers to discuss problems or concerns, to discuss situations in the event that a member of the research team is not available, or to discuss your rights as a research participant, you may contact the Yale University Human Subjects Committee, 203-785-4688, human.subjects@yale.edu. Additional information is available at http://your.yale.edu/research-support/human-research/research-participants</p>

    <p>Would you like to continue to the study? Press the "Next" button to indicate that you consent to participate in the study.</p>`

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

    p.intro.r2part1 = {
        type: jsPsychInstructions,
        pages: pages.r2.part1,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

//    p.intro.r1part2 = new MakeLoop(text.span1, text.game1, text.color1, 'R1');

 //   p.intro.r2part2 = new MakeLoop(text.span2, text.game2, text.color2, 'R2');

    p.intro.r1part3 = {
        type: jsPsychInstructions,
        pages: pages.r1.part3,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r2part3 = {
        type: jsPsychInstructions,
        pages: pages.r2.part3,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

   /*
    *
    *   TASK
    *
    */
/*
AVATAR 
CHOICE 
*/

let selectedAvatarColor = '#2669ee';

// Define the avatar selection task with shuffled images
const avatars = ['avatar/1.jpeg', 'avatar/2.jpeg', 'avatar/3.jpeg'];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const avatarChoices = [
    { color: 'Yellow', img: 'avatar/1.jpeg' },
    { color: 'Green', img: 'avatar/2.jpeg' },
    { color: 'Navy', img: 'avatar/3.jpeg' }
];

// Create the stimulus HTML for the avatars (without buttons)
const avatarImages = avatarChoices.map(choice => 
    `<img src="${choice.img}" style="width: 200px; height: 200px; margin: 0 10px;" alt="${choice.color}">`).join('');

// Define the task
p.avatars = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<div class='parent'>
               <p>Now, you'll choose the color of your avatar to play the game.</p>
               <p>Choose 1 avatar out of the 3 colors below:</p>
               <div class="avatar-selection" style="display: flex; justify-content: center;">
                    <img src="./avatar/avatarsAll.jpg">
               </div>
               </div>`,
        choices: ['Yellow', 'Green', 'Navy'],
        on_finish: (data) => {
            selectedColor = data.response.toString();

        let backgroundColor = '';
        if (selectedColor === '0') {
            backgroundColor = '#FFA827';
        } else if (selectedColor === '1') {
            backgroundColor = '#90CD4C';
        } else if (selectedColor === '2') {
            backgroundColor = '#1E2B4D';
        }
        console.log('Before update:', stim.r1.m1); // Should show old value
        updateStimColors(backgroundColor);
        console.log('After update:', stim.r1.m1);

        console.log('data response', data.response)
        console.log('Selected color:', backgroundColor);
        console.log(stim.r1.m1 + 'in avatar images');
/*
        const selectedChoice = avatarChoices.find(choice => choice.color === selectedColor);
        data.selected_avatar = selectedChoice ? selectedChoice.img : null; */
    }
};

    p.task = {}

    // temporary data
  //  var hitFeedback = new MakeHitFeedback(),
     //   missFeedback = new MakeMissFeedback(),
    var latency = new MakeLatencyArrays(),
        length = 5,
        trialNumber = 0,
        skipFeedback = false,
        ITI = [250, 500, 750, 1000, 1250, 1500, 1750, 2000], //when the button will show up
        hits = 0,
        misses = 0,
        totalJackpotsR1,
        totalJackpotsR2,
        totalJackpots

    function MakeLatencyArrays() {
        this.R1 = makeRT(settings.nTrials, settings.pM);
 //       this.R2 = makeRT(settings.nTrials, settings.pM);
    };

/* 
//
FOR LL TRIAL 
///
*/
function getLLTrialDuration(min = 224, max = 250) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 


//FOR LL//////this trial's duration is 200-250ms, the outer ring does not activate at all. Participants have some chance of getting it if they hit it before 250
function LLTrial(round) {
    let trialStartTime;
    let trialEndTime;

    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: 'combined' },
        stimulus: ` 
            <div id="outer-circle-container" style="position: relative; width: 150px; height: 150px;">
                <div id="outer-circle" style="background-color: gray; width: 150px; height: 150px; 
                    border-radius: 50%; border: 5px solid black; position: absolute;">
                </div>
                <div id="inner-circle" style="background-color: gray; border: 5px solid black;
                    width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 25px; left: 25px;">
                </div>
            </div>`,
        choices: [" "],

        trial_duration: 250,

        on_start: function(trial) {
            trialStartTime = Date.now();
            console.log('LL Trial started');
        },

        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;

            // Save trial data
            data.randomDuration = 1000; // No random outer circle activation in LL trials
            data.trial_duration = trialDuration;

            console.log('LL trial actual duration: ' + trialDuration);
        }
    };
}


/* 
//
FOR WL TRIAL: note will includex specific feedback/response because of adding 100ms in new trial
///
*/

/*
function WLTrial(round) {
    let trialStartTime;
    let trialEndTime;

    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: 'combined' },
        stimulus: ` 
            <div id="outer-circle-container" style="position: relative; width: 150px; height: 150px;">
                <div id="outer-circle" style="background-color: gray; width: 150px; height: 150px; 
                    border-radius: 50%; border: 5px solid black; position: absolute;">
                </div>
                <div id="inner-circle" style="background-color: gray; border: 5px solid black;
                    width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 25px; left: 25px;">
                </div>
            </div>`,
        choices: [" "],
        response_ends_trial: true,
        trial_duration: 750,

        on_start: function(trial) {
            trialStartTime = Date.now();
            console.log('WL Trial started');
        },

        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;

            // Save trial data
            data.randomDuration = 1000; // No random outer circle activation in LL trials
            data.trial_duration = trialDuration;

            console.log('WL trial actual duration: ' + trialDuration);
        }
    };
} 

function WLTrialSecond(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `activation_${round}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const randomDuration = lastTrialData.randomDuration;
            const rt = lastTrialData.rt;
            console.log(randomDuration + ' random duration in WLTRIALSECOND');
            console.log(rt + ' reaction time in WLTRIALSECOND');

            if (lastTrialData.response === " " && randomDuration < rt) {
                console.log("Both win", stim.r1.m1);
                return stim.r1.m1;
            } else if (lastTrialData.response === " " && randomDuration > rt) {
                console.log("Participant wins but fake doesn't", stim.r1.m2);
                return stim.r1.m2;
            } else if ((rt === null || rt === undefined) && randomDuration > lastTrialData.trial_duration) {
                console.log("Both lose", stim.r1.m0);
                return stim.r1.m0;
            } else if ((rt === null || rt === undefined) && randomDuration < lastTrialData.trial_duration) {
                console.log("Participant loses but fake wins", stim.r1.m3);
                return stim.r1.m3;
            }
        },
        choices: [' '],
        response_ends_trial: false,
        trial_duration: 100,
        on_finish: function() {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const randomDuration = lastTrialData.randomDuration;
            const rt = lastTrialData.rt;
            let result; // Store the outcome into data

            if (lastTrialData.response === " " && randomDuration < rt) {
                result = 1;
            } else if (lastTrialData.response === " " && randomDuration > rt) {
                result = 2;
            } else if ((rt === null || rt === undefined) && randomDuration > lastTrialData.trial_duration) {
                result = 3;
            } else if ((rt === null || rt === undefined) && randomDuration < lastTrialData.trial_duration) {
                result = 4;
            }
            console.log(data);

            jsPsych.data.get().last(1).values()[0].result = result;
            jsPsych.data.get().last(2).values()[0].response !== 0 ? misses++ : hits++;
        }
    };
} */


function MakeResponseWL(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `activation_${round}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(2).values()[0];
            const randomDuration = lastTrialData.randomDuration;
            const rt = lastTrialData.rt;
            console.log(randomDuration + ' random duration in make response function');
            console.log(rt + ' reaction time in make response function');
            console.log('Current stim.r1.m1:', stim.r1.m1); 

            if (lastTrialData.response === " " && randomDuration < rt) {
                console.log("Both win", stim.r1.m1);
                return stim.r1.m1;
            } else if (lastTrialData.response === " " && randomDuration > rt) {
                console.log("Participant wins but fake doesn't", stim.r1.m2);
                return stim.r1.m2;
            } else if ((rt === null || rt === undefined) && randomDuration > lastTrialData.trial_duration) {
                console.log("Both lose", stim.r1.m0);
                return stim.r1.m0;
            } else if ((rt === null || rt === undefined) && randomDuration < lastTrialData.trial_duration) {
                console.log("Participant loses but fake wins", stim.r1.m3);
                return stim.r1.m3;
            }
        },
        choices: [' '],
        response_ends_trial: false,
        trial_duration: 1000,
        on_finish: () => {
            const lastTrialData = jsPsych.data.get().last(2).values()[0];
            const randomDuration = lastTrialData.randomDuration;
            const rt = lastTrialData.rt;
            let result; //just to log the result into the data

            if (lastTrialData.response === " " && randomDuration < rt) {
                result = 1;
            } else if (lastTrialData.response === " " && randomDuration > rt) {
                result = 2;
            } else if ((rt === null || rt === undefined) && randomDuration > lastTrialData.trial_duration) {
                result = 3;
            } else if ((rt === null || rt === undefined) && randomDuration < lastTrialData.trial_duration) {
                result = 4;
            }

            jsPsych.data.get().last(1).values()[0].result = result;
            jsPsych.data.get().last(2).values()[0].response !== 0 ? misses++ : hits++;
        }
    };
}



function MakeWLResponse(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `activation_${round}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const randomDuration = lastTrialData.randomDuration;
            const rt = lastTrialData.rt;
            console.log(randomDuration + ' random duration in make response functionWL');
            console.log(rt + ' reaction time in make response functionWL');
            console.log('Current stim.r1.m1:', stim.r1.m1); 

            if (lastTrialData.response === " " && randomDuration < rt) {
                console.log("Both win", stim.r1.m1);
                return stim.r1.m1;
            } else if (lastTrialData.response === " " && randomDuration > rt) {
                console.log("Participant wins but fake doesn't", stim.r1.m2);
                return stim.r1.m2;
            } else if ((rt === null || rt === undefined) && randomDuration > lastTrialData.trial_duration) {
                console.log("Both lose", stim.r1.m0);
                return stim.r1.m0;
            } else if ((rt === null || rt === undefined) && randomDuration < lastTrialData.trial_duration) {
                console.log("Participant loses but fake wins", stim.r1.m3);
                return stim.r1.m3;
            }
        },
        choices: [' '],
        response_ends_trial: false,
        trial_duration: 1000,
        on_finish: function() {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const randomDuration = lastTrialData.randomDuration;
            const rt = lastTrialData.rt;
            let result; // Store the outcome into data

            if (lastTrialData.response === " " && randomDuration < rt) {
                result = 1;
            } else if (lastTrialData.response === " " && randomDuration > rt) {
                result = 2;
            } else if ((rt === null || rt === undefined) && randomDuration > lastTrialData.trial_duration) {
                result = 3;
            } else if ((rt === null || rt === undefined) && randomDuration < lastTrialData.trial_duration) {
                result = 4;
            }

            jsPsych.data.get().last(1).values()[0].result = result;
            jsPsych.data.get().last(2).values()[0].response !== 0 ? misses++ : hits++;
        }
    };
}

//THIS IS TO TELL THE PARTICIPANT "YOU WON OR DID NOT WIN"
function MakeFeedbackWL(round, span, game) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `feedback_${round}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(3).values()[0];
            const randomDuration = lastTrialData.randomDuration;
            const rt = lastTrialData.rt;
            const trialDuration = lastTrialData.trial_duration;
            
            console.log(rt + ' rt in makefeedbackWL');
            console.log(trialDuration + ' last trial data in makefeedbackWL');
            console.log(randomDuration + ' random duration in make feedbackWL');

            let feedbackText = '';

            if (round == 'R1') {
                if (lastTrialData.response == " " && randomDuration > rt) {
                    feedbackText = `<div style='font-size:35px'><p>You activated it but the other participant didn't!</p><p>+6 points for you!</p><p><br></p><p>(Get ready for the next tile!)</p></div>`;
                } else if (lastTrialData.response == " " && randomDuration < rt) {
                    feedbackText = `<div style='font-size:35px'><p>Both activated it!</p><p>+8 points for you!</p><p><br></p><p>(Get ready for the next tile!)</p></div>`;
                } else if ((lastTrialData.response === null || lastTrialData.response === undefined) && randomDuration > trialDuration) {
                    feedbackText = `<div style='font-size:35px'><p>Both lose!</p><p>+2 points for you!</p><p><br></p><p>(Get ready for the next tile!)</p></div>`;
                } else if ((lastTrialData.response === null || lastTrialData.response === undefined) && randomDuration < trialDuration) {
                    feedbackText = `<div style='font-size:35px'><p>The other participant activated it, but you didn't!</p><p>+4 points for you!</p><p><br></p><p>(Get ready for the next tile!)</p></div>`;
                }
            }

            return feedbackText;
        },
        choices: "NO_KEYS",
        trial_duration: 2000,
        on_finish: (data) => {
            data.trialNumber = (data.trialNumber || 0) + 1; // Update trial number
        }
    };
}



/*
//
FOR LW TRIAL
//
*/


/*
//FOR LW///this trial's duration is 250ms, the outer ring activates in 225-249ms (randomized)
function LWTrial(round) {
    let trialStartTime;
    let trialEndTime;
    let randomDuration;

    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: 'combined' },
        stimulus: ` 
            <div id="outer-circle-container" style="position: relative; width: 150px; height: 150px;">
                <div id="outer-circle" style="background-color: gray; width: 150px; height: 150px; 
                    border-radius: 50%; border: 5px solid black; position: absolute;">
                </div>
                <div id="inner-circle" style="background-color: gray; border: 5px solid black;
                    width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 25px; left: 25px;">
                </div>
            </div>`,
        choices: [" "],

        trial_duration: 250,

        on_start: function(trial) {
            trialStartTime = Date.now();
            randomDuration = getFPactivateLW();
            console.log('random Duration that the outer circle becomes highlighted: ' + randomDuration); //ok so the random duration matches up

            jsPsych.pluginAPI.setTimeout(function() {
                const outerCircle = document.getElementById('outer-circle');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = '#2669ee';
                } else {
                    console.error('outer-circle element not found');
                }
            }, randomDuration);
        },
        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;
            data.randomDuration = randomDuration;
            data.trial_duration = trialDuration; 
            console.log('Trial duration in combined trial: ' + trialDuration);
            console.log('Random duration in combined trial: ' + randomDuration);
        }
    };
} */

/*

variables for plugins

*/

///fake participant's activation time for WL and LL trials, that far exceeds trial duration
let partner_rtL = 20000; //for when partner "loses".

///fake participant's activation time is between 225-249 for LW trials
function forLW(min = 225, max = 248) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

///fake participant's activation time is between 250-400 for WW trials
function forWW(min = 225, max = 400) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

let delayforWWandWL = 400;

//trial duration times for WW and WL times: this is the time 
let trialforWins = 750;

//trial duration times for LL and LW times 
let trialforLose = 250;

/* 
//
FOR WW TRIAL WITH PLUG IN 
///
*/


// WW trial
function WWTrial(round) {
    let trialStartTime;
    let trialEndTime;

    return {
        type: jsPsychWWHtmlKeyboardResponse,
        data: { Trial_Type: 'combined' },
        stimulus: ` 
            <div id="outer-circle-container" style="position: relative; width: 150px; height: 150px;">
                <div id="outer-circle" style="background-color: gray; width: 150px; height: 150px; 
                    border-radius: 50%; border: 5px solid black; position: absolute;">
                </div>
                <div id="inner-circle" style="background-color: gray; border: 5px solid black;
                    width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 25px; left: 25px;">
                </div>
            </div>`,
        choices: [" "],
        trial_duration: 30000, // Fallback duration if no response from participant
       // trial_duration: trialforWins, // Fallback duration if no response from participant
        partner_rt: 7000, // Partner reaction time
       // partner_rt: forWW(), // Partner reaction time
        ending_time: 10000,
       // ending_time: delayforWWandWL, // Must be larger than partner_rt and it's the difference between ending_time and participant's RT for the trial end time
        on_start: function(trial) {
            trialStartTime = Date.now(); 
            console.log('Outer circle becomes highlighted at partner reaction time: ' + trial.partner_rt);

            // Highlight the outer circle at the partner reaction time
            jsPsych.pluginAPI.setTimeout(function() {
                const outerCircle = document.getElementById('outer-circle');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = '#2669ee';
                } else {
                    console.error('outer-circle element not found');
                }
            }, trial.partner_rt);
        },
        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;
            data.trial_duration = trialDuration; 

            // Additional logging
            console.log('Reaction time: ' + data.rt);
            console.log('Trial duration: ' + trialDuration);
        }
    };
}


/* 
//
FOR WL TRIAL WITH PLUG IN 
///
*/

// WL trial
function WLTrial(round) {
    let trialStartTime;
    let trialEndTime;

    return {
        type: jsPsychWLHtmlKeyboardResponse,
        data: { Trial_Type: 'combined' },
        stimulus: ` 
            <div id="outer-circle-container" style="position: relative; width: 150px; height: 150px;">
                <div id="outer-circle" style="background-color: gray; width: 150px; height: 150px; 
                    border-radius: 50%; border: 5px solid black; position: absolute;">
                </div>
                <div id="inner-circle" style="background-color: gray; border: 5px solid black;
                    width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 25px; left: 25px;">
                </div>
            </div>`,
        choices: [" "],
        trial_duration: trialforWins, // Fallback duration if no response from participant
        partner_rt: partner_rtL, // Partner reaction time
        ending_time: delayforWWandWL, // Must be larger than partner_rt and it's the difference between ending_time and participant's RT for the trial end time
        on_start: function(trial) {
            trialStartTime = Date.now(); 
            console.log('Outer circle becomes highlighted at partner reaction time: ' + trial.partner_rt);

            trial.data.partner_rt = trial.partner_rt;

            // Highlight the outer circle at the partner reaction time
            jsPsych.pluginAPI.setTimeout(function() {
                const outerCircle = document.getElementById('outer-circle');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = '#2669ee';
                } else {
                    console.error('outer-circle element not found');
                }
            }, trial.partner_rt);
        },
        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;
            data.trial_duration = trialDuration;

            // Additional logging
            console.log('Reaction time: ' + data.rt);
            console.log('Trial duration: ' + trialDuration);
            console.log('Partner RT: ' + data.partner_rt);
        }
    };
}


/* 
//
FOR LW TRIAL WITH PLUG IN 
///
*/


// LW trial
function LWTrial(round) {
    let trialStartTime;
    let trialEndTime;

    return {
        type: jsPsychWLHtmlKeyboardResponse,
        data: { Trial_Type: 'combined' },
        stimulus: ` 
            <div id="outer-circle-container" style="position: relative; width: 150px; height: 150px;">
                <div id="outer-circle" style="background-color: gray; width: 150px; height: 150px; 
                    border-radius: 50%; border: 5px solid black; position: absolute;">
                </div>
                <div id="inner-circle" style="background-color: gray; border: 5px solid black;
                    width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 25px; left: 25px;">
                </div>
            </div>`,
        choices: [" "],
        trial_duration: 300, // Fallback duration if no response from participant
        partner_rt: 220, // Partner reaction time
        ending_time: 750, // Must be larger than partner_rt and it's the difference between ending_time and participant's RT for the trial end time
        on_start: function(trial) {
            trialStartTime = Date.now(); 
            console.log('Outer circle becomes highlighted at partner reaction time: ' + trial.partner_rt);

            trial.data.partner_rt = trial.partner_rt;

            // Highlight the outer circle at the partner reaction time
            jsPsych.pluginAPI.setTimeout(function() {
                const outerCircle = document.getElementById('outer-circle');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = '#2669ee';
                } else {
                    console.error('outer-circle element not found');
                }
            }, trial.partner_rt);
        },
        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;
            data.trial_duration = trialDuration;

            // Additional logging
            console.log('Reaction time: ' + data.rt);
            console.log('Trial duration: ' + trialDuration);
            console.log('Partner RT: ' + data.partner_rt);
        }
    };
}


//FP to activate WW
function getFPactivateWW(min = 250, max = 400) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

/* 
//
Makeresponse + makefeedback for LL and WL below. 
///
*/


///NEW MAKE RESPONSE BASED ON WW 

function MakeWWResponse(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `activation_${round}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            console.log(lastTrialData);
            const partner_rt = lastTrialData.partner_rt;
            const rt = lastTrialData.rt;
            console.log(partner_rt + ' partner rt in make response function');
            console.log(rt + ' reaction time in make response function');

            if (lastTrialData.response === " " && partner_rt < rt) {
                console.log("Both win", stim.r1.m1);
                return stim.r1.m1;
            } else if (lastTrialData.response === " " && partner_rt > rt) {
                console.log("Participant wins but fake doesn't yet", stim.r1.m2);
                return stim.r1.m2;
            } else if ((rt === null || rt === undefined) && partner_rt > lastTrialData.trial_duration) {
                console.log("Both lose", stim.r1.m0);
                return stim.r1.m0;
            } else if ((rt === null || rt === undefined) && partner_rt < lastTrialData.trial_duration) {
                console.log("Participant loses but fake wins", stim.r1.m3);
                return stim.r1.m3;
            }
        },
        choices: [' '],
        response_ends_trial: false,
        trial_duration: 1000,
        on_finish: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const rt = lastTrialData.rt;
            let result; //just to log the result into the data

            if (lastTrialData.response === " " && partner_rt < rt) {
                result = 1;
            } else if (lastTrialData.response === " " && partner_rt > rt) {
                console.log("Participant wins but fake doesn't yet", stim.r1.m2);
                result = 2;
            } else if ((rt === null || rt === undefined) && partner_rt > lastTrialData.trial_duration) {
                result = 3;
            } else if ((rt === null || rt === undefined) && partner_rt < lastTrialData.trial_duration) {
                console.log("Participant loses but fake wins", stim.r1.m3);
                result = 4;
            }
            
            // Logging the result into the data
            jsPsych.data.get().last(1).values()[0].result = result;
            jsPsych.data.get().last(2).values()[0].response !== 0 ? misses++ : hits++;
            console.log(data);
        } // End of on_finish function
    }; // End of return object
} // End of MakeWWResponse function




/*

///MAKE RESPONSE IS FOR THE BLUE TO ACTIVATE FOR THE PARTICIPANT'S RESPONSE
function MakeResponse(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `activation_${round}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const partner_rt = lastTrialData.partner_rt;
            const rt = lastTrialData.rt;
            console.log(partner_rt + ' random duration in make response function');
            console.log(rt + ' reaction time in make response function');
            console.log('Current stim.r1.m1:', stim.r1.m1); 

            if (lastTrialData.response === " " && partner_rt < rt) {
                console.log("Both win", stim.r1.m1);
                return stim.r1.m1;
            } else if (lastTrialData.response === " " && partner_rt > rt) {
                console.log("Participant wins but fake doesn't", stim.r1.m2);
                return stim.r1.m2;
            } else if ((rt === null || rt === undefined) && partner_rt > lastTrialData.trial_duration) {
                console.log("Both lose", stim.r1.m0);
                return stim.r1.m0;
            } else if ((rt === null || rt === undefined) && partner_rt < lastTrialData.trial_duration) {
                console.log("Participant loses but fake wins", stim.r1.m3);
                return stim.r1.m3;
            }
        },
        choices: [' '],
        response_ends_trial: false,
        trial_duration: 1000,
        on_finish: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const randomDuration = lastTrialData.randomDuration;
            const rt = lastTrialData.rt;
            let result; //just to log the result into the data

            if (lastTrialData.response === " " && randomDuration < rt) {
                result = 1;
            } else if (lastTrialData.response === " " && randomDuration > rt) {
                result = 2;
            } else if ((rt === null || rt === undefined) && randomDuration > lastTrialData.trial_duration) {
                result = 3;
            } else if ((rt === null || rt === undefined) && randomDuration < lastTrialData.trial_duration) {
                result = 4;
            }

            jsPsych.data.get().last(1).values()[0].result = result;
            jsPsych.data.get().last(2).values()[0].response !== 0 ? misses++ : hits++;
        }
    };
}

*/
//THIS IS TO TELL THE PARTICIPANT "YOU WON OR DID NOT WIN"
function MakeFeedback(round, span, game) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `feedback_${round}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            const partner_rt = lastTrialData.partner_rt;
            const rt = lastTrialData.rt;
            const trialDuration = lastTrialData.trial_duration;
            
            console.log(rt + ' rt in makefeedback');
            console.log(trialDuration + ' last trial data in makefeedback');
            console.log(partner_rt + ' partner_rt in make feedback');

            let feedbackText = '';

 //           if (round == 'R1') {
                if (lastTrialData.response == " " && partner_rt == partner_rtL) {
                    feedbackText = `<div style='font-size:35px'><p>You activated it but the other participant didn't!</p>
                    <p>+6 points for you!</p><p><br></p><p>(Get ready for the next tile!)</p></div>`;
                } else if (lastTrialData.response == " " && partner_rt < trialDuration && rt < trialDuration) {
                    feedbackText = `<div style='font-size:35px'><p>Both activated it!</p><p>+8 points for you!</p><p>
                    <br></p><p>(Get ready for the next tile!)</p></div>`;
                } else if ((lastTrialData.response === null || lastTrialData.response === undefined) && partner_rt == partner_rtL) {
                    feedbackText = `<div style='font-size:35px'><p>Both lose!</p><p>+2 points for you!</p><p><br>
                    </p><p>(Get ready for the next tile!)</p></div>`;
                } else if ((lastTrialData.response === null || lastTrialData.response === undefined) && rt < trialDuration) {
                    feedbackText = `<div style='font-size:35px'><p>The other participant activated it, but you didn't!</p>
                    <p>+4 points for you!</p><p><br></p><p>(Get ready for the next tile!)</p></div>`;
    //            }
            }

            return feedbackText;
        },
        choices: "NO_KEYS",
        trial_duration: 3000,
        on_finish: (data) => {
            const lastTrialData = jsPsych.data.get().last(2).values()[0];
            const partner_rt = lastTrialData.partner_rt;
            const rt = lastTrialData.rt;
            const trialDuration = lastTrialData.trial_duration;
                if (lastTrialData.response == " " && partner_rt == 1000) {
                    data.result = "WL"; 
                } else if (lastTrialData.response == " " && partner_rt < trialDuration && rt < trialDuration) {
                    data.result = "WW";
                } else if ((lastTrialData.response === null || lastTrialData.response === undefined) && partner_rt == 1000) {
                    data.result = "LL"; 
                } else if ((lastTrialData.response === null || lastTrialData.response === undefined) && rt < trialDuration) {
                    data.result = "LW";
                }
            data.trialNumber = (data.trialNumber || 0) + 1; // Update trial number
            console.log(data);
        }
    };
}

function MakeRoundIntro(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `firstRoundIntro_${round}` },
        stimulus: () => {
            if (round == 'R1') {
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
}

function MakeDelay(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `ITI_${round}` },
        stimulus: "",
        choices: [' '],  // Spacebar response
        trial_duration: () => jsPsych.randomization.sampleWithoutReplacement(ITI, 1)[0],
        on_finish: (data) => {
            data.TooFast = data.response === " " ? 1 : 0;
        }
    };
}

function MakeTooFast(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `tooFastMessage_${round}` },
        choices: [],  // Disables any response
        stimulus: () => {
            const lastKeyPress = jsPsych.data.get().last(1).values()[0].response;
            return lastKeyPress === " " ? `<div style='font-size: 20px'><p>Too Fast!</p><p>Please wait for the tile to appear before pressing your SPACEBAR! </p></div>` : '';
        },
        trial_duration: () => {
            const lastKeyPress = jsPsych.data.get().last(1).values()[0].response;
            return lastKeyPress === " " ? 2500 : 0;
        },
        post_trial_gap: () => {
            const lastKeyPress = jsPsych.data.get().last(1).values()[0].response;
            return lastKeyPress === " " ? 1000 : 0;
        }
    };
}

p.foundPartner= {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> We found someone. Loading game now...</p>
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
};

p.findingPartner = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Finding a partner....</p>
            <div class="loading-bar-container">
                <div class="loading-bar"></div>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 10000,  // Duration of the loading screen in milliseconds, 15 seconds
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
                10% { width: 10%; }
                30% { width: 30%; }
                40% { width: 40%; }
                60% { width: 60%; }
                75% { width: 75%; }
                80% { width: 80%; }
                95% { width: 95%; }
                100% { width: 100%; }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);

        setTimeout(() => {
            document.getElementById('loading-text').innerText = "Still searching...";
        }, 9000);
    },
    on_finish: (data) => {
        data.loading_completed = true;
    }
};

p.partnerAvatar = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Now, waiting for your partner to choose their color of their avatar.</p>
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
        data.loading_completed = true;
    }
};

p.partnerRevealAvatar = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Your partner chose this avatar: </p>
            <img src="./avatar/4.jpg" style="width: 200px; height: 200px; margin: 0 10px">
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 2000,  // Duration of the loading screen in milliseconds, 15 seconds
    on_finish: (data) => {
        data.loading_completed = true;
    }
};

    // trial variables
    var //probeR1 = new MakeProbe('R1'),
       // probeR2 = new MakeProbe('R2'),
     //   combinedTrial = new CombinedTrial('R1'),
        LLTrial = new LLTrial('R1'),
        LWTrial = new LWTrial('R1'),
      //  secondPart = new secondPart('R1'),
        WLTrial = new WLTrial('R1'),
      //  LLresponse = new MakeLLResponse('R1'),
      //  outerR1 = new MakeOuter('R1'),
      //  outerR1 = new MakeOuter('R2'),
        WWTrial = new WWTrial('R1'),
       // responseR1 = new MakeResponse('R1'),
        responseWW = new MakeWWResponse('R1'),
  //      responseR2 = new MakeResponse('R2'),
        responseWL = new MakeResponseWL('R1'),
    //    responseWW = new MakeResponseWW('R1'),
   //     feedbackWW = new MakeFeedbackWW('R1'),
        feedbackWL = new MakeFeedbackWL('R1'),
        feedbackR1 = new MakeFeedback('R1', text.span1, text.game1),
        feedbackR2 = new MakeFeedback('R2', text.span2, text.game2),
        delayR1 = new MakeDelay('R1'),
        delayR2 = new MakeDelay('R2'),
        tooFastR1 = new MakeTooFast('R1'),
        tooFastR2 = new MakeTooFast('R2'),
        roundIntroR1 = new MakeRoundIntro('R1'),
        roundIntroR2 = new MakeRoundIntro('R2')

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
        timeline: [roundIntroR1],
    };


    p.task.round1 = {
  //   timeline: [WLTrialtimeline], //delayloop is the issue
     timeline: [WWTrial, feedbackR1], //delayloop is the issue
   //      timeline: [WWTrial],
       //timeline: [delayLoopR1, combinedTrial, responseR1, feedbackR1], 
        repetitions: 5,
    }; 
/*
p.task.round1 = { 
    timeline: [
        WWTrial,  // First trial
        {
            timeline: [WWTrialSecond, responseWW, feedbackWW],  // Second trial (conditional)
            conditional_function: function() {
                // Get the data from the previous trial (WWTrial)
                const lastTrialData = jsPsych.data.get().last(1).values()[0];
                const randomDuration = lastTrialData.randomDuration;
                const trialDuration = lastTrialData.trial_duration;

                // Check if randomDuration > trial_duration
                return randomDuration > trialDuration;
            }
        },
 //       responseR1,  // Response for round 1
 //       feedbackR1    // Feedback for round 1
    ],
    repetitions: settings.nTrials,
}; */



   /*
    *
    *   QUESTIONS
    *
    */

    p.Qs = {};

    // scales
    var zeroToExtremely = ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8<br>Extremely'];
    var zeroToALot = ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8<br>A lot'];

    // constructor functions
    var flowQs = function(span, name, round) {
        this.type = 'survey-likert';
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px'>

        <p>Thank you for completing the <span class='${span}'>${name}</span>!</strong></p>

        <p>During the <span class='${span}'>${name}</span>, to what extent did you feel immersed 
        and engaged in what you were doing?<br>Report how immersed and engaged you felt by 
        answering the following questions.</p></div>`;
        this.questions = [
            {prompt: `During the <span class='${span}'>${name}</span>, to what extent did you feel absorbed in what you were doing?`,
            name: `absorbed_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel immersed in what you were doing?`,
            name: `immersed_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel engaged in what you were doing?`,
            name: `engaged_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel engrossed in what you were doing?`,
            name: `engrossed_${round}`,
            labels: zeroToExtremely},
        ];
        this.randomize_question_order = false;
        this.scale_width = 500;
    };

    var enjoyQs = function(span, name, round) {
        this.type = 'survey-likert';
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px'>

        <p>Below are a few more questions about the <span class='${span}'>${name}</span>.</p><p>Instead of asking about immersion and
        engagement, these questions ask about <strong>enjoyment</strong>.<br>Report how much you <strong>enjoyed</strong> 
        the <span class='${span}'>${name}</span> by answering the following questions.</p></div>`;
        this.questions = [
            {prompt: `How much did you enjoy playing the <span class='${span}'>${name}</span>?`,
            name: `enjoyable_${round}`,
            labels: zeroToALot},
            {prompt: `How much did you like playing the <span class='${span}'>${name}</span>?`,
            name: `like_${round}`,
            labels: zeroToALot},
            {prompt: `How much did you dislike playing the <span class='${span}'>${name}</span>?`,
            name: `dislike_${round}`,
            labels: zeroToALot},
            {prompt: `How much fun did you have playing the <span class='${span}'>${name}</span>?`,
            name: `fun_${round}`,
            labels: zeroToALot},
            {prompt: `How entertaining was the <span class='${span}'>${name}</span>?`,
            name: `entertaining_${round}`,
            labels: zeroToExtremely},
        ];
        this.randomize_question_order = false;
        this.scale_width = 500;
    };

    var pMQ = function (span, name, round) {
        this.type = 'survey-html-form';
        this.preamble = `<p>In the <span class='${span}'>${name}</span>, you attempted to activate many tiles. 
        <br>What percentage of the tiles do you think you activated successfully?</p>
        <p>In the space below, type a number from 0 to 100<br>indicating the percentage of tiles you think you activated successfully.`;
        this.html = `<p>%<input name="pMBlief_${round}" type="text" /></p>`;
    };
    
    p.Qs.round1 = {
        timeline: [new flowQs(text.span1, text.game1, 'R1'), new enjoyQs(text.span1, text.game1, 'R1'), new pMQ(text.span1, text.game1, 'R1')]
    };

    p.Qs.round2 = {
        timeline: [new flowQs(text.span2, text.game2, 'R2'), new enjoyQs(text.span2, text.game2, 'R2'), new pMQ(text.span2, text.game2, 'R2')]
    };

    p.Qs.demographics = (function() {
        var gender = {
            type: 'html-button-response',
            stimulus: '<p>Gender:</p>',
            choices: ['Male', 'Female', 'Other'],
        };
        var age = {
            type: 'survey-text',
            questions: [{prompt: "Age:", name: "age"}],
        }; 
        var ethnicity = {
            type: 'html-button-response',
            stimulus: '<p>Ethnicity:</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
        };
        var english = {
            type: 'html-button-response',
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
        };  
        var finalWord = {
            type: 'survey-text',
            questions: [{prompt: "Questions? Comments? Complains? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: function(data){
                totalJackpotsR1 = jsPsych.data.get().filter({Trial_Type: 'feedback_R1', Jackpot: true}).count();
                totalJackpotsR2 = jsPsych.data.get().filter({Trial_Type: 'feedback_R2', Jackpot: true}).count();
                totalJackpots = totalJackpotsR1 + totalJackpotsR2;
                data.totalJackpots = totalJackpots;
            },
        }; 
        var email = {
            type: "instructions",
            pages: function() {
                var bonusDollars = Math.ceil( (totalJackpots * settings.val) / 100);
                var totalDollars = bonusDollars + 10
                var text = `<p>Thank you for participating!</p><p>In total, you won <b>${bonusDollars} cents</b> in bonus money!
                <br>To receive your earnings, please give the following code to the administrator: <b>DM${totalDollars*2}</b>.</p>`;
                return [text];
            },
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        var demos = {
            timeline: [gender, age, ethnicity, english, finalWord]
        };

        return demos;
    }());


    return p;

}());
