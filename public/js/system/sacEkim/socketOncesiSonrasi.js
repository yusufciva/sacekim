$(document).ready(() => {
    let sayfaOncesiSonrasi = 'sacEkim_OncesiSonrasi';
    socket.on(sayfaOncesiSonrasi + '_Click_Result', (data) => {
        let input = [
            { type: 'fileReader', icon: 'fa fa-photo', fileType: 'image', id: 'before' },
            { type: 'fileReader', icon: 'fa fa-photo', fileType: 'image', id: 'after' },
        ];
        pageBuilder({
            dataTable: true,
            dataTableOpt: {
                json: data.tableData,
                buttons: {
                    class: ['btnDelete'],
                    icons: ['fa fa-trash-o'],
                    style: ['btn-red']
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
                        container: { // btnEdit
                            type: 'delete'
                        },
                    }
                ]
            },
        });
    });
    socket.on(sayfaOncesiSonrasi + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaOncesiSonrasi + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
});