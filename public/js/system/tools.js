let socket = io();
let confirmBoxNew;
let confirmBoxEdit;
let confirmBoxDelete;
let confirmBoxShow;
let confirmBoxSure;
let confirmBoxJson = {};
let processSocket;
let processID;
let pageProperties;
let dataTable;
let dataTableColLen;
let slimObj = [];
let slimJSON = {};
let slimObjAccess = {};
let dateRangePlaceholder = {};
let quilArr = [];
let quilSetArr = {};
let inputMinLen = 1;
let inputMaxLen = 150;
let largeConfirmBox = false;
let xlargeConfirmBox = false;
// GEÇERSİZ VE YETKİSİZ İSTEK DİNLEYİCİSİ //
socket.on('failedStatus', () => {
    Cookies.set('ucid', null, { expires: -1 });
    location.reload();
});
// ÇIKIŞ YAP //
$("#logoutText").click(() => {
    Cookies.set('ucid', null, { expires: -1 });
    location.reload();
});
const menuDisplayOpt = (id) => {
    $("#main-menu .root-level").removeClass('active');
    $(".menuAction span").css('color', '');
    $("#" + id).css('color', 'white');
};
const socketEmitter = (action, json) => {
    json['ucid'] = Cookies.get('ucid');
    socket.emit('sacEkim_' + processSocket + '_' + action, json);
};
const menuEventManager = (id) => {
    confirmBoxNew;
    confirmBoxEdit;
    confirmBoxDelete;
    confirmBoxShow;
    confirmBoxSure;
    processSocket;
    processID;
    pageProperties;
    dataTable;
    dataTableColLen;
    slimObj = [];
    slimJSON = {};
    slimObjAccess = {};
    quilSetArr = {};
    largeConfirmBox = false;
    xlargeConfirmBox = false;
    let mID = id;//Menü ID
    let cID = mID.substring(4, mID.length); //ContentX ID
    processSocket = cID;
    $("#loaderDiv").show();//Animasyonu açar
    menuDisplayOpt(id);//Sol menü click event'ine göre görünümleri ayarlar
    $("#mainPage").empty();
    $("#mainPage").hide();
    $("#mainPage").append('<div id="div' + processSocket + '" class="contentX"></div>');
    $("#div" + cID).empty();
    socketEmitter('Click', { cID });
};
const dataTableBtnEventCreator = (buttons, cID) => {
    for (let i = 0; i < buttons.class.length; i++) {
        dataTable.on('click', '.' + buttons.class[i], function () {
            if (buttons.class[i].indexOf("Edit") > -1) {
                let id = $(this).attr('id');
                processID = id;
                confirmBoxEdit.open();
            }
            else if (buttons.class[i].indexOf("Delete") > -1) {
                let id = $(this).attr('id');
                processID = id;
                confirmBoxDelete.open();
            }
            else if (buttons.class[i] == "Show") {
                let id = $(this).attr('id');
                processID = id;
                confirmBoxShow.open();
            }
            else if (buttons.class[i].indexOf("New") > -1) {
                let id = $(this).attr('id');
                processID = id;
                confirmBoxNew.open();
            }
            else if (buttons.class[i].indexOf("Cancel") > -1) {
                let id = $(this).attr('id');
                processID = id;
                confirmBoxCancel.open();
            }
            else if (buttons.class[i].indexOf("sure") > -1) {
                let id = $(this).attr('id');
                processID = id;
                confirmBoxSure.open();
            };
        });
    };
};
const btNewEventCreator = () => {
    $("#btnNew").click(() => {
        let len = slimObj.length;
        let ctrl = 0;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let val = slimObj[i].selected();
                if (val.length > 1) {
                    ctrl++;
                };
            };
            if (ctrl == len) {//Tüm slimler seçiliyse
                confirmBoxNew.open();
            }
            else {
                toastr['warning'](slimSelectChecked);
            };
        }
        else {
            confirmBoxNew.open();
        };
    });
};
const headerCreator = (rightMenu) => {
    $("#pageHeader").empty();
    let headerHTML = `
        <div id='pageHeader' style='margin-bottom:15px' class='row'>
            <div class='col-md-8 headerLeft'>
                <h2 style='margin-top:0px; float:left;'>`+ langJSON['menu' + processSocket] + `</h2>
                <img id="loaderDiv2" style="float:left; margin-top:1%; margin-left:1%; display:none;" src="/public/images/loader-2.gif"/>
            </div>
            `+ (rightMenu.length < 1 ? '' : `<div class='col-md-4 headerRight'> ` + rightMenu + `</div>`) + `
        </div>
    `;
    $("#div" + processSocket).prepend(headerHTML);
};
const confirmBoxGetJsonData = (processID, id) => {
    let keys = Object.keys(confirmBoxJson);
    for (let i = 0; i < keys.length; i++) {
        if (confirmBoxJson[keys[i]]['_id'] == processID) {
            return confirmBoxJson[keys[i]][id];
        };
    };
};
const confirmBoxInputCreator = (body) => {
    let result = "";
    body.items.input.forEach(y => {
        switch (y.type) {
            case "text":
                {
                    result +=
                        `
                        <div style='margin-top:1%' class="input-group" `+ (y.tippy ? 'data-tippy-content="' + y.tippyValue + '" tabindex="0"' : '') + `>
                            <span class="input-group-addon"><i class='`+ (y.icon ? y.icon : 'fa fa-pencil') + `'></i></span>
                            <input spellcheck="false" minlength="`+ (y.minLen ? y.minLen : inputMinLen) + `" maxlength="` + (y.maxLen ? y.maxLen : inputMaxLen) + `" ` + (y.match ? 'match="true"' : '') + ` autocomplete="off" id="` + y.id + `" ` + (y.disabled ? 'disabled="disabled"' : '') + ` class="form-control" placeholder="` + (y.placeholder ? y.placeholder : '') + `" type="` + y.type + `">
                        </div>
                    `;
                    break;
                }
            case "checkbox":
                {
                    result +=
                        `
                        <div style='margin-top:1%' class="input-group form-control" `+ (y.tippy ? 'data-tippy-content="' + y.tippyValue + '" tabindex="0"' : '') + `>
                            <input spellcheck="false" `+ (y.match ? 'match="true"' : '') + ` id="` + y.id + `" class='checkX' name='icheck' checked='` + y.checked + `' type="` + y.type + `"> ` + statusCheckboxTextActive + `
                        </div>`;
                    break;
                }
            case "mask":
                {
                    result +=
                        `<div style='margin-top:1%' class="input-group">
                            <span class="input-group-addon "><i class='`+ y.icon + `'></i></span>
                            <input spellcheck="false" `+ (y.match ? 'match="true"' : '') + ` id='` + y.id + `' autocomplete="off" name='` + y.format + `' type='inputmask' class="form-control maskInput" placeholder="` + y.placeholder + `"">
                        </div>`;
                    break;
                }
            case "comboBox":
                {
                    let option = '';
                    for (let i = 0; i < y.option.length; i++) {
                        option += '<option value="' + y.option[i].value + '">' + y.option[i].text + '</option>'
                    };
                    result +=
                        `
                        `+ (y.tippy ? ' <span data-tippy-content="' + y.tippyValue + '" tabindex="0"> ' : '') + `
                        <div style='margin-top:1%' class="input-group">
                            <span class="input-group-addon "><i class='`+ y.icon + `'></i></span>
                            <select ` + (y.disabled ? 'disabled="disabled"' : '') + ` ` + (y.match ? 'match="true"' : '') + ` ` + (y.default ? 'default="true"' : '') + ` id="` + y.id + `" class="form-control">
                              `+ option + `
                            </select>
                        </div>
                        `+ (y.tippy ? '</span>' : '') + `
                        `;

                    break;
                }
            case "dateRange":
                {
                    dateRangePlaceholder[y.id] = y.placeholder;
                    result +=
                        `<div style='margin-top:1%' class="input-group">
                            <span class="input-group-addon "><i class='`+ (y.icon ? y.icon : 'fa fa-pencil') + `'></i></span>
                            <input spellcheck="false" `+ (y.match ? 'match="true"' : '') + ` autocomplete="off" id="` + y.id + `" ` + (y.disabled ? 'disabled="disabled"' : '') + ` class="form-control dateRange" type="` + y.type + `">
                        </div>`;
                    break;
                }
            case "quill":
                {
                    result +=
                        `<div style='margin-top:1%'>
                                <div id="`+ y.id + `" name="` + y.placeholder + `" class="form-control quill" ` + (y.disabled ? 'data-disable ="disabled"' : '') + `></div>
                            </div>`;
                    break;
                }
            case "fileReader":
                {
                    result +=
                        `
                        <div style='margin-top:1%' class="input-group" `+ (y.tippy ? 'data-tippy-content="' + y.tippyValue + '" tabindex="0"' : '') + `>
                            <span class="input-group-addon"><i class='`+ (y.icon ? y.icon : 'fa fa-pencil') + `'></i></span>
                            <input accept="image/jpeg" ` + (y.disabled ? 'disabled="disabled"' : '') + ` id='` + y.id + `' class="form-control" type="file" class="fileInput">
                         </div>
                        `;
                    break;
                }
            default:
                break;
        };
    });



    return result;
};
const confirmBoxContentCreator = (type, body) => {
    let result = '';
    if (body) {
        for (let i = 0; i < body.length; i++) {
            result += '<div class="' + body[i].width + '">';
            result += confirmBoxInputCreator(body[i]);
            result += `</div>`;
        };
    } else {
        if (type == "delete") {
            result = confirmRecordDeleteText;
        }
        else {
            result = confirmRecordCancelText;
        };
    };

    return result;
};
const confirmBoxGetOpt = (type, body) => {
    let columnClass = (largeConfirmBox ? 'large' : (xlargeConfirmBox ? 'xlarge' : 'medium'));
    let confirmBoxType = type;
    if (type == 'sure') {
        return $.confirm({
            title: titleConfirmSure,
            content: confirmRecordSureText,
            type: 'dark',
            typeAnimated: true,
            icon: 'entypo-help',
            lazyOpen: true,
            escapeKey: true,
            backgroundDismiss: true,
            buttons: {
                yes: {
                    text: btnTextCancel2,
                    btnClass: 'btn-primary',
                    action: function () {
                        socketEmitter('Update', { processID });
                    }
                },
                cancel: {
                    text: btnTextCancel,
                    keys: ['esc'],
                    btnClass: 'btn btn-default',
                }
            }
        });
    }
    else {
        return $.confirm({
            onOpenBefore: function () {
                let type = this.type;
                let self = this;
                let content = self.$content;
                if (confirmBoxType == 'edit' || confirmBoxType == 'show') {//Edit or show buttons
                    let tr = $("#" + processID).parents('tr');
                    let inputLen = content.find("input").length;
                    let selectLen = content.find("select").length;
                    let checkLen = content.find("input[type=checkbox]").length;
                    let maskLen = content.find("input[type=inputmask]").length;
                    for (let i = 0; i < inputLen; i++) {//Text input ayarları
                        if (confirmBoxType == 'edit') {
                            let elem = content.find("input").eq(i);
                            let id = '#td_' + elem.attr('id');
                            let tdPart = $(id, tr).html();
                            elem.val(tdPart);
                        }
                        else if (confirmBoxType == 'show') {
                            let elem = content.find("input").eq(i);
                            let id = elem.attr('id');
                            let val = confirmBoxGetJsonData(processID, id);
                            elem.prop('disabled', true);
                            if (val == undefined) {
                                elem.val('Tanımlanmamış..')
                            }
                            else {
                                elem.val(val);
                            };
                        };
                    };
                    for (let i = 0; i < checkLen; i++) {//Checkbox ayarları
                        let elem = content.find("input[type=checkbox]").eq(i);
                        let id = '#td_' + elem.attr('id');
                        let td = $(id, tr).find('span').attr('class');
                        if (td && td.indexOf('success') > -1) {
                            elem.iCheck({
                                checkboxClass: 'icheckbox_minimal-grey',
                                labelHover: false,
                            });
                        }
                        else {
                            elem.iCheck({
                                checkboxClass: 'icheckbox_minimal-grey',
                                labelHover: false,
                            });
                            elem.iCheck('uncheck');
                        };
                    };
                    for (let i = 0; i < selectLen; i++) {//Select ayarları
                        if (confirmBoxType == 'edit') {
                            let elem = content.find("select").eq(i);
                            let id = elem.attr('id');
                            let td = $("#td_" + id, tr).html();
                            if (elem.attr('default') == "true") {//Default olarak birşey seçilmesi istendiğinde
                                elem.val(0);
                            }
                            else {
                                elem.val(td);
                            };
                        }
                        else if (confirmBoxType == 'show') {
                            let elem = content.find("select").eq(i);
                            let id = elem.attr('id');
                            let val = confirmBoxGetJsonData(processID, id);
                            elem.val(val);
                        };
                    };
                    for (let i = 0; i < maskLen; i++) {//Mask input ayarları
                        let elem = content.find("input[type=inputmask]").eq(i);
                        let id = '#td_' + elem.attr('id');
                        let tdPart = $(id, tr).html();
                        elem.val(tdPart);
                    };
                };
                if (confirmBoxType != 'delete') {
                    self.buttons.ok.disable();
                    self.buttons.ok.keys = [];
                };
                if (confirmBoxType == 'new') {
                    let elem = content.find("input[type=checkbox]");
                    elem.iCheck({
                        checkboxClass: 'icheckbox_minimal-grey',
                        labelHover: false,
                    });
                    let inputLen = content.find("input").length;
                    let tr = $("#" + processID).parents('tr');
                    for (let i = 0; i < inputLen; i++) {
                        let elem = content.find("input").eq(i);
                        if (elem.attr('match')) {
                            let id = '#td_' + elem.attr('id');
                            let tdPart = $(id, tr).html();
                            elem.val(tdPart);
                        };
                    };
                };
                if (confirmBoxType == 'show' || confirmBoxType == 'cancel') {
                    self.buttons.ok.enable();
                    self.buttons.ok.keys = ['enter'];
                };
                for (let i = 0; i < Object.keys(dateRangePlaceholder).length; i++) {
                    let keys = Object.keys(dateRangePlaceholder);
                    content.find("#" + keys[i]).val(dateRangePlaceholder[keys[i]]);
                };
                let quil = content.find(".quill").html();
                if (typeof quil != undefined) {//Quil editörü için
                    quilArr = [];
                    let toolbarOptions = [
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        ['blockquote', 'code-block'],

                        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                        [{ 'direction': 'rtl' }],                         // text direction

                        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'font': [] }],
                        [{ 'align': [] }],

                        ['clean']                                        // remove formatting button
                    ];
                    let quilLen = content.find(".quill").length;
                    for (let i = 0; i < quilLen; i++) {
                        let elem = content.find(".quill").eq(i);
                        let elemID = "#" + elem.attr('id');
                        let placeholder = elem.attr('name');//Nesnenin name'i placeholder olcak şekilde ayarlı
                        quilArr[i] = new Quill(elemID, {
                            modules: { toolbar: (elem.attr('data-disable') == 'disabled' ? false : toolbarOptions) },
                            theme: 'snow',
                            placeholder,
                            maxStack: 100,// Geri alma işleminin kaç basamak hafızada tutulacağı
                            userOnly: true, // Geri alma işlemi
                            readOnly: (elem.attr('data-disable') == 'disabled' ? true : false),
                        });
                        if (confirmBoxType == 'edit' || confirmBoxType == 'show') {
                            quilArr[i].setContents(quilSetArr[processID]);
                        };
                    };
                };
            },
            onContentReady: function () {
                $('.jconfirm').css('z-index', 999);
                let self = this;
                let content = self.$content;
                //Quill Elementi geldiği zaman falzadan 1 adet input ve select geliyor
                let objLen = quilArr.length > 0 ? (content.find("input").length) - (quilArr.length * 1) : (content.find("input").length);
                let selectElemLen = quilArr.length > 0 ? (content.find("select").length) - (quilArr.length * 5) : (content.find("select").length);
                for (let i = 0; i < objLen; i++) {
                    let elem = content.find("input").eq(i);
                    let type = elem.attr('type');
                    if (type == 'text') {
                        elem.keyup(function () {
                            ctrlActivate();
                        });
                    }
                    else if (type == 'checkbox') {
                        content.find('.icheckbox_minimal-grey').on('ifChecked', () => {
                            ctrlActivate();
                        });
                        content.find('.icheckbox_minimal-grey').on('ifUnchecked', () => {
                            ctrlActivate();
                        });
                    }
                    else if (type == 'inputmask') {
                        elem.keyup(function () {
                            ctrlActivate();
                        });
                    }
                    else if (type == 'dateRange') {
                        elem.on('apply.daterangepicker', function () {
                            ctrlActivate();
                        });
                    }
                    else if (type == 'file') {
                        elem.change(() => {
                            ctrlActivate();
                        })
                    };
                };
                let selectLen = content.find("select").length;
                for (let i = 0; i < selectLen; i++) {//Select ayarları
                    content.find("select").eq(i).change(() => {
                        ctrlActivate();
                    });
                };
                let quillLimit = 20000;//quil text limiti
                for (let i = 0; i < quilArr.length; i++) {//Quill Editör İçin
                    quilArr[i].on('text-change', function (delta, old, source) {//quil text limiti
                        if (quilArr[i].getLength() > quillLimit) {
                            quilArr[i].deleteText(quillLimit, quilArr[i].getLength());
                        };
                        ctrlActivate();
                    });
                    if (quilArr[i].options.readOnly) {
                        objLen += 1;
                        selectElemLen += 5;
                    };
                };
                const ctrlActivate = () => {
                    let ctrl = 0;
                    for (let i = 0; i < objLen; i++) {
                        let elem = content.find("input").eq(i);
                        let type = elem.attr('type');
                        if (type == 'text') {
                            elem.val().length >= (elem.attr("minlength") ? elem.attr("minlength") : inputMinLen)
                                ? (elem.val().length <= (elem.attr("maxlength") ? elem.attr("maxlength") : inputMaxLen) ? ctrl++ : ctrl)
                                : ctrl;
                        }
                        else if (type == 'checkbox') {
                            ctrl++;
                        }
                        else if (type == 'inputmask') {//Type == 'inputMask'
                            let name = elem.attr('name');
                            let nameLen = name.length;
                            let val = elem.val();
                            let valRegExp = /[*!@#$%^&*(),.?":{}|<>-_/\//]/g;
                            let result = val.match(valRegExp);
                            let nameLenRegExp = name.match(valRegExp);
                            let ctrlNameLen = (nameLenRegExp != null ? nameLen - nameLenRegExp.length : nameLen);
                            if (result && name != 'email') {

                                for (let j = 0; j < result.length; j++) {
                                    val = val.replace(result[j], '');
                                };
                                if (val.length == ctrlNameLen) {
                                    ctrl++;
                                };
                            }
                            else if (name == 'email') {
                                let mailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                let testMail = mailRegExp.test(val);
                                if (testMail) {
                                    ctrl++;
                                };
                            }
                            else {
                                if (val.length == ctrlNameLen) {
                                    ctrl++;
                                };
                            }
                        }
                        else if (type == 'file') {
                            let fileInput = document.getElementById(elem.attr('id'));
                            let file = fileInput.files[0];
                            let fileType = 'image/jpeg';// sadece resim için ayarlandı
                            if (file && file.type.match(fileType)) {
                                ctrl++;
                            };
                        }
                        else if (type == 'dateRange') {
                            elem.val().length > 1 ? ctrl++ : ctrl;
                        }
                    };
                    for (let i = 0; i < selectElemLen; i++) {
                        let elem = content.find("select").eq(i);
                        let selectedOption = elem.find("option:selected").val();
                        if (selectedOption != 0) {
                            ctrl++;
                        };
                    };
                    for (let i = 0; i < quilArr.length; i++) {//Quill Editör İçin
                        if (quilArr[i].getLength() > 2) {
                            ctrl++;
                        };
                    };
                    if ((objLen + selectElemLen + quilArr.length) == ctrl) {
                        self.buttons.ok.enable();
                        self.buttons.ok.keys = quilArr.length > 0 ? [] : ['enter'];
                    } else {
                        self.buttons.ok.disable();
                        self.buttons.ok.keys = [];
                    };
                };
            },
            type: (type == "new" ? 'dark' : (type == "edit" ? 'orange' : (type == "show" ? "blue" : (type == "delete" ? "red" : "red")))),
            icon: (type == "new" ? 'entypo-plus' : (type == "edit" ? 'fa fa-edit' : (type == 'show' ? 'entypo-eye' : (type == "delete" ? 'fa fa-trash-o' : 'fa fa-exclamation')))),
            title: (type == "new" ? titleConfirmNew : (type == "edit" ? titleConfirmUpdate : (type == "show" ? titleConfirmShow : (type == "delete" ? titleConfirmDelete : titleConfirmCancel)))),
            escapeKey: true,
            columnClass,
            lazyOpen: true,
            content: ` ` + confirmBoxContentCreator(type, body) + `
            <script>
                for(let i = 0; i < $(".maskInput").length; i++)
                {
                    let elem = $(".maskInput").eq(i);
                    let format = elem.attr('name');
                    elem.inputmask(format);
                };
                $('.dateRange').daterangepicker({
                    singleDatePicker: true,
                    "timePicker24Hour": true,
                    "drops": "up",
                    "applyClass": "btn btn-xs btn-default",
                    "cancelClass": "btn btn-xs btn-link",
                    "locale": {
                        "format": "YYYY-MM-DD",
                        "separator": " - ",
                        "applyLabel": "Uygula",
                        "cancelLabel": "Vazgeç",
                        "fromLabel": "Dan",
                        "toLabel": "a",
                        "customRangeLabel": "Seç",
                        "daysOfWeek": [
                            "Pt",
                            "Sl",
                            "Çr",
                            "Pr",
                            "Cm",
                            "Ct",
                            "Pz"
                        ],
                        "monthNames": [
                            "Ocak",
                            "Şubat",
                            "Mart",
                            "Nisan",
                            "Mayıs",
                            "Haziran",
                            "Temmuz",
                            "Ağustos",
                            "Eylül",
                            "Ekim",
                            "Kasım",
                            "Aralık"
                        ],
                        "firstDay": 0
                    }
                });
                tippy('[data-tippy-content]' ,{
                    placement: 'right',
                    theme: 'material',
                });
            </script>
            `,
            backgroundDismiss: (type == 'show' ? true : false),
            buttons: {
                ok: {
                    text: (type == "new" ? saveBtnText : (type == "edit" ? btnTextUpdate : (type == "show" ? btnTextClose : (type == "cancel" ? btnTextCancel2 : btnTextDelete)))),
                    btnClass: 'btn btn-' + (type == "new" ? 'primary' : (type == "edit" ? 'orange' : (type == "show" ? 'info' : 'red'))) + '',
                    isDisabled: (type == "delete" ? false : (type == "show" ? false : (type == "cancel" ? false : true))),
                    action: function () {
                        let content = this.$content;
                        let objLen = quilArr.length > 0 ? (content.find("input").length) - (quilArr.length * 1) : (content.find("input").length);
                        let selectElemLen = quilArr.length > 0 ? (content.find("select").length) - (quilArr.length * 6) : (content.find("select").length);
                        let dbObject = [];
                        let fileReaderLen = content.find("input[type=file]").length;
                        let FileReaderCtrl = 0;
                        let fileReaderLoop;
                        for (let i = 0; i < quilArr.length; i++) {
                            if (quilArr[i].options.readOnly) {
                                objLen += 1;
                                selectElemLen += 6;
                            };
                        };
                        if (type == 'delete' || type == 'cancel') {
                            $("#loaderDiv2").show();
                            socketEmitter('Delete', { processID });
                        }
                        else if (type == 'new' || type == 'edit') {
                            for (let j = 0; j < slimObj.length; j++) {//Slim object varsa idleri ekler ve gönderir
                                let val = slimObj[j].selected();
                                dbObject.push(val);
                            };
                            for (let x = 0; x < selectElemLen; x++) {//Select nesneleri için
                                let elem = content.find("select").eq(x);
                                let selectedElem = elem.find("option:selected").val();
                                dbObject.push(selectedElem)
                            };
                            let quillElemLen = content.find(".quill").length;
                            for (let i = 0; i < quillElemLen; i++) {//Quill Editör İçin
                                dbObject.push(quilArr[i].getContents());
                            };
                            for (let i = 0; i < objLen; i++) {
                                let elem = content.find("input").eq(i);
                                let val = elem.val();
                                let type = elem.attr('type');
                                if (type == 'text' || !type) {
                                    dbObject.push(val);
                                }
                                else if (type == 'checkbox') {
                                    let checked = elem.parent('div').attr('class');//icheck nesneyi div içine soktuğu için
                                    if (checked.indexOf('checked') > -1) {
                                        dbObject.push(true);
                                    }
                                    else {
                                        dbObject.push(false);
                                    };
                                }
                                else if (type == 'inputmask') {
                                    let val = elem.val();
                                    dbObject.push(val);
                                }
                                else if (type == 'dateRange') {
                                    let val = elem.val();
                                    dbObject.push(val);
                                }
                                else if (type == 'file') {
                                    let fileInput = document.getElementById(elem.attr('id'));
                                    let file = fileInput.files[0];
                                    let fileReaderX = new FileReader();
                                    fileReaderX.readAsDataURL(file);
                                    fileReaderX.onload = function () {
                                        dbObject.push(fileReaderX.result);
                                        FileReaderCtrl++;
                                    };
                                };
                            };
                            if (fileReaderLen > 0) {
                                const fileReaderControl = () => {
                                    if (fileReaderLen != FileReaderCtrl) {
                                        fileReaderLoop = setTimeout(fileReaderControl, 100);
                                    }
                                    else {
                                        $("#loaderDiv2").show();
                                        socketEmitter(
                                            type == 'new' ? 'Insert' : 'Update',
                                            type == 'new' ? { data: dbObject, processSocket } : { data: dbObject, processID }
                                        );
                                        clearTimeout(fileReaderLoop);
                                    };
                                };
                                fileReaderLoop = setTimeout(fileReaderControl, 100);
                            }
                            else {
                                $("#loaderDiv2").show();
                                socketEmitter(
                                    type == 'new' ? 'Insert' : 'Update',
                                    type == 'new' ? { data: dbObject, processSocket } : { data: dbObject, processID }
                                );
                            }
                        };
                    }
                },
                cancel: {
                    text: btnTextCancel,
                    keys: ['esc'],
                    btnClass: 'btn btn-default',
                }
            }
        });
    }

};
const confirmBoxCreator = (opt) => {
    dateRangePlaceholder = {};
    opt.forEach(x => {
        let e = x.container;
        switch (e.type) {
            case "new":
                confirmBoxNew = confirmBoxGetOpt(e.type, e.body);
                break;
            case "edit":
                confirmBoxEdit = confirmBoxGetOpt(e.type, e.body);
                break;
            case "delete":
                confirmBoxDelete = confirmBoxGetOpt(e.type, false);
                break;
            case "show":
                confirmBoxJson = e.jsonData;
                confirmBoxShow = confirmBoxGetOpt(e.type, e.body);
                break;
            case "cancel":
                confirmBoxCancel = confirmBoxGetOpt(e.type, false);
                break;
            case "quill":
                confirmBoxCancel = confirmBoxGetOpt(e.type, e.body);
                break;
            case "sure":
                confirmBoxSure = confirmBoxGetOpt(e.type, false);
                break;
            default:
                break;
        }
    });

};
const dataTableReset = () => {
    dataTable.fnDestroy();
    dataTable.fnClearTable();
};
const dataTableResetAndNullCreate = (len) => {
    dataTableReset();
    $("#tbody" + processSocket).empty();
    dataTableBodyCreate(processSocket, len);
};
const dataTableResetAndCreate = (result) => {
    let len = Object.keys(result[0]).length;
    dataTableReset();
    let html = dataTableTbodyCreator(result, pageProperties.dataTableOpt.buttons, false);
    $("#tbody" + processSocket).empty();
    $("#tbody" + processSocket).append(html);
    dataTableBodyCreate(processSocket, len);
};
const dataTableUpdateRow = (arr) => {
    let tr = $("#" + processID).parents('tr');
    dataTable.fnDeleteRow(tr);
    dataTableInsertRow(arr);
};
const dataTableInsertRow = (arr) => {
    let colLen = Object.keys(arr).length;//'__v' değeri döndüğü için değer -1
    dataTable.fnDestroy();
    let html = dataTableTbodyCreator([arr], pageProperties.dataTableOpt.buttons, true);
    $("#tbody" + processSocket).append(html);
    dataTableBodyCreate(processSocket, colLen);
};
const dataTableDeleteRow = (id, colLen) => {
    let tr = $("#" + id).parents('tr');
    dataTable.fnDeleteRow(tr);
    dataTableBodyCreate(processSocket, colLen);
};
const dataTableCtrlType = (data) => {
    return typeof data == 'boolean' ? (data ? "<span class='label label-success'>" + statusTextTrue + "</span>" : "<span class='label label-danger'>" + statusTextFalse + "</span>") : (data.indexOf("data:image") > -1 ? "<img src='" + data + "' height='64' width='64' />" : (data.indexOf("/public/images") > -1 ? "<img src='" + data + "' height='64' width='64' />" : data));
};
const dataTableBtnCreator = (opt, id) => {
    let btn = '';
    for (let i = 0; i < opt.class.length; i++) {
        btn += '<span id=' + id + ' class="btn ' + opt.class[i] + ' ' + opt.style[i] + '"> <i class="' + opt.icons[i] + '"></i> </span>&nbsp;';
    };
    return btn;
};
const dataTableTdCreator = (arr, keys) => {
    let td = '';
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] != '_id') { td += '<td id="td_' + keys[i] + '" >' + dataTableCtrlType(arr[keys[i]]) + '</td>' };
    };
    return td;
};
const dataTableTbodyCreator = (arr, btn, bold) => {
    let tbody = '';
    let keys = Object.keys(arr[0]);
    for (let i = 0; i < arr.length; i++) {

        if (!bold) {
            tbody += '<tr>' + dataTableTdCreator(arr[i], keys) + '<td>' + dataTableBtnCreator(btn, arr[i]['_id']) + '</td>' + '</tr>';
        }
        else {
            tbody += '<tr style="font-weight:bold; color:black;">' + dataTableTdCreator(arr[i], keys) + '<td>' + dataTableBtnCreator(btn, arr[i]['_id']) + '</td>' + '</tr>';
        };

    };
    return tbody;
};
const dataTableThCreator = (keys, id) => {
    let th = '';
    dataTableColLen = keys.length;
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] != '_id') {
            th += `
            <th class="tableHeaderAlignment">`+ langJSON['th' + id + '_' + keys[i]] + `</th>
            `;
        };
    };
    let html = `
        <table id="dataTable_`+ id + `" class="table">
            <thead class="tableHeaderBgColor">
                <tr role='row'>
                `+ th + `
                <th>` + langJSON['thCommon_Process'] + `</th>
                </tr>
            </thead>
            <tbody id="tbody`+ id + `">

            </tbody>
        </table>
    `;
    return html;
};
const dataTableBodyCreate = (cID, colLen) => {
    let colProp = [];
    for (let i = 0; i < colLen; i++) {
        colProp.push({ "bSortable": (i == colLen - 1 ? false : true), className: 'dt-body-center' });
    };
    dataTable = $("#dataTable_" + cID).dataTable({
        stateSave: true,
        "language": dataTableLanguage,
        autoWidth: true,
        retrieve: true,
        "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, 100]],
        destroy: true,
        columns: colProp,
    });
    $("#dataTable_" + cID).closest('.dataTables_wrapper').find('select').select2({
        minimumResultsForSearch: -1
    });
};
const dataTableCreator = (opt, cID) => {
    let noProcessFieldsCtrl = opt.noProcessFields ? Object.keys(opt.noProcessFields).length : 0;
    if (noProcessFieldsCtrl > 0) {
        for (let j = 0; j < Object.keys(opt.noProcessFields).length; j++) {
            for (let i = 0; i < opt.json.length; i++) {
                quilSetArr[opt.json[i]['_id']] = opt.json[i][Object.keys(opt.noProcessFields)[j]];
                delete opt.json[i][Object.keys(opt.noProcessFields)[j]];
            };
        };
    };
    let keys = Object.keys(opt.json[0]);
    let tbodyCtrl = opt.json[0]['_id'].length;
    let html = dataTableThCreator(keys, cID);
    let tbody = '';
    if (tbodyCtrl > 1) {
        tbody = dataTableTbodyCreator(opt.json, opt.buttons, false);
    };
    $("#div" + cID).append(html);
    $("#tbody" + cID).append(tbody);
    dataTableBodyCreate(cID, Object.keys(opt.json[0]).length);
    dataTableBtnEventCreator(opt.buttons, cID);
    confirmBoxCreator(opt.confirmBoxOpt);
};
const comboBoxContainerCreator = (opt) => {
    let len = opt.length;
    let container = '<div class="row" style="padding-bottom:15px" id="comboBoxContainer"></div>';
    $("#div" + processSocket).append(container);
    for (let i = 0; i < len; i++) {
        $("#comboBoxContainer").append('<div class="col-md-' + 12 / (len + 1) + '"><select id="' + opt[i].comboBoxID + '"></select></div>');
    };
};
const comboBoxJSONCreator = (rec, cbxID) => {
    let html = '<option data-placeholder="true"></option>';
    if (rec.jsonData) {
        for (let i = 0; i < rec.jsonData.length; i++) {
            let record = rec.jsonData[i];
            let meta = rec.metaData;
            let val = record[meta];
            let objLen = Object.keys(record).length;
            if (objLen > 2) {
                //Slim select'te çoklu gösterim yapılmak isteniyorsa buraya girer
                //Örneğin Öğrenci Adı - Numrası - Tc kimlik gibi
                for (let j = 0; j < objLen; j++) {
                    let key = Object.keys(record)[j];
                    if (key != '_id' && key != meta) {
                        val += ' - ' + record[key];
                    };
                };
            };
            html += '<option value="' + record._id + '">' + val + ' </option>';
        };
        $("#" + cbxID).empty();
        $("#" + cbxID).append(html);
        slimJSON[rec.comboBoxID] = { html };
    }
    else {
        $("#" + cbxID).append(html);
    };
};
const comboBoxCreator = (opt) => {
    slimJSON = {};
    let len = opt.length;
    comboBoxContainerCreator(opt);
    slimObj = [];
    slimObjAccess = {};
    for (let i = 0; i < len; i++) {
        comboBoxJSONCreator(opt[i], opt[i].comboBoxID);
        slimObjAccess[opt[i].comboBoxID] = i;
        slimObj[i] = new SlimSelect({
            select: '#' + opt[i].comboBoxID,
            placeholder: opt[i].placeholder,
            searchText: comboBoxSearchText,
            searchPlaceholder: comboBoxSearchPlaceholder,
            showSearch: true,
            searchHighlight: true,
            onChange: (info) => {
                if (opt[i].action) {
                    if (len > 1) {
                        for (let j = 1; j < slimObj.length; j++) {
                            if (slimObj.length > i + j) {
                                // let dtLen = pageProperties.dataTableOpt.json.length;
                                // dataTableResetAndNullCreate(dtLen); !!!
                                let prop = pageProperties.comboBoxOpt[(i + j)];
                                let cbxID = prop.comboBoxID;
                                $("#" + cbxID).empty();
                                $("#" + cbxID).append('<option data-placeholder="true"></option>');
                                $("#" + cbxID).val('');
                            };
                        };
                    };
                    $("#loaderDiv2").show();
                    socketEmitter('Get', { _id: info.value, slimObjID: i });
                };
            }
        });
    };
};
const pageBuilder = (prop) => {
    pageProperties = prop;
    let cID = processSocket;
    let rightMenu;
    if (prop.comboBox) {
        comboBoxCreator(prop.comboBoxOpt);
    };
    if (prop.dataTable) {
        !prop.dataTableOpt.nullHeaderRight ? rightMenu = `<span id='btnNew' class='btn btn-primary pull-right'><i class="entypo-plus"></i>` + newRecordBtnText + `</span>`
            : rightMenu = prop.dataTableOpt.headerRight;//Özel bir rightmenu yerleştirmek istediğim zaman
        headerCreator(rightMenu);
        btNewEventCreator();
        dataTableCreator(prop.dataTableOpt, cID);
    };

    $("#loaderDiv").fadeOut(() => {
        $("#mainPage").show();
        $("#div" + cID).show(100);
    });
};
const dbActionResult = (recType, data) => {
    $("#loaderDiv").fadeOut(400);
    $("#loaderDiv2").fadeOut(200);
    switch (recType) {
        case 'delete':
            {
                switch (data.info) {
                    case 0://Veriye Ulaşılamadı
                        {
                            toastr['error'](dbDataNotFoundBeforeDeleted);
                            menuEventManager('menu' + processSocket);
                            break;
                        }
                    case 1://Mongodb kaynaklı hata oluştu
                        {
                            toastr['error'](dbErrorMongo);
                            break;
                        }
                    case 2://İşlem Başarılı
                        {
                            if (!data.noProcessDt) {
                                dataTableDeleteRow(data._id, data.colLen);
                                toastr['success'](dbDataSuccess);
                            }
                            else {
                                toastr['success'](dbDataSuccess);
                            };
                            break;
                        }
                    case 3://Bağlı kayıt varsa
                        {
                            toastr['warning'](dbDataHasChieldNotDelete);
                            break;
                        }
                    default:
                        toastr['error'](data.info);
                        break;
                }
            }
            break;
        case 'insert':
            {
                switch (data.info) {
                    case 0://Veriye Ulaşılamadı
                        {
                            toastr['error'](dbDataNotFoundBeforeDeleted);
                            menuEventManager('menu' + processSocket);
                            break;
                        }
                    case 1://Mongodb kaynaklı hata oluştu
                        {
                            toastr['error'](dbErrorMongo);
                            break;
                        }
                    case 2://İşlem Başarılı
                        {
                            if (!data.noProcessDt) {
                                dataTableInsertRow(data.arr);
                                toastr['success'](dbDataSuccess);
                            }
                            else if (data.deleteRow)//Güncelleme sonrası dataTable'dan satır silincekse
                            {
                                dataTableDeleteRow(data.arr._id, data.colLen);
                                toastr['success'](dbDataSuccess);
                            }
                            else {
                                toastr['success'](dbDataSuccess);
                            };
                            break;
                        }
                    case 3://Veri zaten kayıtlıysa
                        {
                            toastr['error'](dbDataHasAlready);
                            break;
                        }
                    case 4://Geçersiz format hataları
                        {
                            toastr['error'](dbDataNotValidation);
                            break;
                        }
                    default:
                        toastr['error'](data.info);
                        break;
                }
                break;
            }
        case 'update':
            {
                switch (data.info) {
                    case 0://Veriye Ulaşılamadı
                        {
                            toastr['error'](dbDataNotFoundBeforeDeleted);
                            menuEventManager('menu' + processSocket);
                            break;
                        }
                    case 1://Mongodb kaynaklı hata oluştu
                        {
                            toastr['error'](dbErrorMongo);
                            break;
                        }
                    case 2://İşlem Başarılı
                        {
                            if (data.deleteRow) {//Güncelleme sonrası dataTable'dan satır silincekse
                                dataTableDeleteRow(data.arr._id, data.colLen);
                                toastr['success'](dbDataSuccess);
                            }
                            else {
                                let noProcessFieldsCtrl = pageProperties.dataTableOpt.noProcessFields ? Object.keys(pageProperties.dataTableOpt.noProcessFields).length : 0;
                                if (noProcessFieldsCtrl > 0) {
                                    for (let j = 0; j < Object.keys(pageProperties.dataTableOpt.noProcessFields).length; j++) {
                                        quilSetArr[data.arr['_id']] = data.arr[Object.keys(pageProperties.dataTableOpt.noProcessFields)[j]];
                                        delete data.arr[Object.keys(pageProperties.dataTableOpt.noProcessFields)[j]];
                                    };
                                };
                                dataTableUpdateRow(data.arr);
                                toastr['success'](dbDataSuccess);
                            };
                            break;
                        }

                    case 3://Veri zaten kayıtlıysa
                        {
                            toastr['error'](dbDataHasAlready);
                            break;
                        }
                    case 4://Geçersiz format hataları
                        {
                            toastr['error'](dbDataNotValidation);
                            break;
                        }
                    case 5://Bağlı kayıt varsa
                        {
                            toastr['warning'](dbDataHasChieldNotDelete);
                            break;
                        }
                    default:
                        toastr['error'](data.info);
                        break;
                }
                break;
            }
        case 'get':
            {
                switch (data.info) {
                    case 0://Kayıtlı Veri Yok
                        {
                            if (!data.noProcessDt) {
                                dataTableResetAndNullCreate(dataTableColLen);
                            };
                            toastr['info'](dbDataNotFound);
                            break;
                        }
                    case 2://İşlem Başarılı
                        {
                            if (slimObj.length > 1 && slimObj.length > (parseInt(data.slimObjID) + 1)) {
                                let path = pageProperties.comboBoxOpt[(parseInt(data.slimObjID) + 1)];
                                let json = { jsonData: data.result, metaData: path.metaData, comboBoxID: path.comboBoxID };
                                comboBoxJSONCreator(json, path.comboBoxID);
                            };
                            if (!data.noProcessDt) {
                                let noProcessFieldsCtrl = pageProperties.dataTableOpt.noProcessFields ? Object.keys(pageProperties.dataTableOpt.noProcessFields).length : 0;
                                if (noProcessFieldsCtrl > 0) {
                                    for (let j = 0; j < Object.keys(pageProperties.dataTableOpt.noProcessFields).length; j++) {
                                        for (let i = 0; i < data.result.length; i++) {
                                            quilSetArr[data.result[i]['_id']] = data.result[i][Object.keys(pageProperties.dataTableOpt.noProcessFields)[j]];
                                            delete data.result[i][Object.keys(pageProperties.dataTableOpt.noProcessFields)[j]];
                                        };
                                    };
                                };
                                dataTableResetAndCreate(data.result);
                                //toastr['success'](dbDataSuccess);
                            };
                            break;
                        }
                    case 3://Bir işlem yapılmayacaksa
                        {
                            break;
                        }
                    default:
                        break;
                }
                break;
            }
        default:
            break;
    }
};
$("#main-menu .menuAction").click(function () {
    let id = $("span", this).attr('id');
    let html = menuEventManager(id);
});
const helpTexts = () => {
    $.confirm({
        title: 'Yardım',
        content: helpTextsJSON[processSocket].content,
        icon: 'fa fa-question-circle',
        type: 'dark',
        columnClass: 'large',
        backgroundDismiss: true,
        escapeKey: true,
        typeAnimated: false,
        buttons: {
            close: {
                text: btnTextCancel,
                btnClass: 'btn-primary',
                action: function () {
                }
            },
        }
    });
};