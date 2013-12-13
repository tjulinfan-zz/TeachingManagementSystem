function score_validator(value, callback) {
    if (isNaN(value))
        callback(false);
    if (value < 0 || value > 100)
        callback(false);
    else
        callback(true);
}

function getInitData(courseId) {
    $.ajax({
        url: 'json/' + courseId + '.json',
        dataType: 'json',
        type: 'GET',
        success: function (res) {
            $('#scoreTable').data('handsontable').loadData(res);
        }
    });
}

function initScoreTable(courseId) {
    getInitData(courseId);
}

var TAGS = { "overallFeedback": "overallFeedback",
    "teachingManner": "teachingManner",
    "teachingMethod": "teachingMethod",
    "teachingEffect": "teachingEffect" };


//=====================================================================================================================================

$("#scoreTable").handsontable({
    startCols: 5,
    minSpareRows: 1,
    contextMenu: ['row_above', 'row_below', 'remove_row', 'undo', 'redo'],
    currentRowClassName: 'currentRow',
    currentColClassName: 'currentCol',
    rowHeaders: true,
    colHeaders: ["总体评价(50%)", "教学态度(12.5%)", "教学方法和手段(17.5%)", "教学效果(20%)", "加权总分"],
    columnSorting: true,
    columns: [
        {
            data: TAGS["overallFeedback"],
            type: "numeric",
            validator: score_validator,
            allowInvalid: false
        },
        {
            data: TAGS["teachingManner"],
            type: "numeric",
            validator: score_validator,
            allowInvalid: false
        },
        {
            data: TAGS["teachingMethod"],
            type: "numeric",
            validator: score_validator,
            allowInvalid: false
        },
        {
            data: TAGS["teachingEffect"],
            type: "numeric",
            validator: score_validator,
            allowInvalid: false
        },
        {
            data: "weightingAverage",
            readOnly: true
        }
    ],

    afterChange: function (changes, source) {
        if (!changes)
            return;

        var instance = $('#scoreTable').handsontable('getInstance');
        $.each(changes, function (index, change) {
            var rowIndex = change[0];
            var colIndex = change[1];
            var oldValue = change[2];
            var newValue = change[3];

            for (tag in TAGS) {
                if (TAGS[tag] == colIndex) {
                    var scores = { "overallFeedback": instance.getDataAtCell(rowIndex, 0),
                        "teachingManner": instance.getDataAtCell(rowIndex, 1),
                        "teachingMethod": instance.getDataAtCell(rowIndex, 2),
                        "teachingEffect": instance.getDataAtCell(rowIndex, 3)};
                    instance.setDataAtCell(rowIndex, 4, calcWeightingAverage(scores));
                }
            }
        });
    }
});

$(document).ready(function(){
    $("#printButton").click(function(){
        $("#printArea").printArea();
    });

    $('#courseList a').bind("click", function() {
        var id = this.id;

        initScoreTable(id);
        $("#saveButton").removeClass("disabled");
        $("#printButton").removeClass("disabled");
        $("#currentCourse").text(this.text);
        $("#scoreTableTitle").text(this.text + " —— 学生评价");
    })
});