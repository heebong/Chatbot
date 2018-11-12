package com.jihee.kr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jihee.kr.dao.HomeDao;

@Service
public class HomeService {
	
	@Autowired
	HomeDao homedao;

	public String getname() {
		
		String name = homedao.getname();
		return name;
	}

}
