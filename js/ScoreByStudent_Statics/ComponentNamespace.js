/**
 * Created by LinFan on 13-12-17.
 */
ComponentNamespace = {
    rankList: {
        container: $('#rankList'),

        init: function () {
            this.container.handsontable({
                minSpareRows: 0,
                currentRowClassName: 'currentRow',
                currentColClassName: 'currentCol',
                rowHeaders: true,
                columnSorting: true,
                colHeaders: [TagNamespace.course.ID.ch, TagNamespace.course.NAME.ch, TagNamespace.course.TEACHER.ch, TagNamespace.scoreByStudent.RANK.ch,
                    TagNamespace.scoreByStudent.OVERALL.ch, TagNamespace.scoreByStudent.ATTITUDE.ch, TagNamespace.scoreByStudent.METHOD.ch,
                    TagNamespace.scoreByStudent.EFFECT.ch, TagNamespace.scoreByStudent.WEIGHTING.ch],
                columns: [
                    {
                        data: TagNamespace.course.ID.en,
                        readOnly: true
                    },
                    {
                        data: TagNamespace.course.NAME.en,
                        readOnly: true
                    },
                    {
                        data: TagNamespace.course.TEACHER.en,
                        readOnly: true
                    },
                    {
                        data: TagNamespace.scoreByStudent.RANK.en,
                        readOnly: true,
                        type: 'numeric'
                    },
                    {
                        data: TagNamespace.scoreByStudent.OVERALL.en,
                        readOnly: true,
                        type: 'numeric',
                        format: '0.00'
                    },
                    {
                        data: TagNamespace.scoreByStudent.ATTITUDE.en,
                        readOnly: true,
                        type: 'numeric',
                        format: '0.00'
                    },
                    {
                        data: TagNamespace.scoreByStudent.METHOD.en,
                        readOnly: true,
                        type: 'numeric',
                        format: '0.00'
                    },
                    {
                        data: TagNamespace.scoreByStudent.EFFECT.en,
                        readOnly: true,
                        type: 'numeric',
                        format: '0.00'
                    },
                    {
                        data: TagNamespace.scoreByStudent.WEIGHTING.en,
                        readOnly: true,
                        type: 'numeric',
                        format: '0.00'
                    }
                ]
            });
        },

        loadData: function (data) {
            this.container.data('handsontable').loadData(data);
        },

        getAllData: function () {
            ComponentNamespace.loaderLayer.show();
            $.ajax({
                url: UrlNamespace.getStudentScoreRank,
                dataType: 'json',
                type: 'GET',
                success: function (res) {
                    ComponentNamespace.rankList.loadData(res)
                },
                complete: function () {
                    ComponentNamespace.loaderLayer.hide();
                },
                error: function (res) {
                    res = [
                        {"class_id": 1152111, "class_name": "C++", "teacher_name": "\u6797\u51e1", "rank": 1, "overallFeedback": 94, "teachingManner": 92, "teachingMethod": 92, "teachingEffect": 72, "weightingAverage": 89},
                        {"class_id": 1152124, "class_name": "Android", "teacher_name": "\u72d7\u86cb", "rank": 2, "overallFeedback": 65.4375, "teachingManner": 54.1875, "teachingMethod": 55.5625, "teachingEffect": 58.0625, "weightingAverage": 60.828125},
                        {"class_id": 1152112, "class_name": "B++", "teacher_name": "\u738b\u51cc\u6ce2", "rank": 3, "overallFeedback": 35.333333333333, "teachingManner": 35.333333333333, "teachingMethod": 35.333333333333, "teachingEffect": 35.333333333333, "weightingAverage": 35.333333333333}
                    ];
                    ComponentNamespace.rankList.loadData(res);
                }
            });
        },

        getFilteredData: function () {
            ComponentNamespace.loaderLayer.show();
            $.ajax({
                url: "/student_system/get_student_score_rank2",
                dataType: 'json',
                type: 'GET',
                success: function (res) {
                    ComponentNamespace.rankList.loadData(res)
                },
                complete: function () {
                    ComponentNamespace.loaderLayer.hide();
                },
                error: function (res) {

                }
            });
        },

        exportData: function () {
            var form=$("<form>");//定义一个form表单
            form.attr("style","display:none");
            form.attr("target","_blank");
            form.attr("method","post");
            form.attr("action","/student_system/student_score_rank_excel");
            var input1=$("<input>");
            input1.attr("type","hidden");
            input1.attr("name","score_table");
            input1.attr("value",JSON.stringify(this.container.data('handsontable').getData()));
            form.submit();//表单提交
        }
    },

    loaderLayer: {
        div: $('#loader'),

        hide: function () {
            this.div.hide()
        },

        show: function () {
            this.div.show()
        }
    }
};

$(document).ready(function () {
    ComponentNamespace.rankList.init();
    ComponentNamespace.rankList.getAllData();

    $("#checkbox-filter").bind("click", function () {
        if (this.checked) {
            ComponentNamespace.rankList.getFilteredData();
        } else {
            ComponentNamespace.rankList.getAllData();
        }
    });

    $("#btn-export").click(function () {
        ComponentNamespace.rankList.exportData();
    })
});