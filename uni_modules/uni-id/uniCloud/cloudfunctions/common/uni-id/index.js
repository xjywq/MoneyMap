"use strict";

function e(e) {
	return e && "object" == typeof e && "default" in e ? e.default : e
}
var t = e(require("fs")),
	r = e(require("path")),
	n = e(require("crypto")),
	i = e(require("buffer")),
	o = e(require("stream")),
	s = e(require("util"));
const a = {
		PARAM_ERROR: {
			errCode: "param-error"
		},
		PARAM_REQUIRED: {
			errCode: "param-required"
		},
		USER_NOT_EXIST: {
			errCode: "user-not-exist"
		},
		ROLE_NOT_EXIST: {
			errCode: "role-not-exist"
		},
		PERMISSION_NOT_EXIST: {
			errCode: "permission-not-exist"
		},
		MULTI_USER_MATCHED: {
			errCode: "multi-user-matched"
		},
		USER_INFO_ERROR: {
			errCode: "user-info-error"
		},
		USER_ACCOUNT_CONFLICT: {
			errCode: "user-account-conflict"
		},
		ACCOUNT_ALREADY_REGISTED: {
			errCode: "account-already-registed"
		},
		ACCOUNT_NOT_REGISTED: {
			errCode: "account-not-registed"
		},
		ACCOUNT_already_BOUND: {
			errCode: "account-already-bound"
		},
		UNBIND_FAILED: {
			errCode: "unbind-failed"
		},
		INVALID_INVITE_CODE: {
			errCode: "invalid-invite-code"
		},
		SET_INVITE_CODE_FAILED: {
			errCode: "set-invite-code-failed"
		},
		GET_THIRD_PARTY_ACCOUNT_FAILED: {
			errCode: "get-third-party-account-failed"
		}
	},
	c = {
		0: {
			errCode: 0,
			errMsg: ""
		},
		10001: {
			errCode: "account-banned"
		},
		10002: a.USER_NOT_EXIST,
		10003: a.MULTI_USER_MATCHED,
		10004: a.USER_INFO_ERROR,
		10005: a.USER_ACCOUNT_CONFLICT,
		10102: {
			errCode: "password-error"
		},
		10103: {
			errCode: "password-error-exceed-limit"
		},
		10201: a.ACCOUNT_ALREADY_REGISTED,
		10202: a.ACCOUNT_NOT_REGISTED,
		10203: a.INVALID_INVITE_CODE,
		10301: a.ACCOUNT_ALREADY_REGISTED,
		10302: a.ACCOUNT_NOT_REGISTED,
		10401: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10402: a.ACCOUNT_ALREADY_REGISTED,
		10403: a.ACCOUNT_NOT_REGISTED,
		10501: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10502: a.ACCOUNT_ALREADY_REGISTED,
		10503: a.ACCOUNT_NOT_REGISTED,
		10601: a.ACCOUNT_ALREADY_REGISTED,
		10602: a.ACCOUNT_NOT_REGISTED,
		10701: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10702: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10703: a.ACCOUNT_ALREADY_REGISTED,
		10704: a.ACCOUNT_NOT_REGISTED,
		10705: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10706: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10801: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		10802: a.ACCOUNT_ALREADY_REGISTED,
		10803: a.ACCOUNT_NOT_REGISTED,
		20101: a.PARAM_REQUIRED,
		20102: a.ACCOUNT_ALREADY_REGISTED,
		30101: a.PARAM_REQUIRED,
		30201: {
			errCode: "check-device-feature-failed"
		},
		30202: {
			errCode: "token-not-exist"
		},
		30203: {
			errCode: "token-expired"
		},
		30204: {
			errCode: "check-token-failed"
		},
		40201: a.USER_NOT_EXIST,
		40202: {
			errCode: "invalid-old-password"
		},
		50101: a.PARAM_REQUIRED,
		50102: a.PARAM_ERROR,
		50201: a.PARAM_REQUIRED,
		50203: a.PARAM_ERROR,
		50202: {
			errCode: "invalid-verify-code"
		},
		50301: {
			errCode: "send-sms-code-failed"
		},
		60101: a.ACCOUNT_already_BOUND,
		60201: a.ACCOUNT_already_BOUND,
		60301: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		60302: a.ACCOUNT_already_BOUND,
		60401: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		60402: a.ACCOUNT_already_BOUND,
		60501: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		60502: a.ACCOUNT_already_BOUND,
		70101: a.UNBIND_FAILED,
		70201: a.UNBIND_FAILED,
		70301: a.UNBIND_FAILED,
		70401: a.UNBIND_FAILED,
		70501: a.UNBIND_FAILED,
		80301: a.USER_NOT_EXIST,
		80401: a.SET_INVITE_CODE_FAILED,
		80402: a.SET_INVITE_CODE_FAILED,
		80501: a.INVALID_INVITE_CODE,
		80502: a.USER_NOT_EXIST,
		80503: {
			errCode: "modify-invite-code-is-not-allowed"
		},
		80601: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		80602: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		80701: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		80702: a.GET_THIRD_PARTY_ACCOUNT_FAILED,
		80801: {
			errCode: "decrypt-weixin-data-failed"
		},
		80802: {
			errCode: "decrypt-weixin-data-failed"
		},
		80803: {
			errCode: "invalid-weixin-appid"
		},
		80804: a.PARAM_REQUIRED,
		80805: a.PARAM_REQUIRED,
		80806: a.PARAM_REQUIRED,
		90001: {
			errCode: "database-operation-failed"
		},
		90002: a.PARAM_REQUIRED,
		90003: a.PARAM_ERROR,
		90004: a.USER_NOT_EXIST,
		90005: a.ROLE_NOT_EXIST,
		90006: a.PERMISSION_NOT_EXIST
	};
class u extends Error {
	constructor(e) {
		super(e.message), this.errMsg = e.message || "", Object.defineProperties(this, {
			message: {
				get() {
					return `errCode: ${e.code||""} | errMsg: ` + this.errMsg
				},
				set(e) {
					this.errMsg = e
				}
			}
		})
	}
}
const d = Object.prototype.toString,
	l = Object.prototype.hasOwnProperty;

function p(e, t) {
	return l.call(e, t)
}

function f(e) {
	return "[object Object]" === d.call(e)
}

function m(e) {
	return "function" == typeof e
}

function h(e) {
	return !!e && ("object" == typeof e || "function" == typeof e) && "function" == typeof e.then
}

function g(e) {
	return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
}
const y = /_(\w)/g,
	w = /[A-Z]/g;

function v(e) {
	return e.replace(y, (e, t) => t ? t.toUpperCase() : "")
}

function _(e) {
	return e.replace(w, e => "_" + e.toLowerCase())
}

function b(e, t) {
	let r, n;
	switch (t) {
		case "snake2camel":
			n = v, r = y;
			break;
		case "camel2snake":
			n = _, r = w
	}
	for (const i in e)
		if (p(e, i) && r.test(i)) {
			const r = n(i);
			e[r] = e[i], delete e[i], f(e[r]) ? e[r] = b(e[r], t) : Array.isArray(e[r]) && (e[r] = e[r].map(e => b(e,
				t)))
		} return e
}

function E(e) {
	return b(e, "snake2camel")
}

function C(e) {
	return b(e, "camel2snake")
}

function T(e) {
	return function(e, t = "-") {
		e = e || new Date;
		const r = [];
		return r.push(e.getFullYear()), r.push(("00" + (e.getMonth() + 1)).substr(-2)), r.push(("00" + e.getDate())
			.substr(-2)), r.join(t)
	}(e = e || new Date) + " " + function(e, t = ":") {
		e = e || new Date;
		const r = [];
		return r.push(("00" + e.getHours()).substr(-2)), r.push(("00" + e.getMinutes()).substr(-2)), r.push(("00" +
			e.getSeconds()).substr(-2)), r.join(t)
	}(e)
}

function x() {
	"development" === process.env.NODE_ENV && console.log(...arguments)
}

function A(e = 6) {
	let t = "";
	for (let r = 0; r < e; r++) t += Math.floor(10 * Math.random());
	return t
}

function S(e) {
	return Array.from(new Set(e))
}

function I(e, t) {
	return /^https?:/.test(t) ? t : e + t
}

function k(e = {}, t) {
	if (!t || !e) return e;
	const r = ["_pre", "_purify", "_post"];
	t._pre && (e = t._pre(e));
	let n = {
		shouldDelete: new Set([])
	};
	if (t._purify) {
		const e = t._purify;
		for (const t in e) e[t] = new Set(e[t]);
		n = Object.assign(n, e)
	}
	if (f(t))
		for (const i in t) {
			const o = t[i];
			m(o) && -1 === r.indexOf(i) ? e[i] = o(e) : "string" == typeof o && -1 === r.indexOf(i) && (e[i] = e[o], n
				.shouldDelete.add(o))
		} else m(t) && (e = t(e));
	if (n.shouldDelete)
		for (const t of n.shouldDelete) delete e[t];
	return t._post && (e = t._post(e)), e
}

function O(e, t) {
	const r = new e(t);
	return new Proxy(r, {
		get: function(e, t) {
			if ("function" == typeof e[t] && 0 !== t.indexOf("_") && e._protocols && e._protocols[t]) {
				const r = e._protocols[t];
				return async function(n) {
					n = k(n, r.args);
					let i = await e[t](n);
					return i = k(i, r.returnValue), i
				}
			}
			return e[t]
		}
	})
}

function R(e) {
	if (f(e))
		if (0 === e.code) e.errCode = e.code, e.message = e.errMsg = e.msg, delete e.messageValues;
		else if (p(c, e.code)) {
		const t = c[e.code];
		e.errCode = "uni-id-" + t.errCode, e.errMsg = this.t(t.errCode, e.messageValues || {}) || e.msg, e.message = e
			.msg = e.errMsg, delete e.messageValues
	} else e.code && console.warn(`error code not found, error code: ${e.code}, please contact us`)
}
const P = /^(?:\d)+/,
	D = /^(?:\w)+/;
const j = Object.prototype.hasOwnProperty,
	q = new class {
		constructor() {
			this._caches = Object.create(null)
		}
		interpolate(e, t) {
			if (!t) return [e];
			let r = this._caches[e];
			return r || (r = function(e) {
					const t = [];
					let r = 0,
						n = "";
					for (; r < e.length;) {
						let i = e[r++];
						if ("{" === i) {
							n && t.push({
								type: "text",
								value: n
							}), n = "";
							let o = "";
							for (i = e[r++]; void 0 !== i && "}" !== i;) o += i, i = e[r++];
							const s = "}" === i,
								a = P.test(o) ? "list" : s && D.test(o) ? "named" : "unknown";
							t.push({
								value: o,
								type: a
							})
						} else "%" === i ? "{" !== e[r] && (n += i) : n += i
					}
					return n && t.push({
						type: "text",
						value: n
					}), t
				}(e), this._caches[e] = r),
				function(e, t) {
					const r = [];
					let n = 0;
					const i = Array.isArray(t) ? "list" : (o = t, null !== o && "object" == typeof o ? "named" :
						"unknown");
					var o;
					if ("unknown" === i) return r;
					for (; n < e.length;) {
						const o = e[n];
						switch (o.type) {
							case "text":
								r.push(o.value);
								break;
							case "list":
								r.push(t[parseInt(o.value, 10)]);
								break;
							case "named":
								"named" === i ? r.push(t[o.value]) : "production" !== process.env.NODE_ENV &&
									console.warn(
										`Type of token '${o.type}' and format of value '${i}' don't match!`);
								break;
							case "unknown":
								"production" !== process.env.NODE_ENV && console.warn(
									"Detect 'unknown' type of token!")
						}
						n++
					}
					return r
				}(r, t)
		}
	};

function N(e, t) {
	if (!e) return;
	if (t[e = e.trim().replace(/_/g, "-")]) return e;
	if (0 === (e = e.toLowerCase()).indexOf("zh")) return -1 !== e.indexOf("-hans") ? "zh-Hans" : -1 !== e.indexOf(
		"-hant") ? "zh-Hant" : (r = e, ["-tw", "-hk", "-mo", "-cht"].find(e => -1 !== r.indexOf(e)) ?
		"zh-Hant" : "zh-Hans");
	var r;
	const n = function(e, t) {
		return t.find(t => 0 === e.indexOf(t))
	}(e, ["en", "fr", "es"]);
	return n || void 0
}
class L {
	constructor({
		locale: e,
		fallbackLocale: t,
		messages: r,
		watcher: n,
		formater: i
	}) {
		this.locale = "en", this.fallbackLocale = "en", this.message = {}, this.messages = {}, this.watchers = [],
			t && (this.fallbackLocale = t), this.formater = i || q, this.messages = r, this.setLocale(e), n && this
			.watchLocale(n)
	}
	setLocale(e) {
		const t = this.locale;
		this.locale = N(e, this.messages) || this.fallbackLocale, this.message = this.messages[this.locale], this
			.watchers.forEach(e => {
				e(this.locale, t)
			})
	}
	getLocale() {
		return this.locale
	}
	watchLocale(e) {
		const t = this.watchers.push(e) - 1;
		return () => {
			this.watchers.splice(t, 1)
		}
	}
	t(e, t, r) {
		let n = this.message;
		return "string" == typeof t ? (t = N(t, this.messages)) && (n = this.messages[t]) : r = t, ((e, t) => j
			.call(e, t))(n, e) ? this.formater.interpolate(n[e], r).join("") : (console.warn(
			`Cannot translate the value of keypath ${e}. Use the value of keypath as default.`), e)
	}
}
var U = {
	"zh-Hans": {
		alipay: "支付宝",
		wechat: "微信",
		user: "用户",
		"user-id": "用户ID",
		"dcloud-appid": "应用Appid",
		"dcloud-appid-list": "应用列表",
		account: "账号",
		username: "用户名",
		email: "邮箱",
		mobile: "手机号",
		"wechat-openid": "微信openid",
		"wechat-account": "微信账号",
		"alipay-account": "支付宝账号",
		"qq-openid": "QQ openid",
		"qq-account": "QQ账号",
		"apple-account": "苹果账号",
		password: "密码",
		"verify-code": "验证码",
		"verify-code-type": "验证码类型",
		"user-unique-param": "用户名、邮箱或手机号",
		"role-id": "角色ID",
		"permission-id": "权限ID",
		login: "登录",
		"verify-mobile": "验证手机",
		"context-param-required": "context内缺少{param}，请使用uniID.createInstance传入客户端信息，例：uniID.createInstance({context:{PLATFORM:'h5'}})",
		"config-param-require": "uni-id的配置内缺少{param}",
		"uni-verify-config-required": "请在config.json中配置service.univerify下一键登录相关参数",
		"login-with-invite-type-required": "强制使用邀请码注册时，需指明type为register还是login",
		"type-array-required": "{param}应为数组形式",
		"query-field-warning": "检测到当前使用queryField匹配多字段进行登录操作，需要注意：uni-id并未限制用户名不能是手机号或邮箱，需要开发者自行限制。否则可能出现用户输入abc@xx.com会同时匹配到邮箱为此值的用户和用户名为此值的用户，导致登录失败",
		"add-role-admin-is-not-allowed": "不可新增roleID为admin的角色",
		"password-secret-type-error": "config内passwordSecret类型错误，只可设置string类型和array类型",
		"token-expires-config-warning": "tokenExpiresIn不可小于或等于tokenExpiresThreshold",
		"type-function-required": "{param}应为function类型",
		"dev-warning": "当前正在使用uniID.dev属性，注意此属性仅可用于开发调试",
		"config-file-invalid": "请确保公用模块uni-id对应的配置文件（common/uni-config-center/uni-id/config.json）格式正确（不可包含注释）",
		"config-file-not-found": "请在common/uni-config-center/uni-id/config.json内添加uni-id相关配置信息",
		"hx-version-warning": "当前使用的HBuilderX版本过低，请升级HBuilderX到最新版本",
		"account-banned": "账号已禁用",
		"user-not-exist": "用户不存在",
		"multi-user-matched": "匹配到多个账号",
		"user-info-error": "用户信息不正确",
		"user-account-conflict": "用户账号冲突",
		"password-error": "密码错误",
		"password-error-exceed-limit": "密码错误次数过多，请稍后再试",
		"account-already-registed": "此{type}已注册",
		"account-not-registed": "此{type}尚未注册",
		"invalid-invite-code": "邀请码无效",
		"get-third-party-account-failed": "获取{account}失败",
		"param-required": "{param}不可为空",
		"check-device-feature-failed": "设备特征校验未通过",
		"token-not-exist": "云端已不包含此token",
		"token-expired": "token已过期",
		"check-token-failed": "token校验未通过",
		"invalid-old-password": "旧密码错误",
		"param-error": "{param}参数错误，{reason}",
		"invalid-verify-code": "验证码错误或已失效",
		"send-sms-code-failed": "验证码发送失败",
		"account-already-bound": "此{type}已绑定",
		"unbind-failed": "解绑失败",
		"set-invite-code-failed": "邀请码设置失败",
		"modify-invite-code-is-not-allowed": "邀请码不可修改",
		"decrypt-weixin-data-failed": "解密失败",
		"invalid-weixin-appid": "appid不匹配",
		"database-operation-failed": "数据库读写异常",
		"role-not-exist": "角色不存在",
		"permission-not-exist": "权限不存在"
	},
	en: {
		alipay: "alipay",
		wechat: "wechat",
		user: "user",
		"user-id": "user id",
		"dcloud-appid": "DCloud appid",
		"dcloud-appid-list": "DCloud appid list",
		account: "account",
		username: "username",
		email: "email",
		mobile: "phone number",
		"wechat-openid": "wechat openid",
		"wechat-account": "wechat account",
		"alipay-account": "alipay account",
		"qq-openid": "QQ openid",
		"qq-account": "QQ account",
		"apple-account": "apple account",
		password: "password",
		"verify-code": "verify code",
		"verify-code-type": "verify code type",
		"user-unique-param": "username, email or mobile phone number",
		"role-id": "role id",
		"permission-id": "permission id",
		login: "login",
		"verify-mobile": "verify mobile phone number",
		"context-param-required": "You should pass {param} in context using uniID.createInstance, eg: uniID.createInstance({context: {PLATFORM: 'h5'}})",
		"config-param-require": "{param} is required in uni-id's config",
		"uni-verify-config-required": "univerify config required: service.univerify",
		"login-with-invite-type-required": "parameter type is required when forceInviteCode set to true",
		"type-array-required": "type of {param} must be array",
		"query-field-warning": "You are using multi query field to login, be aware that uni-id will not check username's fromat, eg: abc@xx.com is a valid username for uni-id. You should check username in your code.",
		"add-role-admin-is-not-allowed": 'add role with an id of "admin" is not allowed',
		"password-secret-type-error": "passwordSecret in config must be string or array",
		"token-expires-config-warning": "tokenExpiresIn must be greater than tokenExpiresThreshold",
		"type-function-required": "{param} must be a function",
		"dev-warning": "warning: uniID.dev is only for development",
		"config-file-invalid": "invalid config file (common/uni-config-center/uni-id/config.json), comment is not allowed",
		"config-file-not-found": "config file (common/uni-config-center/uni-id/config.json) not found",
		"hx-version-warning": "The version of your HBuilderX is too lower, please upgrade to the latest version of HBuilderX",
		"account-banned": "account is banned",
		"user-not-exist": "user does not exist",
		"multi-user-matched": "multiple users matched",
		"user-info-error": "user info error",
		"user-account-conflict": "user account conflict",
		"password-error": "password error",
		"password-error-exceed-limit": "password error exceed limit",
		"account-already-registed": "{type} is already registed",
		"account-not-registed": "{type} is not registed",
		"invalid-invite-code": "invalid invite code",
		"get-third-party-account-failed": "get {account} failed",
		"param-required": "{param} is required",
		"check-device-feature-failed": "check device feature failed",
		"token-not-exist": "token is not exist",
		"token-expired": "token is expired",
		"check-token-failed": "check token failed",
		"invalid-old-password": "invalid old password",
		"param-error": "{param} error, {reason}",
		"invalid-verify-code": "invalid verify code",
		"send-sms-code-failed": "send sms code failed",
		"account-already-bound": "{type} is already bound",
		"unbind-failed": "unbind failed",
		"set-invite-code-failed": "set invite code failed",
		"modify-invite-code-is-not-allowed": "invite code modification is not allowed",
		"decrypt-weixin-data-failed": "decrypt weixin data failed",
		"invalid-weixin-appid": "invalid weixin appid",
		"database-operation-failed": "database operation failed",
		"role-not-exist": "role does not exist",
		"permission-not-exist": "permission does not exist"
	}
};
const V = uniCloud.database(),
	M = V.collection("uni-id-users"),
	B = V.collection("opendb-verify-codes"),
	F = V.collection("uni-id-roles"),
	$ = V.collection("uni-id-permissions"),
	H = {
		username: "username",
		mobile: "mobile",
		email: "email",
		wx_unionid: "wechat-account",
		"wx_openid.app-plus": "wechat-account",
		"wx_openid.mp-weixin": "wechat-account",
		qq_unionid: "qq-account",
		"qq_openid.app-plus": "qq-account",
		"qq_openid.mp-weixin": "qq-account",
		ali_openid: "alipay-account",
		apple_openid: "alipay-account"
	},
	K = 90002,
	G = 90003,
	Q = 90004,
	Y = 90005;
