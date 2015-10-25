package com.saike.grape.venus.client;

import com.meidusa.venus.client.ServiceFactory;
import com.meidusa.venus.client.VenusServiceFactory;
import com.saike.grape.utils.v11.ApplicationContextHelper;
import com.saike.grape.venus.VenusLocalMessage;
/**
 * Copyright (C), 2014-9-10, 上汽电商有限公司
 * venus 调用venus客户端公共类
 * @version 2.0
 * @author 马蹄声
 */
public class VenusClient extends VenusLocalMessage{
	
	public  ServiceFactory venusServiceFactory;
	
	public void getVenusServiceFactoryInstance() {
		if (venusServiceFactory == null) {
			venusServiceFactory = (VenusServiceFactory) ApplicationContextHelper.getBean("venusServiceFactory");
		}
	}
	
}
