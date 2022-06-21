var FT = [
    ['salade de crevettes','10'],
    ['salade de betteraves','8'],
    ['salade composée','12'],
    ['Soupe froide','12'],
    ['Terrine de campagne','10'],
    ['Assiette froide','13'],
    ['salade hawaïenne','11'],
    
    ['Hâchi parmentier','10'],
    ['Dos de lotte safrané','8'],
    ['Poulet rôti','12'],
    ['Raviolis','12'],
    ['Paëlla','10'],
    ['Poisson pané','13'],
    ['Chou farci','11'],
    
    ['salade de fruits','10'],
    ['Compote de pommes','8'],
    ['Fromages','12'],
    ['Flan','12'],
    ['Yaourt sucré','10'],
    ['Tarte citron','13'],
    ['Meringues','11'],
];

function allowDrop(ev) {
    ev.preventDefault();
    var to = ev.target;
    while( !to.hasAttribute('draggable')) {
      to = to.parentNode;
    }
    to.className = "droppable";
}

function leaveDrop(ev) {
    ev.preventDefault();
    var to = ev.target;
    while( !to.hasAttribute('draggable')) {
      to = to.parentNode;
    }
    to.className = "ft";
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var to = ev.target;
    var data = ev.dataTransfer.getData("text");
    var from = document.getElementById(data);
    
    while( !to.hasAttribute('draggable')) {
      console.log(to.outerHTML);
      to = to.parentNode;
    }
      
    var fromParent = from.parentNode;
    var toParent = to.parentNode;
    toParent.className = "ft"; 
    fromParent.className = "ft"; 
    toParent.appendChild(from) ;
    fromParent.appendChild(to);
}

function init() {
  var table = document.getElementById('cm');
  var nbRows = Math.round(FT.length/7);
  for(var r=0; r<nbRows ; r++) {
    var row = document.createElement('TR');
    for(var i=0; i<7; i++) {
      var item = FT[r*7+i];
      var td = document.createElement('TD');
      var div = document.createElement('DIV');
      div.innerHTML = '<span class="recipe">'+item[0]+'</span><span class="eff" contenteditable="true">'+item[1]+'</span>';
      div.id = i + r*7;
      div.className = "ft";
      div.setAttribute("draggable","true");
      div.addEventListener("drop", drop);
      div.addEventListener("dragover", allowDrop);
      div.addEventListener("dragstart", drag);
      div.addEventListener("dragleave", leaveDrop);
      
      td.appendChild(div);
      row.appendChild(td);
    }
    table.appendChild(row);
  }
  
  document.body.appendChild(table);
}

init();