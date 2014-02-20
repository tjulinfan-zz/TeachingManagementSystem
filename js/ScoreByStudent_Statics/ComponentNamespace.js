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

                }
            });
        },

        getFilteredData: function() {
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

    $("#checkbox-filter").bind("click", function() {
        if (this.checked) {
            ComponentNamespace.rankList.getFilteredData();
        } else {
            ComponentNamespace.rankList.getAllData();
        }
    })
});