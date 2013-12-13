/**
 * Created by LinFan on 13-12-11.
 */

var weighting = {"overallFeedback": 0.5, "teachingManner": 0.125, "teachingMethod": 0.175, "teachingEffect": 0.2};

function isValidNumber(element) {
    if (element == null || element == "" || isNaN(element))
        return false;
    return element >= 0 && element <= 100;
}

function calcWeightingAverage(scores) {
    var ret = 0;
    for (c in weighting) {
        console.log(c + " " + scores[c] + " " + isValidNumber(scores[c]));
        if (!isValidNumber(scores[c]))
            return null;
        ret += weighting[c] * scores[c];
    }
    return ret;
}