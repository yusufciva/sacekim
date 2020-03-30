$(document).ready(() => {
    let sayfaSifreDegistir = 'sacEkim_SifreDegistir';
    socket.on(sayfaSifreDegistir + '_Click_Result', (data) => {
        let input = [
            { type: 'text', id: 'passOld', icon: 'entypo-back-in-time', placeholder: 'Eski şifrenizi giriniz..' },
            { type: 'text', id: 'passNew', icon: 'entypo-lock', placeholder: 'Yeni şifrenizi giriniz..' },
            { type: 'text', id: 'passNew2', icon: 'entypo-lock', placeholder: 'Tekrar yeni şifrenizi giriniz..' },
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
    socket.on(sayfaSifreDegistir + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaSifreDegistir + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaSifreDegistir + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});