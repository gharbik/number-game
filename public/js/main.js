var userId = localStorage.getItem("joueur_id");
var socket = io.connect('/', {query: {user_id: userId }}, function(socket) {
  console.log('User is connected')
});

socket.on('new_list', function(data) {
  console.log(data.listJoueurs);
  appendListJoueur(data.listJoueurs);     
});

// Div gagnant apparait quand le status "success" est rempli
socket.on('gagnant', function(data) {
  console.log("Data of gagnant ", data);
  gagnant = data.gagnant; 
  document.getElementById("resultsDiv").innerHTML = "";
  var createDiv = document.createElement('div');
  var createP = document.createElement('p');
  var textP = document.createTextNode(data.gagnant.user_id + " a gagné" + " (" + data.fois + " tentatives)");
  createP.id = "scoreDetails";     
  createP.appendChild(textP);
  var elementDiv = document.getElementById('resultsDiv');
  elementDiv.appendChild(createDiv);
  var elementP = document.getElementById('resultsDiv');
  elementP.appendChild(createP);
});

    
// Scores joueurs connectés  
socket.on('new_result', function(data) {
  console.log('status:', data.status);
  console.log('result:', data.result);
  console.log('result:', data.listJoueurs);

  if (data.status === "success") {
    let joueurGagnant = "Bravo !";
    document.getElementById('resultJoueur').innerHTML = joueurGagnant;
    document.getElementById('recNum').innerHTML = document.getElementById('numGuess').value;
    document.getElementById("recResultJoueur").innerHTML = document.getElementById("pseudo").value;
    addElement();
  } else {
    if (data.result === "basNum" ) {
      let basNum = "Trop bas";
      document.getElementById('resultJoueur').innerHTML = basNum;
      document.getElementById('recNum').innerHTML = document.getElementById('numGuess').value;
      document.getElementById("recResultJoueur").innerHTML = document.getElementById("pseudo").value;
    } else {
      let hautNum = "Trop haut";
      document.getElementById('resultJoueur').innerHTML = hautNum;
      document.getElementById('recNum').innerHTML = document.getElementById('numGuess').value;
    document.getElementById("recResultJoueur").innerHTML = document.getElementById("pseudo").value;
    }
  };
});

// Envoyer la data entrée par le joueur
function sendData() {
  guessNumber = document.getElementById('numGuess').value;
  socket.emit('new_joueur', guessNumber)
  // location.reload();
  document.getElementById("recNum") = document.getElementById("recNum").value
};

function appendData(data) {
  var sectionContainer = document.getElementById("list_joueur")
  for (var i = 0; i < data.length; i++) {
    var div2 = document.createElement("div");
    div2.id = "guessResultPlayerOne";
    div2.innerHTML = "<strong>Joueur : <b id='recResultJoueur'>" + data[i].pseudo + "</b><br></strong><b id='recNum' class='recScore'>" + data[i].score 
    div2.classList.add("box_show");
    sectionContainer.appendChild(div2);
  };
};

function appendListJoueur(data) {
  var sectionContainer = document.getElementById("list_joueur_current");
  for (var i = 0; i < data.length; i++) {
    var div2 = document.createElement("div");
    div2.id = "guessResultPlayerOne";
    div2.innerHTML = "<strong>Joueur : <b id='recResultJoueur'>" + data[i].user_id + "</b><br></strong><b id='recNum' class='recScore'>" + data[i].guess_number + "</b><br> <div id='resultJoueur'>" + data[i].result + "</div>"
    div2.classList.add("box_show");
    sectionContainer.appendChild(div2);
  };
};

window.onload = readJoueurs();
function readJoueurs() {
  $(document).ready(function() {
    $.ajax({
      url: "/joueurs/all",
      dataType: "json",
      type: "get",
      contentType: "application/json",
      processData: false,
      success: function (data, textStatus, jQxhr) {
        console.log(data.data)
        appendData(data.data)
        console.log('joueurrrrr')
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  })
};

// Ajouter le nom d'utilisateur connecté
window.onload = getUser();
function getUser() {
  var user = localStorage.getItem("joueur_id");
  var pp = document.createElement("div");
  pp.innerHTML = "<p>joueur</p>";
  document.getElementById("joueur_name").innerHTML = "<p>Joueur : "+ user + "</p>";
}; 