/* 
 * some web page function with javacript object 2014-05-30
 */
try{
	if(!!$){
	}
	else
		throw new Error("$ is not exist!");
		
}catch(err){
    $=function(domId){
    	return function(){
    		return document.getElementById(domId);
    	}
    }
}

var __jsTools = {
    extends_obj: function (srcObj, newObj) {
        var retObj = newObj;
        for (var item in srcObj) {
            if ( !! newObj[item])
                continue;
            else
                retObj[item] = srcObj[item];
        }
        return retObj;
    },
    overload_obj: function (srcObj, newObj) {
        var retObj = srcObj;
        for (var item in newObj) {
            retObj[item] = newObj[item];
        }
        return retObj;
    },

    delegate: function (context, funct) {
        var args = Array.prototype.slice.call(arguments).slice(2);
        return function () {
            return funct.apply(context, Array.prototype.slice.call(arguments)
                .concat(args));
        };
    },
    isEmptyObj: function (srcObj) {
        var retCode = true;
        for (var item in isEmptyObj) {
            if (typeof isEmtpyObj[item] != "function") {
                retCode = false;
                break;
            }
        }
        return retCode;
    },
    checkEmailFormat: function (value) {
        if (!/^((\w|\d)+\.?)*(\w|\d)+@((\w|\d)+\.)+\w+$/.test(value)) {
            showMessage("OSS_TT_EMAIL_FORMAT_ERROR");
            return false;
        }
        return true;
    },
    SimpleCloneObj: function (srcObj) {
        var retObj = {};
        for (var item in srcObj) {
            if (typeof srcObj[item] == "function") {
                continue;
            } else if (typeof srcObj[item] == "object")
                retObj[item] = arguments.callee(srcObj[item]);
            else
                retObj[item] = srcObj[item];

        }
        return retObj;
    },
    
	Remove_duplicate : function(srcArray, newSrcArray) {
		var arrayIndex = newSrcArray.join(",");
		var item = null;
		var regExp = "";
		var retNewArray = [];
		for ( var i = 0, size = newSrcArray; i < size; i++) {
			item = newSrcArray[i];
			regExp = new RegExp("\\b" + item + "\\b");
			if (regExp.test(arrayIndex))
				continue;
			else
				retNewArray.push(item);
		}
		return retNewArray;
	}
};

