package com.jihee.kr.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jihee.kr.dao.CallrestapiDao;
import com.jihee.kr.vo.JSdatanodeVO;

/**
 * com.jihee.kr.service
 * CallrestapiServiceImp.java
 * @author	: kjh
 * @date	: 2017. 10. 27.
 */
@Service
public class CallrestapiServiceImp implements CallrestapiService {
	
	@Autowired
	CallrestapiDao callrestapidao;
	
	private static final Logger logger = LoggerFactory.getLogger(CallrestapiService.class);
	
	final int search = 0;
	final int start = 1;
	final int next = 2;

	/* (non-Javadoc)
	 * @see com.jihee.kr.service.CallrestapiService#callapi(com.jihee.kr.vo.JSdatanodeVO, int)
	 */
	@Override
	public List<JSdatanodeVO> callapi(JSdatanodeVO jsdata, int type) throws IOException {
		logger.info("======callapi 실행======");
		//hearder setting
		HttpHeaders headers = new HttpHeaders();
		headers.set("Accept", "application/json;charset=UTF-8;version=1.0");
		headers.set("Content-Type", "application/json;charset=UTF-8;version=1.0");
		
		//body setting
		String body = makebody(jsdata,type);
		
		//post body setting
		HttpEntity param= new HttpEntity(body, headers);
		
		//url setting
		String url = seturl(jsdata,type);
		
		//RestTemplate use and receive the data.
		RestTemplate restTemplate = new RestTemplate();
		String result = restTemplate.postForObject(url, param, String.class);
		
		//mapping data
		ObjectMapper mapper = new ObjectMapper();
		JsonNode datanode = mapper.readTree(result);
		List<JSdatanodeVO> datalist = new ArrayList<JSdatanodeVO>();
		
		if (type == search) {
			
			datalist = mappingsearch(datalist,jsdata,datanode);			
			
		} else if(type == start || type == next) {
			
			datalist = mappingstartornext(type,datalist,jsdata,datanode);			
		}
		logger.info("======callapi 종료======");
		return datalist;
	}

	/**
	 * @param datalist
	 * @param jsdata
	 * @param datanode
	 * @return
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : search 실행 시 데이터 메핑
	 */
	private List<JSdatanodeVO> mappingsearch(List<JSdatanodeVO> datalist,
			JSdatanodeVO jsdata, JsonNode datanode) {
		
		logger.info("========mappingsearch 실행==========");
		callrestapidao.insertChat("BOT",jsdata.getKeywords());
		if (datanode.size() == 0) {
			callrestapidao.insertChat("BOT",jsdata.getChat_nosearch());
		} else {
			
			for (int i=0; i<datanode.size() ; i++){
				JSdatanodeVO data = new JSdatanodeVO();
				data.setDialog_id(datanode.get(i).path("dialog_id").intValue());
				data.setDialog_name(datanode.get(i).path("dialog_name").textValue());
				
				data.setKeywords(jsdata.getKeywords());
				data.setChat_searchquest(null);
				data.setChat_user(jsdata.getKeywords());
				
				datalist.add(i, data);
			} 
			callrestapidao.insertChat("BOT",datalist.get(0).getChat_searchtext());
			callrestapidao.insertChat("BOT",datalist.get(0).getChat_searchquest());
		}
		logger.info("========mappingsearch 종료==========");
		return datalist;
	}
	
	/**
	 * @param type
	 * @param datalist
	 * @param jsdata
	 * @param datanode
	 * @return
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : start나 next 실행 시 데이터 매핑
	 */
	private List<JSdatanodeVO> mappingstartornext(int type,
			List<JSdatanodeVO> datalist, JSdatanodeVO jsdata, JsonNode datanode) {
		logger.info("======mappingstartornext 실행==========");
		if(type == start) {
			callrestapidao.insertChat("USER",jsdata.getDialog_name());
		} else {
			if(jsdata.getAction_name() == null) {
				jsdata.setAction_name("이전으로");
			}
			callrestapidao.insertChat("USER",jsdata.getAction_name());
		}
		
		JsonNode currentnode = datanode.path("current_node");
		JsonNode actions =currentnode.path("node_actions");
		
		if(actions.size() == 0) { //마지막노드
			JSdatanodeVO data = new JSdatanodeVO();
			
			data.setBack_node_uri(datanode.path("back_node_uri").textValue());
			data.setNext_node_uri(datanode.path("next_node_uri").textValue());
			data.setConversation_id(datanode.path("conversation_id").intValue());
			data.setNode_question(currentnode.path("node_question").textValue());
			data.setNode_text(currentnode.path("node_text").textValue());
			
			datalist.add(0,data);
			callrestapidao.insertChat("BOT",datalist.get(0).getChat_bottext());
			callrestapidao.insertChat("BOT",datalist.get(0).getChat_botquest());
		} else {
			for (int i=0; i<actions.size() ; i++){
				JSdatanodeVO data = new JSdatanodeVO();
			
				data.setBack_node_uri(datanode.path("back_node_uri").textValue());
				data.setNext_node_uri(datanode.path("next_node_uri").textValue());
				data.setConversation_id(datanode.path("conversation_id").intValue());
				data.setNode_question(currentnode.path("node_question").textValue());
				data.setNode_text(currentnode.path("node_text").textValue());
				
				data.setAction_indexes(actions.get(i).path("action_index").intValue());
				data.setAction_name(actions.get(i).path("action_name").textValue());
				
				datalist.add(i, data);
			}
			callrestapidao.insertChat("BOT",datalist.get(0).getChat_bottext());
			callrestapidao.insertChat("BOT",datalist.get(0).getChat_botquest());
		}
		logger.info("======mappingstartornext 종료==========");
		return datalist;
	}

	/**
	 * @param data
	 * @param apitype
	 * @return
	 * @throws JsonProcessingException
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : post로 보낼 body 생성
	 */
	private String makebody(JSdatanodeVO data, int apitype) throws JsonProcessingException {
		logger.info("======makebody 실행=========");
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String,Object> bodyjson = new HashMap<String, Object>();
		switch(apitype) {
		case search :
			bodyjson.put("keywords", data.getKeywords());
			break;
		case start:
			bodyjson.put("dialog_id", data.getDialog_id());
			break;
		case next:
			String body = "{" + "\"action_indexes\":["+data.getAction_indexes()+"] " + "}";
			return body;
		default:
			break;
		}
		
		String body = mapper.writeValueAsString(bodyjson);
		
		logger.info("======makebody 종료=========");
		return body;
	}

	/**
	 * @param selecteddata
	 * @param type
	 * @return
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : 통신할 url 설정
	 */
	private String seturl(JSdatanodeVO selecteddata, int type) {
		logger.info("=========seturl 실행==========");
		String url = "";
		switch(type) {
		case search:
			url = "https://www.ibm-ouranswer.com/DialogManager/api/open/dialogs/search?key=614fb0137e11e399fd915aecbf2ff97e3dae661a";
			break;
		case start:
			url = "https://www.ibm-ouranswer.com/DialogManager/api/open/conversations/start?key=614fb0137e11e399fd915aecbf2ff97e3dae661a";
			break;
		case next:
			url = selecteddata.getUri();
			break;
		default :
			break;
		}
		logger.info("=========seturl 종료==========");
		return url;
	}

}
