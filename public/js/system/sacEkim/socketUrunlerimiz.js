$(document).ready(() => {
    let sayfaUrunlerimiz = 'sacEkim_Urunlerimiz';
    socket.on(sayfaUrunlerimiz + '_Click_Result', (data) => {
        let input = [
            { type: 'fileReader', icon: 'fa fa-photo', fileType: 'image', id: 'gorsel' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiTR', placeholder: 'Ürün Adı Türkçe...' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiEN', placeholder: 'Ürün Adı İngilizce...' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiES', placeholder: 'Ürün Adı İspanyolca...' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiFR', placeholder: 'Ürün Adı Fransızca...' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiDE', placeholder: 'Ürün Adı Almanca...' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiIT', placeholder: 'Ürün Adı İtalyanca...' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiAR', placeholder: 'Ürün Adı Arapça...' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiPT', placeholder: 'Ürün Adı Porketizce...' },
            { type: 'text', icon: 'entypo-user', id: 'urunAdiRU', placeholder: 'Ürün Adı Rusça...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziTR', placeholder: 'Ürün yazısı Türkçe...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziEN', placeholder: 'Ürün yazısı İngilizce...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziES', placeholder: 'Ürün yazısı İspanyolca...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziFR', placeholder: 'Ürün yazısı Fransızca...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziDE', placeholder: 'Ürün yazısı Almanca...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziIT', placeholder: 'Ürün yazısı İtalyanca...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziAR', placeholder: 'Ürün yazısı Arapça...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziPT', placeholder: 'Ürün yazısı Porketizce...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziRU', placeholder: 'Ürün yazısı Rusça...' },
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
    socket.on(sayfaUrunlerimiz + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaUrunlerimiz + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
});