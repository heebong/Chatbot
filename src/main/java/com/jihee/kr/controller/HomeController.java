package com.jihee.kr.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jihee.kr.dao.CallrestapiDao;
import com.jihee.kr.service.HomeService;

/**
 * com.jihee.kr.controller
 * HomeController.java
 * @author	: kjh
 * @date	: 2017. 10. 27.
 */

@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	HomeService homeservice;
	@Autowired
	CallrestapiDao callrestapidao;
	
	
	/**
	 * @param locale
	 * @param model
	 * @return
	 * @author kjh
	 * @date   2017. 10. 27.
	 * 내용 : chat.jsp 호출.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("=====home 실행========");
		String chat = "안녕하세요. 검색하고 싶은 내용이 무엇인가요?";
		callrestapidao.insertChat("USER",chat);
		
		return "chat";
	}
	
}
