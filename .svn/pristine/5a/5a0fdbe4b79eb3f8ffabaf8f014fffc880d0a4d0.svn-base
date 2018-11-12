package com.jihee.kr.dao;

import java.util.HashMap;
import java.util.Map;
import java.util.function.ObjDoubleConsumer;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jihee.kr.vo.JSdatanodeVO;

/**
 * com.jihee.kr.dao
 * CallrestapiDao.java
 * @author	: kjh
 * @date	: 2017. 10. 27.
 */
@Repository
public class CallrestapiDao {
	
	@Autowired
	private SqlSession sqlSession;

	
	/**
	 * @param type
	 * @param chat
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : 대화 내용 DB에 insert
	 */
	public void insertChat(String type, String chat) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("type",type);
		paramMap.put("chat",chat);
		sqlSession.insert("TbCHATLIST.insertchat",paramMap);
	}
		

}