var pubDataTools = {
    f_tt_runTableFill: function (tblObject, tblID, vObjRs, vArrHidRow) {
        if (typeof (tblObject) != "object")
            return false;
        if (tblID == null)
            return false;
        if (vObjRs == null)
            return false;
        tblObject._displayItemAsHTML = true;
        var items = new Array();

        var ls_HisFlag = "0";

        with(vObjRs) {

            for (var i = 0; i < getCount(); i++) {
                // alert();
                var item = new Object();
                var vArrCell = new Array();
                var vRow = tblID.rows[0];
                if (vRow == null)
                    break;
                var vlth = vRow.cells.length;

                ls_HisFlag = getParamValue("HIS_FLAG", i);

                for (var k = 0; k < vlth; k++) {
                    var vColName = "";
                    var vColDpyName = "";
                    var vColDpyTypeName = "";
                    var vColDpyTypeFun = "";
                    var vCell = vRow.cells[k];
                    if (vCell != null) {
                        vColName = vCell.getAttribute("propertyName");
                        vColDefName = vCell.getAttribute("defaultName");
                        // /*如果(displayTypeName)属性存在,且默认名称存在 那么使用此默认名称显示
                        // ,否则显示(propertyName)属性名称*/
                        vColDpyTypeName = vCell.getAttribute("displayTypeName");
                        vColDpyTypeFun = vCell.getAttribute("displayTypefun");
                    }
                    if (vColDpyTypeName != null && vColDpyTypeName != "") {
                        if (vColDefName != null && vColDefName != "") {
                            if (ls_HisFlag == "1" && vColName == "EDIT") {
                                // item[vColName] = vColDefName;
                            } else {
                                item[vColName] = vColDefName;
                            }

                        } else {
                            item[vColName] = vColName;
                        }
                        item[vColDpyTypeName] = vColDpyTypeFun;

                    } else {
                        if (vColName != null && vColName != "") {
                            item[vColName] = getParamValue(vColName
                                .toUpperCase(), i);
                            // item["STAFF_ABILITY"]="<input id='txtTitle'
                            // type='text' class='text' maxlength=5
                            // style='width:60%;'/>";
                        }
                    }
                }
                if (typeof (vArrHidRow) == "object") { // /*隐藏属性*///
                    for (var t = 0; t < vArrHidRow.length; t++) {
                        var vAddCol = vArrHidRow[t];
                        if (vAddCol != null) {
                            item[vAddCol] = getParamValue(
                                vAddCol.toUpperCase(), i);
                        }
                    }
                }
                items[i] = item;
            }
        }
        tblObject.loadByData(items);
        for (var i = 0; i < tblObject.rows.length; i++) {
            tblObject.rows[i].data.KEY = tblObject.rows[i].row.uniqueID;
        }
        f_clickFirstRows(tblID);
    },

    f_runTableMod: function (tblObject, tblID, vOperType, vArrObject,
        vArrHidRow, his_flag) {

        tblObject._displayItemAsHTML = true;
        var ls_HisFlag = "0";

        if (typeof (tblObject) != "object")
            return false;
        if (tblID == null)
            return false;
        if (typeof (vArrObject) != "object")
            return false;
        if (vOperType == "add") {
            var item = new Object();
            var oTr = tblID.rows[0];
            if (oTr == null)
                return false;
            var lth = oTr.cells.length;
            var Arrlth = vArrObject.length;
            for (var i = 0; i < lth; i++) {
                var vColName = "";
                var vColDpyName = "";
                var vColDpyTypeName = "";
                var vColDpyTypeFun = "";
                var vCell = oTr.cells[i];
                ls_HisFlag = !! his_flag ? his_flag : "0";
                if (vCell != null) {
                    vColName = vCell.getAttribute("propertyName");
                    vColDefName = vCell.getAttribute("defaultName");
                    vColDpyTypeName = vCell.getAttribute("displayTypeName");
                    vColDpyTypeFun = vCell.getAttribute("displayTypefun");
                }
                if (vColDpyTypeName != null && vColDpyTypeName != "") {
                    if (vColDefName != null && vColDefName != "") {
                        if (ls_HisFlag == "1" && vColName == "EDIT") {
                            // item[vColName] = vColDefName;
                        } else {
                            item[vColName] = vColDefName;
                        }
                        // item[vColName] = vColDefName;
                    } else {
                        item[vColName] = vColName;
                    }
                    item[vColDpyTypeName] = vColDpyTypeFun;
                } else {
                    if (vColName != null && vColName != "") {
                        for (var k = 0; k < Arrlth; k++) {
                            if (vArrObject[k][0].toUpperCase() == vColName
                                .toUpperCase()) {
                                item[vColName] = vArrObject[k][1];
                                break;
                            }
                        }
                        // item[vColName] = getParamValue(vColName,i);
                    }
                }
            }

            if (typeof (vArrObject) == "object") {
                for (var t = 0; t < vArrObject.length; t++) {
                    // alert( vArrObject[t][1]);
                    item[vArrObject[t][0]] = vArrObject[t][1];
                }
            }

            tblObject.insertRow(item);
            tblObject.setSelectedRow(tblObject.rows[tblObject.rows.length - 1]);
        }
        if (vOperType == "mod") {
            var oTr = tblID.rows[0];
            if (oTr == null)
                return false;
            var lth = oTr.cells.length;
            var Arrlth = vArrObject.length;

            var selectItem = tblObject.selectedItem;
            // alert(selectItem);
            var selRow = null;
            if (tblObject.selectedRow != null) {
                for (var i = 0; i < tblObject.rows.length; i++) {
                    if (tblObject.rows[i].data == tblObject.selectedItem) {
                        selRow = i;
                        break;
                    }
                }
            }
            if (selRow == null)
                return false;
            for (var i = 0; i < lth; i++) {
                var vColName = "";
                var vColDpyName = "";
                var vColDpyTypeName = "";
                var vColDpyTypeFun = "";
                var vCell = oTr.cells[i];
                if (vCell != null) {
                    vColName = vCell.getAttribute("propertyName");
                    vColDefName = vCell.getAttribute("defaultName");
                    vColDpyTypeName = vCell.getAttribute("displayTypeName");
                    vColDpyTypeFun = vCell.getAttribute("displayTypefun");
                }
                if (vColDpyTypeName != null && vColDpyTypeName != "") {
                    if (vColDefName != null && vColDefName != "") {
                        selectItem[vColName] = vColDefName;
                    } else {
                        selectItem[vColName] = vColDefName;
                    }
                    selectItem[vColDpyTypeName] = vColDpyTypeFun;
                } else {
                    if (vColName != null && vColName != "") {
                        for (var k = 0; k < Arrlth; k++) {
                            if (vArrObject[k][0].toUpperCase() == vColName
                                .toUpperCase()) {
                                tblID.rows[selRow + 1].cells[i].innerHTML = vArrObject[k][1];
                                selectItem[vColName] = vArrObject[k][1];
                                break;
                            }
                        }
                    }
                }
            }
            if (typeof (vArrObject) == "object") {
                for (var t = 0; t < vArrObject.length; t++) {
                    selectItem[vArrObject[t][0]] = vArrObject[t][1];
                }
            }

        }
        if (vOperType == "del") {
            tblObject.selectedItem.remove();
            f_clickFirstRows(tblID);
        }
    }

};

