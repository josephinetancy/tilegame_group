var jsPsychLWHtmlKeyboardResponse = (function (jspsych) {
  'use strict';

  const info = {
      name: "html-keyboard-response",
      parameters: {
          /**
           * The HTML string to be displayed.
           */
          stimulus: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Stimulus",
              default: undefined,
          },
          /**
           * Array containing the key(s) the subject is allowed to press to respond to the stimulus.
           */
          choices: {
              type: jspsych.ParameterType.KEYS,
              pretty_name: "Choices",
              default: "ALL_KEYS",
          },
          /**
           * Any content here will be displayed below the stimulus.
           */
          prompt: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Prompt",
              default: null,
          },
          /**
           * How long participants have to respond.
           */
          response_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Response duration",
              default: null,
          },
          /**
           * How long to show the stimulus.
           */
          stimulus_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Stimulus duration",
              default: null,
          },
          /**
           * How long to show trial before it ends.
           */
          trial_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Trial duration",
              default: null,
          },
          /**
           * If true, trial will end when subject makes a response.
           */
          response_ends_trial: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Response ends trial",
              default: false,
          },

          partner_rt: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Partner's response time",
              default: null,
          },
      },
  };
  /**
   * **html-keyboard-response**
   *
   * jsPsych plugin for displaying a stimulus and getting a keyboard response
   *
   * @author Josh de Leeuw
   * @see {@link https://www.jspsych.org/plugins/jspsych-html-keyboard-response/ html-keyboard-response plugin documentation on jspsych.org}
   */
  class LWKeyboardResponsePlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          var new_html = '<div id="jspsych-html-keyboard-response-stimulus">' + trial.stimulus + "</div>";
          // add prompt
          if (trial.prompt !== null) {
              new_html += trial.prompt;
          }
          // draw
          display_element.innerHTML = new_html;
          // set timeout 
          const innerCircle = document.getElementById("inner-shape");
          const outerCircle = document.getElementById('outer-shape');

          const timeoutID = setTimeout(() => {
            innerCircle.style.backgroundColor = "grey"; 
          }, trial.response_duration);

          // store response
          var response = {
              rt: null,
              key: null,
              delay: null,
          };
          // function to end trial when it is time
          const end_trial = () => {
              // kill any remaining setTimeout handlers
              this.jsPsych.pluginAPI.clearAllTimeouts();
              // kill keyboard listeners
              if (typeof keyboardListener !== "undefined") {
                  this.jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
              }
              // gather the data to store for the trial
              var trial_data = {
                  rt: response.rt,
                  stimulus: trial.stimulus,
                  response: response.key,
                  partner_rt: trial.partner_rt,
                  delay: response.delay || null,
                  outcome: response.rt != null & response.rt <= trial.response_duration,
              };
              // clear the display
              display_element.innerHTML = "";
              // move on to the next trial
              this.jsPsych.finishTrial(trial_data);
          };
          // function to handle responses by the subject
    var after_response = (info) => {
        // Add a CSS class to indicate a response was recorded
        display_element.querySelector("#jspsych-html-keyboard-response-stimulus").className += " responded";

        // Only record the first response
        if (response.key == null) {
            response = info; // Record the response
        }

        // Change the inner-circle color immediately on any response
        if (innerCircle && response.rt <= trial.response_duration) {
            clearTimeout(timeoutID);
            innerCircle.style.backgroundColor = "${backgroundColor}"; // Change to orange
        } else {
            console.error("inner-circle element not found");
        }
    };
        // Handle conditions

          // start the response listener
          if (trial.choices != "NO_KEYS") {
              var keyboardListener = this.jsPsych.pluginAPI.getKeyboardResponse({
                  callback_function: after_response,
                  valid_responses: trial.choices,
                  rt_method: "performance",
                  persist: false,
                  allow_held_key: false,
              });
          }
          // hide stimulus if stimulus_duration is set
          if (trial.stimulus_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(() => {
                  display_element.querySelector("#jspsych-html-keyboard-response-stimulus").style.visibility = "hidden";
              }, trial.stimulus_duration);
          }
          // end trial if trial_duration is set
          if (trial.trial_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
          }
      }
      simulate(trial, simulation_mode, simulation_options, load_callback) {
          if (simulation_mode == "data-only") {
              load_callback();
              this.simulate_data_only(trial, simulation_options);
          }
          if (simulation_mode == "visual") {
              this.simulate_visual(trial, simulation_options, load_callback);
          }
      }
      create_simulation_data(trial, simulation_options) {
          const default_data = {
              stimulus: trial.stimulus,
              rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
              response: this.jsPsych.pluginAPI.getValidKey(trial.choices),
          };
          const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
          this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
          return data;
      }
      simulate_data_only(trial, simulation_options) {
          const data = this.create_simulation_data(trial, simulation_options);
          this.jsPsych.finishTrial(data);
      }
      simulate_visual(trial, simulation_options, load_callback) {
          const data = this.create_simulation_data(trial, simulation_options);
          const display_element = this.jsPsych.getDisplayElement();
          this.trial(display_element, trial);
          load_callback();
          if (data.rt !== null) {
              this.jsPsych.pluginAPI.pressKey(data.response, data.rt);
          }
      }
  }
  LWKeyboardResponsePlugin.info = info;

  return LWKeyboardResponsePlugin;

})(jsPsychModule);
