package com.saike.grape.utils.v11;
/****
 * 
 * 
 * Copyright (C), 2014年9月16日, 上汽电商有限公司  对于错误信息的返回
 * 
 * @FileName: ResultInfoUtil
 * @author 马蹄声
 * @version 2.0
 */
public class ErrorInfoUtil {
	
	/**
	 * 设置返回错误信息
	 * @param errorCode
	 * @param errorMessage
	 * @return
	 */
	public static Object setErrorInfo(String errorCode,String errorMessage){
		ResultErrorInfo resultErrorInfo = new ResultErrorInfo();
		resultErrorInfo.setErrorMessage(errorMessage);
		resultErrorInfo.setErrorCode(errorCode);
		return resultErrorInfo; 
	}
	
}
