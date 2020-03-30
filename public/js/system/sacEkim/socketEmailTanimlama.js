$(document).ready(() => {
    let sayfaEmailTanimlama = 'sacEkim_EmailTanimlama';
    socket.on(sayfaEmailTanimlama + '_Click_Result', (data) => {
        let input = [
            { type: 'text', icon: 'fa fa-globe', id: 'smtp', placeholder: 'SMTP Adresi Giriniz..' },
            { type: 'text', icon: 'fa fa-server', id: 'port', placeholder: 'PORT Numarası Giriniz..' },
            { type: 'text', icon: 'fa fa-user', id: 'user', placeholder: 'Kullanıcı Adı Giriniz..' },
            { type: 'text', icon: 'fa fa-unlock', id: 'passS', placeholder: 'Kullanıcı Şifresi Giriniz..' },
        ];
        pageBuilder({
            dataTable: true,
            dataTableOpt: {
                json: data.tableData,
                buttons: {
                    class: ['btnEdit', 'btnDelete'],
                    icons: ['fa fa-edit', 'fa fa-trash-o'],
                    style: ['btn-orange', 'btn-red']
                },
                confirmBoxOpt: [
                    {
                        container:
                        {
                            type: 'new',
                            body: [ // New Record;
                                {
                                    width: 'col-md-12',
                                    items: {
                                        input,
                                    }
                                }
                            ]
                        },
                    },
                    {
                        container:
                        {
                            type: 'edit',
                            body: [ // btnEdit;
                                {
                                    width: 'col-md-12',
                                    items: {
                                        input,
                                    }
                                },
                            ]
                        },
                    },
                    {
                        container: { // btnEdit
                            type: 'delete'
                        },
                    }
                ]
            },
        });
    });
    socket.on(sayfaEmailTanimlama + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaEmailTanimlama + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaEmailTanimlama + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});