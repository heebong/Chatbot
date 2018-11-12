//const값.
const dialog = 0;
const action = 1;
const stop = 2;
const bot = 10;
const user = 11;

window.onload = function() {
    init();															//1.	초기 화면 세팅.

    var msgsend = document.getElementById('input_button');			
	msgsend.addEventListener('click',function() {              		//2. 	전송 버튼이 눌리면(onclick)  	       
        if (document.getElementById("input").value) {				//		input값이 null이 아니면.
            startSearch(document.getElementById("input").value);    //		startSearch(value); 실행.       
              								   						//			msgSend(value); toAjaxSearch(value); 실행.
        }					                                         
	})

	var entermsgsend = document.getElementById('input');            //3.	enter키 입력시 버튼누른 효과를 볼수있게 이벤트 추가.
    entermsgsend.onkeypress = function() {enterMsgSend(event)};		//		enterMsgSend(event); 실행.

}

function init() {													//초기 화면 세팅 함수.
    msgSend("안녕하세요. 검색하고 싶은 내용이 무엇인가요?",bot);  	//bot이 말하는 시작 메세지 띄우기.
    																//input, 입력 button 활성화.
    var inputarea = document.getElementById("input");				
    inputarea.removeAttribute('disabled');                      	
    var inputbutton = document.getElementById("input_button");  	
    inputbutton.removeAttribute('disabled');
}

function enterMsgSend(event) {                                      //string 값이 존재할 때, enter(any key)를 눌렀을 때 발생하는 함수..
    var key = event.keyCode;                                        //		받은 key값이 enter(13)이면
    if (key == 13 && document.getElementById("input").value) {      //		startSearch(string); 실행.
        startSearch(document.getElementById("input").value);		//				msgSend(string,user); toAjaxSearch(string); 실행.
    }
}

function startSearch(inputstring) {									//입력버튼을 누르던 enter를 누르던 search 시작시 사용.
	msgSend(inputstring,user);   								   		//		msgSend(string,user); 실행.
	toAjaxSearch(inputstring);										//		그 string으로 toAjaxSearch(string); 실행.
}

function stopConversation() {										//대화를 끝내고 싶을 때 사용.									
	$('.button').remove(); 											//버튼을 모두 지우고 msgSend(대화종료,bot); init();											
	msgSend("대화를 종료합니다.",bot);
	init();
}																	

function msgSend(string, type) {									//메세지 띄우는 함수.
	if(!string) return false;	//내용이 없으면 안하기.				//bot인지 user인지 div id정하기.(bot:0/user:1)
																	//		type별로 div id를 설정.
	var typstring;													//		시간 구하기 findTime(); 실행.
	switch (type) {													//			return string
		case bot : typestring = "chat-bot";							//		요소생성 및 등록.
				break;												//		input 초기화
		case user : typestring = "chat-user";							//		자동 스크롤.
				break;
		default : break;
	}

	//시간 구하기
    var time = findTime();

	//요소생성
	var chatting = document.getElementById("chatting");
	var chatdiv = document.createElement("div");	//채팅 추가할 한 box 만들기.
    chatdiv.setAttribute("id",typestring);
    chatdiv.setAttribute("class",typestring);		
    chatdiv.innerHTML = "<div class=\"chat\">\n" +	//채팅메세지 부분(시간까지) 만들기.
    					string +
    					"</div>\n<div class=\"time\">\n" +
    					time +
    					"</div>\n";					
	chatting.appendChild(chatdiv);					//연결.

	//input 지우기.
	document.getElementById("input").value = null;

	//자동스크롤             
    if(chatting.scrollHeight >0) chatting.scrollTop = chatting.scrollHeight;
}

function findTime() {												//시간 구해서 return을 string으로 하는 함수.
	var d = new Date();												//Data()이용해서 string을 만든다.
	var ampm = (d.getHours()>12 ?  "PM" : "AM");
	var h = (d.getHours()>12 ? d.getHours()-12 : d.getHours());
	var m = d.getMinutes();

	var time = ampm+" "+h+":"+m;

	return time;
}

function sendNoResult(string) {										//검색 실패시 메세지를 띄우는 함수.
										//		msgSend(실패,bot);실행.
    var chat_string = "'"+string+"' 검색결과가 없습니다. 죄송하지만 다시 검색해주세요.";
    msgSend(chat_string,bot);							
}

function makeButton(data,i,type) {									//버튼을 만드는 함수. (data,i,type)
	//버튼 생성.													//	type 0 : dialog button
	switch (type) {													//	type 1 : action button
		case dialog: 													//		type 1 & i = 'back' : 뒤로가기 버튼 in action button.
			var button = document.createElement('button');			//	type 2 : stop button
			var buttontext = document.createTextNode(data[i].dialog_name);
			button.setAttribute("dialog_id",data[i].dialog_id);		//버튼을 만들고 onclickButtonFunc(button,type); 실행.
			button.setAttribute("dialog_name",data[i].dialog_name);	//
			button.setAttribute("id","button"+i);
			button.setAttribute("class","button");

			button.appendChild(buttontext);
			document.getElementById("select_button").appendChild(button);
			break;
		case action:
			var button = document.createElement('button');
			if (i == 'back') { 
				var buttontext = document.createTextNode("이전으로");
				button.setAttribute("conversation_id",data.conversation_id);
				button.setAttribute("back_node_uri",data.back_node_uri);
				button.setAttribute("next_node_uri",data.next_node_uri);
			} else {
				var buttontext = document.createTextNode(data[i].action_name);
				button.setAttribute("action_name",data[i].action_name);
				button.setAttribute("action_index",data[i].action_indexes);
				button.setAttribute("conversation_id",data[i].conversation_id);
				button.setAttribute("back_node_uri",data[i].back_node_uri);
				button.setAttribute("next_node_uri",data[i].next_node_uri);
			}
			
			button.setAttribute("id","button"+i);
			button.setAttribute("class","button");

			button.appendChild(buttontext);
			document.getElementById("select_button").appendChild(button);						
			break;
		case stop:
			var button = document.createElement('button');
			var buttontext = document.createTextNode("다시 문의하기");
			
			button.setAttribute("id","stopbutton");
			button.setAttribute("class","button");

			button.appendChild(buttontext);
			document.getElementById("select_button").appendChild(button);
		default: break;
	}

	onclickButtonFunc(button,type);
}

