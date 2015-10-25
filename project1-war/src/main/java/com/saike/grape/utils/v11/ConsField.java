package com.saike.grape.utils.v11;



/**
 * Copyright (C), 2014-1-10, 上汽电商有限公司 常量 类
 * 
 * @version 2.0
 * @date 2014-9-16
 */
public class ConsField {
	
	/**
	 * 支付宝接口
	 */
	public static final String ALIPAY = "alipay";//支付宝
	public static final String SERVICE_NAME = "mobileapppay";//支付服务名称
	public static final String IMAGE_UPLOAD_URL="image.upload.url";//上传头像的路径
	public static final String VERSION_DOWN_URL="version.down.url";//版本下载地址
	
	public static final String RLUE_PRODUCT = "BY";
	
	public static final String PLATEFORM_ANDROID = "1000";//代表android系统
	public static final String PLATEFORM_IOS = "2000";//代表ios系统
	
    /**
     * 用户注册验证码  短信服务
     */
	public static final String UMS_REGISTER_APPID = "app";  
	public static final String UMS_REGISTER_SCHAMDID = "001"; 
	public static final String UMS_REGISTER_VERIFYCODE = "verifyCode"; 
	
	/**
	 * 保养券发送短信
	 */
	public static final String UMS_COUPON_APPID = "MA";  
	public static final String UMS_COUPON_SCHAMDID = "049"; 
	public static final String UMS_COUPON_COUPONAMOUNT = "couponAmount";  //保养券金额
	public static final String UMS_COUPON_COUPONCODE = "couponCode";  //保养券号码
	public static final String UMS_COUPON_OVERDUETIME = "overdueTime"; //截止时间
	public static final String UMS_COUPON_NOTE = "note"; //备注
	
	
	/**
	 * 用户状态
	 */
	/**
	 * 待确认
	 */
	public static final int USER_STATUS_BECONFIRM = 1;  
	/**
	 * 已确认
	 */
	public static final int USER_STATUS_CONFIRMED = 2; 
	
	/**
	 * 已拒绝
	 */
	public static final int USER_STATUS_REFUSEED = 3;
	/**
	 * 已完工
	 */
	public static final int USER_STATUS_FINISHED = 9; 
	
	/**
	 * 更新公里数
	 */
	public static final int USER_STATUS_UPDATEVKT = 11; 
	/**
	 * 已取消
	 */
	public static final int USER_STATUS_CANCEL = 99;  
	

	
}