async function z({
	name: e,
	url: t,
	data: r,
	options: n,
	defaultOptions: i
}) {
	let o = {};
	const s = C(Object.assign({}, r));
	s && s.access_token && delete s.access_token;
	try {
		n = Object.assign({}, i, n, {
			data: s
		}), o = await uniCloud.httpclient.request(t, n)
	} catch (t) {
		return function(e, t) {
			throw new u({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let a = o.data;
	const c = o.headers["content-type"];
	if (!Buffer.isBuffer(a) || 0 !== c.indexOf("text/plain") && 0 !== c.indexOf("application/json")) Buffer
		.isBuffer(a) && (a = {
			buffer: a,
			contentType: c
		});
	else try {
		a = JSON.parse(a.toString())
	} catch (e) {
		a = a.toString()
	}
	return E(function(e, t) {
		if (t.errcode) throw new u({
			code: t.errcode || -2,
			message: t.errmsg || e + " fail"
		});
		return delete t.errcode, delete t.errmsg, {
			...t,
			errMsg: e + " ok",
			errCode: 0
		}
	}(e, a || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}

function J(e, t) {
	let r = "";
	if (t && t.accessToken) {
		r = `${e.indexOf("?")>-1?"&":"?"}access_token=${t.accessToken}`
	}
	return `${e}${r}`
}
class X {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://api.weixin.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestWxOpenapi({
		name: e,
		url: t,
		data: r,
		options: n
	}) {
		const i = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await z({
			name: "auth." + e,
			url: `${this.options.baseUrl}${J(t,r)}`,
			data: r,
			options: n,
			defaultOptions: i
		})
	}
	async code2Session(e) {
		return await this._requestWxOpenapi({
			name: "code2Session",
			url: "/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
	}
	async getOauthAccessToken(e) {
		const t = await this._requestWxOpenapi({
			name: "getOauthAccessToken",
			url: "/sns/oauth2/access_token",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				code: e
			}
		});
		return t.expiresIn && (t.expired = Date.now() + t.expiresIn), t
	}
}
async function W({
	name: e,
	url: t,
	data: r,
	options: n,
	defaultOptions: i
}) {
	let o;
	n = Object.assign({}, i, n, {
		data: C(Object.assign({}, r))
	});
	try {
		o = await uniCloud.httpclient.request(t, n)
	} catch (t) {
		return function(e, t) {
			throw new u({
				code: t.code || -2,
				message: t.message || e + " fail"
			})
		}(e, t)
	}
	let s = o.data;
	const a = o.headers["content-type"];
	if (!Buffer.isBuffer(s) || 0 !== a.indexOf("text/plain") && 0 !== a.indexOf("application/json")) Buffer
		.isBuffer(s) && (s = {
			buffer: s,
			contentType: a
		});
	else try {
		s = JSON.parse(s.toString())
	} catch (e) {
		s = s.toString()
	}
	return E(function(e, t) {
		if (t.ret || t.error) {
			const r = t.ret || t.error || t.errcode || -2,
				n = t.msg || t.error_description || t.errmsg || e + " fail";
			throw new u({
				code: r,
				message: n
			})
		}
		return delete t.ret, delete t.msg, delete t.error, delete t.error_description, delete t.errcode,
			delete t.errmsg, {
				...t,
				errMsg: e + " ok",
				errCode: 0
			}
	}(e, s || {
		errCode: -2,
		errMsg: "Request failed"
	}))
}
class Z {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://graph.qq.com",
			timeout: 5e3
		}, e)
	}
	async _requestQQOpenapi({
		name: e,
		url: t,
		data: r,
		options: n
	}) {
		const i = {
			method: "GET",
			dataType: "json",
			dataAsQueryString: !0,
			timeout: this.options.timeout
		};
		return await W({
			name: "auth." + e,
			url: I(this.options.baseUrl, t),
			data: r,
			options: n,
			defaultOptions: i
		})
	}
	async getOpenidByToken({
		accessToken: e
	} = {}) {
		const t = await this._requestQQOpenapi({
			name: "getOpenidByToken",
			url: "/oauth2.0/me",
			data: {
				accessToken: e,
				unionid: 1,
				fmt: "json"
			}
		});
		if (t.clientId !== this.options.appId) throw new u({
			code: "APPID_NOT_MATCH",
			message: "appid not match"
		});
		return {
			openid: t.openid,
			unionid: t.unionid
		}
	}
	async code2Session({
		code: e
	} = {}) {
		return await this._requestQQOpenapi({
			name: "getOpenidByToken",
			url: "https://api.q.qq.com/sns/jscode2session",
			data: {
				grant_type: "authorization_code",
				appid: this.options.appId,
				secret: this.options.secret,
				js_code: e
			}
		})
	}
}
const ee = {
	RSA: "RSA-SHA1",
	RSA2: "RSA-SHA256"
};
var te = {
	code2Session: {
		returnValue: {
			openid: "userId"
		}
	}
};
class re extends class {
	constructor(e = {}) {
		if (!e.appId) throw new Error("appId required");
		if (!e.privateKey) throw new Error("privateKey required");
		const t = {
			gateway: "https://openapi.alipay.com/gateway.do",
			timeout: 5e3,
			charset: "utf-8",
			version: "1.0",
			signType: "RSA2",
			timeOffset: -(new Date).getTimezoneOffset() / 60,
			keyType: "PKCS8"
		};
		e.sandbox && (e.gateway = "https://openapi.alipaydev.com/gateway.do"), this.options = Object.assign({}, t,
			e);
		const r = "PKCS8" === this.options.keyType ? "PRIVATE KEY" : "RSA PRIVATE KEY";
		this.options.privateKey = this._formatKey(this.options.privateKey, r), this.options.alipayPublicKey && (this
			.options.alipayPublicKey = this._formatKey(this.options.alipayPublicKey, "PUBLIC KEY"))
	}
	_formatKey(e, t) {
		return `-----BEGIN ${t}-----\n${e}\n-----END ${t}-----`
	}
	_formatUrl(e, t) {
		let r = e;
		const n = ["app_id", "method", "format", "charset", "sign_type", "sign", "timestamp", "version",
			"notify_url", "return_url", "auth_token", "app_auth_token"
		];
		for (const e in t)
			if (n.indexOf(e) > -1) {
				const n = encodeURIComponent(t[e]);
				r = `${r}${r.includes("?")?"&":"?"}${e}=${n}`, delete t[e]
			} return {
			execParams: t,
			url: r
		}
	}
	_getSign(e, t) {
		const r = t.bizContent || null;
		delete t.bizContent;
		const i = Object.assign({
			method: e,
			appId: this.options.appId,
			charset: this.options.charset,
			version: this.options.version,
			signType: this.options.signType,
			timestamp: T((o = this.options.timeOffset, new Date(Date.now() + 6e4 * ((new Date)
				.getTimezoneOffset() + 60 * (o || 0)))))
		}, t);
		var o;
		r && (i.bizContent = JSON.stringify(C(r)));
		const s = C(i),
			a = Object.keys(s).sort().map(e => {
				let t = s[e];
				return "[object String]" !== Array.prototype.toString.call(t) && (t = JSON.stringify(t)),
					`${e}=${t}`
			}).join("&"),
			c = n.createSign(ee[this.options.signType]).update(a, "utf8").sign(this.options.privateKey, "base64");
		return Object.assign(s, {
			sign: c
		})
	}
	async _exec(e, t = {}, r = {}) {
		const n = this._getSign(e, t),
			{
				url: i,
				execParams: o
			} = this._formatUrl(this.options.gateway, n),
			{
				status: s,
				data: a
			} = await uniCloud.httpclient.request(i, {
				method: "POST",
				data: o,
				dataType: "text",
				timeout: this.options.timeout
			});
		if (200 !== s) throw new Error("request fail");
		const c = JSON.parse(a),
			u = e.replace(/\./g, "_") + "_response",
			d = c[u],
			l = c.error_response;
		if (d) {
			if (!r.validateSign || this._checkResponseSign(a, u)) {
				if (!d.code || "10000" === d.code) {
					return {
						errCode: 0,
						errMsg: d.msg || "",
						...E(d)
					}
				}
				const e = d.sub_code ? `${d.sub_code} ${d.sub_msg}` : "" + (d.msg || "unkonwn error");
				throw new Error(e)
			}
			throw new Error("check sign error")
		}
		if (l) throw new Error(l.sub_msg || l.msg || "request fail");
		throw new Error("request fail")
	}
	_checkResponseSign(e, t) {
		if (!this.options.alipayPublicKey || "" === this.options.alipayPublicKey) return console.warn(
			"options.alipayPublicKey is empty"), !0;
		if (!e) return !1;
		const r = this._getSignStr(e, t),
			i = JSON.parse(e).sign,
			o = n.createVerify(ee[this.options.signType]);
		return o.update(r, "utf8"), o.verify(this.options.alipayPublicKey, i, "base64")
	}
	_getSignStr(e, t) {
		let r = e.trim();
		const n = e.indexOf(t + '"'),
			i = e.lastIndexOf('"sign"');
		return r = r.substr(n + t.length + 1), r = r.substr(0, i), r = r.replace(/^[^{]*{/g, "{"), r = r.replace(
			/\}([^}]*)$/g, "}"), r
	}
} {
	constructor(e) {
		super(e), this._protocols = te
	}
	async code2Session(e) {
		return await this._exec("alipay.system.oauth.token", {
			grantType: "authorization_code",
			code: e
		})
	}
}

function ne(e) {
	var t = e[0];
	return t < "0" || t > "7" ? "00" + e : e
}

function ie(e) {
	var t = e.toString(16);
	return t.length % 2 ? "0" + t : t
}

function oe(e) {
	if (e <= 127) return ie(e);
	var t = ie(e);
	return ie(128 + t.length / 2) + t
}

function se(e, t) {
	return e(t = {
		exports: {}
	}, t.exports), t.exports
}
var ae = se((function(e, t) {
		var r = i.Buffer;

		function n(e, t) {
			for (var r in e) t[r] = e[r]
		}

		function o(e, t, n) {
			return r(e, t, n)
		}
		r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? e.exports = i : (n(i, t), t.Buffer = o), o
			.prototype = Object.create(r.prototype), n(r, o), o.from = function(e, t, n) {
				if ("number" == typeof e) throw new TypeError("Argument must not be a number");
				return r(e, t, n)
			}, o.alloc = function(e, t, n) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				var i = r(e);
				return void 0 !== t ? "string" == typeof n ? i.fill(t, n) : i.fill(t) : i.fill(0), i
			}, o.allocUnsafe = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return r(e)
			}, o.allocUnsafeSlow = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return i.SlowBuffer(e)
			}
	})),
	ce = (ae.Buffer, ae.Buffer);

function ue(e) {
	if (this.buffer = null, this.writable = !0, this.readable = !0, !e) return this.buffer = ce.alloc(0), this;
	if ("function" == typeof e.pipe) return this.buffer = ce.alloc(0), e.pipe(this), this;
	if (e.length || "object" == typeof e) return this.buffer = e, this.writable = !1, process.nextTick(function() {
		this.emit("end", e), this.readable = !1, this.emit("close")
	}.bind(this)), this;
	throw new TypeError("Unexpected data type (" + typeof e + ")")
}
s.inherits(ue, o), ue.prototype.write = function(e) {
	this.buffer = ce.concat([this.buffer, ce.from(e)]), this.emit("data", e)
}, ue.prototype.end = function(e) {
	e && this.write(e), this.emit("end", e), this.emit("close"), this.writable = !1, this.readable = !1
};
var de = ue,
	le = i.Buffer,
	pe = i.SlowBuffer,
	fe = me;

function me(e, t) {
	if (!le.isBuffer(e) || !le.isBuffer(t)) return !1;
	if (e.length !== t.length) return !1;
	for (var r = 0, n = 0; n < e.length; n++) r |= e[n] ^ t[n];
	return 0 === r
}
me.install = function() {
	le.prototype.equal = pe.prototype.equal = function(e) {
		return me(this, e)
	}
};
var he = le.prototype.equal,
	ge = pe.prototype.equal;

function ye(e) {
	return (e / 8 | 0) + (e % 8 == 0 ? 0 : 1)
}
me.restore = function() {
	le.prototype.equal = he, pe.prototype.equal = ge
};
var we = {
	ES256: ye(256),
	ES384: ye(384),
	ES512: ye(521)
};
var ve = function(e) {
		var t = we[e];
		if (t) return t;
		throw new Error('Unknown algorithm "' + e + '"')
	},
	_e = ae.Buffer;

function be(e) {
	if (_e.isBuffer(e)) return e;
	if ("string" == typeof e) return _e.from(e, "base64");
	throw new TypeError("ECDSA signature must be a Base64 string or a Buffer")
}