function onclickButtonFunc(button,type) {		//type 0: dialog button
	button.onclick = function() {				//type 1: action button (1&&id='backbutton':backbutton)
		switch (type) {							//type 2: stop button
			case dialog:
				msgSend(document.getElementById(button.id).getAttribute('dialog_name'),user);
				toAjaxStart(button);
				break;
			case action:
				if(button.id == 'buttonback') {
					msgSend("이전으로",user);
					toAjaxNext(button,'back');
				} else {
					msgSend(document.getElementById(button.id).getAttribute('action_name'),user);
					toAjaxNext(button,'action');
				}
				break;
			case stop:
				msgSend("다시 문의하기",user);
				stopConversation();
				break;
			default: break;
		}
	}
}

function makeDialogProc(data,string) {						//데이터 길이가 0 이상이면 
	var receivedata = new Object();							//1.	msgSend(검색결과,bot);
															//2.	for {makeButton(data,i,dialog);} dialog버튼 생성.
	if (data.length == 0) {									//3.	텍스트, 입력 비활성화.
		sendNoResult(string);				//4. 	makeButton(data,'exit',stop); stop버튼 생성.
    } else {												//데이터 길이가 0이면	1.sendNoResult(string);
        var chat_string = data[0].chat_searchtext;	
        msgSend(chat_string,bot);							//검색결과 메세지 보내기 
        msgSend(data[0].chat_searchquest,bot);

        for (var i=0, item; item=data[i]; i++) {			//for문으로 넣어주기.
        	receivedata = data;        	
        	makeButton(receivedata,i,dialog);		
        }

        var inputarea = document.getElementById("input");	//input, input_button 비활성화.
        inputarea.disabled = 'true';						
        var inputbutton = document.getElementById("input_button");
        inputbutton.disabled = 'true';						

		//다시 문의하기 버튼
        makeButton(receivedata,'exit',stop);
    }
}

function makeActionProc(data) {
	var receivedata = data;
	var actiondata;
	if (receivedata[0].action_name != null) {		//마지막 노드가 아니면.
		msgSend(receivedata[0].node_text,bot);		//	선택 노드 설명
		msgSend(receivedata[0].node_question,bot);	//	선택 노드 질문.

		for (var i=0, item; item=receivedata[i]; i++) {
			makeButton(receivedata,i,action);			
		} 
		
		// backuri가 존재하면 뒤로가기 버튼 만들기.
		if (receivedata[0].back_node_uri) {
			makeButton(receivedata[0],'back',action);
		} 

    	makeButton(receivedata,'exit',stop);					//	다시 문의하기 버튼

	} else {												//마지막노드. 
		msgSend(receivedata[0].node_text,bot);		//	대화종료.
		stopConversation();
	}
		
}

function toAjaxSearch(inputstring) {
	var bodydata = new Object();		//body생성.
	bodydata.keywords = inputstring;
	var queryString = JSON.stringify(bodydata);
	
	$.ajax({							//call ajax
        type : 'POST',
        url : 'search',
        data : queryString,			                                
        dataType : 'json',
        //헤더
        contentType : 'application/json;charset=UTF-8;version=1.0',
            
        error: function(xhr, status, error){
            alert(error);
        },
        success : function(data){
        	makeDialogProc(data,inputstring);  
        }
    });
}

function toAjaxStart(button) {
	var id = document.getElementById(button.id).getAttribute('dialog_id');	//body생성.
	var name = document.getElementById(button.id).getAttribute('dialog_name');
	id *= 1;							//변수타입 string to number
	var bodydata = new Object();
	bodydata.dialog_id = id
	bodydata.dialog_name = name
	var queryString = JSON.stringify(bodydata);

	$('.button').remove();				//버튼 삭제.

	$.ajax({
        type : "POST",
        url : "start",
        data : queryString,
        contentType : 'application/json;charset=UTF-8;version=1.0',
        
        error: function(xhr, status, error){
            alert(error);
        },
        success : function(data){
            makeActionProc(data);          
        }
    }); 	
}

function toAjaxNext(button,type) {
	var string;
	var bodydata = new Object();
	var receivedata = new Object();

	if (type == 'back') {							//뒤로가기로 왔을 때.
		string = 'back_node_uri';
	} else { 							//일반적인 경우. 
		string = 'next_node_uri';
	}
	bodydata.action_indexes = document.getElementById(button.id).getAttribute('action_index')*1;
	var uri = document.getElementById(button.id).getAttribute(string)+"&key=614fb0137e11e399fd915aecbf2ff97e3dae661a";
	bodydata.uri = uri;
	bodydata.action_name = document.getElementById(button.id).getAttribute('action_name')
	
	var queryString = JSON.stringify(bodydata);

	$('.button').remove();				//버튼 삭제.

	$.ajax({
        type : "POST",
        url : "next",
        data : queryString,
        contentType : 'application/json;charset=UTF-8;version=1.0',
            
        error: function(xhr, status, error){
            alert(error);
        },
        success : function(data){
        	makeActionProc(data);             	
        }
    });
}