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
        url: '/student_system/student_score_getByClassId?class_id=' + courseId,
        dataType: 'json',
        type: 'GET',
        complete: function() {
           $("#loader").hide();
        },
        success: function (res) {
            $('#scoreTable').data('handsontable').loadData(res.score_table);
        },
        error: function() {
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
        url: "/student_system/student_score_insert",
        dataType: "json",
        type: "post",
        data: data,
        complete: function() {
            $("#loader").hide();
        },
        success: function (data) {
            if (!auto) {
				data = [data[0]];
				console.log(data);
				$('#aveScoreTable').show();
                $('#aveScoreTable').data('handsontable').loadData(data);
            }
        },
        error: function (data) {
			console.log(data);
            alert("保存失败！");
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
            readOnly: true,
            type: 'numeric',
            format: '0.00'
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

$("#aveScoreTable").handsontable({
    minSpareRows: 0,
    colHeaders: ["总体评价(50%)", "教学态度(12.5%)", "教学方法和手段(17.5%)", "教学效果(20%)", "加权总分"],
    rowHeaders: ["平均"],
    columns: [
        {
			data: TAGS["overallFeedback"],
            readOnly: true,
			type: 'numeric',
            format: '0.00'
        },
        {
			data: TAGS["teachingManner"],
            readOnly: true,
			type: 'numeric',
            format: '0.00'
        },
        {
			data: TAGS["teachingMethod"],
            readOnly: true,
			type: 'numeric',
            format: '0.00'
        },
        {
			data: TAGS["teachingEffect"],
            readOnly: true,
			type: 'numeric',
            format: '0.00'
        },
        {
			data: "weightingAverage",
            readOnly: true,
			type: 'numeric',
            format: '0.00'
        }
    ]
});

$(document).ready(function(){
    $("#printArea").hide();

    $("#saveButton").click(function(){
        saveScoreTableData(this.name, false);
    });
    $("#printButton").click(function(){
        $("#printArea").printArea();
    });

    $("#courseList").delegate("a", "click", function() {
        console.log($('#currentCourse').text());
        if ($('#currentCourse').text() != '请选择一门课程') {
            if (confirm('确定数据已经保存？') == false)
                return;
        }
        $("#aveScoreTable").hide();

        var id = this.id;
        $("#printArea").show();
        initScoreTable(id);
        $("#saveButton").removeClass("disabled");
        $("#printButton").removeClass("disabled");
        $("#saveButton").attr('name', id);
        $("#currentCourse").text(this.text);
        $("#scoreTableTitle").text(this.text + " —— 学生评价");
    })

    $(window).bind('beforeunload', function(){
        return '您确定已经保存数据了吗？';
    });
});