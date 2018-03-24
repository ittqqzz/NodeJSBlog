var prepage = 5;
var page = 1;
var pages = 0;
var comments = [];
//提交评论
$('#messageBtn').on('click',function(){
	$.ajax({
		type:'post',
		url:'/api/comment/post',
		data:{
			contentid:$("#contentId").val(),
			comment:$('#commentTextarea').val()
		},
		dataType:'json',
		success:function(responseData){
			$('#commentTextarea').val('');
			comments = responseData.data.comments.reverse();
			renderComment();
		},
		error:function(err){
			console.log(err);
		}
	});
});

//每次页面重载的时候获取一下该文章的所有评论
$.ajax({
	url:'/api/comment',
	data:{
		contentid:$('.contentId').val()
	},
	success:function(responseData){
        comments = responseData.data.reverse();
        renderComment();
    }
});

//事件委托，上一页，下一页点击
$('.pager').delegate('a','click',function(){
	if($(this).parent().hasClass('previous')){
		if(page>1){
			page--;
		}
	}else{
		if(page<pages){
			page++;
		}
	}
	renderComment();
});

//渲染评论页面
function renderComment() {
    $('#messageCount').html(comments.length);
    //分页实现
    pages = Math.max(Math.ceil(comments.length/prepage), 1);
    var start = Math.max(0, (page-1)*prepage);
    var end = Math.min(start+prepage, comments.length);
    var $lis= $('.pager li');
    if (page <= 1 ) {
        page = 1;
        $lis.eq(1).html( page + ' / ' + pages );
    } else if (page >= pages) {
        page = pages;
        $lis.eq(1).html( page + ' / ' + pages );
    } else {
        $lis.eq(1).html( page + ' / ' + pages );
    }

    if (page <= 1) {
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    } else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if (page >= pages) {
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    } else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');
    }
    //评论数
    $('#messageCount').html(comments.length);
    $('#commentC').html(comments.length);

    var html = '';
    for (var i = start; i < end; i++) {
        html += '<div class="messageBox">\n' +
            '<p class="name clear">\n' +
            '<span class="fl">'+ comments[i].username+'</span>\n' +
            '<span class="fr">'+ formatDate(comments[i].postTime) + '</span>\n' +
            '</p>\n' +
            '<p>'+ comments[i].content +'</p>\n' +
            '</div>';
    }
    $('#messageList').html(html);
}

//格式化显示日期
function formatDate(d){
	var date = new Date(d);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	if(month<10){
		month='0'+month;
	}
	var day=date.getDate();
	if(day<10){
		day ='0'+day;
	}
	var hours= date.getHours();
	if(hours<10){
		hours='0'+hours;
	}
	var minutes=date.getMinutes();
	if(minutes<10){
		minutes ='0'+minutes;
	}
	var seconds = date.getSeconds();
	if(seconds<10){
		seconds ='0'+seconds;
	}
	return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
}




