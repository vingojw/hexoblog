SelectedPackage = {
    Init: function () {
        SelectedPackage.InitUI();
        SelectedPackage.SaveEvent();
    },
    InitUI: function () {
        //juicer initiation
        juicer.set({ 'tag::operationOpen': '{^' });
        // load the content
        function cntLoad(url, fn, evEnabled, keyItem){
            YMC.ajax({
                url: url,
                data: {"shoppingCartID":SelectedPackage.CommonFn.shoppingCartID},
                success: function (e) {
                    console.log(e);
                    if(e.success&&e.result){
                        $(".uiload").hide();

                        var res = e.result;
                        if(res){
                            if(YMC.local("newAddProd")){
                                var localObj = JSON.parse(YMC.local("newAddProd")),
                                    localDat = localObj.newAddProdList,
                                    targDatList = res[keyItem],
                                    targDatArr;
                                for(var i=0; i< targDatList.length; i++){
                                    if(targDatList[i].id === localObj.id){
                                        targDatArr = targDatList[i].productList;
                                        break;
                                    }
                                }

                                for(var j=0; j<localDat.length; j++){
                                    targDatArr.push(localDat[j]);
                                }
                            }

                            fn(res, keyItem);
                        }

                        if(evEnabled){
                            setTimeout(SelectedPackage.TouchEvent, 500);
                        }
                    }
                },
                error: function(e){
                    UI.alert("网络连接失败，请稍后再试", 1500, function(){
                        $(".uiload").hide();
                    });
                }
            });
        }

        function initPrice(res, data){
            var sum = 0;

            var tpl = $("#tpl").html(),
                html = juicer(tpl, res);

            $(".main_cnt").html(html);
            if(res.shoppingCartID){
                $(".main_cnt").data("shopid", res.shoppingCartID);
            }

            $(".prod_pic").attr("src", function(){
                return YMC.getResourceUrl($(this).attr("src"));
            });

            if(res[data]){
                var prodData = res[data],
                    i = 0,
                    prodDataLen = prodData.length;

                for(i; i<prodDataLen; i++){
                    var prodSubData = prodData[i].productList,
                        prodSubDataLen = prodSubData.length,
                        j = 0;

                    if(prodData[i].isSelect){
                        for(j; j<prodSubDataLen; j++){
                            sum += prodSubData[j].ymcPrice;
                        }
                    }else{
                        for(j; j<prodSubDataLen; j++){
                            if(prodSubData[j].isSelect){
                                sum += prodSubData[j].ymcPrice;
                            }
                        }
                    }

                }
            }

            $("#totalPrice").html("¥"+sum);
            $("#totalPrice").data("price", sum);
        }

        // 根据url参数决定传入参数。
        cntLoad('Products/ShoppingCart/GetProductGroupList', initPrice, true, "productGroupList");
    },
    SaveEvent: function(){
        $(".ico_arrow-left").on("click", function(){
            var _self = $(this),
                changedCart = {
                    "shoppingCartID": SelectedPackage.CommonFn.shoppingCartID,
                    "productSelectedList": []
                };

            $(".item").each(function(){
                if($(this).data("iselect")){
                    var that = $(this),
                        obj = {
                            "productGroupId": that.data("id"),
                            "productIdList": []
                        },
                        thatNextList = that.next().find(".pak_prod li");

                    thatNextList.each(function(){
                        obj["productIdList"].push($(this).data("id"));
                    });

                    changedCart["productSelectedList"].push(obj);
                }
            });
            console.log(changedCart);

            SelectedPackage.CommonFn.saveProd("Products/ShoppingCart/UpdateProducts", changedCart, function(){
                window.location.href = "myBuyCar.html";
                YMC.local("newAddProd", null);
            });

        });
    },
    TouchEvent: function(){
        function tempChange(){
            var selfTitle = $(".item[data-id='00000000-0000-0000-0000-000000000000']"),
                selfProdList = selfTitle.next().find(".pak_prod"),
                selfSum = 0;

            // selfProdList.find("li").forEach(function(){
            selfProdList.find("li").each(function(){
                selfSum += $(this).data("price") - 0;
            });
            selfTitle.data("price", selfSum);
            selfTitle.find(".item_right .txt1").text("¥"+selfSum);
            return true;
        }
        tempChange();

        var shoppingCartID = $(".main_cnt").data("shopid");
        // alert(navigator.userAgent);
        var pakInfoList = $(".pak_info"),
            itemList = $(".item");

        function oneOfAll(ele, className){
            if(!className){
                ele.each(function(){
                    $(this).hide();
                    if($(this).prev(".item").hasClass("item_arr-up")){
                        $(this).prev(".item").removeClass("item_arr-up").addClass("item_arr-down");
                    }
                });
            }else{
                ele.each(function(){
                    $(this).removeClass(className);
                });
            }
        }

        // 点击右侧箭头变化
        function openAndClose(ele, flag){
            if(ele.hasClass("item_arr-up")){
                ele.removeClass("item_arr-up").addClass("item_arr-down").next(".pak_info").hide();
            }else if(ele.hasClass("item_arr-down")&&flag){
                ele.removeClass("item_arr-down").addClass("item_arr-up").next(".pak_info").show();
            }
        }

        $(".item").on("click", function (e) {
            // var targEle = e.target || e.srcElement;
            var that = $(this);

            if(that.next(".pak_info").length){
                openAndClose(that, true);
            }
        });
        var icoCheckList = $(".ico_checkbox"),
            totalPrice = $("#totalPrice");
        $(".item .item_left").click(function(e){
            e.stopPropagation();
            var that = $(this)
                thatIco = that.find(".ico_checkbox"),
                thatP = that.parent();

            if(that.parents(".item").data("id")==="00000000-0000-0000-0000-000000000000"){
                thatIco.toggleClass("ico_checkbox-on");
            }else{
                if(!thatIco.hasClass("ico_checkbox-on")){
                    icoCheckList.each(function(){
                        // if($(this).hasClass("ico_checkbox-on")){
                        if(($(this).parents(".item").data("id")!=="00000000-0000-0000-0000-000000000000") && $(this).hasClass("ico_checkbox-on")){
                            $(this).removeClass("ico_checkbox-on");
                            $(this).parents(".item").data("iselect", false);
                        }
                    });
                    thatIco.addClass("ico_checkbox-on");
                    thatP.data("iselect", true);
                }
            }

            oneOfAll(pakInfoList);
            openAndClose(thatP, thatIco.hasClass("ico_checkbox-on"));

            // var sum = 0;
            // icoCheckList.each(function(){
            //     if($(this).hasClass("ico_checkbox-on")){
            //         console.log(sum);
            //         sum += $(this).parents(".item").data("price") - 0;
            //     }
            // })
            // totalPrice.html("¥"+that.parents(".item").data("price"));
            totalPrice.html("¥"+calPrice());
        });

        function calPrice(){
            var sum = 0;
            icoCheckList.each(function(){
                if($(this).hasClass("ico_checkbox-on")){
                    sum += $(this).parents(".item").data("price") - 0;
                }
            });

            return sum;
        }

        // swipe left to delete
        $(".prod_item").on("swipeLeft",function(){
            if($(this).find(".ico_del").length){
                $(this).find(".prod_item-main").css({
                    "-webkit-transform": "translate(-44px,0)",
                    "-moz-transform": "translate(-44px,0)",
                    "-ms-transform": "translate(-44px,0)",
                    "transform": "translate(-44px,0)"
                });
            }
        }).on("swipeRight",function(){
            if($(this).find(".ico_del").length){
                $(this).find(".prod_item-main").css({
                    "-webkit-transform": "none",
                    "-moz-transform": "none",
                    "-ms-transform": "none",
                    "transform": "none"
                });
            }
        });

        $(".ico_del").click(function(e){
            e.stopPropagation();
            var that = $(this),
                thatPrice = that.parents(".prod_item").data("price"),
                pakTotalEle = that.parents(".pak_info").prev(),
                pakTotalPrice = pakTotalEle.data("price");

            that.parents(".prod_item").remove();

            pakTotalEle.data("price", pakTotalPrice - thatPrice);

            newPrice = pakTotalEle.data("price");
            pakTotalEle.find(".item_right .txt1").html("¥"+newPrice);

            if(pakTotalEle.find(".ico_checkbox").hasClass("ico_checkbox-on")){
                totalPrice.html("¥"+calPrice());
            }

            //remove product info from localStorage
            var prodId = that.parents(".prod_item").data("id"),
                newAddProd = JSON.parse(YMC.local("newAddProd")),
                newAddProdList = newAddProd["newAddProdList"],
                len = newAddProdList.length,
                s = 0;

            for(s; s<len; s++){
                if(newAddProdList[s].id === prodId){
                    newAddProdList.splice(s,1);
                    break;
                }
            }

            YMC.local("newAddProd", JSON.stringify(newAddProd));
        });

        // click to product list page
        $(".addCustomize").on("click", function(){
            var _self = $(this),
                changedCart = {
                    "shoppingCartID": shoppingCartID,
                    "productSelectedList": []
                };

            itemList.each(function(){
                if($(this).data("iselect")){
                    var that = $(this),
                        obj = {
                            "productGroupId": that.data("id"),
                            "productIdList": []
                        },
                        thatNextList = that.next().find(".pak_prod li");

                    thatNextList.each(function(){
                        obj["productIdList"].push($(this).data("id"));
                    });

                    changedCart["productSelectedList"].push(obj);
                }
            });
            console.log(changedCart);

            SelectedPackage.CommonFn.saveProd("Products/ShoppingCart/GetProductList", changedCart, function(){
                window.location.href = "selected_package-list.html?id=" + _self.data("id");
            });

        });
    },
    CommonFn: {
        saveProd: function(urlFragment, data, fn){
            YMC.ajax({
                url: urlFragment,
                data: data,
                success: function (e) {
                    console.log(e);
                    if(e.success){
                        fn();
                    }else{
                        UI.alert("网络连接失败，请稍后再试", 1500);
                    }
                },
                error: function(e){
                    UI.alert("网络连接失败，请稍后再试", 1500);
                }
            });
        },
        "shoppingCartID": YMC.gup(window.location.href)["id"] || ""
    }
}

Zepto(function ($) {
    SelectedPackage.Init();
});
