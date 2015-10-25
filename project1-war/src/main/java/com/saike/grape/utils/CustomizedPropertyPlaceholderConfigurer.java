package com.saike.grape.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
//import com.gagu.ucm.agent.venus.placeholder.VenusPropertyPlaceholderConfigurer;
/**
 * 暂时使用base项目中的同名类，该类只是备份参考
 * 获取venus相关配置属性的bean的实现子类
 *
 */
public class CustomizedPropertyPlaceholderConfigurer extends MyVenusPropertyPlaceholderConfigurer 
/*VenusPropertyPlaceholderConfigurer*/ {
    
    private static final Logger logger = LoggerFactory.getLogger(CustomizedPropertyPlaceholderConfigurer.class);
    
    //需要设置为public类型的
    public static Map<String, String> ctxPropertiesMap;

	@Override
	protected void processProperties(
			ConfigurableListableBeanFactory beanFactoryToProcess,
			Properties props) throws BeansException {
		super.processProperties(beanFactoryToProcess, props);
		ctxPropertiesMap = new HashMap<String, String>();
        for (Object key : props.keySet()) {
            String keyStr = key.toString();
            String value = props.getProperty(keyStr);
            ctxPropertiesMap.put(keyStr, value);
            //System.out.println(key + "=========打印输出ctxPropertiesMap的值========》" + value);
            //logger.info(key + "========打印输出ctxPropertiesMap打的值=========》" + value);
        }
	}

	public static String getContextProperty(String name) {
		return ctxPropertiesMap.get(name);
	}

}
