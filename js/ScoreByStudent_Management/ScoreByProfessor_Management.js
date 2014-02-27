function score_validator(value, callback) {
    if (isNaN(value))
        callback(false);
    if (value < 0 || value > 100)
        callback(false);
    else
        callback(true);
}

function getInitData(courseId) {
    $("#loader").show();
    $.ajax({
        url: '/student_system/prof_score_getByClassId?class_id=' + courseId,
        dataType: 'json',
        type: 'GET',
        complete: function () {
            $("#loader").hide();
        },
        success: function (res) {
            $('#scoreTable').data('handsontable').loadData(res.score_table);
        },
        error: function () {
            alert("错误！");
        }
    });
}

function saveScoreTableData(courseId, auto) {
    $("#loader").show();
    var data = $('#scoreTable').handsontable('getInstance').getData();
    data = {"class_id": courseId, "score_table": JSON.stringify(data)};
    console.log(data);
    $.ajax({
        url: "/student_system/prof_score_insert",
        dataType: "json",
        type: "post",
        data: data,
        complete: function () {
            $("#loader").hide();
        },
        success: function (data) {
            if (!auto) {
                data = [data[0]];
                $('#aveScoreTable').show().data('handsontable').loadData(data);
            }
        },
        error: function (data) {
            var testData = [{"score": 0}];
            $('#aveScoreTable').show().data('handsontable').loadData(testData);
            console.log(data);
            alert("保存失败！");
        }
    });
}

function initScoreTable(courseId) {
    getInitData(courseId);
}

var hasSaved = true;


//=====================================================================================================================================

$("#scoreTable").handsontable({
    startCols: 2,
    minSpareRows: 1,
    contextMenu: ['row_above', 'row_below', 'remove_row', 'undo', 'redo'],
    currentRowClassName: 'currentRow',
    currentColClassName: 'currentCol',
    rowHeaders: true,
    colHeaders: ["评分"],
    columnSorting: true,
    columns: [
        {
            data: "score",
            type: "numeric",
            validator: score_validator,
            allowInvalid: false
        }
    ],

    afterChange: function (changes, source) {
        if (!changes)
            return;
        hasSaved = false;

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

$("#aveScoreTable").handsontable({
    minSpareRows: 0,
    colHeaders: ["评分"],
    rowHeaders: ["平均"],
    columns: [
        {
            data: "score",
            readOnly: true,
            type: 'numeric',
            format: '0.00'
        }
    ]
});

$(document).ready(function () {
    $("#printArea").hide();
    $("#saveButton").click(function () {
        hasSaved = true;
        saveScoreTableData(this.name, false);
    });
    $("#printButton").click(function () {
        $("#printArea").printArea();
    });

    $("#courseList")
        .selectpicker({})
        .bind("change", function () {
            var $this = $(this);
            var selectedIndex = $this.selectedIndex;
            var selectedElem = $(this).find('option:selected');
            var id = selectedElem.attr("id");

            if (selectedIndex != 0 && !hasSaved) {
                if (confirm('确定数据已经保存？') == false)
                    return;
            }

            $("#aveScoreTable").hide();
            initScoreTable(id);
            $("#printArea").show();
            $("#saveButton")
                .removeClass("disabled")
                .attr('name', id);
            $("#printButton").removeClass("disabled");
            $('#btn-export').removeClass('disabled');
            $("#scoreTableTitle").text(selectedElem.text() + " —— 专家评价");
        });

    $(window).bind('beforeunload', function () {
        return '您确定已经保存数据了吗？';
    });
});