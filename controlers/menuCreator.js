const menu = require('../models/menus');
let menuArr = [
   {
      moduleName: 'sacEkim',
      menuName: 'Sistem Ayarları',
      userType: [1],
      menuHTML: `
      <li> <a href="#"><i class="fa fa-gears"></i><span> Sistem Ayarları</span></a>
         <ul>
            <li> <a href="#" class='menuAction'><i class="fa fa-envelope"></i><span id="menuEmailTanimlama">E-Mail Tanımlama</span></a> </li>
         </ul>
      </li>
      `
   },
   {
      moduleName: 'sacEkim',
      menuName: 'Hesap İşlemleri',
      userType: [1, 2, 3, 4],
      menuHTML: `
       <li> <a href="#"><i class="fa fa-user"></i><span> Hesap İşlemleri</span></a>
           <ul>
               <li> <a href="#" class='menuAction'><i class="fa fa-info-circle"></i><span id="menuBilgilerim">Bilgilerim</span></a> </li>
               <li> <a href="#" class='menuAction'><i class="fa fa-share-alt-square"></i><span id="menuIletisimBilgileri">İletişim Bilgileri</span></a> </li>
               <li> <a href="#" class='menuAction'><i class="fa fa-lock"></i><span id="menuSifreDegistir">Şifre Değiştir</span></a> </li>
           </ul>
       </li>
       `
   },
   {
      moduleName: 'sacEkim',
      menuName: 'Kullanıcı Yönetimi',
      userType: [1],
      menuHTML: `
      <li> <a href="#"><i class="fa fa-users"></i><span>Kullanıcı Yönetimi</span></a>
         <ul>
            <li> <a href="#" class='menuAction'><i class="fa fa-user"></i><span id="menuKullaniciGoruntule"> Kullanıcı Görüntüle</span></a> </li>
            
         </ul>
      </li>
      `
   },
   {
      moduleName: 'sacEkim',
      menuName: 'İçerik Yönetimi',
      userType: [1],
      menuHTML: `
      <li> <a href="#"><i class="fa fa-cog"></i><span>İçerik Yönetimi</span></a>
         <ul>
            <li> <a href="#" class='menuAction'><i class="fa fa-cog"></i><span id="menuGenelAyarlamalar">Genel Ayarlamalar</span></a> </li>
            <li> <a href="#" class='menuAction'><i class="fa fa-file-image-o"></i><span id="menuAnasayfaSlider">Anasayfa Slider</span></a> </li>
            <li> <a href="#" class='menuAction'><i class="fa fa-shopping-cart"></i><span id="menuUrunlerimiz">Ürünler</span></a> </li>
            <li> <a href="#" class='menuAction'><i class="fa fa-refresh"></i><span id="menuOncesiSonrasi">Öncesi ve Sonrası</span></a> </li>
            <li> <a href="#" class='menuAction'><i class="fa fa-edit"></i><span id="menuBlogYazilari">Blog Yazıları</span></a> </li>
            
         </ul>
      </li>
      `
   },
   {
      moduleName: 'sacEkim',
      menuName: 'Etkileşimler',
      userType: [1],
      menuHTML: `
      <li> <a href="#"><i class="fa fa-users"></i><span>Etkileşimler</span></a>
         <ul>
            <li> <a href="#" class='menuAction'><i class="fa fa-support"></i><span id="menuIletisimTalebi">İletişim Talebi</span></a> </li>
            <li> <a href="#" class='menuAction'><i class="fa fa-search"></i><span id="menuSacAnalizTalebi">Saç Analizi Talebi</span></a> </li>

            
         </ul>
      </li>
      `
   },
   {
      moduleName: 'sacEkim',
      menuName: 'Kayıtlar',
      userType: [1],
      menuHTML: `
      <li> <a href="#"><i class="fa fa-archive"></i><span>Kayıtlar</span></a>
         <ul>
            <li> <a href="#" class='menuAction'><i class="fa fa-support"></i><span id="menuIletisimKayitlari">İletişim Kayıtları</span></a> </li>
            <li> <a href="#" class='menuAction'><i class="fa fa-search"></i><span id="menuSacAnaliziKayitlari">Saç Analizi Kayıtları</span></a> </li>
         </ul>
      </li>
      `
   },
];
async function create(userType, moduleName, callback) {
   await menu.find({ moduleName }).then((data) => {
      let arr = '';
      for (let i = 0; i < data.length; i++) {
         for (let y = 0; y < data[i].userType.length; y++) {
            if (data[i].userType[y] == userType) {
               arr += data[i].menuHTML
            };
         };
      };
      callback(arr);
   });
};
async function controlAndCreate() {
   let error = 0;
   for (let i = 0; i < menuArr.length; i++) {
      await menu.findOne({ menuName: menuArr[i].menuName }).then((searchData) => {
         if (!searchData) {
            let createMenu = new menu(menuArr[i]);
            createMenu.save((err) => {
               if (err) {
                  console.log(menuArr[i].menuName + " oluşturulurken mongoDB kaynaklı hata oluştu.");
                  error++;
               };
            });
         };
      });
      if (menuArr.length - 1 == i) {
         if (error != 0) {
            console.log(error + " adet menu oluşturulamadı!");
         }
         else {
            console.log("Arayüz için tüm menülerin kontrol ve oluşturma işlemleri başarıyla tamamlandı.");
         };
      };
   };
};



module.exports = { create, controlAndCreate };

//Örnek menü oluşturma