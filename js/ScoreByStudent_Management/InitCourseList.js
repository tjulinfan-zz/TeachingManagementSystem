/**
 * Created by LinFan on 13-12-14.
 */

$.ajax({
    url: '/student_system/class_getAll.php',
    dataType: 'json',
    type: 'GET',
    success: function(res) {
        var classes = res.classes;
        for (var i = 0; i < classes.length; ++ i) {
            $('#courseList').append('<li><a id="' + classes[i].class_id + '" href="#">' + classes[i].value + '</a></li>');
        }
    }
});