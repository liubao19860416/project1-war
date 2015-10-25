package com.saike.grape.exception;

import com.saike.grape.viewobject.ResultViewObject;

public class ParameterInvalidException extends RuntimeException {

    private static final long serialVersionUID = -2713084450600477176L;

    private ResultViewObject resultViewObject;
    
    public ParameterInvalidException( ResultViewObject resultViewObject ) {
        this.resultViewObject = resultViewObject;
    }
    
    public ResultViewObject getResultViewObject() {
        return this.resultViewObject;
    }
    
}