function DjCheckMaxlength(oInObj) {
    var iMaxLen = parseInt(oInObj.getAttribute('maxlength'));
    var iCurLen = oInObj.value.length;

    if (oInObj.getAttribute && iCurLen > iMaxLen) {
        oInObj.value = oInObj.value.substring(0, iMaxLen);
    }
}

function toLowerCase(srcObj) {
    try {
        return srcObj.toLowerCase();
    } catch (err) {
        return srcObj;
    }
}

var __dateTools = {
    formatDate: function (srcDate, formatString) {
        var year = "" + srcDate.getYear();
        var month = ("0" + srcDate.getMonth()).replace(/.*(\d{2})$/, "$1");
        var date = ("0" + srcDate.getDate()).replace(/.*(\d{2})$/, "$1");
        var hours = ("0" + srcDate.getHours()).replace(/.*(\d{2})$/, "$1");
        var minutes = ("0" + srcDate.getMinutes()).replace(/.*(\d{2})$/, "$1");
        var seconds = ("0" + srcDate.getSeconds()).replace(/.*(\d{2})$/, "$1");
        var retVal = formatString.toUpperCase().replace(/YYYY/, year).replace(
            /MM/, month).replace(/DD/, date).replace(/HH/, hours).replace(
            /MIN/, minutes).replace(/SS/, seconds).replace(/YY/,
            year.replace(/.*\d{2}$/, "$1"));
        return retVal;
    },
    parseDate: function (dateString, formateString) {
        if (formateString == null)
            formateString = "YYYY-MM-DD HH:II:SS";
        formateString = formateString.toUpperCase();
        var ConstructRegExp = function (metaRegExp) {
            var headStr = metaRegExp.replace(/^(\**).*?$/, "$1");
            if (headStr != "")
                headStr = ".{" + headStr.length + "}";
            var endStr = metaRegExp.replace(/^.*?(\**)$/, "$1");
            if (endStr != "")
                endStr = ".{" + endStr.length + "}";
            var dataStr = metaRegExp.replace(/\*/g, "");
            dataStr = "(\\d{" + dataStr.length + "})";
            var regExpStr = "^" + headStr + dataStr + endStr + "$";
            return new RegExp(regExpStr);
        }
        var mapArray = ["YYYY", "MM", "DD", "HH", "MI", "SS"];
        var funcArray = ["setYear", "setMonth", "setDate", "setHours", "setMinutes", "setSeconds"];
        var metaRegExp = "";
        var splitRegExp = null;
        var itemVal = "";
        var retDate = new Date();
        for (var i = 0, size = mapArray.length; i < size; i++) {
            metaRegExp = formateString.replace(new RegExp("[^" + mapArray[i] + "]", "g"), "*");
            if (/[^\*]/g.test(metaRegExp) == false)
                continue;
            else {
                if (mapArray[i] == "MM")
                    metaRegExp = metaRegExp..replace(/^(.*)M(.*?)$/, "$1*$2");
                if (mapArray[i] == "MI")
                    metaRegExp = metaRegExp.replace(/MM/, "**");
                splitRegExp = ConstructRegExp(metaRegExp);
                itemVal = dateString.replace(splitRegExp, "$1");
                if (mapArray[i] == "MM")
                    itemVal = ~~itemVal - 1;
                retDate[funcArray[i]].apply(retDate, [itemVal]);
            }
        }
        return retDate;
    },

    compareDate: function (srcDate, destDate, formatString) {
        if (formatString == null)
            formatString = "YYYYMMDDHHMINSS"
        var srcDateString = "";
        var destDateString = "";
        if (srcDate instanceof Date) {
            srcDateString = this.formatDate(srcDate, formatString);
        }
        if (destDate instanceof Date)
            destDateString = this.formatDate(destDate, formatString);
        return srcDateString > destDateString ? 1 : (srcDateString == destDateString ? 0 : -1);
    },
    genWeeks: function (srcDate) {
        var dotDate = new Date();
        dotDate.setMonth(1);
        dotDate.setDate(1);
        var year = dotDate.getYear();
        var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 4 == 0 && year % 100 != 0)
            monthDays[1] = 29;
        var day = dotDate.getDay();
        var today = srcDate;
        var _month = today.getMonth();
        var _day = today.getDay();
        var _date = today.getDate();
        var countDays = 0;
        for (var i = 0, size = _month; i < size; i++) {
            countDays += monthDays[i];
        }
        countDays += _date;
        countDays = countDays + dotDate.getDay();
        return Math.ceil(countDays / 7);
    }
};

