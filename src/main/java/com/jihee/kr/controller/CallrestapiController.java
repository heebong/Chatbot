package com.jihee.kr.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jihee.kr.service.CallrestapiService;
import com.jihee.kr.vo.JSdatanodeVO;

/**
 * com.jihee.kr.controller
 * CallrestapiController.java
 * @author	: kjh
 * @date	: 2017. 10. 27.
 */
@RestController
public class CallrestapiController {
	private static final Logger logger = LoggerFactory.getLogger(CallrestapiController.class);
	final int search = 0;
	final int start = 1;
	final int next = 2;
	
	@Autowired
	CallrestapiService apiservice;
	
	/**
	 * @param jsdata
	 * @return
	 * @throws IOException
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : search 결과값 리턴
	 */
	@RequestMapping(value = "/search", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public List<JSdatanodeVO> searchapi(@RequestBody JSdatanodeVO jsdata) throws IOException {
		logger.info("=====searchapi 실행======");
		List<JSdatanodeVO> data = new ArrayList<JSdatanodeVO>();
		data = apiservice.callapi(jsdata, search);
		
		return data;		
	}
	
	/**
	 * @param jsdata
	 * @return
	 * @throws IOException
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : start 결과값 리턴
	 */
	@RequestMapping(value = "/start", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public List<JSdatanodeVO> startapi(@RequestBody JSdatanodeVO jsdata) throws IOException {
		logger.info("=====startapi 실행=======");
		List<JSdatanodeVO> data = new ArrayList<JSdatanodeVO>();
		data = apiservice.callapi(jsdata, start);

		return data;		
	}
	
	/**
	 * @param jsdata
	 * @return
	 * @throws IOException
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : next 결과값 리턴. next, back 모두 포함
	 */
	@RequestMapping(value = "/next", method = RequestMethod.POST, produces = "application/json; charset=utf8")
	public List<JSdatanodeVO> nextapi(@RequestBody JSdatanodeVO jsdata) throws IOException {
		logger.info("=====nextapi 실행========");
		List<JSdatanodeVO> data = new ArrayList<JSdatanodeVO>();
		data = apiservice.callapi(jsdata, next);

		return data;		
	}

}
