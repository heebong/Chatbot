package com.jihee.kr.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jihee.kr.vo.TbMynameVO;

@Repository
public class HomeDao {
	@Autowired
	private SqlSession sqlSession;

	public String getname() {
		
		TbMynameVO vo = new TbMynameVO();
		String name = sqlSession.selectOne("TbMyname.selectMyname");
		vo.setMyname(name);
		name = vo.getMyname();
		return name;
	}

}
