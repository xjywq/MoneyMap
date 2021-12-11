export function generatesql(income, money, tags, isimportant, comment, t, table_name) {
	String.prototype.format = function(kwargs) {
		return this.replace(/\{(\w+)\}/g, function(k, v) {
			return kwargs[v]
		})
	};
	var price = money.toString().match(/^\d+(?:\.\d{0,2})?/);
	t = t.toString().split(' ')
	var kwargs = {
		'table_name': table_name,
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
		"insert into {table_name} values(NULL, '{income}','{price}','{tags}','{comment}','{isimportant}', '{day}', '{time}')"
		.format(
			kwargs)
	return sql
}

export function openDB(table_name) {
	if (
		plus.sqlite.isOpenDatabase({
			name: table_name,
			path: '_doc/Mymoney.db'
		})
	) {
		// plus.nativeUI.alert('Opened!');
	} else {
		// plus.nativeUI.alert('Unopened!');
		plus.sqlite.openDatabase({
			name: table_name,
			path: '_doc/Mymoney.db',
			success: function(e) {
				// plus.nativeUI.alert('打开数据库Mymoney.db成功 ');
			},
			fail: function(e) {
				console.warn('打开数据库Mymoney.db失败: ' + JSON.stringify(e));
			}
		});
	}
}
// 查询SQL语句
export function selectSQL(table_name, sql) {
	plus.sqlite.selectSql({
		name: table_name,
		sql: sql,
		success: function(e) {
			// plus.nativeUI.alert('查询SQL语句成功: ' + JSON.stringify(e));
		},
		fail: function(e) {
			console.warn('查询SQL语句失败: ' + JSON.stringify(e));
		}
	});
}
// 删除表
export function droptable(db, table_name) {
	console.log('drop table ' + table_name)
	plus.sqlite.executeSql({
		name: db,
		sql: 'drop table ' + table_name,
		success: function(e) {
			console.log('删除表成功');
		},
		fail: function(e) {
			console.warn('删除表失败: ' + JSON.stringify(e));
		}
	});
}
// 关闭数据库
export function closeDB(db) {
	plus.sqlite.closeDatabase({
		name: db,
		success: function(e) {
			// plus.nativeUI.alert('关闭数据库成功');
		},
		fail: function(e) {
			console.warn('关闭数据库失败: ' + JSON.stringify(e));
		}
	});
}



export function executeSql(db, sql_table, sql_query) {
	plus.sqlite.executeSql({
		name: db,
		sql: sql_table,
		success: function(e) {
			plus.sqlite.executeSql({
				name: db,
				sql: sql_query,
				success: function(e) {
					// console.log('创建表table和插入数据成功');
				},
				fail: function(e) {
					console.warn('插入数据失败: ' + JSON.stringify(e));
				}
			});
		},
		fail: function(e) {
			console.warn('创建表table失败: ' + JSON.stringify(e));
		}
	});
}

export function createTable(db, table_name) {
	plus.sqlite.executeSql({
		name: db,
		sql: 'create table if not exists ' + table_name +
			'("id" integer PRIMARY KEY autoincrement, "income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)',
		success: function(e) {
			plus.sqlite.executeSql({
				name: db,
				sql: sql_query,
				success: function(e) {
					// plus.nativeUI.alert('创建表table和插入数据成功');
				},
				fail: function(e) {
					console.warn('插入数据失败: ' + JSON.stringify(e));
				}
			});
		},
		fail: function(e) {
			console.warn('创建表table失败: ' + JSON.stringify(e));
		}
	});
}

export function clearTable(db, table_name) {
	plus.sqlite.executeSql({
		name: db,
		sql: 'delete * from ' + table_name,
		success: function(e) {

		},
		fail: function(e) {
			console.warn('删除数据失败: ' + JSON.stringify(e));
		}
	});
}

export function moveTable(db, table_name1, table_name2) {
	if (table_name1 == '' || table_name2 == '') {
		return;
	}
	createTable(db, table_name1);
	plus.sqlite.executeSql({
		name: db,
		sql: 'insert into ' + table_name1 + ' select * from ' + table_name2,
		success: function(e) {
			droptable(db, table_name2);
			// console.log('转移数据成功');
		},
		fail: function(e) {
			console.warn('转移数据失败: ' + JSON.stringify(e));
		}
	});
}
