/*
�а�ť
	var opts = {
		title:'����',
		contentText:'����',
		showBtn:true,//�Ƿ���ʾ ȷ�� ȡ��  Ĭ��Ϊfalse
		confirm:function(){console.log('ȷ��');},//ȷ�ϻص�    ��Ȼ showBtnΪtrue�ſ��õ���ť
		cancel:function(){console.log('ȡ��');}, //ȡ���ص�
	}
	$.jieyiModal(opts);
	
�ް�ť
	var opts = {
		title:'����',
		contentText:'����'
	}
	$.jieyiModal(opts);

//��ʾ
	$.jieyiModal.show();
	
//����
	$.jieyiModal.hide();

*/
 ;(function($){
	var opts;
	$.jieyiModal = function(option){
		opts = $.extend({}, $.jieyiModal.defaults  , option);
		var cssText =".overlay,.modal .modal-ft{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:-1;background-color:rgba(0,0,0,0.8);-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.overlay.active{z-index:2014}.modal{-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.modal{background-color:#fff;border-radius:5px;margin:0 10px;overflow:hidden;opacity:0;-webkit-transform:translate3d(0,0,0) scale(0.815);transform:translate3d(0,0,0) scale(0.815);-webkit-transition-property:-webkit-transform,opacity;transition-property:transform,opacity}.modal.modal-in{opacity:1;-webkit-transform:translate3d(0,0,0) scale(1);transform:translate3d(0,0,0) scale(1)}.modal .modal-hd{text-align:center;line-height:40px;background-color:#0078e7;color:#fff}.modal .modal-bd{padding:15px}.modal .modal-ft{border-top:1px solid #ccc}.modal .modal-ft .btn-modal{-webkit-box-flex:1;-ms-flex:1;-webkit-flex:1;flex:1;background-color:#fefefe;text-align:center;line-height:40px;color:#0078e7}.modal .modal-ft .btn-modal:first-child{border-right:1px solid #ccc}.modal .modal-ft .btn-modal:last-child{border-right:0}.modal .modal-ft .btn-modal:hover,.modal .modal-ft .btn-modal:active{background-color:#d9d9d9}";
		if($('#jieyiModalStyle').length==0){
			//�����������ô�����ʽ��body
			$('<style id="jieyiModalStyle">'+cssText+'</style>').appendTo(document.body);
			
			//ģ��
			var modalTpl = '\
							<div class="overlay" id="vgoOverlay">\
								<section class="modal modal-content" style="display:none;">\
								  <div class="modal-hd"></div>\
								  <div class="modal-bd">\
								  </div>\
								  <div class="modal-ft">\
									<span class="btn-modal confirm" data-type="confirm">ȷ��</span>\
									<span class="btn-modal cancel" data-type="cancel">ȡ��</span>\
								  </div>\
								</section>\
							  </div>\
			';
			
			$(modalTpl).appendTo(document.body);
			    
			    $('#vgoOverlay').on('touchstart',function(){
					!opts.showBtn && modalHidden();
				});
				
				$('#vgoOverlay').on('touchstart','.btn-modal',function(e){
					modalHidden();
					//�����¼��ص�
					e.stopPropagation();
					opts[$(e.target).data('type')]();
				});
		}

		function modalShow(){
			var $overlay = $('#vgoOverlay');
			$overlay.addClass('active');
			$overlay.find('.modal-hd').html(opts.title);//����
			$overlay.find('.modal-bd').html(opts.contentText);//����
			$overlay.find('.modal-ft')[!!opts.showBtn?'show':'hide']();//ȷ�ϰ�ť
			$overlay.find('.modal-content').animate({"display":"block"},100,function(){
			  $(this).addClass('modal-in');
			});

		}
		
		function modalHidden() {
			var $overlay = $('#vgoOverlay');
			$ele = $overlay.find('.modal-content');
			$ele.removeClass('modal-in');
			$ele.one('transitionend',function(){
				$ele.css({"display": "none"});
				$overlay.removeClass('active');
			});
		}
		
		($.jieyiModal && $.jieyiModal.show && typeof $.jieyiModal.show == 'function') || ($.jieyiModal.show = modalShow);
		($.jieyiModal && $.jieyiModal.hide && typeof $.jieyiModal.hide == 'function') || ($.jieyiModal.hide = modalHidden);
		
		modalShow();
	};
	$.jieyiModal.defaults = {
		 title:'����',
		 contentText:'����',
		 showBtn:false,//�Ƿ���ʾȷ��ȡ����ť
	};

})(Zepto);