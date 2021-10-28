export function generatesql(income, money, tags, isimportant, comment, t) { //初始化sql_query
	String.prototype.format = function(kwargs) {
		return this.replace(/\{(\w+)\}/g, function(k, v) {
			return kwargs[v]
		})
	};
	var price = money.toString().match(/^\d+(?:\.\d{0,2})?/); //??
	t = t.toString().split(' ') //date
	var kwargs = {
		'income': income,
		'price': price,
		'tags': tags,
		'comment': comment,
		'day': t[0],
		'time': t[1]
	}
	if (isimportant)
		kwargs['isimportant'] = 1
	else
		kwargs['isimportant'] = 0
	var sql =
		"insert into database values('{income}','{price}','{tags}','{comment}','{isimportant}', '{day}', '{time}')"
		.format(
			kwargs)
	console.log(sql)
	return sql
}

export function openDB(table_name) {
	if (
		plus.sqlite.isOpenDatabase({
			name: table_name,
			path: '_doc/Mymoney.db'
		})
	) {
		// plus.nativeUI.alert('Opened!' + table_name);
	} else {
		// plus.nativeUI.alert('Unopened!');
		plus.sqlite.openDatabase({
			name: table_name,
			path: '_doc/Mymoney.db',
			success: function(e) {
				// plus.nativeUI.alert('打开数据库Mymoney.db成功 ');
			},
			fail: function(e) {
				plus.nativeUI.alert('打开数据库Mymoney.db失败: ' + JSON.stringify(e));
			}
		});
	}
}
// 查询SQL语句
export function selectSQL(table_name, sql) {
	openDB(table_name);
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
	closeDB(table_name)
}
// 删除表
export function droptable(table_name) {
	openDB(table_name);
	plus.nativeUI.alert('在drop中打开表成功');
	plus.sqlite.executeSql({
		name: table_name,
		sql: 'drop table database',
		success: function(e) {
			// plus.nativeUI.alert('删除表database成功');
		},
		fail: function(e) {
			plus.nativeUI.alert('删除表database失败: ' + JSON.stringify(e));
		}
	});
	plus.sqlite.executeSql({
		name: table_name,
		sql: 'create table if not exists database("income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)',
		success: function(e) {
			// plus.nativeUI.alert('创建或打开表table成功');
		},
		fail: function(e) {
			plus.nativeUI.alert('创建表table失败: ' + JSON.stringify(e));
		}
	});
	closeDB(table_name);
	plus.nativeUI.alert('在drop中关闭表成功');
}
// 关闭数据库
export function closeDB(table_name) {
	if (plus.sqlite.isOpenDatabase({
			name: table_name,
			path: '_doc/Mymoney.db'
		})
	){
		plus.sqlite.closeDatabase({
			name: table_name,
			success: function(e) {
				// plus.nativeUI.alert('关闭数据库成功');
			},
			fail: function(e) {
				plus.nativeUI.alert('关闭数据库失败: ' + JSON.stringify(e));
			}
		});
	}
}

export function executeSql(table_name, sql_table, sql_query) {
	openDB(table_name);
	plus.nativeUI.alert('在execute中打开table成功');
	plus.sqlite.executeSql({
		name: table_name,
		sql: sql_table,
		success: function(e) {
			plus.sqlite.executeSql({
				name: table_name,
				sql: sql_query,
				success: function(e) {
					plus.nativeUI.alert('创建表table和插入数据成功');
					closeDB(table_name);
				},
				fail: function(e) {
					plus.nativeUI.alert('插入数据失败: ' + JSON.stringify(e));
					closeDB(table_name);
				}
			});
		},
		fail: function(e) {
			plus.nativeUI.alert('创建表table失败: ' + JSON.stringify(e));
			closeDB(table_name);
		}
	});
	// closeDB(table_name);
	plus.nativeUI.alert('在execute中关闭table成功');
}

export function moveDB(table_name_1, table_name_2) {
	plus.sqlite.executeSql({
		name: table_name,
		sql: 'insert into b select * from a',
		success: function(e) {
			plus.nativeUI.alert('复制表table失败: ' + JSON.stringify(e));
		},
		fail: function(e) {
			plus.nativeUI.alert('复制表table失败: ' + JSON.stringify(e));
		}
	});
}
