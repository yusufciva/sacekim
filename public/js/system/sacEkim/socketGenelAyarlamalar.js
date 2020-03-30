$(document).ready(() => {
    let sayfaGenelAyarlamalar = 'sacEkim_GenelAyarlamalar';
    socket.on(sayfaGenelAyarlamalar + '_Click_Result', (data) => {
        let input = [
            { type: 'text', id: 'baslikKisim1', icon: 'entypo-flow-tree', placeholder: 'Başlık 1. Kısım..' },
            { type: 'text', id: 'baslikKisim2', icon: 'entypo-flow-tree', placeholder: 'Başlık 2. Kısım..' },
            { type: 'mask', id: 'telefon', placeholder: "Tel: 542...", icon: 'entypo-phone', format: '9999999999' },
            { type: 'mask', id: 'eposta', placeholder: 'E-posta adresi..', format: 'email', icon: 'entypo-mail' },
        ];
        pageBuilder({
            dataTable: true,
            dataTableOpt: {
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
    socket.on(sayfaGenelAyarlamalar + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaGenelAyarlamalar + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});