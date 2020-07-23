$(document).ready(() => {
    let sayfaGenelAyarlamalar = 'sacEkim_GenelAyarlamalar';
    socket.on(sayfaGenelAyarlamalar + '_Click_Result', (data) => {
        let input = [
            { type: 'text', icon: 'entypo-newspaper', id: 'kurumAdi', placeholder: 'Klinik adı...' },
            { type: 'mask', id: 'telefon', placeholder: "Tel: 542...", icon: 'entypo-phone', format: '9999999999' },
            { type: 'mask', id: 'eposta', placeholder: 'E-posta adresi..', format: 'email', icon: 'entypo-mail' },
        ];
        pageBuilder({
            dataTable: true,
            dataTableOpt: {
                json: data.tableData,
                buttons: {
                    class: ['btnEdit','btnDelete'],
                    icons: ['fa fa-edit','fa fa-trash-o'],
                    style: ['btn-orange','btn-red']
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
    socket.on(sayfaGenelAyarlamalar + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
});