package com.saike.grape.utils.v11;

import java.util.HashMap;

/****
 * 
 * 
 * Copyright (C), 2014年9月16日, 上汽电商有限公司 错误信息提示
 * 
 * @FileName: ResultSuccessInfo 
 * @author 马蹄声
 * @version 2.0
 */
public class ResultSuccessInfo {
	/***
	 * 返回标识
	 */
	private String errorCode = "0";
	/***
	 * 返回对象
	 */
	private Object result;

	public ResultSuccessInfo() {

	}

	public ResultSuccessInfo(String code) {
		super();
		this.errorCode = code;
	}

	public ResultSuccessInfo(Object result) {
		super();
		this.result = result;

	}

	public ResultSuccessInfo(String errorCode, Object result) {
		super();
		this.errorCode = errorCode;
		this.result = result;

	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public Object getResult() {

		return result;
	}

	public void setResult(Object result) {

		if (result == null) {
			this.result = new HashMap<>();
			return;
		}
		this.result = result;
	}

}
