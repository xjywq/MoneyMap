function generatesql(income, money, tags, comment, isimportant, t) {
	String.prototype.format = function(kwargs) {
		return this.replace(/\{(\w+)\}/g, function(k, v) {
			return kwargs[v]
		})
	};
	var kwargs = {
		'income': income,
		'price': money,
		'tags': tags,
		'comment': comment,
		'isimportant': isimportant,
		'time': t,
	}
	var sql = "insert into database values('{income}','{price}','{tags}','{comment}','{isimportant}','{time}')".format(
		kwargs)
	console.log(sql)
	return sql
}

function openDB(table_name) {
	if (
		plus.sqlite.isOpenDatabase({
			name: table_name,
			path: '_doc/Mymoney.db'
		})
	) {
		plus.nativeUI.alert('Opened!');
	} else {
		plus.nativeUI.alert('Unopened!');
		plus.sqlite.openDatabase({
			name: table_name,
			path: '_doc/Mymoney.db',
			success: function(e) {
				plus.nativeUI.alert('打开数据库Mymoney.db成功 ');
			},
			fail: function(e) {
				plus.nativeUI.alert('打开数据库Mymoney.db失败: ' + JSON.stringify(e));
			}
		});
	}
}
// 查询SQL语句
function selectSQL(table_name, sql) {
	plus.sqlite.selectSql({
		name: table_name,
		sql: sql,
		success: function(e) {
			plus.nativeUI.alert('查询SQL语句成功: ' + JSON.stringify(e));
		},
		fail: function(e) {
			plus.nativeUI.alert('查询SQL语句失败: ' + JSON.stringify(e));
		}
	});
}
// 删除表
function droptable(table_name) {
	plus.sqlite.executeSql({
		name: table_name,
		sql: 'drop table database',
		success: function(e) {
			plus.nativeUI.alert('删除表database成功');
		},
		fail: function(e) {
			plus.nativeUI.alert('删除表database失败: ' + JSON.stringify(e));
		}
	});
}
// 关闭数据库
function closeDB(table_name) {
	plus.sqlite.closeDatabase({
		name: table_name,
		success: function(e) {
			plus.nativeUI.alert('关闭数据库成功');
		},
		fail: function(e) {
			plus.nativeUI.alert('关闭数据库失败: ' + JSON.stringify(e));
		}
	});
}

function executeSql(table_name, sql_table, sql_query) {
	plus.sqlite.executeSql({
		name: table_name,
		sql: sql_table,
		success: function(e) {
			plus.sqlite.executeSql({
				name: table_name,
				sql: sql_query,
				success: function(e) {
					plus.nativeUI.alert('创建表table和插入数据成功');
				},
				fail: function(e) {
					plus.nativeUI.alert('创建表table成功但插入数据失败: ' + JSON.stringify(e));
				}
			});
		},
		fail: function(e) {
			plus.nativeUI.alert('创建表table失败: ' + JSON.stringify(e));
		}
	});
}
