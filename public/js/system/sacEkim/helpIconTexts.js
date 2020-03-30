let helpTextsJSON = {
    EmailTanimlama: {
        content: `
        <div class="col-md-12">
            <p><strong> </strong></p>
            <h2><strong>E-Mail Tanımlama Men&uuml;s&uuml;</strong></h2>
            <p>Bu sayfanın amacı sistemdeki &uuml;ye kayıtları yapıldığı esnada kullanıcı adı olarak belirlenen e-posta adresine ilk kayıtta hesap bilgilerini i&ccedil;eren eposta g&ouml;nderimi ve şifremi unuttum sayfasındaki hatırlatıcı e-posta g&ouml;nderimi gibi e-posta işlemlerinde sistem tarafından otomatik olarak y&ouml;netilecek olan e-posta adresinin bilgilerinin tanımlanmasını veya tanımlanan bilgilerin d&uuml;zenlenmesi, g&ouml;r&uuml;nt&uuml;lenmesi gibi işlemleri y&ouml;netmektir.</p>
            <h3><strong> E-Mail Tanımlama Men&uuml;s&uuml; Yeni Kayıt Penceresi</strong></h3>
            <p><strong>1-) SMTP Adresi Metin Kutusu: </strong>Bu alanda e-posta sunucusunun SMTP adresi bilgisi girilmesi istenmektedir. Bu alan boş ge&ccedil;ilemez ve minimum 2 karakter maksimum 150 karakter uzunluğunda olabilir aksi halde kaydet butonu aktif hale ge&ccedil;meyecektir.</p>
            <p><strong>2-) PORT Numarası Metin Kutusu: </strong>Bu alanda e-posta sunucusunun PORT numarası bilgisi girilmesi istenmektedir. Bu alan boş ge&ccedil;ilemez ve minimum 2 karakter maksimum 150 karakter uzunluğunda olabilir aksi halde kaydet butonu aktif hale ge&ccedil;meyecektir.</p>
            <p><strong>3-) Kullanıcı Adı Metin Kutusu: </strong>Bu alanda e-posta sunucusunun kullanıcı adı hesap bilgisi girilmesi istenmektedir. Bu alan boş ge&ccedil;ilemez ve minimum 2 karakter maksimum 150 karakter uzunluğunda olabilir aksi halde kaydet butonu aktif hale ge&ccedil;meyecektir.</p>
            <p><strong>4-) Kullanıcı Şifresi Metin Kutusu: </strong>Bu alanda e-posta sunucusunun şifre hesap bilgisi girilmesi istenmektedir. Bu alan boş ge&ccedil;ilemez ve minimum 2 karakter maksimum 150 karakter uzunluğunda olabilir aksi halde kaydet butonu aktif hale ge&ccedil;meyecektir.</p>
            <p><strong>5-) Kaydet Butonu: </strong>Bu butona tıklanabilmesi i&ccedil;in formda istenen t&uuml;m veriler doğru bi&ccedil;imde girilmiş olması gerekmektedir aksi halde buton aktif hale gelmez. Eğer t&uuml;m bilgiler doğru bir bi&ccedil;imde girilmiş ise buton otomatik olarak aktif hale gelir. Aktif duruma geldikten sonra tıklandığında daha &ouml;nce e-posta tanımlaması yapılmamışsa, girilen bilgilerde yanlışlık yoksa ve girilen bilgilere sistemin algoritması sorunsuz bir şekilde erişim sağlayabilmişse girilen bilgileri sisteme kaydederek kullanmaya başlar.</p>
            <p><strong>6-) İptal Butonu: </strong>Bu butona tıklandığında yeni kayıt penceresini kapatır.</p>
            <h2><strong> E-Mail Tanımlama Men&uuml;s&uuml; Kayıt G&uuml;ncelleme ve Kayıt Silme Penceresi</strong></h2>
            <p><strong>1-) D&uuml;zenleme Butonu: </strong>Veri tablosu &uuml;zerinde İşlemler s&uuml;tununda bulunan bu sarı butona tıklandığında kayıt ekranında olduğu gibi o satırdaki verileri d&uuml;zenlemek ve g&uuml;ncellemek i&ccedil;in kullanılan bir pencere a&ccedil;ılır ve kayıt ekranında olduğu gibi aynı format kuralları &ccedil;er&ccedil;evesinde &ouml;nceki bilgilerin d&uuml;zenlemesi işlemi ger&ccedil;ekleştirilebilir.</p>
            <p><strong>2-) Silme Butonu: </strong>Bu butona tıklandığında ilgili satırdaki verinin silinmesi ile ilgili bir pencere a&ccedil;ılır. Bu pencerede &ccedil;ıkan uyarıya onay verildiği takdirde ilgili verinin her hangi bir alt/&uuml;st bağlılığı yoksa silme işlemi ger&ccedil;ekleşir.</p>
            <p><strong><u>Not:</u> </strong>Bazı g&uuml;venlik sorunlarının ortadan kalması amacı ile şifre bilgisi g&ouml;z&uuml;kmeyecek şekilde sistemde kayıtlıdır. Sadece ilk kayıt oluşturulduğu esnada 1 kereye mahsus kayıt ekranında g&ouml;r&uuml;nt&uuml;lenir. Onun dışında hi&ccedil;bir kullanıcı şifre bilgisine erişemez.</p>
        </div>
        `
    },
    Bilgilerim: {
        content: `
        <h2><strong> </strong><strong>Bilgilerim Men&uuml;s&uuml;</strong></h2>
        <p>Bu men&uuml; se&ccedil;ildiğinde kısa bir bekleme animasyonunun ardından bu ekran a&ccedil;ılacaktır. Ekran &uuml;zerinde yer alan tablo &uuml;zerinde yapılacak işlem ile alakalı tablo satırları yer almaktadır. Bu sayfanın amacı sadece sistemdeki bilgilerinizi g&ouml;zden ge&ccedil;irmenizi sağlamaktır.</p>
        <p><strong>1-) Kayıt G&ouml;r&uuml;nt&uuml;leme Butonu: &nbsp;</strong>Bu butona tıklandığında ilgili satırdaki veri ile ilgili sadece bilgi g&ouml;steren bir pencere a&ccedil;ılacaktır.</p>
        `
    },
    IletisimBilgileri: {
        content: `
        <h2><strong> </strong><strong>İletişim Bilgileri Men&uuml;s&uuml;</strong></h2>
        <p>Bu men&uuml; se&ccedil;ildiğinde kısa bir bekleme animasyonunun ardından bu ekran a&ccedil;ılacaktır. Ekran &uuml;zerinde yer alan tablo &uuml;zerinde yapılacak işlem ile alakalı tablo satırları yer almaktadır. Bu sayfanın amacı sisteme kaydedildiğiniz iletişim bilgilerini e-posta adresiniz hari&ccedil; g&uuml;ncelleme işlemlerini y&ouml;netmektir.</p>
        <h2><strong> </strong><strong>İletişim Bilgileri Men&uuml;s&uuml; Kayıt G&uuml;ncelleme Penceresi</strong></h2>
        <p><strong>1-) Telefon 1 Metin Kutusu: </strong>Bu kısımda T&uuml;rkiye Cep numaraları standartları &ccedil;er&ccedil;evesinde cep telefonu bilginizi d&uuml;zenlemek i&ccedil;in değişiklik yapabilirsiniz.</p>
        <p><strong>2-) Telefon 2 Metin Kutusu:</strong> Bu kısımda 2.ci bir Cep numaraları standartları &ccedil;er&ccedil;evesinde cep telefonu bilginizi d&uuml;zenlemek i&ccedil;in değişiklik yapabilirsiniz.</p>
        <p><strong>3-) G&uuml;ncelle Butonu: &nbsp;</strong>Bu butonun aktif hale gelmesi i&ccedil;in forumda değişiklik yapmış olmanız gerekmektedir ve formda istenen veriler uygun formatta olmalıdır. Buton aktif hale geldikten sonra tıklandığında ilgili satırdaki verinin g&uuml;ncellemesini yapar.</p>
        <p><strong>4-) İptal Butonu: </strong>Bu butona tıklandığında yeni kayıt penceresi kapatılır.</p>
        `
    },
    SifreDegistir: {
        content: `
        <p><strong> </strong></p>
        <h2><strong>Şifre Değiştir Men&uuml;s&uuml;</strong></h2>
        <p>Bu men&uuml; se&ccedil;ildiğinde kısa bir bekleme animasyonunun ardından bu ekran a&ccedil;ılacaktır. Ekran &uuml;zerinde yer alan tablo &uuml;zerinde yapılacak işlem ile alakalı tablo satırları yer almaktadır. Bu sayfanın amacı sisteme kaydedildiğiniz iletişim bilgilerini e-posta adresiniz hari&ccedil; g&uuml;ncelleme işlemlerini y&ouml;netmektir.</p>
        <h2><strong> </strong><strong>Şifre Değiştir Men&uuml;s&uuml; Kayıt G&uuml;ncelleme Penceresi</strong></h2>
        <p><strong>1-) Eski Şifre Metin Kutusu: </strong>Bu kısımda sistemde kayıtlı eski şifre bilginizin g&uuml;venlik amacı ile girilmesi istenir.</p>
        <p><strong>2-) Yeni Şifre Metin Kutusu: </strong>Bu kısımda değiştirmek istediğiniz yeni şifre bilginizin girilmesi istenir.</p>
        <p><strong>3-) Tekrar Yeni Şifre Metin Kutusu: </strong>Bu kısımda değiştirmek istediğiniz yeni şifre bilginizin bazı g&uuml;venlik &ouml;nlemleri gereği tekrar girilmesi istenir.</p>
        <p><strong>4-) G&uuml;ncelle Butonu: &nbsp;</strong>Bu butonun aktif hale gelmesi i&ccedil;in forumda değişiklik yapmış olmanız gerekmektedir ve formda istenen veriler uygun formatta olmalıdır. Buton aktif hale geldikten sonra tıklandığında ilgili satırdaki verinin g&uuml;ncellemesini yapar.</p>
        <p><strong>5-) İptal Butonu: </strong>Bu butona tıklandığında yeni kayıt penceresi kapatılır.</p>
        `
    },
    Program: {
        content: `
        <h2><strong>Akademik Program Men&uuml;s&uuml;</strong></h2>
        <p>Bu men&uuml; se&ccedil;ildiğinde kısa bir bekleme animasyonunun ardından bu ekran a&ccedil;ılacaktır. Ekran &uuml;zerinde yer alan tablo &uuml;zerinde yapılacak işlem ile alakalı tablo satırları yer almaktadır. Bu sayfanın amacı sistem sahibi kurumun b&uuml;nyesindeki birimlere bağlı b&ouml;l&uuml;mlere bağlı programları sistem &uuml;zerinde oluşturmasını, d&uuml;zenlemesini ve silmesini sağlamaktır.&nbsp;</p>
        <p><strong>1-) Yeni Kayıt Butonu:&nbsp; </strong>Bu butona tıklandığında ilgili men&uuml;ye kayıt eklemek i&ccedil;in bir pencere a&ccedil;ılacak ve i&ccedil;erisinde işlem ile ilgili bilgiler isteyen metin kutuları, se&ccedil;im kutuları vb. bir&ccedil;ok eleman bulunacaktır. Bu sayfada birim ve b&ouml;l&uuml;m se&ccedil;ilmeden yeni kayıt butonu aktif olmayacaktır.</p>
        <p><strong>2-) Birim Se&ccedil;im Kutusu: </strong>Bu kutuya sistemdeki birim bilgileri y&uuml;klenir. Hangi birimin b&ouml;l&uuml;mlerinin diğer se&ccedil;im kutusuna y&uuml;klenmesi istiyorsa o birim se&ccedil;ilir. Birim se&ccedil;iminin ardından sayfadaki b&ouml;l&uuml;m se&ccedil;im kutusuna se&ccedil;ilen birime bağlı b&ouml;l&uuml;mler y&uuml;klenerek listelenir.</p>
        <p><strong>3-) B&ouml;l&uuml;m Se&ccedil;im Kutusu: </strong>Bu kutuya birim se&ccedil;iminin ardından o birime bağlı sistemdeki b&ouml;l&uuml;m bilgileri y&uuml;klenir. Hangi b&ouml;l&uuml;me program eklenmek istiyorsa o b&ouml;l&uuml;m se&ccedil;ilir. B&ouml;l&uuml;m se&ccedil;iminin ardından sayfadaki veri tablosuna o birime bağlı b&ouml;l&uuml;mler listelenir ve yeni kayıt butonu aktif hale gelir.</p>
        <p><strong>4-) Kayıt G&uuml;ncelleme Butonu:&nbsp; </strong>Veri tablosu &uuml;zerinde İşlemler s&uuml;tununda bulunan bu sarı butona tıklandığında satırdaki verileri d&uuml;zenlemek ve g&uuml;ncellemek i&ccedil;in kullanılan bir pencere a&ccedil;ılır ve format kuralları &ccedil;er&ccedil;evesinde kayıtlı bilgilerin d&uuml;zenlemesi işlemi ger&ccedil;ekleştirilebilir.</p>
        <p><strong>5-) Silme Butonu: </strong>Bu butona tıklandığında ilgili satırdaki verinin silinmesi ile ilgili bir pencere a&ccedil;ılır. Bu pencerede &ccedil;ıkan uyarıya onay verildiği takdirde ilgili verinin her hangi bir alt/&uuml;st bağlılığı yoksa silme işlemi ger&ccedil;ekleşir.</p>
        <p>&nbsp;</p>
        <h2><strong>Akademik Program Men&uuml;s&uuml; Yeni Kayıt Penceresi</strong></h2>
        <p><strong>1-) Program Adı Metin Kutusu: </strong>Bu kısımda oluşturulacak programın adını girmeniz istenir.</p>
        <p><strong>2-) &Ouml;ğretim T&uuml;r&uuml; Se&ccedil;im Kutusu: </strong>Bu kısımda oluşturulacak programın &ouml;ğretim t&uuml;r&uuml; bilgisinin se&ccedil;ilmesi istenir. Eğer her hangi bir değişiklik yapılmazsa sabit olarak I. &Ouml;ğretim se&ccedil;ili kalacaktır.<strong>&nbsp;</strong></p>
        <p><strong>3-) &Ouml;ğretim Dili Se&ccedil;im Kutusu:</strong> Bu kısımda oluşturulacak programın &ouml;ğretim dili bilgisinin se&ccedil;ilmesi istenir. Eğer her hangi bir değişiklik yapılmazsa sabit olarak T&uuml;rk&ccedil;e se&ccedil;ili kalacaktır.</p>
        <p><strong>4-) Aktif Kayıt Doğrulama Se&ccedil;im Kutusu: </strong>Bu kısımda oluşturulacak programın aktif ya da pasif durum bilgisini doğrulamanız istenir. Aktif ise tik işareti se&ccedil;ili değil ise se&ccedil;im kutusunun boş bırakılması gerekmektedir.</p>
        <p><strong>5-) Kaydet Butonu: </strong>Bu butona tıklanabilmesi i&ccedil;in formda istenen t&uuml;m veriler doğru bi&ccedil;imde girilmiş olması gerekmektedir aksi halde buton aktif hale gelmez. Eğer t&uuml;m bilgiler doğru bir bi&ccedil;imde girilmiş ise buton otomatik olarak aktif hale gelir. Aktif duruma geldikten sonra tıklandığında daha &ouml;nce aynı isimde bir program oluşturulmamışsa yeni program kaydı oluşturulur.</p>
        <p><strong>6-) İptal Butonu: </strong>Bu butona tıklandığında yeni kayıt penceresini kapatılır.</p>
        <h2><strong> </strong><strong>Akademik Program Men&uuml;s&uuml; Kayıt G&uuml;ncelleme Penceresi</strong></h2>
        <p><strong>1-) Program Adı Metin Kutusu: </strong>Bu kısımda &ouml;nceden oluşturulmuş, g&uuml;ncellemek istediğiniz program adı bilgisi istenir.</p>
        <p><strong>2-) &Ouml;ğretim T&uuml;r&uuml; Se&ccedil;im Kutusu:</strong> Bu kısımda g&uuml;ncellenmek istenen programın &ouml;ğretim t&uuml;r&uuml; bilgisinin se&ccedil;ilmesi istenir.</p>
        <p><strong>3-) &Ouml;ğretim Dili Se&ccedil;im Kutusu: </strong>Bu kısımda g&uuml;ncellenmek istenen programın &ouml;ğretim dili bilgisinin se&ccedil;ilmesi istenir.</p>
        <p><strong>4-) Aktif Kayıt Doğrulama Se&ccedil;im Kutusu: </strong>Bu kısımda &ouml;nceden oluşturulmuş, g&uuml;ncellemek istediğiniz b&ouml;l&uuml;m aktiflik durum bilgisini se&ccedil;meniz istenir.</p>
        <p><strong>5-) G&uuml;ncelle Butonu:&nbsp; </strong>Bu butonun aktif hale gelmesi i&ccedil;in forumda değişiklik yapmış olmanız gerekmektedir ve formda istenen veriler uygun formatta olmalıdır. Buton aktif hale geldikten sonra tıklandığında eğer d&uuml;zenlenen yeni program adında, t&uuml;r&uuml;nde ve dil bilgisinde kayıtlı başka bir program kayıtlı değilse ve bu programa bağlı bir &ouml;ğrenci yoksa ilgili satırdaki verinin g&uuml;ncellemesini yapar.</p>
        <p><strong>6-) İptal Butonu: </strong>Bu butona tıklandığında kayıt g&uuml;ncelleme penceresi kapatılır.</p>
        <h2><strong> </strong><strong>Akademik Program Men&uuml;s&uuml; Kayıt Silme Penceresi</strong></h2>
        <p><strong>1-) Sil Butonu: </strong>Bu butona tıklandığında ilgili satırdaki kaydın silinmesi i&ccedil;in onay verilir. Eğer silinmek istenen programa bağlı bir &ouml;ğrenci bulunmuyorsa kaydın silme işlemi ger&ccedil;ekleşir.</p>
        <p><strong>2-) İptal Butonu:</strong> Bu butona tıklandığında kayıt silme penceresi kapatılır.</p>
        `,
    },
    KullaniciGoruntule: {
        content: `
        <p><strong> </strong></p>
        <p><strong> </strong></p>
        <h2><strong>Kullanıcı G&ouml;r&uuml;nt&uuml;leme Men&uuml;s&uuml;</strong></h2>
        <p>Bu men&uuml; se&ccedil;ildiğinde kısa bir bekleme animasyonunun ardından bu ekran a&ccedil;ılacaktır. Ekran &uuml;zerinde yer alan tablo &uuml;zerinde yapılacak işlem ile alakalı tablo satırları yer almaktadır. Bu sayfanın amacı sadece sistemdeki kayıtlı her hangi bir &uuml;yenin bilgilerini g&ouml;zden ge&ccedil;irmenizi sağlamaktır.</p>
        <p><strong>1-) Kullanıcı Se&ccedil;im Kutusu: </strong>Bu kutuya sistemdeki kullanıcıların bilgileri y&uuml;klenir. Burada se&ccedil;ilen kullanıcının bilgileri veri tablosunda g&ouml;sterilir ve kayıt g&ouml;r&uuml;nt&uuml;leme butonuna tıklandığında g&ouml;r&uuml;nt&uuml;lenmeye hazır olur.</p>
        <p><strong>2-) Kayıt G&ouml;r&uuml;nt&uuml;leme Butonu:&nbsp; </strong>Bu butona tıklandığında ilgili satırdaki veri ile ilgili sadece bilgi g&ouml;steren bir pencere a&ccedil;ılacaktır.</p>
        `,
    },
    GenelAyarlamalar: {
        content: `
        <h2><strong>Reklamlar Men&uuml;s&uuml;</strong></h2>
        <p>Bu men&uuml; se&ccedil;ildiğinde kısa bir bekleme animasyonunun ardından bu ekran a&ccedil;ılacaktır. Ekran &uuml;zerinde yer alan tablo &uuml;zerinde yapılacak işlem ile alakalı tablo satırları yer almaktadır. Bu sayfanın amacı sistem sahibi kurumun sistemin reklam g&ouml;sterim alanındaki reklamları y&ouml;netmesini sağlamaktır.</p>
        <p><strong>1-) Yeni Kayıt Butonu:&nbsp; </strong>Bu butona tıklandığında ilgili men&uuml;ye kayıt eklemek i&ccedil;in bir pencere a&ccedil;ılacak ve i&ccedil;erisinde işlem ile ilgili bilgiler isteyen metin kutuları, se&ccedil;im kutuları vb. bir&ccedil;ok eleman bulunacaktır.&nbsp;e format kuralları &ccedil;er&ccedil;evesinde kayıtlı bilgilerin d&uuml;zenlemesi işlemi ger&ccedil;ekleştirilebilir.</p>
        <p><strong>2-) Silme Butonu: </strong>Bu butona tıklandığında ilgili satırdaki verinin silinmesi ile ilgili bir pencere a&ccedil;ılır. Bu pencerede &ccedil;ıkan uyarıya onay verildiği takdirde ilgili verinin her hangi bir alt/&uuml;st bağlılığı yoksa silme işlemi ger&ccedil;ekleşir.&nbsp;</p>
        <h2><strong>Reklamlar Men&uuml;s&uuml; Yeni Kayıt Penceresi</strong></h2>
        <p><strong>1-) G&ouml;rsel Se&ccedil;im Kutusu: </strong>Bu kısımda png formatında bir g&ouml;rsel se&ccedil;meniz gerekmektedir.</p>
        <p><strong>2-) Aktif Kayıt Doğrulama Se&ccedil;im Kutusu: </strong>Bu kısımda oluşturulacak reklam g&ouml;rselinin aktif ya da pasif durum bilgisini doğrulamanız istenir. Aktif ise tik işareti se&ccedil;ili değil ise se&ccedil;im kutusunun boş bırakılması gerekmektedir.</p>
        <p><strong>3-) Kaydet Butonu: </strong>Bu butona tıklanabilmesi i&ccedil;in formda istenen t&uuml;m veriler doğru bi&ccedil;imde girilmiş olması gerekmektedir aksi halde buton aktif hale gelmez. Eğer t&uuml;m bilgiler doğru bir bi&ccedil;imde girilmiş ise buton otomatik olarak aktif hale gelir. Aktif duruma geldikten sonra tıklandığında yeni reklam kaydı oluşturulur.</p>
        <p><strong>4-) İptal Butonu: </strong>Bu butona tıklandığında yeni kayıt penceresini kapatılır.</p>
        <h2><strong>Reklamlar Men&uuml;s&uuml;</strong><strong> Kayıt G&uuml;ncelleme Penceresi</strong></h2>
        <p><strong>1-) Aktif Kayıt Doğrulama Se&ccedil;im Kutusu: </strong>Bu kısımda &ouml;nceden oluşturulmuş, g&uuml;ncellemek istediğiniz reklamın aktiflik durum bilgisini se&ccedil;meniz istenir.</p>
        <p><strong>5-) G&uuml;ncelle Butonu:&nbsp; </strong>Bu butonun aktif hale gelmesi i&ccedil;in forumda değişiklik yapmış olmanız gerekmektedir ve formda istenen veriler uygun formatta olmalıdır. Buton aktif hale geldikten sonra tıklandığında d&uuml;zenlenen durum bilgisi g&uuml;ncellenir.</p>
        <p><strong>6-) İptal Butonu: </strong>Bu butona tıklandığında kayıt g&uuml;ncelleme penceresi kapatılır.</p>
        <h2><strong> </strong><strong>Reklamlar Men&uuml;s&uuml; Kayıt Silme Penceresi</strong></h2>
        <p><strong>1-) Sil Butonu: </strong>Bu butona tıklandığında ilgili satırdaki kaydın silinmesi i&ccedil;in onay verilir.</p>
        <p><strong>2-) İptal Butonu:</strong> Bu butona tıklandığında kayıt silme penceresi kapatılır.</p>
        `,
    },
}