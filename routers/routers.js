const express = require('express');
const router = express.Router();
const schemaGenelAyarlamalar = require('../models/sacEkim/schemaGenelAyarlamalar');
const schemaAnasayfaSlider = require('../models/sacEkim/schemaAnasayfaSlider');
const schemaHizmetYorumlari = require('../models/sacEkim/schemaHizmetYorumlari');
const schemaOncesiSonrasi = require('../models/sacEkim/schemaOncesiSonrasi');
const schemaBlogYazilari = require('../models/sacEkim/schemaBlogYazilari');

router.get('/', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        if (ayarlar) {
            schemaAnasayfaSlider.find({}).then((slider) => {
                schemaHizmetYorumlari.find({}).then((yorumlar) => {
                    schemaOncesiSonrasi.find({}).then((beforeAfter) => {
                        res.render('index', {
                            yonetim: 0,
                            baslik1: ayarlar.baslikKisim1,
                            baslik2: ayarlar.baslikKisim2,
                            telefon: ayarlar.telefon,
                            eposta: ayarlar.eposta,
                            slider,
                            yorumlar,
                            beforeAfter,
                        });
                    });
                });
            });
        }
        else {
            schemaAnasayfaSlider.find({}).then((slider) => {
                schemaHizmetYorumlari.find({}).then((yorumlar) => {
                    schemaOncesiSonrasi.find({}).then((beforeAfter) => {
                        res.render('index', {
                            yonetim: 0,
                            baslik1: "EKLENCEK",
                            baslik2: "EKLENCEK",
                            telefon: "EKLENCEK",
                            eposta: "EKLENCEK",
                            slider,
                            yorumlar,
                            beforeAfter,
                        });
                    });
                });
            });
        }

    });
});
router.get('/iletisim', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        res.render('iletisim', {
            yonetim: 0,
            baslik1: ayarlar.baslikKisim1,
            baslik2: ayarlar.baslikKisim2,
            telefon: ayarlar.telefon,
            eposta: ayarlar.eposta,
        });
    });
});
router.get('/sss', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        res.render('sss', {
            yonetim: 0,
            baslik1: ayarlar.baslikKisim1,
            baslik2: ayarlar.baslikKisim2,
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
                baslik1: ayarlar.baslikKisim1,
                baslik2: ayarlar.baslikKisim2,
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
            baslik1: ayarlar.baslikKisim1,
            baslik2: ayarlar.baslikKisim2,
            telefon: ayarlar.telefon,
            eposta: ayarlar.eposta,
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