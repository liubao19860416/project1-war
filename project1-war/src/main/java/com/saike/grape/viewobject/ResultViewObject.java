package com.saike.grape.viewobject;

import java.util.HashMap;
import java.util.Map;

public class ResultViewObject {

    private final static String DEFAULT_MSG_KEY = "-";
    
    private String code;
    private Map<String, String> messages;
    
    public ResultViewObject() {
        this( ResultCode.OK );
    }
    
    public ResultViewObject( String code ) {
        this( code, null );
    }
    
    public ResultViewObject( String code, String message ) {
        this.code = code;
        if( message != null && ! "".equals( message ) ) {
            this.messages = new HashMap<>();
            this.messages.put( DEFAULT_MSG_KEY, message );
        }
    }
    
    public String getCode() {
        return code;
    }
    
    public ResultViewObject setCode(String code) {
        this.code = code;
        return this;
    }
    
    public Map<String, String> getMessages() {
        return messages;
    }
    
    public ResultViewObject setDefaultMessage( String message ) {        
        this.appendMessage( DEFAULT_MSG_KEY, message );
        return this;
    }
    
    public String getDefaultMessage() {
        return this.messages != null ? this.messages.get( DEFAULT_MSG_KEY )
                : null;
    }
    
    public ResultViewObject appendMessage( String key, String message ) {
        if( key == null || "".equals( key ) ) {
            return this;
        }
        if( message == null || "".equals( message ) ) {
            return this;
        }
        if( this.messages == null ) {
            this.messages = new HashMap<>();
        }
        
        this.messages.put( key, message );
        
        return this;
    }
    
}
