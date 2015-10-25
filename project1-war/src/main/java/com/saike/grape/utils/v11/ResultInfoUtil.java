package com.saike.grape.utils.v11;

import java.util.HashMap;
import java.util.Map;
/****
 * 
 * 
 * Copyright (C), 2014年9月16日, 上汽电商有限公司 错误信息提示
 * 
 * @FileName: ResultInfoUtil
 * @author 马蹄声
 * @version 2.0
 */
public class ResultInfoUtil {
	private static final String SUCCESS = "0";
	public static final String ERROR = "400";
	private static Map<String, String> errorMap = new HashMap<String, String>();
	static {
		errorMap.put(SUCCESS, "操作成功");
		errorMap.put(ERROR, "操作失败!");
	}

	/***
	 * 设置正确 结果
	 * 
	 * @param   obj  返回对象
	 * @return
	 */
	public static ResultSuccessInfo setSuccessInfo(Object obj) {
		ResultSuccessInfo resultSuccessInfo = new ResultSuccessInfo();
		resultSuccessInfo.setErrorCode(SUCCESS);
		resultSuccessInfo.setResult(obj);
		return resultSuccessInfo;
	}
	
	/***
	 * 设置错误 结果
	 * @param type 类型
	 * @return
	 */
	public static ResultErrorInfo setErrorInfo(String type) {
		ResultErrorInfo resultInfo = new ResultErrorInfo();
		resultInfo.setErrorMessage(ResultInfoUtil.errorMap.get(type));
		resultInfo.setErrorCode(type);
		return resultInfo;
	}
	
}
