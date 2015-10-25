package com.saike.grape.controller;

import com.saike.grape.exception.GrapeException;
import com.saike.grape.viewobject.ResultCode;
import com.saike.grape.viewobject.ResultViewObject;
import com.saike.grape.viewobject.req.TestRequestBean;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController extends BaseController<MyController> {

    @RequestMapping( value = "/hello", method = { RequestMethod.POST } )
    public @ResponseBody ResultViewObject hello( 
            @RequestBody( required = true ) 
            @Validated TestRequestBean test,
            BindingResult bindingResult ) {
        
        return handleResult( bindingResult )
                .setDefaultMessage( "Hello " + test.getName() + ", " 
                        + "greetings from MyController." );
        
    }
    
    @RequestMapping( value = "/ex", method = { RequestMethod.GET } )
    public @ResponseBody ResultViewObject ex( ) {
        
        throw new GrapeException( ResultCode.OK, "content.not.readable", null );
        
    }
    
    @RequestMapping( value = "/ex/0", method = { RequestMethod.GET } )
    public @ResponseBody ResultViewObject ex0( ) {
        
        throw new GrapeException( ResultCode.OK, "content.not.readable", null );
        
    }
    
}
