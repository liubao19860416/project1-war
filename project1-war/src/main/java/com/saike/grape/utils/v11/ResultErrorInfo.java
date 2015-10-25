package com.saike.grape.utils.v11;

/****
 * 
 * 
 * Copyright (C), 2014年9月16日, 上汽电商有限公司 返回错误结果
 * 
 * @FileName: ResultErrorInfo
 * @author 马蹄声
 * @version 2.0
 */
public class ResultErrorInfo {

	private String errorCode;
	private String errorMessage;

	public ResultErrorInfo() {
		super();
	}

	public ResultErrorInfo(String errorCode, String errorMessage) {
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
