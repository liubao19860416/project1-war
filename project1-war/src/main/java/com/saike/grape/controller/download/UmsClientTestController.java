package com.saike.grape.controller.download;

import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.exolab.castor.types.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.meidusa.venus.client.VenusServiceFactory;
import com.saic.framework.message.Sms;
import com.saic.framework.message.UniMessageService;
import com.saike.grape.controller.BaseController;
import com.saike.grape.utils.v11.ConsField;
import com.saike.grape.venus.client.UmsClient;
import com.saike.grape.viewobject.v11.UmsEntity;
/**
 * 短信发送测试类
 */
@Controller
@RequestMapping("/umsClient")
public class UmsClientTestController extends BaseController<UmsClientTestController> {
    
    //@Autowired
    private VenusServiceFactory venusServiceFactory;
    
    @Autowired
    private UmsClient umsClient;
    
    @SuppressWarnings("all")
    @RequestMapping(value = "/testUmsClientSendMessage/0")
    @ResponseBody
    public void testUmsClientSendMessage(@RequestBody Map<String, Object> params,Model model,
            HttpServletRequest request,HttpServletResponse response) throws Exception {
        
        String overdueTime = new Timestamp(System.currentTimeMillis()).toString().substring(0,
                new Timestamp(new Date().toLong()).toString().length() - 10);
        // 短信发送内容如下
        UmsEntity ums = new UmsEntity();
        ums.setAppId(ConsField.UMS_COUPON_APPID);
        ums.setSchemaId(ConsField.UMS_COUPON_SCHAMDID);
//        ums.addPhone(GrapeStringUtils.getStringValue(params.get("destPhones")));
//        ums.addParams(ConsField.UMS_COUPON_COUPONAMOUNT, GrapeStringUtils.getStringValue(params.get("couponAmount")) );
//        ums.addParams(ConsField.UMS_COUPON_COUPONCODE, GrapeStringUtils.getStringValue(params.get("couponCode")));
//        ums.addParams(ConsField.UMS_COUPON_OVERDUETIME, GrapeStringUtils.getStringValue(params.get("overdueTime")));
//        ums.addParams(ConsField.UMS_COUPON_NOTE, GrapeStringUtils.getStringValue(params.get("note")));

         UniMessageService dms =venusServiceFactory.getService(UniMessageService.class);
         ums.setContent("短信附加内容");
         Sms sms = new Sms(ums.getAppId(), ums.getSchemaId());
         sms.setDestPhones(ums.getDestPhones());
         sms.setParams(ums.getParams());
         sms.setContent(ums.getContent());
         // 调用短信服务1
         dms.sendSms(sms);
        
        // 调用短信服务2
        boolean result = umsClient.invokService(ums);
        
        PrintWriter out = response.getWriter();
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=UTF-8");
        out.print("{\"result\":\"1\",\"errorCode\":\"0\"}");
        out.close();
        //return null;
    }
}
