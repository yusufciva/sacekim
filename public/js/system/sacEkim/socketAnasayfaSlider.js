$(document).ready(() => {
    let sayfaAnasayfaSlider = 'sacEkim_AnasayfaSlider';
    socket.on(sayfaAnasayfaSlider + '_Click_Result', (data) => {
        let input = [
            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1TR', placeholder: 'Başlık 1. Kısım Türkçe...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim2TR', placeholder: 'Başlık 2. Kısım Türkçe...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim3TR', placeholder: 'Başlık 3. Kısım Türkçe...' },

            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1EN', placeholder: 'Başlık 1. Kısım İngilizce...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim1EN', placeholder: 'Başlık 2. Kısım İngilizce...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim1EN', placeholder: 'Başlık 3. Kısım İngilizce...' },

            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1ES', placeholder: 'Başlık 1. Kısım İspanyolca...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim1ES', placeholder: 'Başlık 2. Kısım İspanyolca...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim1ES', placeholder: 'Başlık 3. Kısım İspanyolca...' },

            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1FR', placeholder: 'Başlık 1. Kısım Fransızca...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim1FR', placeholder: 'Başlık 2. Kısım Fransızca...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim1FR', placeholder: 'Başlık 3. Kısım Fransızca...' },
            
            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1DE', placeholder: 'Başlık 1. Kısım Almanca...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim1DE', placeholder: 'Başlık 2. Kısım Almanca...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim1DE', placeholder: 'Başlık 3. Kısım Almanca...' },

            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1IT', placeholder: 'Başlık 1. Kısım İtalyanca...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim1IT', placeholder: 'Başlık 2. Kısım İtalyanca...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim1IT', placeholder: 'Başlık 3. Kısım İtalyanca...' },

            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1AR', placeholder: 'Başlık 1. Kısım Arapça...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim1AR', placeholder: 'Başlık 2. Kısım Arapça...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim1AR', placeholder: 'Başlık 3. Kısım Arapça...' },

            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1PT', placeholder: 'Başlık 1. Kısım Portekizce...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim1PT', placeholder: 'Başlık 2. Kısım Portekizce...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim1PT', placeholder: 'Başlık 3. Kısım Portekizce...' },

            { type: 'text', icon: 'entypo-flow-line', id: 'baslikKisim1RU', placeholder: 'Başlık 1. Kısım Rusça...' },
            { type: 'text', icon: 'entypo-flow-parallel', id: 'baslikKisim1RU', placeholder: 'Başlık 2. Kısım Rusça...' },
            { type: 'text', icon: 'entypo-flow-cascade', id: 'baslikKisim1RU', placeholder: 'Başlık 3. Kısım Rusça...' },

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
    socket.on(sayfaAnasayfaSlider + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaAnasayfaSlider + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
});