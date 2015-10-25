package com.saike.grape.venus.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.saic.framework.message.Sms;
import com.saic.framework.message.UniMessageService;
import com.saike.grape.viewobject.v11.UmsEntity;

@Component
public class UmsClient extends VenusClient{
	
	Logger logger = LoggerFactory.getLogger(this.getClass()); 
	
	public boolean invokService(UmsEntity ums) {
		super.getVenusServiceFactoryInstance();
		UniMessageService dms = venusServiceFactory.getService(UniMessageService.class);
		if(dms==null){
			return false;
		}
		Sms sms = new Sms(ums.getAppId(),ums.getSchemaId());
		sms.setDestPhones(ums.getDestPhones());
		sms.setParams(ums.getParams());
		sms.setContent(ums.getContent());
		try {
			dms.sendSms(sms);
		} catch (Exception e) {
			logger.error("****调用UmsClient.invokService方法出错**"
                            ,e);
			return false;
		}
		return true;
	}

}
