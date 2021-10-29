export function generatesql(income, money, tags, isimportant, comment, t, table_name) { //初始化sql_query
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
		"insert into " + table_name + " values('{income}','{price}','{tags}','{comment}','{isimportant}', '{day}', '{time}')"
		.format(
			kwargs)
	console.log(sql)
	return sql
}

export function openDB(db) {
	if (
		plus.sqlite.isOpenDatabase({
			name: db,
			path: '_doc/Mymoney.db'
		})
	) {
		// plus.nativeUI.alert('Opened!' + table_name);
	} else {
		// plus.nativeUI.alert('Unopened!');
		plus.sqlite.openDatabase({
			name: db,
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
export function selectSQL(db, sql) {
	plus.sqlite.selectSql({
		name: db,
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
export function droptable(db, table_name) {
	plus.sqlite.executeSql({
		name: db,
		sql: 'drop table ' + table_name,
		success: function(e) {
			// plus.nativeUI.alert('删除表'+table_name+'成功');
		},
		fail: function(e) {
			plus.nativeUI.alert('删除表database失败: ' + JSON.stringify(e));
		}
	});
	plus.sqlite.executeSql({
		name: db,
		sql: 'create table if not exists ' + table_name + '("income" INT(1),"price" INT(10),"tags" TEXT(200),"comment" TEXT(200), "isimportant" INT(1), "day" DATE, "time" DATETIME)',
		success: function(e) {
			// plus.nativeUI.alert('创建或打开表table成功');
		},
		fail: function(e) {
			plus.nativeUI.alert('创建表table失败: ' + JSON.stringify(e));
		}
	});
}
// 关闭数据库
export function closeDB(db) {
	if (plus.sqlite.isOpenDatabase({
			name: db,
			path: '_doc/Mymoney.db'
		})
	){
		plus.sqlite.closeDatabase({
			name: db,
			success: function(e) {
				// plus.nativeUI.alert('关闭数据库成功');
			},
			fail: function(e) {
				plus.nativeUI.alert('关闭数据库失败: ' + JSON.stringify(e));
			}
		});
	}
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
					plus.nativeUI.alert('插入数据成功');
				},
				fail: function(e) {
					plus.nativeUI.alert('插入数据失败: ' + JSON.stringify(e));
				}
			});
		},
		fail: function(e) {
			plus.nativeUI.alert('创建表table失败: ' + JSON.stringify(e));
		}
	});
}

export function movetable(db, table_name1, table_name2) {
	plus.sqlite.executeSql({
		name: db,
		sql: 'insert into ' + table_name2 + ' select * from ' + table_name1,
		success: function(e) {
			plus.nativeUI.alert('复制表table成功: ' + JSON.stringify(e));
		},
		fail: function(e) {
			plus.nativeUI.alert('复制表table失败: ' + JSON.stringify(e));
		}
	});
	droptable(db, table_name1);
}
