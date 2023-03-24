//时间间隔函数
export function timeInterval(timesData) {
	//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
	var dateBegin = timesData; //将-转化为/，使用new Date    
	var dateEnd = new Date(); //获取当前时间   
	var dateDiff = Math.abs(dateEnd.getTime() - dateBegin); //时间差的毫秒数
	var yearDiff = Math.floor(dateDiff / (24 * 3600 * 1000 * 365));
	var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
	var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
	//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
	//计算相差秒数
	var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000);
	var timesString = '';
	if (yearDiff != 0) {
		timesString = yearDiff + '年前';
	} else if (yearDiff == 0 && dayDiff != 0) {
		timesString = dayDiff + '天前';
	} else if (dayDiff == 0 && hours != 0) {
		timesString = hours + '小时前';
	} else if (hours == 0 && minutes != 0) {
		timesString = minutes + '分钟前';
	} else if (minutes == 0 && seconds < 60) {
		timesString = '刚刚';
	}
	return timesString
}


// 日期格式化
export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}
