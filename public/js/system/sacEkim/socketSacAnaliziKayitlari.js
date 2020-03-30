$(document).ready(() => {
    let sayfaSacAnaliziKayitlari = 'sacEkim_SacAnaliziKayitlari';
    socket.on(sayfaSacAnaliziKayitlari + '_Click_Result', (data) => {
        let input = [
            { type: 'text', id: 'ad', icon: 'fa fa-user', disabled: true },
            { type: 'text', id: 'gender', icon: 'fa fa-transgender', disabled: true },
            { type: 'text', id: 'ilac', icon: 'fa fa-medkit', disabled: true, },
            { type: 'text', id: 'kronik', icon: 'fa fa-heartbeat', disabled: true, },
            { type: 'text', id: 'ulke', icon: 'fa fa-flag', disabled: true, },
            { type: 'text', id: 'telefon', icon: 'fa fa-mobile-phone', disabled: true, },
            { type: 'text', id: 'eposta', icon: 'fa fa-send', disabled: true, },
            { type: 'text', id: 'status', icon: 'fa fa-refresh', disabled: true, }
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
    socket.on(sayfaSacAnaliziKayitlari + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaSacAnaliziKayitlari + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaSacAnaliziKayitlari + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});