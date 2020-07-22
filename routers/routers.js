const express = require('express');
const router = express.Router();
const schemaGenelAyarlamalar = require('../models/sacEkim/schemaGenelAyarlamalar');
const schemaAnasayfaSlider = require('../models/sacEkim/schemaAnasayfaSlider');
const schemaOncesiSonrasi = require('../models/sacEkim/schemaOncesiSonrasi');
const schemaBlogYazilari = require('../models/sacEkim/schemaBlogYazilari');
const schemaUrunlerimiz = require('../models/sacEkim/schemaUrunlerimiz');

router.get('/', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        schemaAnasayfaSlider.find({}).then((slider) => {
            schemaUrunlerimiz.find({}).then((urunler) => {
                schemaOncesiSonrasi.find({}).then((beforeAfter) => {
                    schemaBlogYazilari.find({}).then((blog) => {
                        res.render('index', {
                            yonetim: 0,
                            kurumAdi: ayarlar ? ayarlar.kurumAdi : "Genel ayarları yapınız...",
                            telefon: ayarlar ? ayarlar.telefon : "Genel ayarları yapınız...",
                            eposta: ayarlar ? ayarlar.eposta : "Genel ayarları yapınız...",
                            slider,
                            urunler,
                            beforeAfter,
                            blog,
                        });
                    });
                });
            });

        });
    });
});
router.get('/iletisim', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        res.render('iletisim', {
            yonetim: 0,
            kurumAdi: ayarlar.kurumAdi,
            telefon: ayarlar.telefon,
            eposta: ayarlar.eposta,
        });
    });
});
router.get('/sss', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        res.render('sss', {
            yonetim: 0,
            kurumAdi: ayarlar.kurumAdi,
            telefon: ayarlar.telefon,
            eposta: ayarlar.eposta,
        });
    });
});
router.get('/blog', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        schemaBlogYazilari.find({}).then((blog) => {
            res.render('blog', {
                yonetim: 0,
                kurumAdi: ayarlar.kurumAdi,
                telefon: ayarlar.telefon,
                eposta: ayarlar.eposta,
                blog,
            });
        });
    });
});
router.get('/blogicerigi', (req, res) => {
    if (req.cookies["blogID"]) {
        schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
            schemaBlogYazilari.findOne({ _id: req.cookies["blogID"] }).then((blogYazisi) => {
                res.render('blogicerigi', {
                    yonetim: 0,
                    baslik1: ayarlar.baslikKisim1,
                    baslik2: ayarlar.baslikKisim2,
                    telefon: ayarlar.telefon,
                    eposta: ayarlar.eposta,
                    blogYazisi,
                });
            });
        });
    }
    else {
        res.redirect('/blog');
    };

});
router.get('/cerezpolitikasi', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        res.render('cerezpolitikasi', {
            yonetim: 0,
            kurumAdi: ayarlar.kurumAdi,
            telefon: ayarlar.telefon,
            eposta: ayarlar.eposta,
        });
    });
});
router.get('/hizmetler', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        res.render('hizmetler', {
            yonetim: 0,
            kurumAdi: ayarlar.kurumAdi,
            telefon: ayarlar.telefon,
            eposta: ayarlar.eposta,
        });
    });
});

router.get('/urunlerimiz', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        schemaUrunlerimiz.find({}).then((urunler) => {
            res.render('urunlerimiz', {
                yonetim: 0,
                kurumAdi: ayarlar.kurumAdi,
                telefon: ayarlar.telefon,
                eposta: ayarlar.eposta,
                urunler,
            });
        });
    });
});
router.get('/yonetim', (req, res) => {
    res.render('login', {
        yonetim: 1
    });
});

router.get('/forgetPass', (req, res) => {
    res.render('forgetPass', {
        yonetim: 1
    });
});

router.all('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;