var __pageTools = {
    markSpan: function (tdFields, isMark) {
        var innerHTML = "";
        for (var i = 0, size = tdFields.length; i < size; i++) {
            innerHTML = $(tdFields[i]).innerHTML;
            innerHTML = innerHTML.replace(/^(.*)<span\s+.*span\s*>\s*$/i, "$1");
            if (isMark)
                innerHTML = innerHTML + '<span class="mark">*</span>';
            $(tdFields[i]).innerHTML = innerHTML;
        }
    },
    makeAjaxComBox: function (control, service, params, dataFields,
        defaultOption) {
        // debugger
        (function (control) {
            var opts = control.options;
            if ( !! defaultOption) {
                opts.length = 0;
                opts[0] = new Option(defaultOption, "");
            } else {
                if (opts.length > 0) {
                    opts.length = 1;
                }
            }
        })(control);
        var opts = control.options;
        var jdo = new Jdo(service);
        for (var i = 0, size = params.length; i < size; i++) {
            jdo.newNode(jdo.Data, params[i][0], params[i][1]);
        }
        if (jdo.exec()) {
            var rsObj = jdo.toDR();
            for (var t = 0, size = rsObj.length; t < size; t++) {
                if ( !! dataFields)
                    opts[opts.length] = new Option(rsObj[t][dataFields[0]],
                        rsObj[t][dataFields[1]]);
            }
        }
    },
    fillDataFieldInfo: function (dataObj, mapFields, control) {
        var fn = $;
        if ( !! control) {
            fn = function (domId) {
                return control.getElementById(domId);
            };
        }
        for (var i = 0, size = mapFields.length; i < size; i++) {
            if ( !! dataObj[mapFields[i][1]])
                try {
                    fn(mapFields[i][0]).value = dataObj[mapFields[i][1]];
                } catch (error) {

                }
        }
    },
    genData: function (control, fieldTypes) {
        var fieldInputs = null;
        var key = null;
        var value = null;
        var retObj = {};
        for (var i = 0, size = fieldTypes.length; i < size; i++) {
            fieldInputs = control.getElementsByTagName(fieldTypes[i]);
            for (var j = 0, fSize = fieldInputs.length; j < fSize; j++) {
                if ( !! fieldInputs[j].id)
                    key = fieldInputs[j].id.replace(/^\s+|\s+$/g, "").replace(
                        /^\w{3}(.*)$/, "$1");
                else if ( !! fieldInputs[j].name)
                    key = fieldInputs[j].name.replace(/^\s+|\s+$/g, "")
                        .replace(/^\w{3}(.*)$/, "$1");
                else
                    continue;
                retObj[key] = fieldInputs[j].value;
                if (fieldTypes[i].toLowerCase() == "select") {
                    if (fieldInputs[j].value != "")
                        retObj[key + "_name"] = fieldInputs[j].options[fieldInputs[j].selectedIndex].text;
                }

            }
        }
        return retObj;
    },
    checkInputData: function (control) {
        var controlNode = document;
        if ( !! control)
            controlNode = control;
        var inputFields = null;
        var fieldTypes = ["input", "select", "textarea"];
        for (var k = 0, fSize = fieldTypes.length; k < fSize; k++) {
            inputFields = controlNode.getElementsByTagName(fieldTypes[k]);
            for (var i = 0, size = inputFields.length; i < size; i++) {
                if (inputFields[i].allownull == "false") {
                    if (inputFields[i].value.replace(/^\s+|\s+$/g, "") == "") {
                        showMessage("@" + inputFields[i].desc + "@" + " " + "@OSS_TT_DATE_NOT_NULL@");
                        return false;
                    }
                }
            }
        }
        return true;
    },
    clearDataFields: function (control, excludeFields) {
        var indexString = "";
        if ( !! excludeFields)
            indexString = excludeFields.join(",");
        var fieldTypes = ["input", "textarea"];
        var inputFields = null;
        var idKey = "";
        for (var i = 0, size = fieldTypes.length; i < size; i++) {
            inputFields = control.getElementsByTagName(fieldTypes[i]);
            for (var j = 0, jSize = inputFields.length; j < jSize; j++) {
                idKey = inputFields[j].id;
                if ( !! idKey && indexString.indexOf(idKey) >= 0)
                    continue;
                inputFields[j].value = "";
            }
        }
        inputFields = control.getElementsByTagName("select");
        for (var i = 0, size = inputFields.length; i < size; i++) {
            if (inputFields[i].options.length > 1)
                inputFields[i].value = inputFields[i].options[0].value;
        }
    },
    fillPageData: function (rsObj, control) {
        var domNode = document;
        if ( !! control)
            domNode = control;
        var inputFields = domNode.getElementsByTagName("input");
        var inptId = "";
        var key = "";
        var type = "";
        for (var i = 0, size = inputFields.length; i < size; i++) {
            inptId = inputFields[i].id;
            type = inputFields[i].type;
            if ( !! inptId && inptId != "" && type.toLowerCase() != "button") {
                key = inptId.replace(/^\w{3}(.*)$/g, "$1").toLowerCase();
                inputFields[i].value = !! rsObj[key] ? rsObj[key] : "";
            }
        }
        inputFields = domNode.getElementsByTagName("select");
        for (var i = 0, size = inputFields.length; i < size; i++) {
            inptId = inputFields[i].id;
            if ( !! inptId && inptId != "") {
                key = inptId.replace(/^\w{3}(.*)$/g, "$1").toLowerCase();
                inputFields[i].value = !! rsObj[key] ? rsObj[key] : "";
            }
        }
        inputFields = domNode.getElementsByTagName("textarea");
        for (var i = 0, size = inputFields.length; i < size; i++) {
            inptId = inputFields[i].id;
            if ( !! inptId && inptId != "") {
                key = inptId.replace(/^\w{3}(.*)$/g, "$1").toLowerCase();
                inputFields[i].value = !! rsObj[key] ? rsObj[key] : "";
            }
        }
    },
    checkInputFields: function (control) {
        var ft = function (tagName) {
            return this.getElementsByTagName(tagName);
        };
        var pControl = null;
        if ( !! control)
            pControl = control;
        else
            pControl = document;

        var textBoxIpts = ft.apply(pControl, ["input"]);
        var tmpVal = "";
        var tmpNullFlag = "";
        for (var i = 0, size = textBoxIpts.length; i < size; i++) {
            if (textBoxIpts[i].type == "text") {
                if ( !! textBoxIpts[i].allownull && textBoxIpts[i].allownull == "false") {
                    tmpVal = textBoxIpts[i].value.replace(/^\s+|\s+$/, "");
                    if (tmpVal == "") {
                        showMessage("@" + textBoxIpts[i].desc + "@" + " " + "@OSS_TT_DATE_NOT_NULL@");
                        return false;
                    }
                }
            }
        }

        var selIpts = ft.apply(pControl, ["select"]);
        for (var t = 0, tSize = selIpts.length; t < tSize; t++) {
            if ( !! selIpts[t].allownull && selIpts[t].allownull == "false") {
                tmpVal = selIpts[t].value.replace(/^\s+|\s+$/, "");
                if (tmpVal == "") {
                    showMessage("@" + selIpts[t].desc + "@" + " " + "@OSS_TT_DATE_NOT_NULL@");
                    return false;
                }
            }
        }
        var areaBoxIpts = ft.apply(pControl, ["textarea"]);
        for (var p = 0, pSize = areaBoxIpts.length; p < pSize; p++) {
            if ( !! areaBoxIpts[p].allownull && areaBoxIpts[p].allownull == "false") {
                tmpVal = areaBoxIpts[p].value.replace(/^\s+|\s+$/, "");
                if (tmpVal == "") {
                    showMessage("@" + areaBoxIpts[p].desc + "@" + " " + "@OSS_TT_DATE_NOT_NULL@");
                    return false;
                }
            }
        }
        return true;
    },

    markSpanSingle: function (fieldControl, isMark) {
        var innerHTML = "";

        innerHTML = fieldControl.innerHTML;
        innerHTML = innerHTML.replace(/^(.*)<span\s+.*span\s*>\s*$/i, "$1");
        if (isMark)
            innerHTML = innerHTML + '<span class="mark">*</span>';
        fieldControl.innerHTML = innerHTML;

    },

    markFieldsSpan: function (controlFields, isMark) {
        debugger
        var fetchParentEle = function (childEle, tagName) {
            var tmpTagName = childEle.tagName;
            if (toLowerCase(tmpTagName) == toLowerCase(tagName))
                return childEle;
            else {
                var newEle = childEle.parentElement;
                if (toLowerCase(newEle.tagName) == "body") {
                    return null;
                } else
                    return arguments.callee(newEle, tagName);
            }
        }
        var targetEle = null;
        var tokenEle = null;
        var tmpTagName = "";
        var allownullStr = "" + isMark;
        for (var i = 0, size = controlFields.length; i < size; i++) {
            targetEle = fetchParentEle($(controlFields[i]), "td");
            targetEle = targetEle.previousSibling;
            this.markSpanSingle(targetEle, true);
            tmpTagName = toLowerCase($(controlFields[i]).tagName);
            if (toLowerCase($(controlFields[i]).tagName) == "td") {
                tokenEle = myui.getInstance(controlFields[i]);
                try {
                    tokenEle.textBox.allownull = allownullStr; // "false";
                } catch (ex) {
                    try {
                        tokenEle.textbox.allownull = allownullStr; // "false";
                    } catch (ex) {

                    }
                }

            } else if (tmpTagName == "textarea" || tmpTagName == "input" || tmpTagName == "select") {
                $(controlFields[i]).allownull = allownullStr; // "false";
            }
        }
    },

    limitInputDigital: function (inputFields) {
        for (var i = 0, size = inputFields.length; i < size; i++) {
            $(inputFields[i]).onpaste = function () {
                var s = clipboardData.getData('text');
                if (!/\D/.test(s))
                    value = s.replace(/^0*/, '');
                return false;
            };
            $(inputFields[i]).ondragenter = function () {
                return false;
            };
            $(inputFields[i]).onpropertychange = (function () {
                var length = $(inputFields[i]).maxlength;
                return function () {
                    if (!length)
                        length = 16;
                    if (this.value.length > length)
                        this.value = this.value.substr(0, length);
                };
            }());
            $(inputFields[i]).onkeypress = function () {
                return (event.keyCode >= 48 && event.keyCode <= 57) || event.keycode == 103 || event.keycode == 101;
            }
        }
    },
    limitDisFields: function (inputIds, UIControl, limitVal) {
        var domEle = null;
        var zteComponent = null;
        for (var i = 0, size = inputIds; i < size; i++) {
            domEle = $(inputIds[i]);
            if (domEle.tagName.toLowerCase() == "td") {
                zteComponent = UIControl.getInstance(inputIds[i]);
                try {
                    zteComponent.setAllDisable(limitVal);
                } catch (ex) {
                    alert(ex);
                }
            } else
                $(inputIds[i]).disabled = "" + limitVal;
        }
    },
    limitBlockFieldsEnable: function (blockControl, excludeFields) {
        if (blockControl == null || blockControl == undefined)
            return;
        else {
            var inputTypes = ["input", "select", "textarea"];
            var inptEles = null;
            for (var i = 0, size = inputTypes.length; i < size; i++) {
                inptEles = blockControl.getElementsByTagName(inputTypes[i]);
                for (var t = 0, tSize = inptEles.length; t < tSize; t++) {
                    inptEles.disabled = "true";
                }
            }
            if ( !! excludeFields)
                for (var j = 0, jSize = excludeFields.length; j < jSize; j++) {
                    blockControl.getElementById(excludeFields[j]).disabled = "false";
                }
        }
    },
    //查找当前元素的最近拥有tagName所指代的祖先节点
	findParentElement:function(curEle,tagName){
		if(curEle.tagName.toLowerCase()==tagName.toLowerCase())
			return curEle;
		else{
			var parentEle=curEle.parentElement;
			return arguments.callee(parentEle,tagName);
		}
	},
	
	setReadOnlyInputField : function(control, inputFieldTypeArray,
			excludeArray, enable) {
		var __ablity = false;
		if (!!enable && enable == true)
			__ablity = true;
		var $fe = function(fieldType) {
			return control.getElementsByTagName(fieldType);
		}
		var disableFields = null;
		for ( var i = 0, size = inputFieldTypeArray.length; i < size; i++) {
			disableFields = $fe(inputFieldTypeArray[i]);
			if (!!disableFields && disableFields != null)
				for ( var t = 0, dfSize = disableFields.length; t < dfSize; t++) {
					disableFields[t].readOnly = !__ablity;
				}
		}
		if(!!excludeArray&&!!excludeArray.length)
		for ( var m = 0, mSize = excludeArray.length; m < mSize; m++) {
			excludeArray[m].disabled = false;
		}
	}
	
};

var jsonTools={
   dump:function(jsObject){
     if (typeof jsObject!="object"){
		 return "'"+jsObject+"'";
	 }else if (jsObject instanceof Array){
		 return " [ '"+jsObject.join("','")+" ']";
	 }
	 var jsonSection="{ ";
     for(var item in jsObject){
		if (typeof jsObject[item]=="function")
			continue;
		else 
		  jsonSection=jsonSection+"\'"+item+"':";
		  var destObj=jsObject[item]
	      jsonSection=jsonSection+arguments.callee(destObj)+","
	 }
	 jsonSection=jsonSection.replace(/,$/,"")+"}";
	 return jsonSection;
   }
}
