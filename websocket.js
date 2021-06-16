let joueurs = [];
let nbrefois = 0;
i = 0;
const Joueur = require('./models/joueur');
var min = Math.ceil(10);
var max = Math.floor(15);
const numeroGenerer = Math.floor(Math.random() * (max - min)) + min;
randomNumber = numeroGenerer;


class WebSockets {
    connection(socket) {
        this.joueurs = joueurs;
        console.log('joueurs liste initale', this.joueurs);
        this.index = i;
        let index = this.joueurs.indexOf({user_id: socket.handshake.query.user_id});
        if (index !== null && index !== undefined) {
            this.joueurs.push({
                id: socket.id,
                user_id: socket.handshake.query.user_id,
                score: 0,
                temps: 0,
                result: "",
                guess_number: 0
            });
        } else {
            this.joueurs[index].id = socket.id;
        };
        console.log('pushed joueurs', this.joueurs[this.joueurs.length-1]);
        console.log('users finaleee', this.joueurs);

        let userName = socket.handshake.query.user_id;
        console.log('***********************************************************')
        console.log('User is connected')
        console.log(`Connection params : SocketId = ${socket.id}`);
        console.log(`Connection : user ID = ${socket.handshake.query.user_id}`);
        console.log('***********************************************************')

        io.emit('new_list', {listJoueurs: this.joueurs});

        socket.on('new_joueur', function(data) {
            nbrefois++;
            console.log("Data from joueur", data);
            console.log("Data random number", randomNumber);

            joueurs = joueurs.map((el) => {
                return ({
                    user_id:el.user_id,
                    score:0,
                    temps: el.temps,
                    result:"",
                    guess_number:userName === el.user_id ? data:el.guess_number
                })
            });
                
                if (data == randomNumber) {
                    
                    joueurs = joueurs.map((el) => {
                        return ({
                            user_id:el.user_id,
                            score: userName === el.user_id ? 100:0,
                            temps: el.temps,
                            result: userName === el.user_id ? "success":el.result,
                            guess_number:userName === el.user_id ? data:0
                        })
                    });
                    
                    Joueur.find({pseudo:userName}).then((joueurfound) => {
                        console.log("found !!!",joueurfound)
                        let newscore = Number(joueurfound[0].score)+100
                        Joueur.updateOne({_id: joueurfound[0]._id }, {$set:{score:newscore}}).
                        exec((err, joueur) => {
                            if (!err) {   
                                console.log("updated !!!")
                                console.log("update joueur id", joueurfound[0]._id)
                            } else { 
                                console.log("errrr", err)
                                console.log("update joueur id", joueurfound[0]._id)
                            }       
                        })
                    }).catch((err) => {
                        console.log(err)
                    })                  
                    io.emit('new_result', {result:userName, status:"success", listJoueurs:joueurs, fois:nbrefois});
                    let gagnant = joueurs.filter(el => el.user_id === userName)[0]
                    console.log('gagnant', gagnant)
                    io.emit('gagnant', {result:userName, status:"success", gagnant:gagnant, fois:nbrefois});

                } else {
                    if (data < randomNumber) {
                        joueurs = joueurs.map((el) => {
                            return ({
                                user_id: el.user_id,
                                score: el.score,
                                temps: el.temps,
                                result: userName === el.user_id ? "Trop bas":el.result,
                                guess_number: userName === el.user_id ? data:0
                            })
                        });
                    let basNum = "Trop bas";
                    io.emit('new_result', {result:basNum, status:"failed", listJoueurs:joueurs});
                    } else {
                        let hautNum = "Trop haut";
                        joueurs = joueurs.map((el) => {
                            return ({
                                user_id: el.user_id,
                                score: el.score,
                                temps: el.temps,
                                result: userName === el.user_id ? "Trop haut": el.result,
                                guess_number: userName === el.user_id ? data:0
                            })
                        });
                        io.emit('new_result', {result: hautNum, status: "failed", listJoueurs: joueurs});
                    };
                };
        })
    };
};
module.exports = new WebSockets();






