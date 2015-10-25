package com.saike.grape.utils.v11;

import java.io.Serializable;
/****
 * 
 * 
 * Copyright (C), 2014年9月16日, 上汽电商有限公司  封装错误码信息
 * 
 * @FileName: ResultSuccessInfo 
 * @author 马蹄声
 * @version 2.0
 */
public final class ErrorCodeConsField implements Serializable {

	private static final long serialVersionUID = 8789423033223487174L;

	private ErrorCodeConsField() {
	}

	// 支付失败
	public static final String ERROR_MSG_11000 = "11000";
	// 操作失败
	public static final String ERROR_MSG_10002 = "10002";
	// 参数为空
	public static final String ERROR_MSG_10003 = "10003";
	// 注册成功
	public static final String ERROR_MSG_10004 = "10004";
	// 注册失败
	public static final String ERROR_MSG_10005 = "10005";
	// 用户已注册
	public static final String ERROR_MSG_10006 = "10006";
	// 验证码为空
	public static final String ERROR_MSG_10007 = "10007";
	// 验证码错误
	public static final String ERROR_MSG_10008 = "10008";
	// 暂无数据
	public static final String ERROR_MSG_10009 = "10009";
	// 用户名和密码不能为空
	public static final String ERROR_MSG_10010 = "10010";
	// 设备号和应用id不能为空
	public static final String ERROR_MSG_10011 = "10011";
	// 更新失败
	public static final String ERROR_MSG_10012 = "10012";
	// 更新成功
	public static final String SUCCESS_MSG_10013 = "10013";
	// 数据错误
	public static final String SUCCESS_MSG_10014 = "10014";
	// 代驾员已分配
	public static final String ERROR_MSG_10015 = "10015";
	// 当前版本号已最新
	public static final String ERROR_MSG_10016 = "10016";
	// 经销商已收藏
	public static final String ERROR_MSG_10017 = "10017";

	public static final String ERROR_MSG_10018 = "10018";

	// 价格错误
	public static final String ERROR_MSG_10019 = "10019";
	
	//工位已满
	public static final String ERROR_MSG_10020 = "10020";
	
	//生成订单号失败
	public static final String ERROR_MSG_10021 = "10021";
	
	//更新订单失败
    public static final String ERROR_MSG_10022 = "10022";
    
    //取消订单失败
    public static final String ERROR_MSG_10024 = "10024";
    
    //未登录
    public static final String ERROR_MSG_2000 = "2000";
    
    public static final String ERROR_MSG_10025 = "10025";
    
    public static final String ERROR_MSG_10026 = "10026";
    
    //没有获取到最新的版本
    public static final String ERROR_MSG_10027 = "10027";
    
    public static final String ERROR_MSG_10028 = "10028";
    
    //优惠信息已经过期~@20140827
    public static final String ERROR_MSG_10029 = "10029";

}
