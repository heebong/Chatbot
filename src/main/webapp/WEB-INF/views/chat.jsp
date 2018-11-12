<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" pageEncoding="UTF-8"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>jihee chating</title>
<link href="<%=request.getContextPath() %>/resources/css/column.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/js/func.js" charset="utf-8"></script> 
</head>
<body>
<div class="frame">
	<div class="header">
		<div class="logo">WELLOM TO JIHEE'S CHAT-BOT WORLD</div>
	</div>
	<div class="container">
		<div class="content">
		<div id="chatting" class="chatting">
		</div>
		</div>
	</div>
	<!-- container -->
	<div class="input">
		<input type="text" id="input" class="inputbox" disabled="true">
		<button id="input_button" disabled="true">입력</button>
		<div id="select_button" class="select_button">
			
		</div>
		
	</div>
	
	
</div>
<!-- frame -->
<div class="footer">
		<p class="copyright">&copy;copy</p>
	</div>
	<!-- footer -->
</body>
</html>