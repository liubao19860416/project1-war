package com.saike.grape.viewobject.v11;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UmsEntity {

	private String schemaId;
	private String appId;
	private List<String> destPhones = new ArrayList<String>();
	private Map<String, String> params = new HashMap<String, String>();
	private String content;
	
	public String getSchemaId() {
		return schemaId;
	}
	public void setSchemaId(String schemaId) {
		this.schemaId = schemaId;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public List<String> getDestPhones() {
		return destPhones;
	}
	public void setDestPhones(List<String> destPhones) {
		this.destPhones = destPhones;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	public void addPhone(String phoneNo){
		this.destPhones.add("+86"+phoneNo);
	}
	public Map<String, String> getParams() {
		return params;
	}
	public void setParams(Map<String, String> params) {
		this.params = params;
	}
	
	public void addParams(String key,String value){
		this.params.put(key, value);
	}

}
