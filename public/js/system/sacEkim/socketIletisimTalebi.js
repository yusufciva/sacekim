$(document).ready(() => {
    let sayfaIletisimTalebi = 'sacEkim_IletisimTalebi';
    socket.on(sayfaIletisimTalebi + '_Click_Result', (data) => {
        let input = [
            { type: 'text', id: 'isim', icon: 'fa fa-user', disabled: true },
            { type: 'text', id: 'eposta', icon: 'fa fa-send', disabled: true },
            { type: 'text', id: 'mesaj', icon: 'fa fa-edit', disabled: true,},
            { type: 'comboBox', id: 'status', icon: 'fa fa-refresh', default: true, option: [{ value: 0, text: 'Dönüş yapılmadı' },{ value: 'Dönüş sağlandı', text: 'Dönüş sağlandı' }] },
        ];
        pageBuilder({
            dataTable: true,
            dataTableOpt: {
                nullHeaderRight: true,
                headerRight: '',
                json: data.tableData,
                buttons: {
                    class: ['btnEdit'],
                    icons: ['fa fa-edit'],
                    style: ['btn-orange']
                },
                confirmBoxOpt: [
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
                ]
            },
        });
    });
    socket.on(sayfaIletisimTalebi + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaIletisimTalebi + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaIletisimTalebi + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});