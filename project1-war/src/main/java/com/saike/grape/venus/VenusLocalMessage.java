package com.saike.grape.venus;



import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

/**
 * Copyright (C), 2014-9-16, 上汽电商有限公司
 * @version 2.0
 * @date 2014-9-16 venus 本地消息提示
 * @author 马蹄声
 */
public class VenusLocalMessage{
	
    @Autowired
    private MessageSource messageSource;
    
    public String getMessage( String code, 
            Object[] args, 
            String defaultMessage ) {
        return messageSource.getMessage( code, 
                args, 
                defaultMessage, 
                Locale.CHINA );
    }
    
    public String getMessage( String code ) {
        return this.getMessage( code, null );
    }
    
    public String getMessage( String code, Object[] args ) {
        return messageSource.getMessage( code, args, Locale.CHINA );
    }
	
}
