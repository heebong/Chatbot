package com.jihee.kr.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.jihee.kr.vo.JSdatanodeVO;

/**
 * com.jihee.kr.service
 * CallrestapiService.java
 * @author	: kjh
 * @date	: 2017. 10. 27.
 */
@Service
public interface CallrestapiService {
	
	/**
	 * @param jsdata
	 * @param type
	 * @return
	 * @throws JsonProcessingException
	 * @throws IOException
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : 통신 후 결과값 리턴.
	 */
	public List<JSdatanodeVO> callapi(JSdatanodeVO jsdata, int type) throws JsonProcessingException, IOException;
	
}
