package com.saike.grape.exception;


/**
 * 业务基础异常类
 * 
 * @author zeng wei
 * @version 2.0
 *
 */
public class GrapeException extends RuntimeException {

    private static final long serialVersionUID = -2538641192786447902L;

    private String resultCode;
    private String msgCode;
    private Object[] msgOptions;
    
    /**
     * 构造函数
     * 
     * @param msgCode 消息代码
     * @param msgOptions 消息参数
     */
    public GrapeException( String resultCode, 
            String msgCode, Object[] msgOptions ) {
        super( resultCode + ":" + msgCode );
        this.resultCode = resultCode;
        this.msgCode = msgCode;
        this.msgOptions = msgOptions;
    }

    public String getMsgCode() {
        return msgCode;
    }

    public void setMsgCode(String msgCode) {
        this.msgCode = msgCode;
    }

    public Object[] getMsgOptions() {
        return msgOptions;
    }

    public void setMsgOptions(Object[] msgOptions) {
        this.msgOptions = msgOptions;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }
    
}
