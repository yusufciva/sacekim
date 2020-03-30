$(document).ready(() => {
    let sayfaSacAnalizTalebi = 'sacEkim_SacAnalizTalebi';
    socket.on(sayfaSacAnalizTalebi + '_Click_Result', (data) => {
        let input = [
            { type: 'text', id: 'ad', icon: 'fa fa-user', disabled: true },
            { type: 'text', id: 'gender', icon: 'fa fa-transgender', disabled: true },
            { type: 'text', id: 'ilac', icon: 'fa fa-medkit', disabled: true,},
            { type: 'text', id: 'kronik', icon: 'fa fa-heartbeat', disabled: true,},
            { type: 'text', id: 'ulke', icon: 'fa fa-flag', disabled: true,},
            { type: 'text', id: 'telefon', icon: 'fa fa-mobile-phone', disabled: true,},
            { type: 'text', id: 'eposta', icon: 'fa fa-send', disabled: true,},
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
    socket.on(sayfaSacAnalizTalebi + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaSacAnalizTalebi + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaSacAnalizTalebi + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});