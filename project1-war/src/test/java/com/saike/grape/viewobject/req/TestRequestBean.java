package com.saike.grape.viewobject.req;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class TestRequestBean {

    @NotNull
    @Size( min=1, max = 10 )
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}
