package com.saike.grape.controller;

import java.io.BufferedReader;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Enumeration;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;

import com.saike.grape.exception.GrapeException;
import com.saike.grape.exception.ParameterInvalidException;
import com.saike.grape.utils.v11.ErrorCodeConsField;
import com.saike.grape.utils.v11.ErrorInfoUtil;
import com.saike.grape.viewobject.ResultCode;
import com.saike.grape.viewobject.ResultViewObject;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public abstract class BaseController<T extends BaseController<T>> {
    
    private static final Logger logger = 
            LoggerFactory.getLogger( BaseController.class );  
    
    private static final Pattern PRE_V20 = Pattern.compile( ".+/0$" );
    
    private Class<T> controllerClass;
    
    private static final Map<Class<?>, Logger> loggersMap =
            new ConcurrentHashMap<>();
    
    @Autowired
    private MessageSource messageSource;
    
    @SuppressWarnings("unchecked")
    public BaseController() {
        Type[] types = ( ( ParameterizedType )getClass()
                .getGenericSuperclass() ).getActualTypeArguments();
        this.controllerClass = ( Class<T> )types[0];
    }
    
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
    
    @ExceptionHandler
    public @ResponseBody 
        Object exceptionHandler( Throwable ex, HttpServletRequest request ) {
        
        if( ex instanceof ParameterInvalidException ) {
            return compatibleResultObject( request,
                   ( ( ParameterInvalidException )ex ).getResultViewObject() );
        }
        
        logReqest( request, ex );
        
        String code = ResultCode.ERROR;
        String msg;
        
        if( ex instanceof GrapeException ) {
            code = ((GrapeException) ex).getResultCode();
            msg = getMessage( ((GrapeException) ex).getMsgCode(), 
                    ((GrapeException) ex).getMsgOptions() );
        }else if( ex instanceof HttpMediaTypeNotSupportedException ) {
            msg = getMessage( "content.type.not.supported", 
                    new String[]{ request.getContentType() } );
        }else if( ex instanceof HttpMessageNotReadableException ) {
            msg = getMessage( "content.not.readable" );
        }else {
            msg = getMessage( "system.error" );
        }
        
        return compatibleResultObject( request,
                new ResultViewObject( code, msg ) );
        
    }
    
    @RequestMapping( "**" )
    public @ResponseBody 
        ResultViewObject notFoundHandler( HttpServletRequest request ) {
        
        logger.warn( "== request not supported ==============" 
                + getRequestInfo( request ) );
        
        return new ResultViewObject( ResultCode.REQUEST_NOT_SUPPORTED,
                getMessage( "request.not.supported" ) );
        
    }
    
    protected ResultViewObject handleResult( BindingResult bindingResult ) {
        ResultViewObject resultViewObject = new ResultViewObject();
        if( bindingResult.hasErrors() ) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            if( errors != null ) {
                for( ObjectError objError : errors ) {
                    resultViewObject.appendMessage( objError.getCode(),
                            objError.getDefaultMessage() );
                }
            }
            throw new ParameterInvalidException( resultViewObject );
        }
        return resultViewObject;
    }
    
    protected Logger getLogger() {
        return getLogger( this.controllerClass );
    }
    
    private static Logger getLogger( Class<?> clazz ) {
        Logger logger = loggersMap.get( clazz );
        if( logger == null ) {
            logger = LoggerFactory.getLogger( clazz );
            loggersMap.put( clazz, logger );
        }
        return logger;
    }
    
    protected void logReqest( HttpServletRequest request ) {
        getLogger().warn( getRequestInfo( request ) );
    }
    
    protected void logReqest( HttpServletRequest request, Throwable ex ) {
        getLogger().error( getRequestInfo( request ), ex );
    }

    @SuppressWarnings("rawtypes")
    protected String getRequestInfo( HttpServletRequest request ) {
        
        StringBuilder headers = new StringBuilder();
        
        Enumeration headerNames = request.getHeaderNames();
        if( headerNames.hasMoreElements() ) {
            headers.append( "\r\nheaders: {" );
            while( headerNames.hasMoreElements() ) {
                String name = ( String )headerNames.nextElement();
                headers.append( "\r\n" )
                    .append( name )
                    .append( "=" )
                    .append( request.getHeader( name ) );
            }
            headers.append( "\r\n}" );
        }
        
        StringBuilder parameters = new StringBuilder();
        Enumeration parameterNames = request.getParameterNames();
        if( parameterNames.hasMoreElements() ) {
            parameters.append( "\r\nparameters: {" );
            while( parameterNames.hasMoreElements() ) {
                String parameter = ( String )parameterNames.nextElement();
                parameters.append( "\r\n" )
                    .append( parameter )
                    .append( "=" )
                    .append( request.getParameter( parameter ) );
            }
            parameters.append( "\r\n}" );
        }
        
        StringBuilder content = new StringBuilder();
        if( ! "multipart/form-data".equalsIgnoreCase( 
                request.getContentType() ) ) {
            try {
                BufferedReader r = request.getReader();
                String line = null;
                while( ( line = r.readLine() ) != null ) {
                    content.append( line );
                }
            }catch( Exception ex ) {
                
            }
        }
        
//        
//        Enumeration attrNames = request.getAttributeNames();
//        if( attrNames.hasMoreElements() ) {
//            sbd.append( "\r\nattributes:" );
//            while( attrNames.hasMoreElements() ) {
//                String attrName = ( String )attrNames.nextElement();
//                sbd.append( "\r\n" )
//                    .append( attrName )
//                    .append( ":" )
//                    .append( request.getAttribute( attrName ) );
//            }
//        }
        
        return "\r\n>>> request >>>>>>"
                + headers.toString()
                + "\ncontentType: " + request.getContentType()
                + "\npathInfo: " + request.getPathInfo()
                + "\npathTranslated: " + request.getPathTranslated()
                + "\nremoteAddr: " + request.getRemoteAddr()
                + "\nremoteHost: " + request.getRemoteHost()
                + "\nrequestURI: " + request.getRequestURI()
                + "\nservletPath: " + request.getServletPath()
            + parameters.toString()
            + "\ncontent ---\n"
            + content.toString()
            + "\n-----\n";
    }
    
    protected static boolean isPreV20( HttpServletRequest request ) {
        return PRE_V20.matcher( request.getRequestURI() ).matches();
    }
    
    protected Object compatibleResultObject( HttpServletRequest request,
            ResultViewObject resultViewObject ) {
        if( isPreV20( request ) ) {
            return ErrorInfoUtil.setErrorInfo( 
                    ErrorCodeConsField.ERROR_MSG_10012, 
                    resultViewObject.getDefaultMessage() );
        }else {
            return resultViewObject;
        }
    }
    
}
