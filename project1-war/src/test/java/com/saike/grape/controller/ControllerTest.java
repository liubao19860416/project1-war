package com.saike.grape.controller;

import org.junit.After;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;


@RunWith(SpringJUnit4ClassRunner.class)  
@ContextConfiguration( locations = { 
	"classpath:application-grape-base.xml",
    "file:D:/git/pro/grape-service20/src/main/webapp/WEB-INF/dispatcher-servlet.xml",
    "file:D:/git/pro/grape-service20/src/main/webapp/WEB-INF/applicationContext.xml",
    "file:D:/git/pro/grape-service20/src/main/webapp/WEB-INF/applicationContext-dataSource.xml",
    "file:D:/git/pro/grape-service20/src/main/webapp/WEB-INF/applicationContext-mybatis.xml",
    "file:D:/git/pro/grape-service20/src/main/webapp/WEB-INF/applicationContext-venus-client.xml",
    "file:D:/git/pro/grape-service20/src/main/webapp/WEB-INF/applicationContext-venus-server.xml"
})
@WebAppConfiguration
public class ControllerTest {
    
    public final static String CONTENT_TYPE_JSON = 
            "application/json;charset=UTF-8";
    
    public final static String CONTENT_ENCODE = "UTF-8";
    
    @Autowired  
    protected WebApplicationContext webAppContext;  
    
    protected MockMvc mockMvc;  

    @Before
    public void init() throws Exception {
        mockMvc = MockMvcBuilders
                .webAppContextSetup( webAppContext )
                .build(); 
    }

    @After
    public void down() throws Exception {
    }

}
