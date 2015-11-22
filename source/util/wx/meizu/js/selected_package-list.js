SelectedPackage = {
    Init: function () {
        SelectedPackage.InitUI();
        SelectedPackage.SaveEvent();
    },
    InitUI: function () {
        //juicer initiation
        juicer.set({ 'tag::operationOpen': '{^' });

        // load the content
        var touchEventEnabled = false;

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

                                for(var i=0; i<targDatList.length; i++){
                                    for(var j=0; j<targDatList[i]["productList"].length; j++){
                                        for(var k=0; k<localDat.length; k++){
                                            if(localDat[k].id === targDatList[i]["productList"][j].id){
                                                targDatList[i]["productList"][j].isSelect = true;
                                            }
                                        }
                                    }
                                }
                            }
                            console.log(res);
                            fn(res, keyItem);
                            SelectedPackage.SavedData = res;
                        }

                        if(!touchEventEnabled&&evEnabled){
                            setTimeout(SelectedPackage.TouchEvent, 500);
                            touchEventEnabled = true;
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

        function prodList(res){
            var tpl = $("#tpl").html(),
                html = juicer(tpl, res);

            $(".main_cnt").html(html);
            if(res.shoppingCartID){
                $(".main_cnt").data("shopid", res.shoppingCartID);
            }
            $(".prod_pic img").attr("src", function(){
                return YMC.getResourceUrl($(this).attr("src"));
            });
        }

        function initPrice(res, data){
            prodList(res);
            var sum = 0;

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
            }else{
                $(".main_cnt").html('<div class="orderTrack"><p>暂无数据，请点击重试！</p><p class="btn_panel"><a href="javascript:;" class="btn">点击重试</a></p></div>')
                $(".orderTrack .btn").on("click", function(e){
                    e.preventDefault();
                    $(".uiload").show();
                    cntLoad('Products/ShoppingCart/GetProductList', initPrice, true, "productTypeList");
                });
            }

            $("#totalPrice").html("¥"+sum);
            $("#totalPrice").data("price", sum);
        }

        // 根据url参数决定传入参数。
        cntLoad('Products/ShoppingCart/GetProductList', initPrice, true, "productTypeList");

    },
    SavedData: {},
    SaveEvent: function(){
        // click to product list page
        $(".ico_arrow-left").on("click", function(e){
            e.preventDefault();
            var changedCart = {
                    "shoppingCartID": SelectedPackage.CommonFn.shoppingCartID,
                    "productSelectedList": []
                };

            var groupList = {},
                newAddProd;

            if(YMC.local("newAddProd")){
                newAddProd = JSON.parse(YMC.local("newAddProd"));
            }else{
                newAddProd = {
                    "id": "00000000-0000-0000-0000-000000000000",
                    "newAddProdList":[]
                }
            }

            $(".prod_item").each(function(){
                var that = $(this);
                if(that.data("iselect")&&(!that.find(".ico_checkbox2-disabled").length)){
                    var gid = that.data("gid") || "00000000-0000-0000-0000-000000000000";
                    if(!groupList.hasOwnProperty(gid)){
                        groupList[gid] = [];
                    }
                    groupList[gid].push(that.data("id"));

                    var tmpDat = SelectedPackage.SavedData.productTypeList,
                        tmpDatLen = tmpDat.length,
                        tmpInd = 0;

                    for(tmpInd; tmpInd<tmpDatLen; tmpInd++){
                        var tmpSubDat = tmpDat[tmpInd].productList,
                            tmpSubDatLen = tmpSubDat.length,
                            tmpSubInd = 0;

                        for(tmpSubInd; tmpSubInd<tmpSubDatLen; tmpSubInd++){
                            if(tmpSubDat[tmpSubInd].id === that.data("id")){
                                newAddProd["newAddProdList"].push(tmpSubDat[tmpSubInd]);
                            }
                        }
                    }

                }
            });

            for (var ind in groupList){
                var tempObj = {
                        "productGroupId": ind,
                        "productIdList": groupList[ind]
                    };
                changedCart["productSelectedList"].push(tempObj);
            }
            groupList = {};
            console.log(newAddProd);
            if(newAddProd["newAddProdList"].length){
                YMC.local("newAddProd", JSON.stringify(newAddProd));
            }

            YMC.ajax({
                url: "Products/ShoppingCart/GetProductGroupList",
                data: changedCart,
                success: function (e) {
                    console.log(e);
                    if(e.success){
                        window.location.href = "selected_package.html?id=" + SelectedPackage.CommonFn.shoppingCartID;
                    }
                },
                error: function(e){
                    UI.alert("网络连接失败，请稍后再试", 1500);
                }
            });
        });
    },
    TouchEvent: function(){
        var pakInfoList = $(".pak_info"),
            prodItemList = $(".prod_item");

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

        $(".item").on("click", function () {
            var that = $(this);

            if(that.next(".pak_info").length){
                openAndClose(that, true);
            }
        });
        var totalPrice = $("#totalPrice");

        // choose the product
        $(".prod_pic").on("click", function(e){
            e.stopPropagation();
            var that = $(this),
                thatIco = that.find(".ico_checkbox2"),
                thatP = that.parents(".prod_item"),
                itemPrice = +thatP.data("price"),
                sumPrice = +totalPrice.data("price");


            if(thatIco.length && !thatIco.hasClass("ico_checkbox2-disabled")){
                if(thatIco.hasClass("ico_checkbox2-on")){
                    thatIco.removeClass("ico_checkbox2-on");
                    thatP.data("iselect", false);
                    sumPrice -= itemPrice;
                }else{
                    thatIco.addClass("ico_checkbox2-on");
                    thatP.data("iselect", true);
                    sumPrice += itemPrice;
                }

                totalPrice.html("¥"+sumPrice);
                totalPrice.data("price", sumPrice);
            }
        })
    },
    CommonFn: {
        "shoppingCartID": YMC.gup(window.location.href)["id"] || ""
    }
}

Zepto(function ($) {
    SelectedPackage.Init();
});
