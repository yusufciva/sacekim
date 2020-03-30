$(document).ready(() => {
    let sayfaBlogYazilari = 'sacEkim_BlogYazilari';
    socket.on(sayfaBlogYazilari + '_Click_Result', (data) => {
        let input = [
            { type: 'fileReader', icon: 'fa fa-photo', fileType: 'image', id: 'gorsel' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikTR', placeholder: 'Başlık Türkçe...' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikEN', placeholder: 'Başlık İngilizce...' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikES', placeholder: 'Başlık İspanyolca...' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikFR', placeholder: 'Başlık Fransızca...' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikDE', placeholder: 'Başlık Almanca...' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikIT', placeholder: 'Başlık İtalyanca...' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikAR', placeholder: 'Başlık Arapça...' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikPT', placeholder: 'Başlık Porketizce...' },
            { type: 'text', icon: 'entypo-comment', id: 'baslikRU', placeholder: 'Başlık Rusça...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziTR', placeholder: 'Blog yazı içeriği Türkçe...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziEN', placeholder: 'Blog yazı içeriği İngilizce...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziES', placeholder: 'Blog yazı içeriği İspanyolca...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziFR', placeholder: 'Blog yazı içeriği Fransızca...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziDE', placeholder: 'Blog yazı içeriği Almanca...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziIT', placeholder: 'Blog yazı içeriği İtalyanca...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziAR', placeholder: 'Blog yazı içeriği Arapça...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziPT', placeholder: 'Blog yazı içeriği Porketizce...' },
            { type: 'quill', icon: 'entypo-comment', id: 'yaziRU', placeholder: 'Blog yazı içeriği Rusça...' },            
        ];
        xlargeConfirmBox = true;
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
    socket.on(sayfaBlogYazilari + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaBlogYazilari + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
});