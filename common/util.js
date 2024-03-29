function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(date, isformat = false) {
		// data: Date类对象, isformat: 是否转换成"...前"的格式
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天'] && isformat) {
			// 如果超过1天, 则显示完整日期
			return this.humanize(diff);
		}
		var _format = function(number) {
			// 添加前缀0
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	}
};

function get_storage_out(user_name) {
	try {
		select_out = uni.getStorageSync(user_name+"_out");
		if (!select_out) {
			select_out = ["餐饮", "购物", "日用", "交通", "其他"];
		}
	} catch (e) {
		console.log('error: get_storage_out');
	}
	var dic_out = [];
	for (let i in select_out) {
		if (i == 0){
			dic_out.push({
				"value": select_out[i],
				"checked": true
			});
		}
		else {
			dic_out.push({
				"value": select_out[i],
				"checked": false
			});
		}
	}
	return dic_out
};

function get_storage_in(user_name) {
	try {
		select_in = uni.getStorageSync(user_name+"_in");
		if (!select_in) {
			select_in = ["工资", "兼职", "理财", "其他"];
		}
	} catch (e) {
		console.log('error: get_storage_in');
	}
	var dic_in = [];
	for (let i in select_in) {
		if (i == 0){
			dic_in.push({
				"value": select_in[i],
				"checked": true
			});
		}
		else {
			dic_in.push({
				"value": select_in[i],
				"checked": false
			});
		}
	}
	return dic_in
};

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	get_storage_out: get_storage_out,
	get_storage_in: get_storage_in,
}
