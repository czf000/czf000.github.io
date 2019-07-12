$(function() {
    // console.log($(document))

    var obj = {
        //切换两人的消息
        flag: true,
        // ajax参数
        data: {
            text: '',
            url: 'http://www.tuling123.com/openapi/api',
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            key: '266aa1494bd54b8ebc706fd11ed874ad',
            userid: '123456'
        },
        keydown: function() {
            var _this = this;
            $(document).keydown(function(e) {
                if (e.keyCode == 13) {
                    _this.data.text = $('input.form-control').val();
                    console.log(_this.data.text.length)
                    if (_this.data.text.length != 0) {
                    	_this.createEle(_this.flag, _this.data.text);
                    }else{
                    	// console.log('消息不能为空');
                    	$('#null').modal()
                    	return;
                    }
                    
                    _this.ajax(_this.data);
                    //清空输入框
                    $('input.form-control').val(null);
                }
            })
        },
        ajax: function(info) {
            var _this = this;
            $.ajax({
                url: info.url,
                contentType: info.contentType,
                data: {
                    "key": info.key,
                    "info": info.text,
                    "loc": "",
                    "userid": info.userid
                },
                type: 'post',
                dataType: 'json',
                success: function(data) {
                    console.log(data);
                    _this.createEle(_this.flag, data.text);
                }
            })
        },
        // 创建节点
        createEle: function(flag, text) {

            var footer = $('.navbar-fixed-bottom');
            // 克隆节点
            // var media = $('.media').clone(true,true);
            var ele;
            var media_body = $('<div class="media-body"></div>');

            if (flag) {
                // 创建我发送的节点
                ele = $('<div class="media"><div class="media-body"></div><div class="media-right"><a href="javascript:;" data-toggle="popover" data-placement="left" data-content="' + text + '"><img class="media-object" src="images/u_icon.png" alt="" style="width: 50px;padding:8px;box-sizing:border-box"></a></div></div>');
                //把节点插入到footer之前
                ele.insertBefore(footer);
               
                // TODO
                // $("body").animate({ scrollTop: $('.media').eq($('.media').length - 1).offset().top + "px" }, 500);
                 // 让弹出框可见
                $("[data-toggle='popover']").popover('show');
                // console.log($('.media').eq($('.media').length-1));
                this.flag = !flag;
            } else {
                //她发送的
                ele = $('<div class="media"><div class="media-left"><a href="javascript:;" data-toggle="popover" data-placement="right" data-content="' + text + '"><img class="media-object img-responsive" src="images/a_icon.png" alt="" style="width: 50px"></a></div></div>');
                ele.insertBefore(footer);

                

                $("html,body").animate({ scrollTop: $('.media').eq($('.media').length - 1).offset().top +"px" }, 500);
                $("[data-toggle='popover']").popover('show');
                this.flag = !flag;
            }
        },
        init: function() {
            this.keydown();
        }

    }

    obj.init();


    //  
})