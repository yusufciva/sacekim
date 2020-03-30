$(document).ready(() => {
    let sayfaHizmetYorumlari = 'sacEkim_HizmetYorumlari';
    socket.on(sayfaHizmetYorumlari + '_Click_Result', (data) => {
        let input = [
            { type: 'text', icon: 'entypo-user', id: 'hastaAdi', placeholder: 'Hasta Adı...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumTR', placeholder: 'Hasta yorumu Türkçe...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumEN', placeholder: 'Hasta yorumu İngilizce...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumES', placeholder: 'Hasta yorumu İspanyolca...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumFR', placeholder: 'Hasta yorumu Fransızca...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumDE', placeholder: 'Hasta yorumu Almanca...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumIT', placeholder: 'Hasta yorumu İtalyanca...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumAR', placeholder: 'Hasta yorumu Arapça...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumPT', placeholder: 'Hasta yorumu Porketizce...' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaYorumRU', placeholder: 'Hasta yorumu Rusça...' },


            { type: 'fileReader', icon: 'fa fa-photo', fileType: 'image', id: 'gorsel' },
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
    socket.on(sayfaHizmetYorumlari + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaHizmetYorumlari + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
});