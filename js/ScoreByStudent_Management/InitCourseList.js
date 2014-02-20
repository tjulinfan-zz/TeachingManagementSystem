/**
 * Created by LinFan on 13-12-14.
 */

$.ajax({
    url: '/student_system/class_getAll',
    dataType: 'json',
    type: 'GET',
    success: function (res) {
        var classes = res.classes;
        for (var i = 0; i < classes.length; ++i) {
            $('#courseList').append('<option id="' + classes[i].class_id + '">' + classes[i].value + '</option>')
                .selectpicker('refresh');
        }
    },
    error: function (res) {
        var classes = [
            {
                "class_id": 1152111,
                "value": "1152111_C++_\u6797\u51e1"
            },
            {
                "class_id": 1152112,
                "value": "1152112_B++_\u738b\u51cc\u6ce2"
            },
            {
                "class_id": 1152124,
                "value": "1152124_Android_\u72d7\u86cb"
            }
        ];
        for (var i = 0; i < classes.length; ++i) {
            $('#courseList').append('<option id="' + classes[i].class_id + '">' + classes[i].value + '</option>')
                        .selectpicker('refresh');
        }
    }
});