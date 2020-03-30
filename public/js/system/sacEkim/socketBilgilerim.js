$(document).ready(() => {
    let sayfaBilgilerim = 'sacEkim_Bilgilerim';
    socket.on(sayfaBilgilerim + '_Click_Result', (data) => {
        let input = (data.utype == 3 ?
            [
                { type: 'text', id: 'userTitle', icon: 'entypo-users', disabled: true },
                { type: 'text', id: 'firmaAdi', icon: 'entypo-briefcase', disabled: true },
                { type: 'text', id: 'fullName', icon: 'entypo-tag', disabled: true },
                { type: 'text', id: 'email', icon: 'fa fa-venus-mars', disabled: true },
            ]
            :
            data.utype == 4 ?
                [
                    { type: 'text', id: 'userTitle', icon: 'entypo-users', disabled: true },
                    { type: 'text', id: 'ogrenciNo', icon: 'entypo-graduation-cap', disabled: true },
                    { type: 'text', id: 'passportID', icon: 'entypo-vcard', disabled: true },
                    { type: 'text', id: 'fullName', icon: 'entypo-user', disabled: true },
                    { type: 'text', id: 'gender', icon: 'fa fa-venus-mars', disabled: true },
                    { type: 'text', id: 'email', icon: 'entypo-mail', disabled: true },
                ]
                : [
                    { type: 'text', id: 'userTitle', icon: 'entypo-users', disabled: true },
                    { type: 'text', id: 'passportID', icon: 'entypo-vcard', disabled: true },
                    { type: 'text', id: 'fullName', icon: 'entypo-user', disabled: true },
                    { type: 'text', id: 'gender', icon: 'fa fa-venus-mars', disabled: true },
                    { type: 'text', id: 'email', icon: 'entypo-mail', disabled: true },
                ]);
        pageBuilder({
            dataTable: true,
            dataTableOpt: {
                nullHeaderRight: true,
                headerRight: '',
                json: data.tableData,
                buttons: {
                    class: ['Show'],
                    icons: ['fa fa-eye'],
                    style: ['btn-info']
                },
                confirmBoxOpt: [
                    {
                        container:
                        {
                            type: 'show',
                            body: [ // btnEdit;
                                {
                                    width: 'col-md-12',
                                    items: {
                                        input,
                                    }
                                },
                            ],
                            jsonData: data.resultData
                        },
                    }
                ]
            },
        });
    });
    socket.on(sayfaBilgilerim + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaBilgilerim + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaBilgilerim + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});