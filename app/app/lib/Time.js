import { Alert } from "react-native";

/**
 * [getYestoday 获得昨天的格式化日期]
 * @return {[type]} [description]
 */
exports.getYestoday = function() {
	let time = new Date().getTime();
	return new Date( time - 1000 * 60 * 60 * 24).Format("yyyy-MM-dd mm:ss")
}

/**
 * [getToday 获得今天的格式化日期]
 * @return {[type]} [description]
 */
exports.getToday = function() {
	return new Date().Format("yyyy-MM-dd mm:ss")
}

/**
 * [getToday 格式化日期]
 * @return {[type]} [description]
 */
exports.getTimeType = function(time) {
	return new Date(time).Format("yyyy-MM-dd mm:ss")
}

Date.prototype.Format = function(fmt) { //author: meizz

	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

		return fmt;
}