function Ee(e, t, r) {
	for (var n = 0; t + n < r && 0 === e[t + n];) ++n;
	return e[t + n] >= 128 && --n, n
}
var Ce = {
		derToJose: function(e, t) {
			e = be(e);
			var r = ve(t),
				n = r + 1,
				i = e.length,
				o = 0;
			if (48 !== e[o++]) throw new Error('Could not find expected "seq"');
			var s = e[o++];
			if (129 === s && (s = e[o++]), i - o < s) throw new Error('"seq" specified length of "' + s +
				'", only "' + (i - o) + '" remaining');
			if (2 !== e[o++]) throw new Error('Could not find expected "int" for "r"');
			var a = e[o++];
			if (i - o - 2 < a) throw new Error('"r" specified length of "' + a + '", only "' + (i - o - 2) +
				'" available');
			if (n < a) throw new Error('"r" specified length of "' + a + '", max of "' + n + '" is acceptable');
			var c = o;
			if (o += a, 2 !== e[o++]) throw new Error('Could not find expected "int" for "s"');
			var u = e[o++];
			if (i - o !== u) throw new Error('"s" specified length of "' + u + '", expected "' + (i - o) + '"');
			if (n < u) throw new Error('"s" specified length of "' + u + '", max of "' + n + '" is acceptable');
			var d = o;
			if ((o += u) !== i) throw new Error('Expected to consume entire buffer, but "' + (i - o) +
				'" bytes remain');
			var l = r - a,
				p = r - u,
				f = _e.allocUnsafe(l + a + p + u);
			for (o = 0; o < l; ++o) f[o] = 0;
			e.copy(f, o, c + Math.max(-l, 0), c + a);
			for (var m = o = r; o < m + p; ++o) f[o] = 0;
			return e.copy(f, o, d + Math.max(-p, 0), d + u), f = (f = f.toString("base64")).replace(/=/g, "")
				.replace(/\+/g, "-").replace(/\//g, "_")
		},
		joseToDer: function(e, t) {
			e = be(e);
			var r = ve(t),
				n = e.length;
			if (n !== 2 * r) throw new TypeError('"' + t + '" signatures must be "' + 2 * r + '" bytes, saw "' + n +
				'"');
			var i = Ee(e, 0, r),
				o = Ee(e, r, e.length),
				s = r - i,
				a = r - o,
				c = 2 + s + 1 + 1 + a,
				u = c < 128,
				d = _e.allocUnsafe((u ? 2 : 3) + c),
				l = 0;
			return d[l++] = 48, u ? d[l++] = c : (d[l++] = 129, d[l++] = 255 & c), d[l++] = 2, d[l++] = s, i < 0 ? (
					d[l++] = 0, l += e.copy(d, l, 0, r)) : l += e.copy(d, l, i, r), d[l++] = 2, d[l++] = a, o < 0 ?
				(d[l++] = 0, e.copy(d, l, r)) : e.copy(d, l, r + o), d
		}
	},
	Te = ae.Buffer,
	xe = "secret must be a string or buffer",
	Ae = "key must be a string or a buffer",
	Se = "function" == typeof n.createPublicKey;

function Ie(e) {
	if (!Te.isBuffer(e) && "string" != typeof e) {
		if (!Se) throw Pe(Ae);
		if ("object" != typeof e) throw Pe(Ae);
		if ("string" != typeof e.type) throw Pe(Ae);
		if ("string" != typeof e.asymmetricKeyType) throw Pe(Ae);
		if ("function" != typeof e.export) throw Pe(Ae)
	}
}

function ke(e) {
	if (!Te.isBuffer(e) && "string" != typeof e && "object" != typeof e) throw Pe(
		"key must be a string, a buffer or an object")
}

function Oe(e) {
	return e.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function Re(e) {
	var t = 4 - (e = e.toString()).length % 4;
	if (4 !== t)
		for (var r = 0; r < t; ++r) e += "=";
	return e.replace(/\-/g, "+").replace(/_/g, "/")
}

function Pe(e) {
	var t = [].slice.call(arguments, 1),
		r = s.format.bind(s, e).apply(null, t);
	return new TypeError(r)
}

function De(e) {
	var t;
	return t = e, Te.isBuffer(t) || "string" == typeof t || (e = JSON.stringify(e)), e
}

function je(e) {
	return function(t, r) {
		! function(e) {
			if (!Te.isBuffer(e)) {
				if ("string" == typeof e) return e;
				if (!Se) throw Pe(xe);
				if ("object" != typeof e) throw Pe(xe);
				if ("secret" !== e.type) throw Pe(xe);
				if ("function" != typeof e.export) throw Pe(xe)
			}
		}(r), t = De(t);
		var i = n.createHmac("sha" + e, r);
		return Oe((i.update(t), i.digest("base64")))
	}
}

function qe(e) {
	return function(t, r, n) {
		var i = je(e)(t, n);
		return fe(Te.from(r), Te.from(i))
	}
}

function Ne(e) {
	return function(t, r) {
		ke(r), t = De(t);
		var i = n.createSign("RSA-SHA" + e);
		return Oe((i.update(t), i.sign(r, "base64")))
	}
}

function Le(e) {
	return function(t, r, i) {
		Ie(i), t = De(t), r = Re(r);
		var o = n.createVerify("RSA-SHA" + e);
		return o.update(t), o.verify(i, r, "base64")
	}
}

function Ue(e) {
	return function(t, r) {
		ke(r), t = De(t);
		var i = n.createSign("RSA-SHA" + e);
		return Oe((i.update(t), i.sign({
			key: r,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, "base64")))
	}
}

function Ve(e) {
	return function(t, r, i) {
		Ie(i), t = De(t), r = Re(r);
		var o = n.createVerify("RSA-SHA" + e);
		return o.update(t), o.verify({
			key: i,
			padding: n.constants.RSA_PKCS1_PSS_PADDING,
			saltLength: n.constants.RSA_PSS_SALTLEN_DIGEST
		}, r, "base64")
	}
}

function Me(e) {
	var t = Ne(e);
	return function() {
		var r = t.apply(null, arguments);
		return r = Ce.derToJose(r, "ES" + e)
	}
}

function Be(e) {
	var t = Le(e);
	return function(r, n, i) {
		return n = Ce.joseToDer(n, "ES" + e).toString("base64"), t(r, n, i)
	}
}

function Fe() {
	return function() {
		return ""
	}
}

function $e() {
	return function(e, t) {
		return "" === t
	}
}
Se && (Ae += " or a KeyObject", xe += "or a KeyObject");
var He = function(e) {
		var t = {
				hs: je,
				rs: Ne,
				ps: Ue,
				es: Me,
				none: Fe
			},
			r = {
				hs: qe,
				rs: Le,
				ps: Ve,
				es: Be,
				none: $e
			},
			n = e.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
		if (!n) throw Pe(
			'"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".',
			e);
		var i = (n[1] || n[3]).toLowerCase(),
			o = n[2];
		return {
			sign: t[i](o),
			verify: r[i](o)
		}
	},
	Ke = i.Buffer,
	Ge = function(e) {
		return "string" == typeof e ? e : "number" == typeof e || Ke.isBuffer(e) ? e.toString() : JSON.stringify(e)
	},
	Qe = ae.Buffer;

function Ye(e, t) {
	return Qe.from(e, t).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

function ze(e) {
	var t = e.header,
		r = e.payload,
		n = e.secret || e.privateKey,
		i = e.encoding,
		o = He(t.alg),
		a = function(e, t, r) {
			r = r || "utf8";
			var n = Ye(Ge(e), "binary"),
				i = Ye(Ge(t), r);
			return s.format("%s.%s", n, i)
		}(t, r, i),
		c = o.sign(a, n);
	return s.format("%s.%s", a, c)
}

function Je(e) {
	var t = e.secret || e.privateKey || e.key,
		r = new de(t);
	this.readable = !0, this.header = e.header, this.encoding = e.encoding, this.secret = this.privateKey = this.key =
		r, this.payload = new de(e.payload), this.secret.once("close", function() {
			!this.payload.writable && this.readable && this.sign()
		}.bind(this)), this.payload.once("close", function() {
			!this.secret.writable && this.readable && this.sign()
		}.bind(this))
}
s.inherits(Je, o), Je.prototype.sign = function() {
	try {
		var e = ze({
			header: this.header,
			payload: this.payload.buffer,
			secret: this.secret.buffer,
			encoding: this.encoding
		});
		return this.emit("done", e), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, Je.sign = ze;
var Xe = Je,
	We = ae.Buffer,
	Ze = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function et(e) {
	if (function(e) {
			return "[object Object]" === Object.prototype.toString.call(e)
		}(e)) return e;
	try {
		return JSON.parse(e)
	} catch (e) {
		return
	}
}

function tt(e) {
	var t = e.split(".", 1)[0];
	return et(We.from(t, "base64").toString("binary"))
}

function rt(e) {
	return e.split(".")[2]
}

function nt(e) {
	return Ze.test(e) && !!tt(e)
}

function it(e, t, r) {
	if (!t) {
		var n = new Error("Missing algorithm parameter for jws.verify");
		throw n.code = "MISSING_ALGORITHM", n
	}
	var i = rt(e = Ge(e)),
		o = function(e) {
			return e.split(".", 2).join(".")
		}(e);
	return He(t).verify(o, i, r)
}

function ot(e, t) {
	if (t = t || {}, !nt(e = Ge(e))) return null;
	var r = tt(e);
	if (!r) return null;
	var n = function(e, t) {
		t = t || "utf8";
		var r = e.split(".")[1];
		return We.from(r, "base64").toString(t)
	}(e);
	return ("JWT" === r.typ || t.json) && (n = JSON.parse(n, t.encoding)), {
		header: r,
		payload: n,
		signature: rt(e)
	}
}

function st(e) {
	var t = (e = e || {}).secret || e.publicKey || e.key,
		r = new de(t);
	this.readable = !0, this.algorithm = e.algorithm, this.encoding = e.encoding, this.secret = this.publicKey = this
		.key = r, this.signature = new de(e.signature), this.secret.once("close", function() {
			!this.signature.writable && this.readable && this.verify()
		}.bind(this)), this.signature.once("close", function() {
			!this.secret.writable && this.readable && this.verify()
		}.bind(this))
}
s.inherits(st, o), st.prototype.verify = function() {
	try {
		var e = it(this.signature.buffer, this.algorithm, this.key.buffer),
			t = ot(this.signature.buffer, this.encoding);
		return this.emit("done", e, t), this.emit("data", e), this.emit("end"), this.readable = !1, e
	} catch (e) {
		this.readable = !1, this.emit("error", e), this.emit("close")
	}
}, st.decode = ot, st.isValid = nt, st.verify = it;
var at = st,
	ct = {
		ALGORITHMS: ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384",
			"ES512"
		],
		sign: Xe.sign,
		verify: at.verify,
		decode: at.decode,
		isValid: at.isValid,
		createSign: function(e) {
			return new Xe(e)
		},
		createVerify: function(e) {
			return new at(e)
		}
	},
	ut = function(e, t) {
		t = t || {};
		var r = ct.decode(e, t);
		if (!r) return null;
		var n = r.payload;
		if ("string" == typeof n) try {
			var i = JSON.parse(n);
			null !== i && "object" == typeof i && (n = i)
		} catch (e) {}
		return !0 === t.complete ? {
			header: r.header,
			payload: n,
			signature: r.signature
		} : n
	},
	dt = function(e, t) {
		Error.call(this, e), Error.captureStackTrace && Error.captureStackTrace(this, this.constructor), this.name =
			"JsonWebTokenError", this.message = e, t && (this.inner = t)
	};
(dt.prototype = Object.create(Error.prototype)).constructor = dt;
var lt = dt,
	pt = function(e, t) {
		lt.call(this, e), this.name = "NotBeforeError", this.date = t
	};
(pt.prototype = Object.create(lt.prototype)).constructor = pt;
var ft = pt,
	mt = function(e, t) {
		lt.call(this, e), this.name = "TokenExpiredError", this.expiredAt = t
	};
(mt.prototype = Object.create(lt.prototype)).constructor = mt;
var ht = mt,
	gt = 1e3,
	yt = 60 * gt,
	wt = 60 * yt,
	vt = 24 * wt,
	_t = function(e, t) {
		t = t || {};
		var r = typeof e;
		if ("string" === r && e.length > 0) return function(e) {
			if ((e = String(e)).length > 100) return;
			var t =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i
				.exec(e);
			if (!t) return;
			var r = parseFloat(t[1]);
			switch ((t[2] || "ms").toLowerCase()) {
				case "years":
				case "year":
				case "yrs":
				case "yr":
				case "y":
					return 315576e5 * r;
				case "weeks":
				case "week":
				case "w":
					return 6048e5 * r;
				case "days":
				case "day":
				case "d":
					return r * vt;
				case "hours":
				case "hour":
				case "hrs":
				case "hr":
				case "h":
					return r * wt;
				case "minutes":
				case "minute":
				case "mins":
				case "min":
				case "m":
					return r * yt;
				case "seconds":
				case "second":
				case "secs":
				case "sec":
				case "s":
					return r * gt;
				case "milliseconds":
				case "millisecond":
				case "msecs":
				case "msec":
				case "ms":
					return r;
				default:
					return
			}
		}(e);
		if ("number" === r && isFinite(e)) return t.long ? function(e) {
			var t = Math.abs(e);
			if (t >= vt) return bt(e, t, vt, "day");
			if (t >= wt) return bt(e, t, wt, "hour");
			if (t >= yt) return bt(e, t, yt, "minute");
			if (t >= gt) return bt(e, t, gt, "second");
			return e + " ms"
		}(e) : function(e) {
			var t = Math.abs(e);
			if (t >= vt) return Math.round(e / vt) + "d";
			if (t >= wt) return Math.round(e / wt) + "h";
			if (t >= yt) return Math.round(e / yt) + "m";
			if (t >= gt) return Math.round(e / gt) + "s";
			return e + "ms"
		}(e);
		throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
	};

function bt(e, t, r, n) {
	var i = t >= 1.5 * r;
	return Math.round(e / r) + " " + n + (i ? "s" : "")
}
var Et = function(e, t) {
		var r = t || Math.floor(Date.now() / 1e3);
		if ("string" == typeof e) {
			var n = _t(e);
			if (void 0 === n) return;
			return Math.floor(r + n / 1e3)
		}
		return "number" == typeof e ? r + e : void 0
	},
	Ct = se((function(e, t) {
		var r;
		t = e.exports = G, r = "object" == typeof process && process.env && process.env.NODE_DEBUG &&
			/\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
				var e = Array.prototype.slice.call(arguments, 0);
				e.unshift("SEMVER"), console.log.apply(console, e)
			} : function() {}, t.SEMVER_SPEC_VERSION = "2.0.0";
		var n = Number.MAX_SAFE_INTEGER || 9007199254740991,
			i = t.re = [],
			o = t.src = [],
			s = 0,
			a = s++;
		o[a] = "0|[1-9]\\d*";
		var c = s++;
		o[c] = "[0-9]+";
		var u = s++;
		o[u] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
		var d = s++;
		o[d] = "(" + o[a] + ")\\.(" + o[a] + ")\\.(" + o[a] + ")";
		var l = s++;
		o[l] = "(" + o[c] + ")\\.(" + o[c] + ")\\.(" + o[c] + ")";
		var p = s++;
		o[p] = "(?:" + o[a] + "|" + o[u] + ")";
		var f = s++;
		o[f] = "(?:" + o[c] + "|" + o[u] + ")";
		var m = s++;
		o[m] = "(?:-(" + o[p] + "(?:\\." + o[p] + ")*))";
		var h = s++;
		o[h] = "(?:-?(" + o[f] + "(?:\\." + o[f] + ")*))";
		var g = s++;
		o[g] = "[0-9A-Za-z-]+";
		var y = s++;
		o[y] = "(?:\\+(" + o[g] + "(?:\\." + o[g] + ")*))";
		var w = s++,
			v = "v?" + o[d] + o[m] + "?" + o[y] + "?";
		o[w] = "^" + v + "$";
		var _ = "[v=\\s]*" + o[l] + o[h] + "?" + o[y] + "?",
			b = s++;
		o[b] = "^" + _ + "$";
		var E = s++;
		o[E] = "((?:<|>)?=?)";
		var C = s++;
		o[C] = o[c] + "|x|X|\\*";
		var T = s++;
		o[T] = o[a] + "|x|X|\\*";
		var x = s++;
		o[x] = "[v=\\s]*(" + o[T] + ")(?:\\.(" + o[T] + ")(?:\\.(" + o[T] + ")(?:" + o[m] + ")?" + o[y] +
			"?)?)?";
		var A = s++;
		o[A] = "[v=\\s]*(" + o[C] + ")(?:\\.(" + o[C] + ")(?:\\.(" + o[C] + ")(?:" + o[h] + ")?" + o[y] +
			"?)?)?";
		var S = s++;
		o[S] = "^" + o[E] + "\\s*" + o[x] + "$";
		var I = s++;
		o[I] = "^" + o[E] + "\\s*" + o[A] + "$";
		var k = s++;
		o[k] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
		var O = s++;
		o[O] = "(?:~>?)";
		var R = s++;
		o[R] = "(\\s*)" + o[O] + "\\s+", i[R] = new RegExp(o[R], "g");
		var P = s++;
		o[P] = "^" + o[O] + o[x] + "$";
		var D = s++;
		o[D] = "^" + o[O] + o[A] + "$";
		var j = s++;
		o[j] = "(?:\\^)";
		var q = s++;
		o[q] = "(\\s*)" + o[j] + "\\s+", i[q] = new RegExp(o[q], "g");
		var N = s++;
		o[N] = "^" + o[j] + o[x] + "$";
		var L = s++;
		o[L] = "^" + o[j] + o[A] + "$";
		var U = s++;
		o[U] = "^" + o[E] + "\\s*(" + _ + ")$|^$";
		var V = s++;
		o[V] = "^" + o[E] + "\\s*(" + v + ")$|^$";
		var M = s++;
		o[M] = "(\\s*)" + o[E] + "\\s*(" + _ + "|" + o[x] + ")", i[M] = new RegExp(o[M], "g");
		var B = s++;
		o[B] = "^\\s*(" + o[x] + ")\\s+-\\s+(" + o[x] + ")\\s*$";
		var F = s++;
		o[F] = "^\\s*(" + o[A] + ")\\s+-\\s+(" + o[A] + ")\\s*$";
		var $ = s++;
		o[$] = "(<|>)?=?\\s*\\*";
		for (var H = 0; H < 35; H++) r(H, o[H]), i[H] || (i[H] = new RegExp(o[H]));

		function K(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof G) return e;
			if ("string" != typeof e) return null;
			if (e.length > 256) return null;
			if (!(t.loose ? i[b] : i[w]).test(e)) return null;
			try {
				return new G(e, t)
			} catch (e) {
				return null
			}
		}

		function G(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof G) {
				if (e.loose === t.loose) return e;
				e = e.version
			} else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
			if (e.length > 256) throw new TypeError("version is longer than 256 characters");
			if (!(this instanceof G)) return new G(e, t);
			r("SemVer", e, t), this.options = t, this.loose = !!t.loose;
			var o = e.trim().match(t.loose ? i[b] : i[w]);
			if (!o) throw new TypeError("Invalid Version: " + e);
			if (this.raw = e, this.major = +o[1], this.minor = +o[2], this.patch = +o[3], this.major > n || this
				.major < 0) throw new TypeError("Invalid major version");
			if (this.minor > n || this.minor < 0) throw new TypeError("Invalid minor version");
			if (this.patch > n || this.patch < 0) throw new TypeError("Invalid patch version");
			o[4] ? this.prerelease = o[4].split(".").map((function(e) {
				if (/^[0-9]+$/.test(e)) {
					var t = +e;
					if (t >= 0 && t < n) return t
				}
				return e
			})) : this.prerelease = [], this.build = o[5] ? o[5].split(".") : [], this.format()
		}
		t.parse = K, t.valid = function(e, t) {
			var r = K(e, t);
			return r ? r.version : null
		}, t.clean = function(e, t) {
			var r = K(e.trim().replace(/^[=v]+/, ""), t);
			return r ? r.version : null
		}, t.SemVer = G, G.prototype.format = function() {
			return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease
				.length && (this.version += "-" + this.prerelease.join(".")), this.version
		}, G.prototype.toString = function() {
			return this.version
		}, G.prototype.compare = function(e) {
			return r("SemVer.compare", this.version, this.options, e), e instanceof G || (e = new G(e, this
				.options)), this.compareMain(e) || this.comparePre(e)
		}, G.prototype.compareMain = function(e) {
			return e instanceof G || (e = new G(e, this.options)), Y(this.major, e.major) || Y(this.minor, e
				.minor) || Y(this.patch, e.patch)
		}, G.prototype.comparePre = function(e) {
			if (e instanceof G || (e = new G(e, this.options)), this.prerelease.length && !e.prerelease
				.length) return -1;
			if (!this.prerelease.length && e.prerelease.length) return 1;
			if (!this.prerelease.length && !e.prerelease.length) return 0;
			var t = 0;
			do {
				var n = this.prerelease[t],
					i = e.prerelease[t];
				if (r("prerelease compare", t, n, i), void 0 === n && void 0 === i) return 0;
				if (void 0 === i) return 1;
				if (void 0 === n) return -1;
				if (n !== i) return Y(n, i)
			} while (++t)
		}, G.prototype.inc = function(e, t) {
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc(
						"pre", t);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
					break;
				case "prerelease":
					0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
					break;
				case "major":
					0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++,
						this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this
						.prerelease = [];
					break;
				case "patch":
					0 === this.prerelease.length && this.patch++, this.prerelease = [];
					break;
				case "pre":
					if (0 === this.prerelease.length) this.prerelease = [0];
					else {
						for (var r = this.prerelease.length; --r >= 0;) "number" == typeof this.prerelease[
							r] && (this.prerelease[r]++, r = -2); - 1 === r && this.prerelease.push(0)
					}
					t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [t,
						0]) : this.prerelease = [t, 0]);
					break;
				default:
					throw new Error("invalid increment argument: " + e)
			}
			return this.format(), this.raw = this.version, this
		}, t.inc = function(e, t, r, n) {
			"string" == typeof r && (n = r, r = void 0);
			try {
				return new G(e, r).inc(t, n).version
			} catch (e) {
				return null
			}
		}, t.diff = function(e, t) {
			if (W(e, t)) return null;
			var r = K(e),
				n = K(t),
				i = "";
			if (r.prerelease.length || n.prerelease.length) {
				i = "pre";
				var o = "prerelease"
			}
			for (var s in r)
				if (("major" === s || "minor" === s || "patch" === s) && r[s] !== n[s]) return i + s;
			return o
		}, t.compareIdentifiers = Y;
		var Q = /^[0-9]+$/;

		function Y(e, t) {
			var r = Q.test(e),
				n = Q.test(t);
			return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1
		}

		function z(e, t, r) {
			return new G(e, r).compare(new G(t, r))
		}

		function J(e, t, r) {
			return z(e, t, r) > 0
		}

		function X(e, t, r) {
			return z(e, t, r) < 0
		}

		function W(e, t, r) {
			return 0 === z(e, t, r)
		}

		function Z(e, t, r) {
			return 0 !== z(e, t, r)
		}

		function ee(e, t, r) {
			return z(e, t, r) >= 0
		}

		function te(e, t, r) {
			return z(e, t, r) <= 0
		}

		function re(e, t, r, n) {
			switch (t) {
				case "===":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version),
						e === r;
				case "!==":
					return "object" == typeof e && (e = e.version), "object" == typeof r && (r = r.version),
						e !== r;
				case "":
				case "=":
				case "==":
					return W(e, r, n);
				case "!=":
					return Z(e, r, n);
				case ">":
					return J(e, r, n);
				case ">=":
					return ee(e, r, n);
				case "<":
					return X(e, r, n);
				case "<=":
					return te(e, r, n);
				default:
					throw new TypeError("Invalid operator: " + t)
			}
		}

		function ne(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof ne) {
				if (e.loose === !!t.loose) return e;
				e = e.value
			}
			if (!(this instanceof ne)) return new ne(e, t);
			r("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), this.semver === ie ?
				this.value = "" : this.value = this.operator + this.semver.version, r("comp", this)
		}
		t.rcompareIdentifiers = function(e, t) {
			return Y(t, e)
		}, t.major = function(e, t) {
			return new G(e, t).major
		}, t.minor = function(e, t) {
			return new G(e, t).minor
		}, t.patch = function(e, t) {
			return new G(e, t).patch
		}, t.compare = z, t.compareLoose = function(e, t) {
			return z(e, t, !0)
		}, t.rcompare = function(e, t, r) {
			return z(t, e, r)
		}, t.sort = function(e, r) {
			return e.sort((function(e, n) {
				return t.compare(e, n, r)
			}))
		}, t.rsort = function(e, r) {
			return e.sort((function(e, n) {
				return t.rcompare(e, n, r)
			}))
		}, t.gt = J, t.lt = X, t.eq = W, t.neq = Z, t.gte = ee, t.lte = te, t.cmp = re, t.Comparator = ne;
		var ie = {};

		function oe(e, t) {
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), e instanceof oe) return e.loose === !!t.loose && e.includePrerelease === !!t
				.includePrerelease ? e : new oe(e.raw, t);
			if (e instanceof ne) return new oe(e.value, t);
			if (!(this instanceof oe)) return new oe(e, t);
			if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, this
				.raw = e, this.set = e.split(/\s*\|\|\s*/).map((function(e) {
					return this.parseRange(e.trim())
				}), this).filter((function(e) {
					return e.length
				})), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
			this.format()
		}

		function se(e) {
			return !e || "x" === e.toLowerCase() || "*" === e
		}

		function ae(e, t, r, n, i, o, s, a, c, u, d, l, p) {
			return ((t = se(r) ? "" : se(n) ? ">=" + r + ".0.0" : se(i) ? ">=" + r + "." + n + ".0" : ">=" +
				t) + " " + (a = se(c) ? "" : se(u) ? "<" + (+c + 1) + ".0.0" : se(d) ? "<" + c + "." + (+u +
					1) + ".0" : l ? "<=" + c + "." + u + "." + d + "-" + l : "<=" + a)).trim()
		}

		function ce(e, t, n) {
			for (var i = 0; i < e.length; i++)
				if (!e[i].test(t)) return !1;
			if (t.prerelease.length && !n.includePrerelease) {
				for (i = 0; i < e.length; i++)
					if (r(e[i].semver), e[i].semver !== ie && e[i].semver.prerelease.length > 0) {
						var o = e[i].semver;
						if (o.major === t.major && o.minor === t.minor && o.patch === t.patch) return !0
					} return !1
			}
			return !0
		}

		function ue(e, t, r) {
			try {
				t = new oe(t, r)
			} catch (e) {
				return !1
			}
			return t.test(e)
		}

		function de(e, t, r, n) {
			var i, o, s, a, c;
			switch (e = new G(e, n), t = new oe(t, n), r) {
				case ">":
					i = J, o = te, s = X, a = ">", c = ">=";
					break;
				case "<":
					i = X, o = ee, s = J, a = "<", c = "<=";
					break;
				default:
					throw new TypeError('Must provide a hilo val of "<" or ">"')
			}
			if (ue(e, t, n)) return !1;
			for (var u = 0; u < t.set.length; ++u) {
				var d = t.set[u],
					l = null,
					p = null;
				if (d.forEach((function(e) {
						e.semver === ie && (e = new ne(">=0.0.0")), l = l || e, p = p || e, i(e.semver,
							l.semver, n) ? l = e : s(e.semver, p.semver, n) && (p = e)
					})), l.operator === a || l.operator === c) return !1;
				if ((!p.operator || p.operator === a) && o(e, p.semver)) return !1;
				if (p.operator === c && s(e, p.semver)) return !1
			}
			return !0
		}
		ne.prototype.parse = function(e) {
			var t = this.options.loose ? i[U] : i[V],
				r = e.match(t);
			if (!r) throw new TypeError("Invalid comparator: " + e);
			this.operator = r[1], "=" === this.operator && (this.operator = ""), r[2] ? this.semver = new G(
				r[2], this.options.loose) : this.semver = ie
		}, ne.prototype.toString = function() {
			return this.value
		}, ne.prototype.test = function(e) {
			return r("Comparator.test", e, this.options.loose), this.semver === ie || ("string" ==
				typeof e && (e = new G(e, this.options)), re(e, this.operator, this.semver, this
					.options))
		}, ne.prototype.intersects = function(e, t) {
			if (!(e instanceof ne)) throw new TypeError("a Comparator is required");
			var r;
			if (t && "object" == typeof t || (t = {
					loose: !!t,
					includePrerelease: !1
				}), "" === this.operator) return r = new oe(e.value, t), ue(this.value, r, t);
			if ("" === e.operator) return r = new oe(this.value, t), ue(e.semver, r, t);
			var n = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e
					.operator),
				i = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e
					.operator),
				o = this.semver.version === e.semver.version,
				s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e
					.operator),
				a = re(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this
				.operator) && ("<=" === e.operator || "<" === e.operator),
				c = re(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this
				.operator) && (">=" === e.operator || ">" === e.operator);
			return n || i || o && s || a || c
		}, t.Range = oe, oe.prototype.format = function() {
			return this.range = this.set.map((function(e) {
				return e.join(" ").trim()
			})).join("||").trim(), this.range
		}, oe.prototype.toString = function() {
			return this.range
		}, oe.prototype.parseRange = function(e) {
			var t = this.options.loose;
			e = e.trim();
			var n = t ? i[F] : i[B];
			e = e.replace(n, ae), r("hyphen replace", e), e = e.replace(i[M], "$1$2$3"), r(
					"comparator trim", e, i[M]), e = (e = (e = e.replace(i[R], "$1~")).replace(i[q], "$1^"))
				.split(/\s+/).join(" ");
			var o = t ? i[U] : i[V],
				s = e.split(" ").map((function(e) {
					return function(e, t) {
						return r("comp", e, t), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									r("caret", e, t);
									var n = t.loose ? i[L] : i[N];
									return e.replace(n, (function(t, n, i,
										o, s) {
										var a;
										return r("caret", e, t,
												n, i, o, s), se(
												n) ? a = "" :
											se(i) ? a = ">=" +
											n + ".0.0 <" + (+n +
												1) + ".0.0" :
											se(o) ? a = "0" ===
											n ? ">=" + n + "." +
											i + ".0 <" + n +
											"." + (+i + 1) +
											".0" : ">=" + n +
											"." + i + ".0 <" + (
												+n + 1) +
											".0.0" : s ? (r(
													"replaceCaret pr",
													s), a =
												"0" === n ?
												"0" === i ?
												">=" + n + "." +
												i + "." + o +
												"-" + s + " <" +
												n + "." + i +
												"." + (+o + 1) :
												">=" + n + "." +
												i + "." + o +
												"-" + s + " <" +
												n + "." + (+i +
													1) + ".0" :
												">=" + n + "." +
												i + "." + o +
												"-" + s + " <" +
												(+n + 1) +
												".0.0") : (r(
													"no pr"),
												a = "0" === n ?
												"0" === i ?
												">=" + n + "." +
												i + "." + o +
												" <" + n + "." +
												i + "." + (+o +
													1) : ">=" +
												n + "." + i +
												"." + o + " <" +
												n + "." + (+i +
													1) + ".0" :
												">=" + n + "." +
												i + "." + o +
												" <" + (+n +
												1) + ".0.0"), r(
												"caret return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("caret", e), e = function(e, t) {
							return e.trim().split(/\s+/).map((function(e) {
								return function(e, t) {
									var n = t.loose ? i[D] : i[P];
									return e.replace(n, (function(t, n, i,
										o, s) {
										var a;
										return r("tilde", e, t,
												n, i, o, s), se(
												n) ? a = "" :
											se(i) ? a = ">=" +
											n + ".0.0 <" + (+n +
												1) + ".0.0" :
											se(o) ? a = ">=" +
											n + "." + i +
											".0 <" + n + "." + (
												+i + 1) + ".0" :
											s ? (r("replaceTilde pr",
													s), a =
												">=" + n + "." +
												i + "." + o +
												"-" + s + " <" +
												n + "." + (+i +
													1) + ".0") :
											a = ">=" + n + "." +
											i + "." + o + " <" +
											n + "." + (+i + 1) +
											".0", r(
												"tilde return",
												a), a
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("tildes", e), e = function(e, t) {
							return r("replaceXRanges", e, t), e.split(/\s+/).map((function(
								e) {
								return function(e, t) {
									e = e.trim();
									var n = t.loose ? i[I] : i[S];
									return e.replace(n, (function(t, n, i,
										o, s, a) {
										r("xRange", e, t, n, i,
											o, s, a);
										var c = se(i),
											u = c || se(o),
											d = u || se(s);
										return "=" === n && d &&
											(n = ""), c ? t =
											">" === n || "<" ===
											n ? "<0.0.0" : "*" :
											n && d ? (u && (o =
													0), s = 0,
												">" === n ? (n =
													">=", u ? (
														i = +i +
														1, o =
														0, s = 0
														) : (
														o = +o +
														1, s = 0
														)) :
												"<=" === n && (
													n = "<", u ?
													i = +i + 1 :
													o = +o + 1),
												t = n + i +
												"." + o + "." +
												s) : u ? t =
											">=" + i +
											".0.0 <" + (+i +
											1) + ".0.0" : d && (
												t = ">=" + i +
												"." + o +
												".0 <" + i +
												"." + (+o + 1) +
												".0"), r(
												"xRange return",
												t), t
									}))
								}(e, t)
							})).join(" ")
						}(e, t), r("xrange", e), e = function(e, t) {
							return r("replaceStars", e, t), e.trim().replace(i[$], "")
						}(e, t), r("stars", e), e
					}(e, this.options)
				}), this).join(" ").split(/\s+/);
			return this.options.loose && (s = s.filter((function(e) {
				return !!e.match(o)
			}))), s = s.map((function(e) {
				return new ne(e, this.options)
			}), this)
		}, oe.prototype.intersects = function(e, t) {
			if (!(e instanceof oe)) throw new TypeError("a Range is required");
			return this.set.some((function(r) {
				return r.every((function(r) {
					return e.set.some((function(e) {
						return e.every((function(e) {
							return r.intersects(e, t)
						}))
					}))
				}))
			}))
		}, t.toComparators = function(e, t) {
			return new oe(e, t).set.map((function(e) {
				return e.map((function(e) {
					return e.value
				})).join(" ").trim().split(" ")
			}))
		}, oe.prototype.test = function(e) {
			if (!e) return !1;
			"string" == typeof e && (e = new G(e, this.options));
			for (var t = 0; t < this.set.length; t++)
				if (ce(this.set[t], e, this.options)) return !0;
			return !1
		}, t.satisfies = ue, t.maxSatisfying = function(e, t, r) {
			var n = null,
				i = null;
			try {
				var o = new oe(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (n && -1 !== i.compare(e) || (i = new G(n = e, r)))
			})), n
		}, t.minSatisfying = function(e, t, r) {
			var n = null,
				i = null;
			try {
				var o = new oe(t, r)
			} catch (e) {
				return null
			}
			return e.forEach((function(e) {
				o.test(e) && (n && 1 !== i.compare(e) || (i = new G(n = e, r)))
			})), n
		}, t.minVersion = function(e, t) {
			e = new oe(e, t);
			var r = new G("0.0.0");
			if (e.test(r)) return r;
			if (r = new G("0.0.0-0"), e.test(r)) return r;
			r = null;
			for (var n = 0; n < e.set.length; ++n) {
				e.set[n].forEach((function(e) {
					var t = new G(e.semver.version);
					switch (e.operator) {
						case ">":
							0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0), t
								.raw = t.format();
						case "":
						case ">=":
							r && !J(r, t) || (r = t);
							break;
						case "<":
						case "<=":
							break;
						default:
							throw new Error("Unexpected operation: " + e.operator)
					}
				}))
			}
			if (r && e.test(r)) return r;
			return null
		}, t.validRange = function(e, t) {
			try {
				return new oe(e, t).range || "*"
			} catch (e) {
				return null
			}
		}, t.ltr = function(e, t, r) {
			return de(e, t, "<", r)
		}, t.gtr = function(e, t, r) {
			return de(e, t, ">", r)
		}, t.outside = de, t.prerelease = function(e, t) {
			var r = K(e, t);
			return r && r.prerelease.length ? r.prerelease : null
		}, t.intersects = function(e, t, r) {
			return e = new oe(e, r), t = new oe(t, r), e.intersects(t)
		}, t.coerce = function(e) {
			if (e instanceof G) return e;
			if ("string" != typeof e) return null;
			var t = e.match(i[k]);
			if (null == t) return null;
			return K(t[1] + "." + (t[2] || "0") + "." + (t[3] || "0"))
		}
	})),
	Tt = (Ct.SEMVER_SPEC_VERSION, Ct.re, Ct.src, Ct.parse, Ct.valid, Ct.clean, Ct.SemVer, Ct.inc, Ct.diff, Ct
		.compareIdentifiers, Ct.rcompareIdentifiers, Ct.major, Ct.minor, Ct.patch, Ct.compare, Ct.compareLoose, Ct
		.rcompare, Ct.sort, Ct.rsort, Ct.gt, Ct.lt, Ct.eq, Ct.neq, Ct.gte, Ct.lte, Ct.cmp, Ct.Comparator, Ct.Range, Ct
		.toComparators, Ct.satisfies, Ct.maxSatisfying, Ct.minSatisfying, Ct.minVersion, Ct.validRange, Ct.ltr, Ct.gtr,
		Ct.outside, Ct.prerelease, Ct.intersects, Ct.coerce, Ct.satisfies(process.version, "^6.12.0 || >=8.0.0")),
	xt = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512"],
	At = ["RS256", "RS384", "RS512"],
	St = ["HS256", "HS384", "HS512"];
Tt && (xt.splice(3, 0, "PS256", "PS384", "PS512"), At.splice(3, 0, "PS256", "PS384", "PS512"));
var It = /^\s+|\s+$/g,
	kt = /^[-+]0x[0-9a-f]+$/i,
	Ot = /^0b[01]+$/i,
	Rt = /^0o[0-7]+$/i,
	Pt = /^(?:0|[1-9]\d*)$/,
	Dt = parseInt;

function jt(e) {
	return e != e
}

function qt(e, t) {
	return function(e, t) {
		for (var r = -1, n = e ? e.length : 0, i = Array(n); ++r < n;) i[r] = t(e[r], r, e);
		return i
	}(t, (function(t) {
		return e[t]
	}))
}
var Nt, Lt, Ut = Object.prototype,
	Vt = Ut.hasOwnProperty,
	Mt = Ut.toString,
	Bt = Ut.propertyIsEnumerable,
	Ft = (Nt = Object.keys, Lt = Object, function(e) {
		return Nt(Lt(e))
	}),
	$t = Math.max;

function Ht(e, t) {
	var r = Qt(e) || function(e) {
			return function(e) {
				return Jt(e) && Yt(e)
			}(e) && Vt.call(e, "callee") && (!Bt.call(e, "callee") || "[object Arguments]" == Mt.call(e))
		}(e) ? function(e, t) {
			for (var r = -1, n = Array(e); ++r < e;) n[r] = t(r);
			return n
		}(e.length, String) : [],
		n = r.length,
		i = !!n;
	for (var o in e) !t && !Vt.call(e, o) || i && ("length" == o || Gt(o, n)) || r.push(o);
	return r
}

function Kt(e) {
	if (r = (t = e) && t.constructor, n = "function" == typeof r && r.prototype || Ut, t !== n) return Ft(e);
	var t, r, n, i = [];
	for (var o in Object(e)) Vt.call(e, o) && "constructor" != o && i.push(o);
	return i
}

function Gt(e, t) {
	return !!(t = null == t ? 9007199254740991 : t) && ("number" == typeof e || Pt.test(e)) && e > -1 && e % 1 == 0 &&
		e < t
}
var Qt = Array.isArray;

function Yt(e) {
	return null != e && function(e) {
		return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
	}(e.length) && ! function(e) {
		var t = zt(e) ? Mt.call(e) : "";
		return "[object Function]" == t || "[object GeneratorFunction]" == t
	}(e)
}

function zt(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}

function Jt(e) {
	return !!e && "object" == typeof e
}
var Xt = function(e, t, r, n) {
		var i;
		e = Yt(e) ? e : (i = e) ? qt(i, function(e) {
			return Yt(e) ? Ht(e) : Kt(e)
		}(i)) : [], r = r && !n ? function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || Jt(e) && "[object Symbol]" == Mt.call(e)
								}(e)) return NaN;
							if (zt(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = zt(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(It, "");
							var r = Ot.test(e);
							return r || Rt.test(e) ? Dt(e.slice(2), r ? 2 : 8) : kt.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(r) : 0;
		var o = e.length;
		return r < 0 && (r = $t(o + r, 0)),
			function(e) {
				return "string" == typeof e || !Qt(e) && Jt(e) && "[object String]" == Mt.call(e)
			}(e) ? r <= o && e.indexOf(t, r) > -1 : !!o && function(e, t, r) {
				if (t != t) return function(e, t, r, n) {
					for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)
						if (t(e[o], o, e)) return o;
					return -1
				}(e, jt, r);
				for (var n = r - 1, i = e.length; ++n < i;)
					if (e[n] === t) return n;
				return -1
			}(e, t, r) > -1
	},
	Wt = Object.prototype.toString;
var Zt = function(e) {
		return !0 === e || !1 === e || function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object Boolean]" == Wt.call(e)
	},
	er = /^\s+|\s+$/g,
	tr = /^[-+]0x[0-9a-f]+$/i,
	rr = /^0b[01]+$/i,
	nr = /^0o[0-7]+$/i,
	ir = parseInt,
	or = Object.prototype.toString;

function sr(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var ar = function(e) {
		return "number" == typeof e && e == function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == or.call(e)
								}(e)) return NaN;
							if (sr(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = sr(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(er, "");
							var r = rr.test(e);
							return r || nr.test(e) ? ir(e.slice(2), r ? 2 : 8) : tr.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e)
	},
	cr = Object.prototype.toString;
var ur = function(e) {
	return "number" == typeof e || function(e) {
		return !!e && "object" == typeof e
	}(e) && "[object Number]" == cr.call(e)
};
var dr = Function.prototype,
	lr = Object.prototype,
	pr = dr.toString,
	fr = lr.hasOwnProperty,
	mr = pr.call(Object),
	hr = lr.toString,
	gr = function(e, t) {
		return function(r) {
			return e(t(r))
		}
	}(Object.getPrototypeOf, Object);
var yr = function(e) {
		if (! function(e) {
				return !!e && "object" == typeof e
			}(e) || "[object Object]" != hr.call(e) || function(e) {
				var t = !1;
				if (null != e && "function" != typeof e.toString) try {
					t = !!(e + "")
				} catch (e) {}
				return t
			}(e)) return !1;
		var t = gr(e);
		if (null === t) return !0;
		var r = fr.call(t, "constructor") && t.constructor;
		return "function" == typeof r && r instanceof r && pr.call(r) == mr
	},
	wr = Object.prototype.toString,
	vr = Array.isArray;
var _r = function(e) {
		return "string" == typeof e || !vr(e) && function(e) {
			return !!e && "object" == typeof e
		}(e) && "[object String]" == wr.call(e)
	},
	br = /^\s+|\s+$/g,
	Er = /^[-+]0x[0-9a-f]+$/i,
	Cr = /^0b[01]+$/i,
	Tr = /^0o[0-7]+$/i,
	xr = parseInt,
	Ar = Object.prototype.toString;

function Sr(e, t) {
	var r;
	if ("function" != typeof t) throw new TypeError("Expected a function");
	return e = function(e) {
			var t = function(e) {
					if (!e) return 0 === e ? e : 0;
					if ((e = function(e) {
							if ("number" == typeof e) return e;
							if (function(e) {
									return "symbol" == typeof e || function(e) {
										return !!e && "object" == typeof e
									}(e) && "[object Symbol]" == Ar.call(e)
								}(e)) return NaN;
							if (Ir(e)) {
								var t = "function" == typeof e.valueOf ? e.valueOf() : e;
								e = Ir(t) ? t + "" : t
							}
							if ("string" != typeof e) return 0 === e ? e : +e;
							e = e.replace(br, "");
							var r = Cr.test(e);
							return r || Tr.test(e) ? xr(e.slice(2), r ? 2 : 8) : Er.test(e) ? NaN : +e
						}(e)) === 1 / 0 || e === -1 / 0) {
						return 17976931348623157e292 * (e < 0 ? -1 : 1)
					}
					return e == e ? e : 0
				}(e),
				r = t % 1;
			return t == t ? r ? t - r : t : 0
		}(e),
		function() {
			return --e > 0 && (r = t.apply(this, arguments)), e <= 1 && (t = void 0), r
		}
}

function Ir(e) {
	var t = typeof e;
	return !!e && ("object" == t || "function" == t)
}
var kr = function(e) {
		return Sr(2, e)
	},
	Or = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
Tt && Or.splice(3, 0, "PS256", "PS384", "PS512");
var Rr = {
		expiresIn: {
			isValid: function(e) {
				return ar(e) || _r(e) && e
			},
			message: '"expiresIn" should be a number of seconds or string representing a timespan'
		},
		notBefore: {
			isValid: function(e) {
				return ar(e) || _r(e) && e
			},
			message: '"notBefore" should be a number of seconds or string representing a timespan'
		},
		audience: {
			isValid: function(e) {
				return _r(e) || Array.isArray(e)
			},
			message: '"audience" must be a string or array'
		},
		algorithm: {
			isValid: Xt.bind(null, Or),
			message: '"algorithm" must be a valid string enum value'
		},
		header: {
			isValid: yr,
			message: '"header" must be an object'
		},
		encoding: {
			isValid: _r,
			message: '"encoding" must be a string'
		},
		issuer: {
			isValid: _r,
			message: '"issuer" must be a string'
		},
		subject: {
			isValid: _r,
			message: '"subject" must be a string'
		},
		jwtid: {
			isValid: _r,
			message: '"jwtid" must be a string'
		},
		noTimestamp: {
			isValid: Zt,
			message: '"noTimestamp" must be a boolean'
		},
		keyid: {
			isValid: _r,
			message: '"keyid" must be a string'
		},
		mutatePayload: {
			isValid: Zt,
			message: '"mutatePayload" must be a boolean'
		}
	},
	Pr = {
		iat: {
			isValid: ur,
			message: '"iat" should be a number of seconds'
		},
		exp: {
			isValid: ur,
			message: '"exp" should be a number of seconds'
		},
		nbf: {
			isValid: ur,
			message: '"nbf" should be a number of seconds'
		}
	};

function Dr(e, t, r, n) {
	if (!yr(r)) throw new Error('Expected "' + n + '" to be a plain object.');
	Object.keys(r).forEach((function(i) {
		var o = e[i];
		if (o) {
			if (!o.isValid(r[i])) throw new Error(o.message)
		} else if (!t) throw new Error('"' + i + '" is not allowed in "' + n + '"')
	}))
}
var jr = {
		audience: "aud",
		issuer: "iss",
		subject: "sub",
		jwtid: "jti"
	},
	qr = ["expiresIn", "notBefore", "noTimestamp", "audience", "issuer", "subject", "jwtid"],
	Nr = function(e, t, r, n) {
		var i;
		if ("function" != typeof r || n || (n = r, r = {}), r || (r = {}), r = Object.assign({}, r), i = n || function(
				e, t) {
				if (e) throw e;
				return t
			}, r.clockTimestamp && "number" != typeof r.clockTimestamp) return i(new lt(
			"clockTimestamp must be a number"));
		if (void 0 !== r.nonce && ("string" != typeof r.nonce || "" === r.nonce.trim())) return i(new lt(
			"nonce must be a non-empty string"));
		var o = r.clockTimestamp || Math.floor(Date.now() / 1e3);
		if (!e) return i(new lt("jwt must be provided"));
		if ("string" != typeof e) return i(new lt("jwt must be a string"));
		var s, a = e.split(".");
		if (3 !== a.length) return i(new lt("jwt malformed"));
		try {
			s = ut(e, {
				complete: !0
			})
		} catch (e) {
			return i(e)
		}
		if (!s) return i(new lt("invalid token"));
		var c, u = s.header;
		if ("function" == typeof t) {
			if (!n) return i(new lt(
				"verify must be called asynchronous if secret or public key is provided as a callback"));
			c = t
		} else c = function(e, r) {
			return r(null, t)
		};
		return c(u, (function(t, n) {
			if (t) return i(new lt("error in secret or public key callback: " + t.message));
			var c, d = "" !== a[2].trim();
			if (!d && n) return i(new lt("jwt signature is required"));
			if (d && !n) return i(new lt("secret or public key must be provided"));
			if (d || r.algorithms || (r.algorithms = ["none"]), r.algorithms || (r.algorithms = ~n
					.toString().indexOf("BEGIN CERTIFICATE") || ~n.toString().indexOf("BEGIN PUBLIC KEY") ?
					xt : ~n.toString().indexOf("BEGIN RSA PUBLIC KEY") ? At : St), !~r.algorithms.indexOf(s
					.header.alg)) return i(new lt("invalid algorithm"));
			try {
				c = ct.verify(e, s.header.alg, n)
			} catch (e) {
				return i(e)
			}
			if (!c) return i(new lt("invalid signature"));
			var l = s.payload;
			if (void 0 !== l.nbf && !r.ignoreNotBefore) {
				if ("number" != typeof l.nbf) return i(new lt("invalid nbf value"));
				if (l.nbf > o + (r.clockTolerance || 0)) return i(new ft("jwt not active", new Date(1e3 * l
					.nbf)))
			}
			if (void 0 !== l.exp && !r.ignoreExpiration) {
				if ("number" != typeof l.exp) return i(new lt("invalid exp value"));
				if (o >= l.exp + (r.clockTolerance || 0)) return i(new ht("jwt expired", new Date(1e3 * l
					.exp)))
			}
			if (r.audience) {
				var p = Array.isArray(r.audience) ? r.audience : [r.audience];
				if (!(Array.isArray(l.aud) ? l.aud : [l.aud]).some((function(e) {
						return p.some((function(t) {
							return t instanceof RegExp ? t.test(e) : t === e
						}))
					}))) return i(new lt("jwt audience invalid. expected: " + p.join(" or ")))
			}
			if (r.issuer && ("string" == typeof r.issuer && l.iss !== r.issuer || Array.isArray(r.issuer) &&
					-1 === r.issuer.indexOf(l.iss))) return i(new lt("jwt issuer invalid. expected: " + r
				.issuer));
			if (r.subject && l.sub !== r.subject) return i(new lt("jwt subject invalid. expected: " + r
				.subject));
			if (r.jwtid && l.jti !== r.jwtid) return i(new lt("jwt jwtid invalid. expected: " + r.jwtid));
			if (r.nonce && l.nonce !== r.nonce) return i(new lt("jwt nonce invalid. expected: " + r.nonce));
			if (r.maxAge) {
				if ("number" != typeof l.iat) return i(new lt("iat required when maxAge is specified"));
				var f = Et(r.maxAge, l.iat);
				if (void 0 === f) return i(new lt(
					'"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
					));
				if (o >= f + (r.clockTolerance || 0)) return i(new ht("maxAge exceeded", new Date(1e3 * f)))
			}
			if (!0 === r.complete) {
				var m = s.signature;
				return i(null, {
					header: u,
					payload: l,
					signature: m
				})
			}
			return i(null, l)
		}))
	},
	Lr = function(e, t, r, n) {
		"function" == typeof r ? (n = r, r = {}) : r = r || {};
		var i = "object" == typeof e && !Buffer.isBuffer(e),
			o = Object.assign({
				alg: r.algorithm || "HS256",
				typ: i ? "JWT" : void 0,
				kid: r.keyid
			}, r.header);

		function s(e) {
			if (n) return n(e);
			throw e
		}
		if (!t && "none" !== r.algorithm) return s(new Error("secretOrPrivateKey must have a value"));
		if (void 0 === e) return s(new Error("payload is required"));
		if (i) {
			try {
				! function(e) {
					Dr(Pr, !0, e, "payload")
				}(e)
			} catch (e) {
				return s(e)
			}
			r.mutatePayload || (e = Object.assign({}, e))
		} else {
			var a = qr.filter((function(e) {
				return void 0 !== r[e]
			}));
			if (a.length > 0) return s(new Error("invalid " + a.join(",") + " option for " + typeof e + " payload"))
		}
		if (void 0 !== e.exp && void 0 !== r.expiresIn) return s(new Error(
			'Bad "options.expiresIn" option the payload already has an "exp" property.'));
		if (void 0 !== e.nbf && void 0 !== r.notBefore) return s(new Error(
			'Bad "options.notBefore" option the payload already has an "nbf" property.'));
		try {
			! function(e) {
				Dr(Rr, !1, e, "options")
			}(r)
		} catch (e) {
			return s(e)
		}
		var c = e.iat || Math.floor(Date.now() / 1e3);
		if (r.noTimestamp ? delete e.iat : i && (e.iat = c), void 0 !== r.notBefore) {
			try {
				e.nbf = Et(r.notBefore, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.nbf) return s(new Error(
				'"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
				))
		}
		if (void 0 !== r.expiresIn && "object" == typeof e) {
			try {
				e.exp = Et(r.expiresIn, c)
			} catch (e) {
				return s(e)
			}
			if (void 0 === e.exp) return s(new Error(
				'"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'
				))
		}
		Object.keys(jr).forEach((function(t) {
			var n = jr[t];
			if (void 0 !== r[t]) {
				if (void 0 !== e[n]) return s(new Error('Bad "options.' + t +
					'" option. The payload already has an "' + n + '" property.'));
				e[n] = r[t]
			}
		}));
		var u = r.encoding || "utf8";
		if ("function" != typeof n) return ct.sign({
			header: o,
			payload: e,
			secret: t,
			encoding: u
		});
		n = n && kr(n), ct.createSign({
			header: o,
			privateKey: t,
			payload: e,
			encoding: u
		}).once("error", n).once("done", (function(e) {
			n(null, e)
		}))
	};
let Ur = [];
class Vr {
	constructor(e) {
		this.options = Object.assign({
			baseUrl: "https://appleid.apple.com",
			timeout: 1e4
		}, e)
	}
	async _fetch(e, t) {
		const {
			baseUrl: r
		} = this.options;
		return uniCloud.httpclient.request(r + e, t)
	}
	async verifyIdentityToken(e) {
		const t = e.split(".")[0],
			{
				kid: r
			} = JSON.parse(Buffer.from(t, "base64").toString());
		if (!Ur.length) try {
			Ur = await this.getAuthKeys()
		} catch (e) {
			return {
				code: 10705,
				msg: e.message
			}
		}
		const n = this.getUsedKey(Ur, r);
		if (!Object.keys(n).length && !this.fetched) try {
			Ur = await this.getAuthKeys()
		} catch (e) {
			return {
				code: 10705,
				msg: e.message
			}
		}
		let i = null;
		try {
			i = Nr(e, function(e, t) {
				var r = Buffer.from(e, "base64"),
					n = Buffer.from(t, "base64"),
					i = r.toString("hex"),
					o = n.toString("hex");
				i = ne(i), o = ne(o);
				var s = i.length / 2,
					a = o.length / 2,
					c = oe(s),
					u = oe(a),
					d = "30" + oe(s + a + c.length / 2 + u.length / 2 + 2) + "02" + c + i + "02" + u + o;
				return "-----BEGIN RSA PUBLIC KEY-----\n" + Buffer.from(d, "hex").toString("base64").match(
					/.{1,64}/g).join("\n") + "\n-----END RSA PUBLIC KEY-----\n"
			}(n.n, n.e), {
				algorithms: n.alg
			})
		} catch (e) {
			return {
				code: 10705,
				msg: e.message
			}
		}
		return {
			code: 0,
			msg: i
		}
	}
	async getAuthKeys() {
		const {
			status: e,
			data: t
		} = await this._fetch("/auth/keys", {
			method: "GET",
			dataType: "json",
			timeout: this.options.timeout
		});
		if (200 !== e) throw new Error("request https://appleid.apple.com/auth/keys fail");
		return t.keys
	}
	getUsedKey(e, t) {
		let r = {};
		for (let n = 0; n < e.length; n++) {
			const i = e[n];
			if (i.kid === t) {
				r = i;
				break
			}
		}
		return r
	}
}
var Mr = function(e = {}) {
		return e.appId = e.appid, e.secret = e.appsecret, O(X, e)
	},
	Br = function(e = {}) {
		return e.appId = e.appid, e.secret = e.appsecret, O(Z, e)
	},
	Fr = function(e = {}) {
		return e.appId = e.appid, O(re, e)
	},
	$r = function(e = {}) {
		return O(Vr, e)
	};

function Hr(e = 6) {
	const t = ["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N",
		"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	];
	let r = "";
	for (let n = 0; n < e; n++) r += t[Math.floor(Math.random() * t.length)];
	return r
}
const Kr = V.command;
async function Gr({
	uid: e,
	dcloudAppidList: t
} = {}) {
	if (!e) return {
		code: K,
		messageValues: {
			param: this.t("user-id")
		}
	};
	if (!t || 0 === t.length || t.some(e => void 0 === e)) return {
		code: K,
		messageValues: {
			param: this.t("dcloud-appid")
		}
	};
	const r = await M.doc(e).get(),
		n = r && r.data && r.data[0];
	if (!n) return {
		code: 10002
	};
	const i = Object.keys(H).reduce((e, t) => {
		const r = t,
			i = function(e, t) {
				return t.split(".").reduce((e, t) => e && e[t], e)
			}(n, t);
		return i && e.push({
			[r]: i
		}), e
	}, []);
	let o;
	const s = {
			dcloud_appid: Kr.in(t),
			_id: Kr.neq(n._id)
		},
		a = {
			dcloud_appid: Kr.exists(!1),
			_id: Kr.neq(n._id)
		};
	switch (i.length) {
		case 0:
			return {
				code: 10004
			};
		case 1:
			o = Kr.or([Kr.and([i[0], s]), Kr.and([i[0], a])]);
			break;
		default:
			o = Kr.or([Kr.and([Kr.or(i), s]), Kr.and([Kr.or(i), a])])
	}
	const c = await M.where(o).limit(1).get();
	return c && c.data && c.data[0] ? {
		code: 10005
	} : {
		code: 0
	}
}
const Qr = uniCloud.database().command;
const Yr = uniCloud.database();
const zr = uniCloud.database();
const Jr = uniCloud.database();
async function Xr(e) {
	const t = ["apiKey", "apiSecret"];
	for (let r = 0, n = t.length; r < n; r++) {
		const n = t[r];
		if (!e[n]) throw new Error(this.t("config-param-requred", {
			param: "service.univerify." + n
		}))
	}
	if (!e.openid || !e.access_token) throw new Error(this.t("config-param-requred", {
		param: "openid, access_token"
	}));
	return function(e, t) {
		const r = {
			0: "",
			4e3: "缺失参数",
			4001: "apiKey不存在",
			4002: "sign校验不通过",
			4003: "appid不存在",
			4004: "应用未开通一键登录服务",
			4005: "应用开通的一键登录服务正在审核中",
			4006: "服务空间不在白名单中",
			4100: "账户余额不足",
			5e3: "获取手机号失败，请稍后重试(或其他未知错误)"
		};
		return {
			...e,
			msg: r[e.code] ? "[getPhoneNumber] 获取手机号: " + r[e.code] : e.errMsg
		}
	}(await uniCloud.getPhoneNumber({
		provider: "univerify",
		...e
	}))
}
const Wr = uniCloud.database();
const Zr = uniCloud.database();
const en = uniCloud.database();
const tn = uniCloud.database().command;
const rn = uniCloud.database();
const nn = uniCloud.database();
const on = uniCloud.database();
const sn = uniCloud.database();
const an = uniCloud.database();
const cn = uniCloud.database();
const un = uniCloud.database();
const dn = uniCloud.database().command;
const ln = uniCloud.database();
var pn = Object.freeze({
	__proto__: null,
	getUserInfo: async function({
		uid: e,
		field: t
	}) {
		if (!e) return {
			code: K,
			messageValues: {
				param: this.t("user-id")
			}
		};
		let r;
		if (t && t.length) {
			const n = {};
			for (let e = 0; e < t.length; e++) n[t[e]] = !0;
			r = await M.doc(e).field(n).get()
		} else r = await M.doc(e).get();
		return 0 === r.data.length ? {
			code: 80301
		} : {
			code: 0,
			msg: "",
			userInfo: r.data[0]
		}
	},
	getUserInfoByToken: async function(e) {
		const t = this._verifyToken(e);
		return t.code || (delete t.iat, delete t.exp), t
	},
	resetPwd: async function({
		uid: e,
		password: t
	}) {
		const {
			passwordHash: r,
			version: n
		} = this.encryptPwd(t), i = {
			password: r,
			token: []
		};
		return n && (i.password_secret_version = n), x("upRes", await M.doc(e).update(i)), {
			code: 0,
			msg: ""
		}
	},
	setAvatar: async function(e) {
		return await M.doc(e.uid).update({
			avatar: e.avatar
		}), {
			code: 0,
			msg: ""
		}
	},
	updatePwd: async function(e) {
		const t = await M.doc(e.uid).get();
		if (t && t.data && t.data.length > 0) {
			if (0 === this._checkPwd(t.data[0], e.oldPassword).code) {
				const {
					passwordHash: r,
					version: n
				} = this.encryptPwd(e.newPassword), i = {
					password: r,
					token: []
				};
				n && (i.password_secret_version = n);
				return x("upRes", await M.doc(t.data[0]._id).update(i)), {
					code: 0,
					msg: ""
				}
			}
			return {
				code: 40202
			}
		}
		return {
			code: 40201
		}
	},
	updateUser: async function(e) {
		const t = e.uid;
		if (!t) return {
			code: K,
			messageValues: {
				param: this.t("user-id")
			}
		};
		delete e.uid;
		const {
			username: r,
			email: n
		} = e, {
			usernameToLowerCase: i,
			emailToLowerCase: o
		} = this._getConfig();
		let s = r && r.trim(),
			a = n && n.trim();
		return s && (i && (s = s.toLowerCase()), e.username = s), a && (o && (a = a.toLowerCase()), e
			.email = a), x("update -> upRes", await M.doc(t).update(e)), {
			code: 0,
			msg: ""
		}
	},
	_getAlipayApi: function({
		platform: e
	} = {}) {
		const t = e || this.context.PLATFORM;
		if (!t) throw new Error(this.t("context-param-required", {
			parma: "PLATFORM"
		}));
		const r = this._getConfig(t);
		if (!r.oauth || !r.oauth.alipay) throw new Error(this.t("config-param-require", {
			param: t + ".alipay"
		}));
		return ["appid", "privateKey"].forEach(e => {
			if (!r.oauth.alipay[e]) throw new Error(this.t("config-param-require", {
				param: `${t}.alipay.${e}`
			}))
		}), Fr({
			...r.oauth.alipay,
			clientType: t
		})
	},
	_getValidInviteCode: async function({
		inviteCode: e
	}) {
		let t, r = 10;
		e ? (r = 1, t = e) : t = Hr();
		let n = !1;
		try {
			for (; r > 0 && !n;) {
				r--;
				if (0 === (await M.where({
						my_invite_code: t
					}).get()).data.length) {
					n = !0;
					break
				}
				t = Hr()
			}
			t = Hr()
		} catch (e) {}
		return n ? {
			code: 0,
			inviteCode: t
		} : e ? {
			code: 80401
		} : {
			code: 80402
		}
	},
	_addUser: async function(e, {
		needPermission: t,
		autoSetDcloudAppid: r = !0
	} = {}) {
		const n = this._getConfig(),
			i = {
				...e,
				dcloud_appid: r ? [this.context.APPID] : [],
				register_date: Date.now(),
				register_ip: this.context.CLIENTIP
			},
			o = (await M.add(i)).id;
		let s;
		if (n.removePermissionAndRoleFromToken) s = await this.createToken({
			uid: o,
			needPermission: t
		});
		else {
			const t = e.role || [];
			let r;
			r = 0 === t.length || t.includes("admin") ? [] : await this._getPermissionListByRoleList(t), s =
				await this.createToken({
					uid: o,
					role: t,
					permission: r
				})
		}
		const {
			token: a,
			tokenExpired: c
		} = s;
		return await M.doc(o).update({
			token: [a]
		}), {
			token: a,
			tokenExpired: c,
			uid: o,
			type: "register",
			userInfo: Object.assign({}, i, {
				token: a
			})
		}
	},
	_loginExec: async function(e, t = {}) {
		if (1 === e.status) return {
			code: 10001
		};
		const r = this._getConfig();
		let n = e.token || [];
		"string" == typeof n && (n = [n]);
		const i = this._getExpiredToken(n);
		let o;
		if (n = n.filter(e => -1 === i.indexOf(e)), r.removePermissionAndRoleFromToken) {
			const r = t.needPermission;
			o = await this.createToken({
				uid: e._id,
				needPermission: r
			})
		} else {
			const t = e.role || [];
			let r;
			r = 0 === t.length || t.includes("admin") ? [] : await this._getPermissionListByRoleList(t), o =
				await this.createToken({
					uid: e._id,
					role: t,
					permission: r
				})
		}
		const {
			token: s,
			tokenExpired: a
		} = o;
		n.push(s), e.token = n;
		const c = {
			last_login_date: Date.now(),
			last_login_ip: this.context.CLIENTIP,
			token: n,
			...t.extraData
		};
		await M.doc(e._id).update(c);
		const u = Object.assign({}, e, c);
		return {
			code: 0,
			msg: "",
			token: s,
			uid: u._id,
			username: u.username,
			type: "login",
			userInfo: u,
			tokenExpired: a
		}
	},
	_registerExec: async function(e, {
		needPermission: t,
		autoSetDcloudAppid: r = !0
	} = {}) {
		const {
			my_invite_code: n
		} = e;
		if (this._getConfig().autoSetInviteCode || n) {
			const t = await this._getValidInviteCode({
				inviteCode: n
			});
			if (t.code) return t;
			e.my_invite_code = t.inviteCode
		}
		return {
			code: 0,
			msg: "",
			...await this._addUser(e, {
				needPermission: t,
				autoSetDcloudAppid: r
			})
		}
	},
	_getWeixinApi: function({
		platform: e
	} = {}) {
		const t = e || this.context.PLATFORM;
		if (!t) throw new Error(this.t("context-param-required", {
			parma: "PLATFORM"
		}));
		const r = this._getConfig(t);
		if (!r.oauth || !r.oauth.weixin) throw new Error(this.t("config-param-require", {
			param: t + ".weixin"
		}));
		return ["appid", "appsecret"].forEach(e => {
			if (!r.oauth.weixin[e]) throw new Error(this.t("config-param-require", {
				param: `${t}.weixin.${e}`
			}))
		}), Mr({
			...r.oauth.weixin,
			clientType: t
		})
	},
	_getQQApi: function() {
		const e = this.context.PLATFORM;
		if (!e) throw new Error(this.t("context-param-required", {
			parma: "PLATFORM"
		}));
		const t = this._getConfig(e);
		if (!t.oauth || !t.oauth.qq) throw new Error(this.t("config-param-require", {
			param: e + ".qq"
		}));
		return ["appid", "appsecret"].forEach(r => {
			if (!t.oauth.qq[r]) throw new Error(this.t("config-param-require", {
				param: `${e}.qq.${r}`
			}))
		}), Br({
			...t.oauth.qq,
			clientType: e
		})
	},
	_getMatchedUser: function(e, t) {
		if (0 === e.length) return {
			code: 10002
		};
		let r;
		const n = {},
			i = {};
		for (let r = e.length - 1; r >= 0; r--) {
			const o = e[r];
			for (let s = 0; s < t.length; s++) {
				const {
					field: a,
					value: c,
					fallbackValue: u
				} = t[s];
				c && o[a] === c ? (n[a] = o, e.splice(r, 1)) : u && o[a] === u && (n[a] || (n[a] = o), i[
					a] = !0, e.splice(r, 1))
			}
		}
		const o = Object.keys(n);
		let s;
		switch (o.length) {
			case 0:
				r = e[0], e.splice(0, 1);
				break;
			case 1:
				s = o[0], r = n[s];
				break;
			default:
				return {
					code: 10003, messageValues: {
						target: "用户"
					}
				}
		}
		return e.length > 0 ? {
			code: 10003,
			messageValues: {
				target: "用户"
			}
		} : {
			code: 0,
			msg: "",
			userMatched: r,
			fieldMatched: s,
			isFallbackValueMatched: !!s && i[s]
		}
	},
	_getCurrentAppUser: function(e) {
		const t = this.context.APPID;
		return e.filter(e => void 0 === e.dcloud_appid || null === e.dcloud_appid || e.dcloud_appid.indexOf(
			t) > -1)
	},
	setAuthorizedAppLogin: async function({
		uid: e,
		dcloudAppidList: t
	} = {}) {
		if ("array" !== g(t)) return {
			code: G,
			messageValues: {
				param: "dcloudAppidList",
				reason: this.t("type-array-required", {
					param: this.t("dcloud-appid-list")
				})
			}
		};
		if (t && 0 !== t.length) {
			const r = await Gr.bind(this)({
				uid: e,
				dcloudAppidList: t
			});
			if (r.code) return r
		}
		return await M.doc(e).update({
			dcloud_appid: Kr.set(t)
		}), {
			code: 0
		}
	},
	authorizeAppLogin: async function({
		uid: e,
		dcloudAppid: t
	} = {}) {
		const r = await Gr.bind(this)({
			uid: e,
			dcloudAppidList: [t]
		});
		return r.code ? r : (await M.doc(e).update({
			dcloud_appid: Kr.push(t)
		}), {
			code: 0
		})
	},
	forbidAppLogin: async function({
		uid: e,
		dcloudAppid: t
	} = {}) {
		return e ? (await M.doc(e).update({
			dcloud_appid: Kr.pull(t)
		}), {
			code: 0
		}) : {
			code: K,
			messageValues: {
				param: this.t("user-id")
			}
		}
	},
	acceptInvite: async function({
		uid: e,
		inviteCode: t
	}) {
		const r = await M.where({
			_id: Qr.neq(e),
			inviter_uid: Qr.not(Qr.all([e])),
			my_invite_code: t
		}).get();
		if (1 !== r.data.length) return {
			code: 80501,
			msg: "邀请码无效"
		};
		const n = [r.data[0]._id].concat(r.data[0].inviter_uid || []),
			i = await M.doc(e).field({
				my_invite_code: !0,
				inviter_uid: !0
			}).get();
		if (0 === i.data.length) return {
			code: 80502
		};
		if (i.data[0].inviter_uid && i.data[0].inviter_uid.length > 0) return {
			code: 80503,
			msg: "邀请码不可修改"
		};
		const o = Date.now();
		return await M.doc(e).update({
			inviter_uid: n,
			invite_time: o
		}), await M.where({
			inviter_uid: e
		}).update({
			inviter_uid: Qr.push(n)
		}), {
			code: 0,
			msg: ""
		}
	},
	getInvitedUser: async function({
		uid: e,
		level: t = 1,
		limit: r = 20,
		offset: n = 0,
		needTotal: i = !1
	}) {
		const o = {
			code: 0,
			msg: "",
			invitedUser: (await M.where({
				["inviter_uid." + (t - 1)]: e
			}).field({
				_id: !0,
				username: !0,
				mobile: !0,
				invite_time: !0
			}).orderBy("invite_time", "desc").skip(n).limit(r).get()).data
		};
		if (i) {
			const r = await M.where({
				["inviter_uid." + (t - 1)]: e
			}).count();
			o.total = r.total
		}
		return o
	},
	setUserInviteCode: async function({
		uid: e,
		myInviteCode: t
	}) {
		const r = await this._getValidInviteCode({
			inviteCode: t
		});
		return r.code ? r : (await M.doc(e).update({
			my_invite_code: r.inviteCode
		}), {
			code: 0,
			msg: "",
			myInviteCode: r.inviteCode
		})
	},
	loginByAlipay: async function(e) {
		"string" == typeof e && (e = {
			code: e
		});
		const {
			needPermission: t,
			platform: r,
			code: n,
			myInviteCode: i,
			role: o,
			type: s
		} = e, a = r || this.context.PLATFORM, {
			openid: c
		} = await this._getAlipayApi({
			platform: a
		}).code2Session(n);
		if (!c) return {
			code: 10501,
			messageValues: {
				account: this.t("alipay-account")
			}
		};
		let u = await M.where({
			ali_openid: c
		}).get();
		if (u = this._getCurrentAppUser(u.data), u && u.length > 0) {
			if ("register" === s) return {
				code: 10502,
				messageValues: {
					type: this.t("alipay-account")
				}
			};
			const e = u[0],
				r = await this._loginExec(e, {
					needPermission: t
				});
			if (0 !== r.code) return r;
			const {
				userInfo: n
			} = r;
			return {
				...r,
				openid: c,
				mobileConfirmed: 1 === n.mobile_confirmed,
				emailConfirmed: 1 === n.email_confirmed
			}
		} {
			if ("login" === s) return {
				code: 10503,
				messageValues: {
					type: this.t("alipay-account")
				}
			};
			const e = {
				ali_openid: c
			};
			e.my_invite_code = i, e.role = o;
			const r = await this._registerExec(e, {
				needPermission: t
			});
			return 0 !== r.code ? r : {
				...r,
				openid: c,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByEmail: async function({
		email: e,
		code: t,
		password: r,
		myInviteCode: n,
		type: i,
		needPermission: o,
		role: s
	}) {
		if (!(e = e && e.trim())) return {
			code: K,
			messageValues: {
				param: "邮箱"
			}
		};
		const {
			emailToLowerCase: a
		} = this._getConfig();
		let c = e;
		a && (c = e.toLowerCase());
		const u = await this.verifyCode({
			email: c,
			code: t,
			type: i || "login"
		});
		if (0 !== u.code) return u;
		let d = {
			email: e,
			email_confirmed: 1
		};
		const l = {
				field: "email",
				value: e
			},
			p = Yr.command;
		c !== e && (d = p.or(d, {
			email: c,
			email_confirmed: 1
		}), l.fallbackValue = c);
		let f = await M.where(d).get();
		if (f = this._getCurrentAppUser(f.data), f && f.length > 0) {
			if ("register" === i) return {
				code: 10301,
				messageValues: {
					type: "邮箱"
				}
			};
			const e = this._getMatchedUser(f, [l]);
			if (e.code) return e;
			const {
				userMatched: t
			} = e, r = await this._loginExec(t, {
				needPermission: o
			});
			return 0 !== r.code ? r : {
				...r,
				email: c
			}
		} {
			if ("login" === i) return {
				code: 10302,
				messageValues: {
					type: "邮箱"
				}
			};
			const e = {
					email: c,
					email_confirmed: 1
				},
				t = r && r.trim();
			if (t) {
				const {
					passwordHash: r,
					version: n
				} = this.encryptPwd(t);
				e.password = r, n && (e.password_secret_version = n)
			}
			e.my_invite_code = n, e.role = s;
			const a = await this._registerExec(e, {
				needPermission: o
			});
			return 0 !== a.code ? a : {
				...a,
				email: c
			}
		}
	},
	loginBySms: async function({
		mobile: e,
		code: t,
		password: r,
		inviteCode: n,
		myInviteCode: i,
		type: o,
		needPermission: s,
		role: a
	}) {
		if (!(e = e && e.trim())) return {
			code: K,
			messageValues: {
				param: this.t("mobile")
			}
		};
		const c = this._getConfig();
		if (c.forceInviteCode && !o) throw new Error(this.t("login-with-invite-type-required"));
		const u = await this.verifyCode({
			mobile: e,
			code: t,
			type: o || "login"
		});
		if (0 !== u.code) return u;
		const d = {
			mobile: e,
			mobile_confirmed: 1
		};
		let l = await M.where(d).get();
		if (l = this._getCurrentAppUser(l.data), l && l.length > 0) {
			if ("register" === o) return {
				code: 10201,
				messageValues: {
					type: this.t("mobile")
				}
			};
			const t = l[0],
				r = await this._loginExec(t, {
					needPermission: s
				});
			return 0 !== r.code ? r : {
				...r,
				mobile: e
			}
		} {
			const t = Date.now();
			if ("login" === o) return {
				code: 10202,
				messageValues: {
					type: this.t("mobile")
				}
			};
			const u = {
					mobile: e,
					mobile_confirmed: 1,
					register_ip: this.context.CLIENTIP,
					register_date: t
				},
				d = r && r.trim();
			if (d) {
				const {
					passwordHash: e,
					version: t
				} = this.encryptPwd(d);
				u.password = e, t && (u.password_secret_version = t)
			}
			if (n) {
				const e = await M.where({
					my_invite_code: n
				}).get();
				if (1 !== e.data.length) return {
					code: 10203
				};
				u.inviter_uid = [e.data[0]._id].concat(e.data[0].inviter_uid || []), u.invite_time = t
			} else if (c.forceInviteCode) return {
				code: 10203
			};
			u.my_invite_code = i, u.role = a;
			const l = await this._registerExec(u, {
				needPermission: s
			});
			return 0 !== l.code ? l : {
				...l,
				mobile: e
			}
		}
	},
	loginByWeixin: async function(e) {
		"string" == typeof e && (e = {
			code: e
		});
		const {
			needPermission: t,
			platform: r,
			code: n,
			myInviteCode: i,
			role: o,
			type: s
		} = e, a = r || this.context.PLATFORM, c = "mp-weixin" === a, {
			openid: u,
			unionid: d,
			sessionKey: l,
			accessToken: p,
			refreshToken: f,
			expired: m
		} = await this._getWeixinApi({
			platform: a
		})[c ? "code2Session" : "getOauthAccessToken"](n);
		if (!u) return {
			code: 10401,
			messageValues: {
				account: "微信openid"
			}
		};
		let h;
		h = c ? {
			sessionKey: l
		} : {
			accessToken: p,
			refreshToken: f,
			accessTokenExpired: m
		};
		const g = zr.command,
			y = [{
				wx_openid: {
					[a]: u
				}
			}];
		d && y.push({
			wx_unionid: d
		});
		let w = await M.where(g.or(...y)).get();
		if (w = this._getCurrentAppUser(w.data), w && w.length > 0) {
			if ("register" === s) return {
				code: 10402,
				messageValues: {
					type: this.t("wechat-account")
				}
			};
			const e = w[0],
				r = {
					wx_openid: {
						[a]: u
					}
				};
			d && (r.wx_unionid = d);
			const n = await this._loginExec(e, {
				needPermission: t,
				extraData: r
			});
			if (0 !== n.code) return n;
			const {
				userInfo: i
			} = n;
			return {
				...n,
				openid: u,
				unionid: d,
				...h,
				mobileConfirmed: 1 === i.mobile_confirmed,
				emailConfirmed: 1 === i.email_confirmed
			}
		} {
			if ("login" === s) return {
				code: 10403,
				messageValues: {
					type: this.t("wechat-account")
				}
			};
			const e = {
				wx_openid: {
					[a]: u
				},
				wx_unionid: d
			};
			e.my_invite_code = i, e.role = o;
			const r = await this._registerExec(e, {
				needPermission: t
			});
			return 0 !== r.code ? r : {
				...r,
				openid: u,
				unionid: d,
				...h,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByQQ: async function({
		code: e,
		accessToken: t,
		myInviteCode: r,
		needPermission: n,
		role: i,
		type: o
	} = {}) {
		const s = this.context.PLATFORM,
			a = "mp-qq" === s,
			{
				openid: c,
				unionid: u,
				sessionKey: d
			} = await this._getQQApi()[a ? "code2Session" : "getOpenidByToken"]({
				code: e,
				accessToken: t
			});
		if (!c) return {
			code: 10801,
			messageValues: {
				account: "qq openid"
			}
		};
		const l = {
				accessToken: t,
				sessionKey: d
			},
			p = Jr.command,
			f = [{
				qq_openid: {
					[s]: c
				}
			}];
		u && f.push({
			qq_unionid: u
		});
		let m = await M.where(p.or(...f)).get();
		if (m = this._getCurrentAppUser(m.data), m && m.length > 0) {
			if ("register" === o) return {
				code: 10802,
				messageValues: {
					type: this.t("qq-account")
				}
			};
			const e = m[0],
				t = {
					qq_openid: {
						[s]: c
					}
				};
			u && (t.qq_unionid = u);
			const r = await this._loginExec(e, {
				needPermission: n,
				extraData: t
			});
			if (0 !== r.code) return r;
			const {
				userInfo: i
			} = r;
			return {
				...r,
				openid: c,
				unionid: u,
				...l,
				mobileConfirmed: 1 === i.mobile_confirmed,
				emailConfirmed: 1 === i.email_confirmed
			}
		} {
			if ("login" === o) return {
				code: 10803,
				messageValues: {
					type: this.t("qq-account")
				}
			};
			const e = {
				qq_openid: {
					[s]: c
				},
				qq_unionid: u
			};
			e.my_invite_code = r, e.role = i;
			const t = await this._registerExec(e);
			return 0 !== t.code ? t : {
				...t,
				openid: c,
				unionid: u,
				...l,
				mobileConfirmed: !1,
				emailConfirmed: !1
			}
		}
	},
	loginByUniverify: async function({
		openid: e,
		access_token: t,
		password: r,
		inviteCode: n,
		myInviteCode: i,
		type: o,
		needPermission: s,
		role: a
	}) {
		const c = this._getConfig(),
			u = c && c.service && c.service.univerify;
		if (!u) throw new Error(this.t("uni-verify-config-required"));
		if (c.forceInviteCode && !o) throw new Error(this.t("login-with-invite-type-required"));
		const d = await Xr.bind(this)({
			...u,
			openid: e,
			access_token: t
		});
		if (0 !== d.code) return d;
		const l = String(d.phoneNumber);
		let p = await M.where({
			mobile: l
		}).get();
		if (p = this._getCurrentAppUser(p.data), p && p.length > 0) {
			if ("register" === o) return {
				code: 10601,
				messageValues: {
					type: this.t("mobile")
				}
			};
			const e = p[0],
				t = await this._loginExec(e, {
					needPermission: s
				});
			return 0 !== t.code ? t : {
				...t,
				mobile: l
			}
		}
		if ("login" === o) return {
			code: 10602,
			messageValues: {
				type: this.t("mobile")
			}
		};
		const f = Date.now(),
			m = {
				mobile: l,
				my_invite_code: i,
				mobile_confirmed: 1,
				role: a
			},
			h = r && r.trim();
		if (h) {
			const {
				passwordHash: e,
				version: t
			} = this.encryptPwd(h);
			m.password = e, t && (m.password_secret_version = t)
		}
		if (n) {
			let e = await M.where({
				my_invite_code: n
			}).get();
			if (1 !== e.data.length) return {
				code: 10203
			};
			e = e.data[0], m.inviter_uid = [e._id].concat(e.inviter_uid || []), m.invite_time = f
		} else if (c.forceInviteCode) return {
			code: 10203
		};
		m.my_invite_code = i;
		const g = await this._registerExec(m, {
			needPermission: s
		});
		return 0 !== g.code ? g : {
			...g,
			mobile: l
		}
	},
	loginByApple: async function({
		nickName: e,
		fullName: t,
		identityToken: r,
		myInviteCode: n,
		type: i,
		needPermission: o,
		platform: s,
		role: a
	}) {
		const c = this._getConfig(),
			u = c && c["app-plus"] && c["app-plus"].oauth && c["app-plus"].oauth.apple,
			d = u && u.bundleId;
		if (!d) throw new Error(this.t("config-param-require", {
			param: "app-plus.alipay.bundleId"
		}));
		if (!r) return {
			code: K,
			messageValues: {
				param: "identityToken"
			}
		};
		const l = s || this.context.PLATFORM;
		t = e || (t && Object.keys(t).length > 0 ? t.familyName + t.givenName : "");
		const {
			code: p,
			msg: f
		} = await $r({
			clientType: l
		}).verifyIdentityToken(r);
		if (0 !== p) return {
			code: p,
			msg: f,
			messageValues: {
				account: this.t("apple-account")
			}
		};
		const {
			iss: m,
			sub: h,
			aud: g,
			email: y
		} = f;
		if ("https://appleid.apple.com" !== m) return {
			code: 10706,
			messageValues: {
				account: this.t("apple-account")
			}
		};
		if (!h) return {
			code: 10701,
			messageValues: {
				account: this.t("apple-account")
			}
		};
		if (d !== g) return {
			code: 10702,
			messageValues: {
				account: this.t("apple-account")
			}
		};
		const w = t || "User-" + y.split("@")[0];
		let v = await M.where({
			apple_openid: h
		}).get();
		if (v = this._getCurrentAppUser(v.data), v && v.length > 0) {
			if ("register" === i) return {
				code: 10703,
				messageValues: {
					type: this.t("apple-account")
				}
			};
			const e = v[0],
				t = await this._loginExec(e, {
					needPermission: o
				});
			return 0 !== t.code ? t : {
				...t,
				openid: h
			}
		}
		if ("login" === i) return {
			code: 10704,
			messageValues: {
				type: this.t("apple-account")
			}
		};
		const _ = {
				nickname: w,
				apple_openid: h,
				my_invite_code: n,
				role: a
			},
			b = await this._registerExec(_, {
				needPermission: o
			});
		return 0 !== b.code ? b : {
			...b,
			openid: h
		}
	},
	login: async function({
		username: e,
		password: t,
		queryField: r = [],
		needPermission: n
	}) {
		const i = Wr.command,
			o = [];
		r && r.length || (r = ["username"]), r.length > 1 && console.warn(this.t("query-field-warning"));
		const {
			usernameToLowerCase: s,
			emailToLowerCase: a,
			passwordErrorLimit: c,
			passwordErrorRetryTime: u
		} = this._getConfig(), d = {
			email: {
				email_confirmed: 1
			},
			mobile: {
				mobile_confirmed: 1
			}
		}, l = {}, p = e.trim();
		if (!p) return {
			code: K,
			messageValues: {
				param: this.t("username")
			}
		};
		s && (l.username = p.toLowerCase()), a && (l.email = p.toLowerCase());
		const f = [];
		r.forEach(t => {
			o.push({
				[t]: e,
				...d[t]
			});
			const r = {
				field: t,
				value: e
			};
			"username" === t && l.username !== e ? (o.push({
				[t]: l.username,
				...d[t]
			}), r.fallbackValue = l.username) : "email" === t && l.email !== e && (o.push({
				[t]: l.email,
				...d[t]
			}), r.fallbackValue = l.email), f.push(r)
		});
		let m = await M.where(i.or(...o)).limit(1).get();
		m = this._getCurrentAppUser(m.data);
		const h = this.context.CLIENTIP,
			g = this._getMatchedUser(m, f);
		if (g.code) return g;
		const {
			userMatched: y
		} = g;
		let w = y.login_ip_limit || [];
		w = w.filter(e => e.last_error_time > Date.now() - 1e3 * u);
		let v = w.find(e => e.ip === h);
		if (v && v.error_times >= c) return {
			code: 10103
		};
		const _ = t && t.trim();
		if (!_) return {
			code: K,
			messageValues: {
				param: "密码"
			}
		};
		const b = this._checkPwd(y, _);
		if (0 === b.code) {
			const e = w.indexOf(v);
			e > -1 && w.splice(e, 1);
			const t = {
					login_ip_limit: w
				},
				{
					passwordHash: r,
					passwordVersion: i
				} = b;
			r && i && (t.password = r, t.password_secret_version = i);
			const o = await this._loginExec(y, {
				needPermission: n,
				extraData: t
			});
			return o.code, o
		}
		return v ? (v.error_times++, v.last_error_time = Date.now()) : (v = {
			ip: h,
			error_times: 1,
			last_error_time: Date.now()
		}, w.push(v)), await M.doc(y._id).update({
			login_ip_limit: w
		}), {
			code: 10102,
			msg: "密码错误"
		}
	},
	register: async function(e) {
		const t = [],
			r = [{
				name: "username",
				desc: this.t("username")
			}, {
				name: "email",
				desc: this.t("email"),
				extraCond: {
					email_confirmed: 1
				}
			}, {
				name: "mobile",
				desc: this.t("mobile"),
				extraCond: {
					mobile_confirmed: 1
				}
			}],
			{
				usernameToLowerCase: n,
				emailToLowerCase: i
			} = this._getConfig();
		r.forEach(r => {
			const o = r.name;
			let s = e[o] && e[o].trim();
			s ? (("username" === r.name && n || "email" === r.name && i) && (s = s.toLowerCase()),
				e[o] = s, t.push({
					[o]: s,
					...r.extraCond
				})) : delete e[o]
		});
		const {
			username: o,
			email: s,
			mobile: a,
			myInviteCode: c,
			needPermission: u,
			autoSetDcloudAppid: d = !0
		} = e;
		if ("needPermission" in e && delete e.needPermission, "autoSetDcloudAppid" in e && delete e
			.autoSetDcloudAppid, 0 === t.length) return {
			code: 20101,
			messageValues: {
				param: this.t("user-unique-param")
			}
		};
		const l = Zr.command;
		let p = await M.where(l.or(...t)).get();
		if (p = this._getCurrentAppUser(p.data), p && p.length > 0) {
			const t = p[0];
			for (let n = 0; n < r.length; n++) {
				const i = r[n];
				let o = !0;
				if (i.extraCond && (o = Object.keys(i.extraCond).every(e => t[e] === i.extraCond[e])), t[i
						.name] === e[i.name] && o) return {
					code: 20102,
					messageValues: {
						type: i.desc
					}
				}
			}
		}
		const f = e.password && e.password.trim();
		if (!f) return {
			code: K,
			messageValues: {
				param: this.t("password")
			}
		};
		const {
			passwordHash: m,
			version: h
		} = this.encryptPwd(f);
		e.password = m, h && (e.password_secret_version = h), e.my_invite_code = c, delete e.myInviteCode;
		const g = await this._registerExec(e, {
			needPermission: u,
			autoSetDcloudAppid: d
		});
		return 0 !== g.code ? g : {
			...g,
			username: o,
			email: s,
			mobile: a
		}
	},
	logout: async function(e) {
		const t = await this.checkToken(e);
		if (t.code) return t;
		const r = en.command;
		return await M.doc(t.uid).update({
			token: r.pull(e)
		}), {
			code: 0,
			msg: ""
		}
	},
	getRoleByUid: async function({
		uid: e
	}) {
		if (!e) return {
			code: K,
			messageValues: {
				param: this.t("user-id")
			}
		};
		const t = await M.doc(e).get();
		return 0 === t.data.length ? {
			code: Q
		} : {
			code: 0,
			msg: "",
			role: t.data[0].role || []
		}
	},
	getPermissionByRole: async function({
		roleID: e
	}) {
		if (!e) return {
			code: K,
			messageValues: {
				param: "roleID"
			}
		};
		if ("admin" === e) {
			return {
				code: 0,
				msg: "",
				permission: (await $.limit(1e3).get()).data.map(e => e.permission_id)
			}
		}
		const t = await F.where({
			role_id: e
		}).get();
		return 0 === t.data.length ? {
			code: Y
		} : {
			code: 0,
			msg: "",
			permission: t.data[0].permission || []
		}
	},
	getPermissionByUid: async function({
		uid: e
	}) {
		const t = await M.aggregate().match({
				_id: e
			}).project({
				role: !0
			}).unwind("$role").lookup({
				from: "uni-id-roles",
				localField: "role",
				foreignField: "role_id",
				as: "roleDetail"
			}).unwind("$roleDetail").replaceRoot({
				newRoot: "$roleDetail"
			}).end(),
			r = [];
		return t.data.forEach(e => {
			Array.prototype.push.apply(r, e.permission)
		}), {
			code: 0,
			msg: "",
			permission: S(r)
		}
	},
	bindRole: async function({
		uid: e,
		roleList: t,
		reset: r = !1
	}) {
		const n = {};
		return "string" == typeof t && (t = [t]), n.role = r ? t : tn.push(t), await M.doc(e).update(n), {
			code: 0,
			msg: ""
		}
	},
	bindPermission: async function({
		roleID: e,
		permissionList: t,
		reset: r = !1
	}) {
		const n = {};
		return "string" == typeof t && (t = [t]), n.permission = r ? t : tn.push(t), await F.where({
			role_id: e
		}).update(n), {
			code: 0,
			msg: ""
		}
	},
	unbindRole: async function({
		uid: e,
		roleList: t
	}) {
		return "string" == typeof t && (t = [t]), await M.doc(e).update({
			role: tn.pull(tn.in(t))
		}), {
			code: 0,
			msg: ""
		}
	},
	unbindPermission: async function({
		roleID: e,
		permissionList: t
	}) {
		return "string" == typeof t && (t = [t]), await F.where({
			role_id: e
		}).update({
			permission: tn.pull(tn.in(t))
		}), {
			code: 0,
			msg: ""
		}
	},
	addRole: async function({
		roleID: e,
		roleName: t,
		comment: r,
		permission: n = []
	}) {
		return e ? "admin" === e ? {
			code: G,
			messageValues: {
				param: "roleID",
				reason: this.t("add-role-admin-is-not-allowed")
			}
		} : (await F.add({
			role_id: e,
			role_name: t,
			comment: r,
			permission: n,
			create_date: Date.now()
		}), {
			code: 0,
			msg: ""
		}) : {
			code: K,
			messageValues: {
				param: this.t("role-id")
			}
		}
	},
	addPermission: async function({
		permissionID: e,
		permissionName: t,
		comment: r
	}) {
		return e ? (await $.add({
			permission_id: e,
			permission_name: t,
			comment: r,
			create_date: Date.now()
		}), {
			code: 0,
			msg: ""
		}) : {
			code: K,
			messageValues: {
				param: this.t("permission-id")
			}
		}
	},
	getRoleList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: r = !0
	}) {
		const n = {
			code: 0,
			msg: "",
			roleList: (await F.skip(t).limit(e).get()).data
		};
		if (r) {
			const {
				total: e
			} = await F.where({
				_id: tn.exists(!0)
			}).count();
			n.total = e
		}
		return n
	},
	getRoleInfo: async function(e) {
		const t = await F.where({
			role_id: e
		}).get();
		return 0 === t.data.length ? {
			code: Y
		} : {
			code: 0,
			...t.data[0]
		}
	},
	updateRole: async function({
		roleID: e,
		roleName: t,
		comment: r,
		permission: n
	}) {
		return e ? (await F.where({
			role_id: e
		}).update({
			role_name: t,
			comment: r,
			permission: n
		}), {
			code: 0,
			msg: ""
		}) : {
			code: K,
			messageValues: {
				param: this.t("role-id")
			}
		}
	},
	deleteRole: async function({
		roleID: e
	}) {
		const t = g(e);
		if ("string" === t) e = [e];
		else if ("array" !== t) throw new Error("typeof roleID must be array or string");
		return await F.where({
			role_id: tn.in(e)
		}).remove(), await M.where({
			role: tn.elemMatch(tn.in(e))
		}).update({
			role: tn.pullAll(e)
		}), {
			code: 0,
			msg: ""
		}
	},
	getPermissionList: async function({
		limit: e = 20,
		offset: t = 0,
		needTotal: r = !0
	}) {
		const n = {
			code: 0,
			msg: "",
			permissionList: (await $.skip(t).limit(e).get()).data
		};
		if (r) {
			const {
				total: e
			} = await $.where({
				_id: tn.exists(!0)
			}).count();
			n.total = e
		}
		return n
	},
	getPermissionInfo: async function(e) {
		const t = await $.where({
			permission_id: e
		}).get();
		return 0 === t.data.length ? {
			code: K,
			messageValues: {
				param: this.t("permission-id")
			}
		} : {
			code: 0,
			...t.data[0]
		}
	},
	updatePermission: async function({
		permissionID: e,
		permissionName: t,
		comment: r
	}) {
		return e ? (await $.where({
			permission_id: e
		}).update({
			permission_name: t,
			comment: r
		}), {
			code: 0,
			msg: ""
		}) : {
			code: K,
			messageValues: {
				param: this.t("permission-id")
			}
		}
	},
	deletePermission: async function({
		permissionID: e
	}) {
		const t = g(e);
		if ("string" === t) e = [e];
		else if ("array" !== t) throw new Error("typeof permissionID must be array or string");
		return await $.where({
			permission_id: tn.in(e)
		}).remove(), await F.where({
			permission: tn.elemMatch(tn.in(e))
		}).update({
			permission: tn.pullAll(e)
		}), {
			code: 0,
			msg: ""
		}
	},
	bindAlipay: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || this.context.PLATFORM,
			{
				openid: i
			} = await this._getAlipayApi({
				platform: n
			}).code2Session(t);
		if (!i) return {
			code: 60401,
			messageValues: {
				account: this.t("alipay-account")
			}
		};
		let o = await M.where({
			ali_openid: i
		}).get();
		return o = this._getCurrentAppUser(o.data), o && o.length > 0 ? {
			code: 60402,
			messageValues: {
				type: this.t("alipay-account")
			}
		} : (await M.doc(e).update({
			ali_openid: i
		}), {
			code: 0,
			openid: i,
			msg: ""
		})
	},
	bindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		if (!(t = t && t.trim())) return {
			code: K,
			messageValues: {
				param: "邮箱"
			}
		};
		if (!r) return {
			code: K,
			messageValues: {
				param: "验证码"
			}
		};
		const {
			emailToLowerCase: n
		} = this._getConfig();
		n && (t = t.toLowerCase());
		let i = await M.where({
			email: t,
			email_confirmed: 1
		}).get();
		if (i = this._getCurrentAppUser(i.data), i && i.length > 0) return {
			code: 60201,
			messageValues: {
				type: "邮箱"
			}
		};
		if (r) {
			const e = await this.verifyCode({
				email: t,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return await M.doc(e).update({
			email: t,
			email_confirmed: 1
		}), {
			code: 0,
			msg: "",
			email: t
		}
	},
	bindMobile: async function({
		uid: e,
		mobile: t,
		code: r,
		openid: n,
		access_token: i,
		type: o = "sms"
	}) {
		if ("univerify" === o) {
			const e = this._getConfig(),
				r = e && e.service && e.service.univerify;
			if (!r) throw new Error("请在config.json中配置service.univerify下一键登录相关参数");
			const o = await Xr.bind(this)({
				...r,
				openid: n,
				access_token: i
			});
			if (0 !== o.code) return o;
			t = "" + o.phoneNumber
		}
		let s = await M.where({
			mobile: t,
			mobile_confirmed: 1
		}).get();
		if (s = this._getCurrentAppUser(s.data), s && s.length > 0) return {
			code: 60101,
			messageValues: {
				type: "手机号"
			}
		};
		if ("sms" === o && r) {
			if (!t) return {
				code: K,
				messageValues: {
					param: this.t("mobile")
				}
			};
			if (!r) return {
				code: K,
				messageValues: {
					param: this.t("verify-code")
				}
			};
			const e = await this.verifyCode({
				mobile: t,
				code: r,
				type: "bind"
			});
			if (0 !== e.code) return e
		}
		return await M.doc(e).update({
			mobile: t,
			mobile_confirmed: 1
		}), {
			code: 0,
			msg: "",
			mobile: t
		}
	},
	bindWeixin: async function({
		uid: e,
		code: t,
		platform: r
	}) {
		const n = r || this.context.PLATFORM,
			i = "mp-weixin" === n,
			{
				openid: o,
				unionid: s,
				sessionKey: a,
				accessToken: c,
				refreshToken: u,
				expired: d
			} = await this._getWeixinApi({
				platform: n
			})[i ? "code2Session" : "getOauthAccessToken"](t);
		if (!o) return {
			code: 60301,
			messageValues: {
				account: "微信openid"
			}
		};
		const l = rn.command,
			p = [{
				wx_openid: {
					[n]: o
				}
			}];
		s && p.push({
			wx_unionid: s
		});
		let f = await M.where(l.or(...p)).get();
		if (f = this._getCurrentAppUser(f.data), f && f.length > 0) return {
			code: 60302,
			messageValues: {
				type: this.t("wechat-account")
			}
		};
		const m = {
			wx_openid: {
				[n]: o
			}
		};
		let h;
		return s && (m.wx_unionid = s), await M.doc(e).update(m), h = i ? {
			sessionKey: a
		} : {
			accessToken: c,
			refreshToken: u,
			accessTokenExpired: d
		}, {
			code: 0,
			msg: "",
			openid: o,
			unionid: s,
			...h
		}
	},
	bindQQ: async function({
		uid: e,
		code: t,
		accessToken: r,
		platform: n
	} = {}) {
		const i = n || this.context.PLATFORM,
			o = "mp-qq" === i,
			{
				openid: s,
				unionid: a,
				sessionKey: c
			} = await this._getQQApi()[o ? "code2Session" : "getOpenidByToken"]({
				code: t,
				accessToken: r
			});
		if (!s) return {
			code: 60501,
			messageValues: {
				account: "qq openid"
			}
		};
		const u = nn.command,
			d = [{
				qq_openid: {
					[i]: s
				}
			}];
		a && d.push({
			qq_unionid: a
		});
		let l = await M.where(u.or(...d)).get();
		if (l = this._getCurrentAppUser(l.data), l && l.length > 0) return {
			code: 60502,
			messageValues: {
				type: this.t("qq-account")
			}
		};
		const p = {
			qq_openid: {
				[i]: s
			}
		};
		return a && (p.qq_unionid = a), await M.doc(e).update(p), {
			code: 0,
			msg: "",
			openid: s,
			unionid: a,
			...{
				accessToken: r,
				sessionKey: c
			}
		}
	},
	unbindAlipay: async function(e) {
		const t = on.command,
			r = await M.doc(e).update({
				ali_openid: t.remove()
			});
		return x("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70401
		}
	},
	unbindEmail: async function({
		uid: e,
		email: t,
		code: r
	}) {
		if (t = t && t.trim(), !e || !t) return {
			code: K,
			messageValues: {
				param: e ? this.t("email") : this.t("user-id")
			}
		};
		const {
			emailToLowerCase: n
		} = this._getConfig();
		if (r) {
			const e = await this.verifyCode({
				email: t,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const i = sn.command;
		let o = {
			_id: e,
			email: t
		};
		if (n) {
			const r = t.toLowerCase();
			r !== t && (o = i.or(o, {
				_id: e,
				email: r
			}))
		}
		return 1 === (await M.where(o).update({
			email: i.remove(),
			email_confirmed: i.remove()
		})).updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70201
		}
	},
	unbindMobile: async function({
		uid: e,
		mobile: t,
		code: r
	}) {
		if (r) {
			const e = await this.verifyCode({
				mobile: t,
				code: r,
				type: "unbind"
			});
			if (0 !== e.code) return e
		}
		const n = an.command;
		return 1 === (await M.where({
			_id: e,
			mobile: t
		}).update({
			mobile: n.remove(),
			mobile_confirmed: n.remove()
		})).updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70101
		}
	},
	unbindWeixin: async function(e) {
		const t = cn.command,
			r = await M.doc(e).update({
				wx_openid: t.remove(),
				wx_unionid: t.remove()
			});
		return x("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70301
		}
	},
	unbindQQ: async function(e) {
		const t = un.command,
			r = await M.doc(e).update({
				qq_openid: t.remove(),
				qq_unionid: t.remove()
			});
		return x("upRes:", r), 1 === r.updated ? {
			code: 0,
			msg: ""
		} : {
			code: 70501
		}
	},
	code2SessionAlipay: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || this.context.PLATFORM,
				r = await this._getAlipayApi({
					platform: e
				}).code2Session(t.code);
			return r.openid ? {
				code: 0,
				msg: "",
				...r
			} : {
				code: 80701,
				messageValues: {
					account: this.t("alipay-account")
				}
			}
		} catch (e) {
			return {
				code: 80702,
				messageValues: {
					account: this.t("alipay-account")
				}
			}
		}
	},
	code2SessionWeixin: async function(e) {
		let t = e;
		"string" == typeof e && (t = {
			code: e
		});
		try {
			const e = t.platform || this.context.PLATFORM,
				r = await this._getWeixinApi({
					platform: e
				})["mp-weixin" === e ? "code2Session" : "getOauthAccessToken"](t.code);
			return r.openid ? {
				code: 0,
				msg: "",
				...r
			} : {
				code: 80601,
				messageValues: {
					account: "微信openid"
				}
			}
		} catch (e) {
			return {
				code: 80602,
				messageValues: {
					account: "微信openid"
				}
			}
		}
	},
	verifyAppleIdentityToken: async function({
		identityToken: e,
		platform: t
	}) {
		const r = t || this.context.PLATFORM,
			{
				code: n,
				msg: i
			} = await $r({
				clientType: r
			}).verifyIdentityToken(e);
		return 0 !== n ? {
			code: n,
			msg: i
		} : {
			code: n,
			msg: "验证通过",
			...i
		}
	},
	wxBizDataCrypt: async function({
		code: e,
		sessionKey: t,
		encryptedData: r,
		iv: i
	}) {
		if (!r) return {
			code: K,
			messageValues: {
				param: "encryptedData"
			}
		};
		if (!i) return {
			code: K,
			messageValues: {
				param: "iv"
			}
		};
		if (!e && !t) return {
			code: K,
			messageValues: {
				param: "sessionKey"
			}
		};
		const o = this._getWeixinApi();
		if (!t) {
			const r = await o.code2Session(e);
			if (!r.sessionKey) return {
				code: 80801
			};
			t = r.sessionKey
		}
		t = Buffer.from(t, "base64"), r = Buffer.from(r, "base64"), i = Buffer.from(i, "base64");
		try {
			var s = n.createDecipheriv("aes-128-cbc", t, i);
			s.setAutoPadding(!0);
			var a = s.update(r, "binary", "utf8");
			a += s.final("utf8"), a = JSON.parse(a)
		} catch (e) {
			return console.error(e), {
				code: 80802
			}
		}
		return a.watermark.appid !== o.options.appId ? {
			code: 80803
		} : {
			code: 0,
			msg: "",
			...a
		}
	},
	encryptPwd: function(e, {
		value: t,
		version: r
	} = {}) {
		if (!(e = e && e.trim())) throw new Error(this.t("param-required", {
			param: this.t("password")
		}));
		if (!t) {
			const e = this._getConfig(),
				{
					passwordSecret: n
				} = e;
			if ("array" === g(n)) {
				const e = n.sort((e, t) => e.version - t.version);
				t = e[e.length - 1].value, r = e[e.length - 1].version
			} else t = n
		}
		if (!t) throw new Error(this.t("param-error", {
			param: "passwordSecret",
			reason: "invalid passwordSecret"
		}));
		const i = n.createHmac("sha1", t.toString("ascii"));
		return i.update(e), {
			passwordHash: i.digest("hex"),
			version: r
		}
	},
	checkToken: async function(e, {
		needPermission: t,
		needUserInfo: r = !0
	} = {}) {
		const n = this._getConfig(),
			i = this._verifyToken(e);
		if (i.code) return i;
		const {
			uid: o,
			needPermission: s,
			role: a,
			permission: c,
			exp: u
		} = i, d = a && c;
		t = void 0 === t ? s : t;
		const l = n.removePermissionAndRoleFromToken || !d || r,
			p = !n.removePermissionAndRoleFromToken && !d || n.removePermissionAndRoleFromToken && d || n
			.tokenExpiresThreshold && u - Date.now() / 1e3 < n.tokenExpiresThreshold;
		let f = {};
		if (l || p) {
			const t = await M.doc(o).get();
			if (!t.data || 0 === t.data.length || !t.data[0].token) return {
				code: 30202
			};
			if (f = t.data[0], 1 === f.status) return {
				code: 10001
			};
			let r = f.token;
			if (r ? "string" == typeof r && (r = [r]) : r = [], -1 === r.indexOf(e)) return {
				code: 30202
			}
		}
		const m = {
			code: 0,
			uid: o
		};
		let h, g;
		if (d && (m.role = a, m.permission = c), r && (m.userInfo = f), (!d && t || p) && (h = m.role = f
				.role || [], g = 0 === h.length || h.includes("admin") ? m.permission = [] : m.permission =
				await this._getPermissionListByRoleList(m.role), t && (m.role = h, m.permission = g)), p) {
			let e;
			e = n.removePermissionAndRoleFromToken ? await this.createToken({
				uid: o,
				needPermission: s
			}) : await this.createToken({
				uid: o,
				role: h,
				permission: g
			});
			let t = f.token;
			t ? "string" == typeof t && (t = [t]) : t = [];
			const r = this._getExpiredToken(t);
			return t = t.filter(e => -1 === r.indexOf(e)), t.push(e.token), await M.doc(o).update({
				token: t,
				last_login_date: Date.now(),
				last_login_ip: this.context.CLIENTIP
			}), {
				...m,
				...e
			}
		}
		return m
	},
	createToken: function({
		uid: e,
		needPermission: t,
		role: r,
		permission: n
	}) {
		if (!e) return {
			code: 30101,
			messageValues: {
				param: this.t("user-id")
			}
		};
		const i = {
				uid: e,
				needPermission: t,
				role: r,
				permission: n
			},
			o = this._getConfig();
		if (!this.interceptorMap.has("customToken")) {
			const e = {
				...i
			};
			return this._createTokenInternal({
				signContent: e,
				config: o
			})
		}
		const s = this.interceptorMap.get("customToken");
		if ("function" != typeof s) throw new Error(this.t("type-function-required", "custumToken"));
		const a = s(i);
		return a instanceof Promise ? a.then(e => this._createTokenInternal({
			signContent: e,
			config: o
		})) : this._createTokenInternal({
			signContent: a,
			config: o
		})
	},
	_checkPwd: function(e, t) {
		if (!t) return {
			code: 1
		};
		const {
			password: r,
			password_secret_version: n
		} = e, i = this._getConfig(), {
			passwordSecret: o
		} = i, s = g(o);
		if ("string" === s) {
			const {
				passwordHash: e
			} = this.encryptPwd(t, {
				value: o
			});
			return e === r ? {
				code: 0,
				message: ""
			} : {
				code: 2
			}
		}
		if ("array" !== s) throw new Error(this.t("password-secret-type-error"));
		const a = o.sort((e, t) => e.version - t.version);
		let c;
		if (c = n ? a.find(e => e.version === n) : a[0], !c) return {
			code: 3
		};
		const u = a[a.length - 1],
			{
				passwordHash: d
			} = this.encryptPwd(t, c);
		if (d === r) {
			const e = {
				code: 0
			};
			if (c !== u) {
				const {
					passwordHash: r,
					version: n
				} = this.encryptPwd(t, u);
				e.passwordHash = r, e.passwordVersion = n
			}
			return e
		}
		return {
			code: 4,
			message: ""
		}
	},
	_verifyToken: function(e) {
		const t = this._getConfig();
		let r;
		try {
			r = Nr(e, t.tokenSecret)
		} catch (e) {
			return "TokenExpiredError" === e.name ? {
				code: 30203,
				err: e
			} : {
				code: 30204,
				err: e
			}
		}
		return t.bindTokenToDevice && r.clientId && r.clientId !== this._getClientUaHash() ? {
			code: 30201
		} : {
			code: 0,
			message: "",
			...r
		}
	},
	_getExpiredToken: function(e) {
		const t = this._getConfig(),
			r = [];
		return e.forEach(e => {
			try {
				Nr(e, t.tokenSecret)
			} catch (t) {
				r.push(e)
			}
		}), r
	},
	_getPermissionListByRoleList: async function(e) {
		if (!Array.isArray(e)) return [];
		if (0 === e.length) return [];
		if (e.includes("admin")) {
			return (await $.limit(500).get()).data.map(e => e.permission_id)
		}
		const t = await F.where({
				role_id: dn.in(e)
			}).get(),
			r = [];
		return t.data.forEach(e => {
			Array.prototype.push.apply(r, e.permission)
		}), S(r)
	},
	_getClientUaHash: function() {
		const e = n.createHash("md5"),
			t = /MicroMessenger/i.test(this.context.CLIENTUA) ? this.context.CLIENTUA.replace(
				/(MicroMessenger\S+).*/i, "$1") : this.context.CLIENTUA;
		return e.update(t), e.digest("hex")
	},
	_createTokenInternal: function({
		signContent: e,
		config: t
	}) {
		if (t.tokenExpiresIn && t.tokenExpiresThreshold && t.tokenExpiresIn <= t.tokenExpiresThreshold)
			throw new Error(this.t("token-expires-config-warning"));
		return "object" === g(e) && e.uid ? (t.bindTokenToDevice && (e.clientId = this
	._getClientUaHash()), {
			token: Lr(e, t.tokenSecret, {
				expiresIn: t.tokenExpiresIn
			}),
			tokenExpired: Date.now() + 1e3 * t.tokenExpiresIn
		}) : {
			code: 30101,
			messageValues: {
				param: this.t("user-id")
			}
		}
	},
	setVerifyCode: async function({
		mobile: e,
		email: t,
		code: r,
		expiresIn: n,
		type: i
	}) {
		if (t = t && t.trim(), e = e && e.trim(), t) {
			const {
				emailToLowerCase: e
			} = this._getConfig();
			e && (t = t.toLowerCase())
		}
		if (!e && !t) return {
			code: 50101,
			messageValues: {
				param: "手机号或邮箱"
			}
		};
		if (e && t) return {
			code: 50102,
			messageValues: {
				param: "参数",
				reason: "手机号和邮箱不可同时存在"
			}
		};
		r || (r = A()), n || (n = 180);
		const o = Date.now(),
			s = {
				mobile: e,
				email: t,
				type: i,
				code: r,
				state: 0,
				ip: this.context.CLIENTIP,
				created_at: o,
				expired_at: o + 1e3 * n
			};
		return x("addRes", await B.add(s)), {
			code: 0,
			mobile: e,
			email: t
		}
	},
	verifyCode: async function({
		mobile: e,
		email: t,
		code: r,
		type: n
	}) {
		if (t = t && t.trim(), e = e && e.trim(), t) {
			const {
				emailToLowerCase: e
			} = this._getConfig();
			e && (t = t.toLowerCase())
		}
		if (!e && !t) return {
			code: 50201,
			messageValues: {
				param: "手机号或邮箱"
			}
		};
		if (e && t) return {
			code: 50203,
			messageValues: {
				param: "参数",
				reason: "手机号和邮箱不可同时存在"
			}
		};
		const i = ln.command,
			o = Date.now(),
			s = {
				mobile: e,
				email: t,
				type: n,
				code: r,
				state: 0,
				expired_at: i.gt(o)
			},
			a = await B.where(s).orderBy("created_at", "desc").limit(1).get();
		if (x("verifyRecord:", a), a && a.data && a.data.length > 0) {
			const e = a.data[0];
			return x("upRes", await B.doc(e._id).update({
				state: 1
			})), {
				code: 0,
				msg: "验证通过"
			}
		}
		return {
			code: 50202,
			msg: "验证码错误或已失效"
		}
	},
	sendSmsCode: async function({
		mobile: e,
		code: t,
		type: r,
		templateId: n
	}) {
		if (!e) return {
			code: K,
			messageValues: {
				param: this.t("mobile")
			}
		};
		if (t || (t = A()), !r) return {
			code: K,
			messageValues: {
				param: this.t("verify-code-type")
			}
		};
		const i = this._getConfig();
		let o = i && i.service && i.service.sms;
		if (!o) throw new Error(this.t("config-param-required", {
			param: "service.sms"
		}));
		o = Object.assign({
			codeExpiresIn: 300
		}, o);
		const s = ["smsKey", "smsSecret"];
		for (let e = 0, t = s.length; e < t; e++) {
			const t = s[e];
			if (!o[t]) throw new Error(this.t("config-param-required", {
				param: "service.sms." + t
			}))
		}
		const {
			name: a,
			smsKey: c,
			smsSecret: u,
			codeExpiresIn: d
		} = o;
		let l;
		switch (r) {
			case "login":
				l = this.t("login");
				break;
			default:
				l = this.t("verify-mobile")
		}
		try {
			const i = {
				name: a,
				code: t,
				action: l,
				expMinute: "" + Math.round(d / 60)
			};
			a && (i.name = a), await uniCloud.sendSms({
				smsKey: c,
				smsSecret: u,
				phone: e,
				templateId: n || "uniID_code",
				data: i
			});
			const o = await this.setVerifyCode({
				mobile: e,
				code: t,
				expiresIn: d,
				type: r
			});
			return o.code >= 0 ? o : {
				code: 0,
				msg: ""
			}
		} catch (e) {
			return {
				code: 50301
			}
		}
	}
});
let fn;
try {
	fn = require("uni-config-center")
} catch (e) {}
class mn {
	constructor({
		context: e,
		config: t
	} = {}) {
		const r = fn && fn({
			pluginId: "uni-id"
		});
		let n;
		this.pluginConfig = r, this.config = t || this._getConfigContent(), Object.defineProperty(this, "context", {
			get: () => e || global.__ctx__ || {}
		}), this.interceptorMap = new Map, r && r.hasFile("custom-token.js") && this.setInterceptor(
			"customToken", require(r.resolve("custom-token.js"))), uniCloud.initI18n ? n = uniCloud.initI18n({
			locale: this.context.LOCALE || "zh-CN",
			fallbackLocale: "zh-Hans",
			messages: U
		}) : (n = new L({
			locale: this.context.LOCALE || "zh-CN",
			fallbackLocale: "zh-Hans",
			messages: U
		}), console.warn(n.t("hx-version-warning"))), this.t = n.t.bind(n)
	}
	get dev() {
		return console.warn(this.t("dev-warning")), {
			getConfig: this._getConfig.bind(this)
		}
	}
	_parseConfig(e) {
		return Array.isArray(e) ? e : e[0] ? Object.values(e) : e
	}
	_getCurrentAppConfig(e) {
		if (!Array.isArray(e)) return e;
		if (!this.context.APPID) throw new Error(this.t("context-param-required", {
			param: "APPID"
		}));
		return e.find(e => e.dcloudAppid === this.context.APPID) || e.find(e => e.isDefaultConfig)
	}
	_getConfigContent() {
		if (this.pluginConfig && this.pluginConfig.hasFile("config.json")) {
			this._hasConfigFile = !0;
			try {
				return this._parseConfig(this.pluginConfig.config())
			} catch (e) {
				return
			}
		}
		const e = r.resolve(__dirname, "config.json");
		this._hasConfigFile = t.existsSync(e);
		try {
			return this._parseConfig(require(e))
		} catch (e) {}
	}
	init(e) {
		console.warn("uniID.init has been deprecated, use uniID.createInstance instead"), this.config = e
	}
	setInterceptor(e, t) {
		this.interceptorMap.set(e, t)
	}
	_getConfig(e) {
		const t = this.config && 0 !== Object.keys(this.config).length;
		if (this._hasConfigFile && !t) throw new Error(this.t("config-file-invalid"));
		if (!t) throw new Error(this.t("config-file-not-found"));
		const r = this._getCurrentAppConfig(this.config),
			n = Object.assign(r, r[e || this.context.PLATFORM]) || {},
			i = Object.assign({
				bindTokenToDevice: !1,
				tokenExpiresIn: 7200,
				tokenExpiresThreshold: 1200,
				passwordErrorLimit: 6,
				passwordErrorRetryTime: 3600,
				usernameToLowerCase: !0,
				emailToLowerCase: !0
			}, n);
		return ["passwordSecret", "tokenSecret", "tokenExpiresIn", "passwordErrorLimit", "passwordErrorRetryTime"]
			.forEach(e => {
				if (!i || !i[e]) throw new Error(this.t("config-param-required", {
					param: e
				}))
			}), i
	}
}
for (const e in pn) mn.prototype[e] = pn[e];

function hn({
	context: e,
	config: t
} = {}) {
	const r = new mn({
		context: e,
		config: t
	});
	return new Proxy(r, {
		get(e, t) {
			if (t in e && 0 !== t.indexOf("_")) return "function" == typeof e[t] ? (r = e[t], function() {
				const e = r.apply(this, arguments);
				return h(e) ? e.then(e => (R.bind(this)(e), e)) : (R.bind(this)(e), e)
			}).bind(e) : e[t];
			var r
		}
	})
}
mn.prototype.createInstance = hn;
var gn = hn();
module.exports = gn;
