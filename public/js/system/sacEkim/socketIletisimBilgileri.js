$(document).ready(() => {
    let sayfaIletisimBilgileri = 'sacEkim_IletisimBilgileri';
    socket.on(sayfaIletisimBilgileri + '_Click_Result', (data) => {
        let input = [
            { type: 'text', id: 'email', icon: 'fa fa-envelope', disabled: true },
            { type: 'text', id: 'address', icon: 'fa fa-home', placeholder: 'Adresinizi giriniz..' },
            { type: 'mask', id: 'phonenumber1', placeholder: '1. Telefon numarası giriniz..', icon: 'fa fa-phone', format: '(999)-999-99-99' },
            { type: 'mask', id: 'phonenumber2', placeholder: '2. Telefon numarası giriniz..', icon: 'fa fa-phone', format: '(999)-999-99-99' },
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
    socket.on(sayfaIletisimBilgileri + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaIletisimBilgileri + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaIletisimBilgileri + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});