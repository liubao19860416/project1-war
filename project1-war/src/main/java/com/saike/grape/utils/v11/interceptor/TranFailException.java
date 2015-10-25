package com.saike.grape.utils.v11.interceptor;

public class TranFailException extends Exception {

	private static final long serialVersionUID = -5025319135888177908L;
	private String errorCode = "DEFAULT";

	public TranFailException(String errorCode, String errorMessage) {
		super(errorMessage);
		this.errorCode = errorCode;
	}

	public String getErrorCode() {
		return errorCode;
	}

}
