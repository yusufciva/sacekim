$(document).ready(() => {
    let sayfaKullaniciGoruntule = 'sacEkim_KullaniciGoruntule';
    socket.on(sayfaKullaniciGoruntule + '_Click_Result', (data) => {
        pageBuilder({
            comboBox: true,
            comboBoxOpt:
                [
                    {
                        jsonData: data.resultData,
                        metaData: 'fullName',
                        placeholder: 'Kullanıcı Seçiniz..',
                        comboBoxID: 'comboBoxBirim',
                        action: true
                    }
                ],
            dataTable: true,
            dataTableOpt: {
                json: data.tableData,
                nullHeaderRight: true,
                headerRight: '',
                buttons: {
                    class: ['Show'],
                    icons: ['fa fa-eye'],
                    style: ['btn-info']
                },
                confirmBoxOpt: [
                    {
                        container: { // btnShow
                            type: 'show',
                            body: [
                                {
                                    width: 'col-md-6',
                                    items: {
                                        input: [
                                            { type: 'text', tippy: true, tippyValue: 'Adı ve Soyadı', id: 'fullName', icon: 'entypo-tag' },
                                            { type: 'text', tippy: true, tippyValue: 'Kimlik Numarası', id: 'passportID', icon: 'entypo-vcard'},
                                            { type: 'text', tippy: true, tippyValue: 'Kullanıcı Adı', id: 'username', icon: 'entypo-user' },
                                            { type: 'text', tippy: true, tippyValue: 'Kullanıcı Şifresi', id: 'password', icon: 'entypo-lock-open' },
                                            { type: 'text', tippy: true, tippyValue: 'Ünvan', id: 'userTitle', icon: 'entypo-users' },
                                            { type: 'text', tippy: true, tippyValue: 'Öğrenci Numarası', id: 'ogrenciNo', icon: 'entypo-graduation-cap' },
                                            { type: 'text', tippy: true, tippyValue: 'Cinsiyet', id: 'gender', icon: 'fa fa-venus-mars' },
                                        ],
                                    }
                                },
                                {
                                    width: 'col-md-6',
                                    items: {
                                        input: [
                                            { type: 'text', tippy: true, tippyValue: 'E-posta Adresi', id: 'email', icon: 'entypo-mail' },
                                            { type: 'text',  tippy: true, tippyValue: 'Adres Bilgisi', id: 'address', icon: 'entypo-home' },
                                            { type: 'text', tippy: true, tippyValue: 'Telefon Numarası 1', id: 'phonenumber1', icon: 'entypo-phone' },
                                            { type: 'text',  tippy: true, tippyValue: 'Telefon Numarası 2', id: 'phonenumber2', icon: 'entypo-phone' },
                                        ],
                                    }
                                },
                            ],
                            jsonData: data.resultData
                        },
                    }
                ]
            },
        });
    });
    socket.on(sayfaKullaniciGoruntule + '_Get_Result', (data) => {
        console.log(data);
        dbActionResult('get', data);
    });
});