package com.saike.grape.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import com.meidusa.fastjson.JSON;
import com.saike.grape.utils.v11.ConsField;
import com.saike.grape.utils.v11.ResultInfoUtil;
import com.saike.grape.venus.client.UmsClient;

/**
 * 短信消息发送测试类
 * 
 * @author Liubao
 * @2014年10月21日
 */
public class UmsClientTest extends ControllerTest {

    private String url="/umsClient/testUmsClientSendMessage/0";
    @Autowired
    private UmsClient umsClient;
    
   // @Test
    public void testUmsClient() throws Exception{
        String overdueTime = new Timestamp(System.currentTimeMillis()).toString().substring(0,
                new Timestamp(new Date().getTime()).toString().length() - 10);
        String saikemobilehead="{\"userId\": \"11111\",";
        saikemobilehead+="\"deviceId\": \"22222\",";
        HttpHeaders httpHeaders=new HttpHeaders();
        httpHeaders.add("saikemobilehead", saikemobilehead);
        
        Map<String, Object> params = new HashMap<>();
        List<String> destPhones = new ArrayList<String>();
        destPhones.add("+8618611478781");
        
        params.put("appId", ConsField.UMS_COUPON_APPID);
        params.put("schemaId", ConsField.UMS_COUPON_SCHAMDID);
        params.put("couponAmount", "200");
        params.put("couponCode", "FEDCB");
        params.put("verifyCode", "EDCBA");
        params.put("overdueTime", overdueTime);
        params.put("note", "新用户发送保养券短信信息");
        //params.put("destPhones", destPhones);
        params.put("destPhones", "18611478781");
        
        mockMvc.perform( post(url,params)
                .header( "content-type", CONTENT_TYPE_JSON )
                .headers(httpHeaders)
                .content( JSON.toJSONString( params ) ) )
        .andExpect( status().isOk() )
        .andExpect( content().contentType( CONTENT_TYPE_JSON ) )
        .andExpect( content().encoding( CONTENT_ENCODE ) );
        /*.andExpect( content().string( 
                JSON.toJSONString( 
                        ResultInfoUtil.setSuccessInfo("1") ) ) );*/
        
    }
    
}
