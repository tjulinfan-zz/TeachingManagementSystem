
var data = [
{id: 1, teacher: "LF", courseName: "test", overallFeedback: "90", teachingManner: "80", teachingMethod: "12", teachingEffect: "100", weightingAverage: "100"}
];

$("#scoreTable").handsontable({
	data: data,
	startCols: 8,
	colHeaders: ["序号", "主讲教师", "课程名称", "总体评价(50%)", "教学态度(12.5%)", "教学方法和手段(17.5%)", "教学效果(20%)", "加权总分"],
	columnSorting: true,
	columns: [
		{
			data: "id"
		},
		{
			data: "teacher"
		},
		{
			data: "courseName"
		},
		{
			data: "overallFeedback",
			type: "numeric"
		},
		{
			data: "teachingManner",
			type: "numeric"
		},
		{
			data: "teachingMethod",
			type: "numeric"
		},
		{
			data: "teachingEffect",
			type: "numeric"
		},
		{
			data: "weightingAverage",
			type: "numeric"
		}
	]
});