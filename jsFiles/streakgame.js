// Define Stimuli


var streakGame = (function() {

    var p = {};

    // randomly assign to conditions
    var settings = {
        colorOrder: 0,
        pM: .5,
        pEM: [10, 10],
        gameTypeOrder: 1,
        val: 10,
        nTrials: 62,
        basePay: 10,
    };
    
    // debug mode (find debugging status from URL)
    
//        var debug = false;
//        jsPsych.data.addProperties({
//            debug: jsPsych.data.getURLVariable('debug'),
//        });
//        if (debug = true) {
//                var settings = {
//                 colorOrder: Math.floor(Math.random()*2),
//                 pM: Array('easy', 'hard')[Math.floor(Math.random()*2)],
//                 pEM: [10, 10],
//                 gameTypeOrder: Math.floor(Math.random()*2),
//                 val: 3,
//                 nTrials: 2
//         };
//        }

    // create text variables for instructions
    
    var text = {
        game1: settings.colorOrder == 1 ? 'Green Game' : 'Blue Game',
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

    var stim = {
        r1: {
            m0: `<div class="box" style="background-color:white"> </div>`, //both didn't hit it
            m1: `<div class="outer-circle" style="background-color: blue; 
        width: 150px; height: 150px; border-radius: 50%; 
        border: 5px solid black; display: flex; align-items:center; justify-content:center;">
        <div class="inner-circle" style="background-color:blue; border: 5px solid black;
            width: 100px; height: 100px; border-radius: 50%;"></div>
        </div>`, //both hit it
        m2: `<div class="outer-circle" style="background-color: gray; 
        width: 150px; height: 150px; border-radius: 50%; 
        border: 5px solid black; display: flex; align-items:center; justify-content:center;">
        <div class="inner-circle" style="background-color:blue; border: 5px solid black;
            width: 100px; height: 100px; border-radius: 50%;"></div>
        </div>`, //for when I hit it, and you don't 
        m3: `<div class="outer-circle" style="background-color: blue; 
        width: 150px; height: 150px; border-radius: 50%; 
        border: 5px solid black; display: flex; align-items:center; justify-content:center;">
        <div class="inner-circle" style="background-color:gray; border: 5px solid black;
            width: 100px; height: 100px; border-radius: 50%;"></div>
        </div>`, //for when you hit it, and I don't 
            e1: `success`,
            e0: `failure`
        },
        r2: {
            m1: `<div class="box" style="background-color:${text.hex2}"> </div>`,
            m0: `<div class="box" style="background-color:white"> </div>`,
            e1: `success`,
            e0: `failure`
        }
    };


    const dateObj = new Date();
    const dateStrng = String(dateObj);

    // save condition and URL data
    jsPsych.data.addProperties({
        pM: settings.pM,
        val: settings.val,
        basePay: settings.basePay,
        // pEM: settings.pEM,
        colorOrder: settings.colorOrder,
        chunkSecond: settings.gameTypeOrder,
        startTime: dateStrng,
        subjectID: Math.floor(Math.random() * 10000),
    });

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
                part1: [`<div class='parent' style='text-align: left'>
                <p>Thank you.</p>
                <p>Next, we will introduce you to the survey.</p>
                <p>When you are ready, please continue.</p></div>`,

                `<div class='parent' style='text-align: left'>
                <p>We are designing games that scientists can use to study visual attention. 
                Our goal is to make the games as immersive and engaging as possible.
                To make the games as immersive and engaging as possible, we are getting feedback from people like you.</p>
                <p>You will play two different games of equal length: the <span class='${text.span1}'>${text.game1}</span> and the 
                <span class='${text.span2}'>${text.game2}</span>. After each game, you will report how immersed and engaged you felt.</p>
                <p>The games are very similar, but their color schemes will help you tell them apart.</p>
                <p>Continue to learn about and play the <span class='${text.span1}'>${text.game1}</span>.</p>
                <p>After you finish, you will learn about and play the <span class='${text.span2}'>${text.game2}</span>.</p>
                </div>`,

                `<div class='parent'>
                <p>The goal of the <span class='${text.span1}'>${text.game1}</span> is to win as much money as possible.</p>
                <p>All of the money you win during the <span class='${text.span1}'>${text.game1}</span> will be added to
                a "bonus fund,"<br>which you'll receive at the end of the study.</p>
                <p>Your total payment will be $${settings.basePay} for your participation, plus all of the money in your bonus fund.</p>
                </div>`],

                part2Chunk: [`<div class='parent'>
                <p>The <span class='${text.span1}'>${text.game1}</span> is played in multiple rounds.</p>
                </div>`,

                `<div class='parent'>
                <p>In each round, you'll have five chances to "activate" tiles like this one.<br>
                If you activate a tile before your five chances are up, you'll win the round.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>The more rounds you win, the more money you'll earn.<br>
                Specifically, ${settings.val} cent${text.plural} will be added to your bonus fund for each round you win.</p>               
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>The tiles will appear on your screen, then disappear very quickly. To activate a tile, you must press your SPACE BAR 
                before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>In the <span class='${text.span1}'>${text.game1}</span>, tiles turn <span class='${text.span1}'>${text.color1}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex1}'></div>
                </div>`,

                `<div class='parent'>
                <p>If you activate a tile before your five chances are up, you'll see that you won the round<br>
                and ${text.value} cent${text.plural} ${text.wasWere} added to your bonus fund. The next round will start immediately after.</p>
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
                <div style='font-size:35px'><p><span style='color:${text.color1}; font-size:60px'>3</span></p><p>Chances left</p></div>
                </div>`],

                part2Bern: [`<div class='parent'>
                <p>To earn money in the <span class='${text.span1}'>${text.game1}</span>, you must achieve wins.<br>
                The more wins you achieve, the more money you'll earn.</p>
                </div>`,

                `<div class='parent'>
                <p>To achieve wins, you'll try to "activate" tiles like this one.<br>
                Activating a tile results in a win.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Wins are worth money. The more tiles you activate, the more money you'll earn.<br>
                Specifically, ${settings.val} cent${text.plural} will be added to your bonus fund for each tile you activate.</p>               
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Tiles will appear on your screen, then disappear very quickly. To activate a tile, you must press your SPACE BAR 
                before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>In the <span class='${text.span1}'>${text.game1}</span>, tiles turn <span class='${text.span1}'>${text.color1}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex1}'></div>
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

    // constructor function for round 1 comprehension check loop
    function MakeLoop(span, game, color, round) {
        
        var attnChk1Scale = ['True', 'False'];
        var attnChk1Prompt = `The <span class='${span}'>${game}</span> is played in multiple rounds, and you have five chances to activate a tile per round.`
        var attnChk1Name = `attnChk1_${round}`
        var attnChk2Ans = `${text.value} cent${text.plural}`;
        var attnChk2Scale = ["0 cents", "1 cent", "2 cents", "5 cents", "8 cents", "10 cents"];
        var attnChk2Name = `attnChk2_${round}`;
        if (round == 'R1') {
            var attnChk1Ans = settings.gameTypeOrder == 0 ? `True` : `False`
            var attnChk2Prompt = (settings.gameTypeOrder == 0) ? `How much money is added to your bonus fund for each round you win?` : `How much money is added to your bonus fund for each tile you activate?`;
            var instPage = (settings.gameTypeOrder == 0) ? pages.r1.part2Chunk : pages.r1.part2Bern;
        } else {
            var attnChk1Ans = settings.gameTypeOrder == 0 ? `False` : `True`
            var attnChk2Prompt = (settings.gameTypeOrder == 0) ? `How much money is added to your bonus fund for each tile you activate?` : `How much money is added to your bonus fund for each round you win?`;
            var instPage = (settings.gameTypeOrder == 0) ? pages.r2.part2Bern : pages.r2.part2Chunk;
        };

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
    };

    // consent form

    const consent = `
    <div class='parent' style='height: 1000px; width: 1000px'>
    <p><b>Adult Consent for Participation in a Research Project<br>
    200 FR 2 (2017-1)</b><br>
    Study Title: Choices, decisions, and pursuits<br>
    Investigator: Paul Stillman<br>
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
        type: 'instructions',
        pages: [consent],
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r1part1 = {
        type: "instructions",
        pages: pages.r1.part1,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r2part1 = {
        type: "instructions",
        pages: pages.r2.part1,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r1part2 = new MakeLoop(text.span1, text.game1, text.color1, 'R1');

    p.intro.r2part2 = new MakeLoop(text.span2, text.game2, text.color2, 'R2');

    p.intro.r1part3 = {
        type: "instructions",
        pages: pages.r1.part3,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r2part3 = {
        type: "instructions",
        pages: pages.r2.part3,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

   /*
    *
    *   TASK
    *
    */

    p.task = {}

    // temporary data
    var hitFeedback = new MakeHitFeedback(),
        missFeedback = new MakeMissFeedback(),
        latency = new MakeLatencyArrays(),
        length = 5,
        trialNumber = 0,
        skipFeedback = false,
        ITI = [250, 500, 750, 1000, 1250, 1500, 1750, 2000], //when the button will show up
        hits = 0,
        misses = 0,
        totalJackpotsR1,
        totalJackpotsR2,
        totalJackpots

    // constructor functions
    function MakeHitFeedback() {
        var arrayR1 = [];
        var arrayR2 = [];
        var e1r1 = Array(settings.pEM[0]).fill(stim.r1.e1);
        var e0r1 = Array(10-settings.pEM[0]).fill(stim.r1.e0);
        var e1r2 = Array(settings.pEM[1]).fill(stim.r2.e1);
        var e0r2 = Array(10-settings.pEM[1]).fill(stim.r2.e0);
        for (let i = 0; i < (settings.nTrials/10); i++) {
            arrayR1.push(jsPsych.randomization.shuffle(e1r1.concat(e0r1)));
            arrayR2.push(jsPsych.randomization.shuffle(e1r2.concat(e0r2)));
        };
        this.R1 = arrayR1.flat();
        this.R2 = arrayR2.flat();
    };

    function MakeMissFeedback() {
        var arrayR1 = [];
        var arrayR2 = [];
        var e1r1 = Array(10-settings.pEM[0]).fill(stim.r1.e1);
        var e0r1 = Array(settings.pEM[0]).fill(stim.r1.e0);
        var e1r2 = Array(10-settings.pEM[1]).fill(stim.r2.e1);
        var e0r2 = Array(settings.pEM[1]).fill(stim.r2.e0);
        for (let i = 0; i < (settings.nTrials/10); i++) {
            arrayR1.push(jsPsych.randomization.shuffle(e1r1.concat(e0r1)));
            arrayR2.push(jsPsych.randomization.shuffle(e1r2.concat(e0r2)));
        };
        this.R1 = arrayR1.flat();
        this.R2 = arrayR2.flat();
    };

    function MakeLatencyArrays() {
        this.R1 = makeRT(settings.nTrials, settings.pM);
        this.R2 = makeRT(settings.nTrials, settings.pM);
    };

    function MakeProbe(round) {
    return {
        type: 'html-keyboard-response',
        data: {Trial_Type: 'probe'},
        stimulus: `
            <div class="outer-circle" style="background-color: gray; 
                width: 150px; height: 150px; border-radius: 50%; 
                border: 5px solid black; position: absolute; display: flex; align-items:center; justify-content:center;">
                <div class="inner-circle" style="background-color:gray; border: 5px solid black;
                    width: 100px; height: 100px; border-radius: 50%;"></div>
            </div>`,
        choices: [32],
        trial_duration: function() { 
            return latency[round][trialNumber]; 
        },
        on_finish: function(data) {
            data.key_press == 32 ? data.TooSlow = 0 : data.TooSlow = 1;
        }
    };
}

function MakeOuter(round) {
    return {
        type: 'html-keyboard-response',
        data: {Trial_Type: 'Outer'},
        stimulus: `
            <div class="outer-circle" style="background-color:gray; 
                width: 150px; height: 150px; border-radius: 50%; position: absolute; top: 0; left: 0;"></div>`,
        trial_duration: function() { 
            return 5000;  // Adjust duration as needed
        },
        on_finish: function(data) {
            console.log('this is make outer')
     //       data.key_press == 32 ? data.TooSlow = 0 : data.TooSlow = 1;
        }
    };
}

function getRandomDuration(min = 100, max = 500) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Combine the two into a single trial using a timeline
function CombinedTrial(round) {
    let trialStartTime; 
    let trialEndTime;
    let randomDuration;

    return {
        type: 'html-keyboard-response',
        data: {Trial_Type: 'combined'},
        stimulus: `
            <div id="outer-circle-container" style="position: relative; width: 150px; height: 150px;">
                <div id="outer-circle" style="background-color: gray; width: 150px; height: 150px; 
                    border-radius: 50%; border: 5px solid black; position: absolute;">
                </div>
                <div id="inner-circle" style="background-color: gray; border: 5px solid black;
                    width: 100px; height: 100px; border-radius: 50%; position: absolute; top: 25px; left: 25px;">
                </div>
            </div>`,
        choices: [32],
        trial_duration: function() {
            // Return the duration for the entire trial
 
            return Math.max(
                latency[round][trialNumber]
            ); 
 //           [5000]
        },
        on_start: function(trial) {
            trialStartTime = Date.now();
            randomDuration = getRandomDuration();
            // Set timeout to have outercircle randomly turn blue
            setTimeout(function() {
                document.getElementById('outer-circle').style.backgroundColor = 'blue';
            }, randomDuration);
            console.log('random Duration that the outer circle becomes highlighted '+ randomDuration); //OR latency[round][trialNumber]);
        }, 

        on_finish: function(data) {
            trialEndTime = Date.now(); 
            const trialDuration = trialEndTime - trialStartTime;
            data.randomDuration = randomDuration;
            console.log(trialDuration + ' trial duration')
            console.log(randomDuration + ' random duration'); 
            if (data.key_press == 32 && randomDuration < trialDuration) {
                console.log("both win");
                data.result = 1; 
            } else if (data.key_press == 32 && randomDuration > trialDuration) { 
                console.log("participant wins but fake doesn't")
                data.result = 2; 
            } else if (data.rt == null && randomDuration > trialDuration){
                console.log("both lose")
                data.result = 3; 
            } else if (data.rt == null && randomDuration < trialDuration){
                console.log("participant lose but fake wins")
                data.result = 4; 
            }
        }
    };
}

 function MakeResponse(round) {
    return {
        type: 'html-keyboard-response',
        data: {Trial_Type: `activation_${round}`},
        stimulus: function() {
            const lastTrialData = jsPsych.data.get().last(1).values()[0]; // Get last trial data
            const randomDuration = lastTrialData.randomDuration;
            console.log(randomDuration + ' random duration in make response function')
            const rt = lastTrialData.rt;
            console.log(rt + ' reaction time in make response function')

       if (lastTrialData.key_press == 32 && randomDuration < rt) {
                console.log("Both win", stim.r1.m1);
                return stim.r1.m1; //both win
            } else if (lastTrialData.key_press == 32 && randomDuration > rt) {
                console.log("Participant wins but fake doesn't", stim.r1.m2);
                return stim.r1.m2;
            } else if (rt == null && randomDuration > lastTrialData.trial_duration) {
                console.log("Both lose", stim.r1.m0);
                return stim.r1.m0;
            } else if (rt == null && randomDuration < lastTrialData.trial_duration) {
                console.log("Participant loses but fake wins" + stim.r1.m3);
                return stim.r1.m3;
            }
        },
        choices: [32], // represents spacebar 
        response_ends_trial: false,
        trial_duration: 1000, // feedback for if you "get it or not"
        on_finish: function() {
            jsPsych.data.get().last(2).values()[0].key_press != 32 ? misses++ : hits++;
        }      
    };
}

    function MakeFeedback(round, span, game) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `feedback_${round}`};
        this.stimulus = function() { 
            var img = (jsPsych.data.get().last(2).values()[0].key_press == 32) ? hitFeedback[round][hits-1] : missFeedback[round][misses-1];
            if (round == 'R1' && settings.gameTypeOrder == 1 || round == 'R2' && settings.gameTypeOrder == 0) {
                if (img == "failure") {
                    return feedbackText = `<div style='font-size:35px'><p>You missed</p><p>+0 points</p><p><br></p><p>(Get ready for the next tile!)</p></div>`;
                } else {
                    return feedbackText = `<div style='font-size:35px'><p>You activated it!</p><p>+${settings.val} point${text.plural}</p><p><br></p><p>(Get ready for the next tile!)</p></div>`;
                }
            } else {
                if (img == "failure" && length > 1) {
                    length--;
                    let hex = round == 'R1' ? text.hex1 : text.hex2;
                    let tryText = length == 1 ? "Chance" : "Chances";
                    return `<div style='font-size:35px'><p><span style='color:${hex}; font-size:60px'>${length}</span></p><p>${tryText} left</p></div>`;
                } else if (img == "failure" && length == 1) {
                    length = 5;
                    return feedbackText = `<div style='font-size:35px'><p>You lost the round</p><p>+0 points</p><p><br></p><p>(Get ready for the next round!)</p></div>`;
                } else {
                    length = 5;
                    return feedbackText = `<div style='font-size:35px'><p>You won the round!</p><p>+${settings.val} point${text.plural}</p><p><br></p><p>(Get ready for the next round!)</p></div>`;
                }
            }
        };
        this.choices = jsPsych.NO_KEYS;
        this.trial_duration = 2000;
        this.on_finish = function(data) {
            trialNumber++;
            if (trialNumber == settings.nTrials) {
                trialNumber = 0;
                hits = 0;
                misses = 0;
            };
            jsPsych.data.get().last(3).values()[0].key_press == 32 ? data.Jackpot = true : data.Jackpot = false;      
        };
    };

    function MakeRoundIntro(round) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `firstRoundIntro_${round}`};
        this.stimulus = function() {
            if (round == 'R1') {
                return settings.gameTypeOrder == 0  ? `<div style='font-size:35px'><p>Get ready for the first round!</p></div>` : `<div style='font-size:35px'><p>Get ready for the first tile!</p></div>`;
            } else {
                return settings.gameTypeOrder == 0  ? `<div style='font-size:35px'><p>Get ready for the first tile!</p></div>` : `<div style='font-size:35px'><p>Get ready for the first round!</p></div>`;
            }
        };
        this.choices = jsPsych.NO_KEYS;
        this.trial_duration = 2000;
    };

    function MakeDelay(round) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `ITI_${round}`};
        this.stimulus = "";
        this.choices = [32];
        this.trial_duration = function() {
            return jsPsych.randomization.sampleWithoutReplacement(ITI, 1)[0];
        };
        this.on_finish = function(data) {
            data.key_press == 32 ? data.TooFast = 1 : data.TooFast = 0;
        };
    };

    function MakeTooFast(round) {
        this.type = 'html-keyboard-response';
        this.data = {Trial_Type: `tooFastMessage_${round}`};
        this.choices = jsPsych.NO_KEYS;
        this.stimulus = function() {
            var message = `<div style='font-size: 20px'><p>Too Fast!</p><p>Please wait for the tile to appear 
            before pressing your SPACEBAR</p></div>`;
            return (jsPsych.data.get().last(1).values()[0].key_press == 32) ? message : '';
        };
        this.trial_duration = function() {
            return (jsPsych.data.get().last(1).values()[0].key_press == 32) ? 2500 : 0;
        };
        this.post_trial_gap = function() {
            return (jsPsych.data.get().last(1).values()[0].key_press == 32) ? 1000 : 0;
        };
    };

    // trial variables
    var probeR1 = new MakeProbe('R1'),
        probeR2 = new MakeProbe('R2'),
        combinedTrial = new CombinedTrial('R1'),
        outerR1 = new MakeOuter('R1'),
        outerR1 = new MakeOuter('R2'),
        responseR1 = new MakeResponse('R1'),
        responseR2 = new MakeResponse('R2'),
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

    p.task.round2Intro = {
        timeline: [roundIntroR2],
    };

    p.task.round1 = {
        timeline: [delayLoopR1, combinedTrial, responseR1, feedbackR1],
        //timeline: [delayLoopR1, probeR1, outerR1, combinedTrial, responseR1, feedbackR1],
        repetitions: settings.nTrials,
    };

    p.task.round2 = {
        timeline: [delayLoopR2, probeR2, responseR2, feedbackR2],
        repetitions: settings.nTrials,
    };

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
