$(document).ready(() => {
    let sayfaIletisimKayitlari = 'sacEkim_IletisimKayitlari';
    socket.on(sayfaIletisimKayitlari + '_Click_Result', (data) => {
        let input = [
            { type: 'text', id: 'isim', icon: 'fa fa-user', disabled: true },
            { type: 'text', id: 'eposta', icon: 'fa fa-send', disabled: true },
            { type: 'text', id: 'mesaj', icon: 'fa fa-edit', disabled: true,},
            { type: 'text', id: 'createDate', icon: 'fa fa-refresh', disabled: true},
            { type: 'text', id: 'status', icon: 'fa fa-refresh', disabled: true},
        ];
        pageBuilder({
            dataTable: true,
            dataTableOpt: {
                nullHeaderRight: true,
                headerRight: '',
                json: data.tableData,
                buttons: {
                    class: ['Show'],
                    icons: ['fa fa-eye'],
                    style: ['btn-info']
                },
                confirmBoxOpt: [
                    {
                        container:
                        {
                            type: 'show',
                            body: [ // btnEdit;
                                {
                                    width: 'col-md-12',
                                    items: {
                                        input,
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
    socket.on(sayfaIletisimKayitlari + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaIletisimKayitlari + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaIletisimKayitlari + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});