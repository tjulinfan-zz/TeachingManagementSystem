
var data = [
{id: 1, teacher: "LF", courseName: "test", overallFeedback: "90", teachingManner: "80", teachingMethod: "12", teachingEffect: "100", weightingAverage: "100"}
];

$("#scoreTable").handsontable({
	data: data,
	startCols: 8,
	colHeaders: ["���", "������ʦ", "�γ�����", "��������(50%)", "��ѧ̬��(12.5%)", "��ѧ�������ֶ�(17.5%)", "��ѧЧ��(20%)", "��Ȩ�ܷ�"],
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