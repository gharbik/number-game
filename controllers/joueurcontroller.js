'use strict';
const Joueur = require('../models/joueur');
module.exports = {
    CreateJoueur: function (req, res) {
        const newJoueur = {
            pseudo: req.body.pseudo,
            score: req.body.score,
            temps: req.body.temps,
            password: req.body.password
        };
        console.log("newJoueur", newJoueur);
        Joueur.create(newJoueur, (err, Joueur) => {
            if (err)
                res.status(500).json
                ({
                    message: err,
                    statut: 500
                })
            else
                res.status(200).json({
                    message: 'Joueur added',
                    statut: 200,
                    joueur: Joueur
                })
        });
    },
    GetALLJoueur: function (req, res) {
        Joueur.find({}).exec((err, Joueurs) => {
            if (err)
                res.json({
                    message:"error"+ err,
                    statut: 500
                })
            else
                res.json({
                    message: 'Joueur founded',
                    statut: 200,
                    data: Joueurs
                })
        })
    },
    UpdateScore: function (req, res) {
        Joueur.updateOne({ _id: req.params.id }, {$set:{score:req.body.score, temps:req.body.temps}}).
        exec((err, joueur) => {
            if (err)
                res.json({
                    message: err,
                    statut: 500
                })
            else
                res.json({
                    message: 'Score and temps of joueur are updated',
                    statut: 200,
                    data: joueur
                })
        })
    },

    findByPseudo: function (req, res, next) {
        if (!req.body.pseudo  || req.body.pseudo == null) {
            res.status(400).json({ status: "Failed", message: "Entrez un pseudo  ", data: null });
        } else {
            Joueur.findOne({pseudo: req.body.pseudo }, function (err, userInfo) {
                if (userInfo == undefined) {
                    res.json({ status: "500", message: "Joueur non existant!!", data: null });
                }
                else {
                        res.json({ status: "200", message: "Joueur trouvé!!", data: userInfo });
                }
            });
        }
    },

    login: function (req, res, next) {
        if (!req.body.pseudo  || req.body.pseudo == null) {
            res.status(400).json({ status: "Failed", message: "Entrez un pseudo  ", data: null });
        } else {
            Joueur.findOne({ $and:[{pseudo: req.body.pseudo},{password: req.body.password}] }, function (err, userInfo) {
                if (userInfo == undefined) {
                    res.json({ status: "500", message: "Joueur non existant!!", data: null });
                }
                else {
                        res.json({ status: "200", message: "Joueur trouvé!!", data: userInfo });
                    }
                }
            );
        }
    }  
};