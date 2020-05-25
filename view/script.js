todos();
$.getJSON("/tipos", function(data) {
    for (i = 0; i < data.length; i++) {
        var interno = data[i].id + ", '" +data[i].nome+ "'";
        $('#tipos').append('<li><a href="#" onclick="tipo('+interno+')">'+iniMaiuscula(data[i].nome)+'</a></li>');		
    }
   
});

function prevent(e){
    e.preventDefault();
}
document.getElementById("search").addEventListener('submit', prevent);

function todos(){
    document.getElementById('Lista-titulo').innerHTML = "Procurar";
    document.getElementById('lista').innerHTML = " ";
	$('#pesquisa').show();
    
    $.getJSON("/arquivos/tipo", function(data) {
        for(i = 0; i < data.length; i++){

            var dir = data[i].local.split('/');
            var diretorio = iniMaiuscula(decodeURI(dir[dir.length-2]));

            $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].tipo+','+data[i].id+')">'+decodeURI(data[i].nome)+'</a></td>'+
            '<td><a href="../dir/'+data[i].id+'" target="blanck">'+diretorio+'</a></td></tr>')
        }
    });
}
function iniMaiuscula(palavra){
    return palavra.substring(0,1).toUpperCase() + palavra.substring(1);
}
function tipo(id, nome){
	$('#pesquisa').hide();
    document.getElementById('Lista-titulo').innerHTML = iniMaiuscula(nome);
    document.getElementById('lista').innerHTML = " ";
    document.getElementById('pesquisa').innerHTML = " ";
    $.getJSON("/arquivos/"+id, function(data) {
        for(i = 0; i < data.length; i++){

            var dir = data[i].local.split('/');
            var diretorio = iniMaiuscula(decodeURI(dir[dir.length-2]));

            $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].tipo+','+data[i].id+')">'+decodeURI(data[i].nome)+'</a></td>'+
            '<td><a href="../dir/'+data[i].id+'" target="blanck">'+diretorio+'</a></td></tr>')
        }
    });
}

function pesquisa(){
   
    var query = $('#search').val();
    if(query == ''){return todos()}
    document.getElementById('Lista-titulo').innerHTML = "Resultados";
    document.getElementById('lista').innerHTML = " ";
    $.getJSON("/search/"+query, function(data) {
        for(i = 0; i < data.length; i++){

            var dir = data[i].local.split('/');
            var diretorio = iniMaiuscula(decodeURI(dir[dir.length-2]));

            $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].tipo+','+data[i].id+')">'+decodeURI(data[i].nome)+'</a></td>'+
            '<td><a href="../dir/'+data[i].id+'" target="blanck">'+diretorio+'</a></td></tr>')
        }
    });
}
function adicionar(){
	$.getJSON('/dialog')
}

function OpenWindow(url)
     {
        config=""
        config+="toolbar=no,";
        config+="resizable=yes," 
        config+="scrollbars=yes,"
        config+="width=740,"
        config+="height=400"
        var window=open(url,"",config);
        window.focus();
     }
var numero = 0;
var player='';
function audio(id){
    
    if(numero !=1){
        $('#musica').append('<audio id="player" src="../abrir/'+id+'" controls autoplay></audio>');
        player = document.getElementById('player');
        numero = 1;
    }else{
        player.src = '../abrir/'+id;
    }
    player.onended = ()=>{
        document.getElementById('musica').innerHTML = " ";
        numero = 0;
        player='';
    }
}

function midia(tipo, id){
    if(tipo == 1)audio(id);
    if(tipo == 2 || tipo == 3){
        OpenWindow("../abrir/"+id);
        if(tipo == 2 && player !='')player.pause();
    }
    if(tipo > 3)OpenWindow("../ab/"+id)
}
