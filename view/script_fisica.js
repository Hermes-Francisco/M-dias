todos();
function listar_tipos(){
	document.getElementById('tipos').innerHTML = " "
	$.getJSON("/tipos", function(data) {
		for (i = 0; i < data.length; i++) {
			var interno = data[i].id + ", '" +data[i].nome+ "'";
			$('#tipos').append('<li><a href="#" onclick="tipo('+interno+')">'+iniMaiuscula(data[i].nome)+'</a></li>');		
		}
	});	
}


function prevent(e){
    e.preventDefault();
}
document.getElementById("search").addEventListener('submit', prevent);

const host = (window.location.hostname == "localhost");
if(!host)$(".config").hide();

var tipo_id;
var tipo_nome;

function todos(){
	
	listar_tipos();
    document.getElementById('Lista-titulo').innerHTML = "Procurar";
    document.getElementById('lista').innerHTML = " ";
	$('#pesquisa').show();
    
    $.getJSON("/arquivos/tipo", function(data) {
        for(i = 0; i < data.length; i++){

            var dir = data[i].local.split('/');
            var diretorio = iniMaiuscula(decodeURI(dir[dir.length-2]));
			var dirLink = ((host)?"'../dir/"+data[i].id+"' target='blanck'":"#");
			var interno = 'excluir('+data[i].id+', "'+decodeURI(data[i].nome)+'")'
			var opcao = ((host)?"<td><a href='#' onclick='editar("+data[i].id+")'><img src='/lapis' style='margin-right:5px' height='20'></img></a>" + 
			"<a href='#' onclick='"+interno+"'><img src='/lixeira' style='margin-left:5px' height='20'></img></a></td>": "")

            $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].tipo+','+data[i].id+')">'+decodeURI(data[i].nome)+'</a></td>'+
            '<td><a href='+dirLink+'>'+diretorio+'</a></td>'+opcao+'</tr>')
        }
    });
	tipo_id = 0;
	tipo_nome = "";
}
function iniMaiuscula(palavra){
    return palavra.substring(0,1).toUpperCase() + palavra.substring(1);
}
function tipo(id, nome){
	
	listar_tipos();
	$('#pesquisa').hide();
    document.getElementById('Lista-titulo').innerHTML = iniMaiuscula(nome);
    document.getElementById('lista').innerHTML = " ";
	
    $.getJSON("/arquivos/"+id, function(data) {
        for(i = 0; i < data.length; i++){

            var dir = data[i].local.split('/');
            var diretorio = iniMaiuscula(decodeURI(dir[dir.length-2]));
			var dirLink = ((host)?"'../dir/"+data[i].id+"' target='blanck'":"#");
			var interno = 'excluir('+data[i].id+', "'+decodeURI(data[i].nome)+'")'
			var opcao = ((host)?"<td><a href='#' onclick='editar("+data[i].id+")'><img src='/lapis' style='margin-right:5px' height='20'></img></a>" + 
			"<a href='#' onclick='"+interno+"'><img src='/lixeira' style='margin-left:5px' height='20'></img></a></td>": "")

            $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].tipo+','+data[i].id+')">'+decodeURI(data[i].nome)+'</a></td>'+
            '<td><a href='+dirLink+'>'+diretorio+'</a></td>'+opcao+'</tr>')
        }
    });
	tipo_id = id;
	tipo_nome = nome;
}

function pesquisa(){
    var query = $('#pesq').val();
    if(query == ''){
		todos();
	}else{
	listar_tipos();
    document.getElementById('Lista-titulo').innerHTML = "Resultados";
    document.getElementById('lista').innerHTML = " ";
	
    $.getJSON("/search/"+query, function(data) {
        for(i = 0; i < data.length; i++){

            var dir = data[i].local.split('/');
            var diretorio = iniMaiuscula(decodeURI(dir[dir.length-2]));
			var dirLink = ((host)?"'../dir/"+data[i].id+"' target='blanck'":"#");
			var interno = 'excluir('+data[i].id+', "'+decodeURI(data[i].nome)+'")'
			var opcao = ((host)?"<td><a href='#' onclick='editar("+data[i].id+")'><img src='/lapis' style='margin-right:5px' height='20'></img></a>" + 
			"<a href='#' onclick='"+interno+"'><img src='/lixeira' style='margin-left:5px' height='20'></img></a></td>": "")

            $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].tipo+','+data[i].id+')">'+decodeURI(data[i].nome)+'</a></td>'+
            '<td><a href='+dirLink+'>'+diretorio+'</a></td>'+opcao+'</tr>')
        }
    });
	tipo_id = 0;
	tipo_nome = "";
	}
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
    if(tipo > 3)OpenWindow(((host)?"../ab/"+id : "../abrir/"+id))
}
function excluir(id, nome){
	var pergunta = confirm("Deseja excluir o arquivo '"+nome+"' da lista?")
	if(pergunta){
		var xhr = new XMLHttpRequest();
        xhr.open("delete", '/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            "id": id
        }));
		xhr.response;
		if(tipo_id > 0)tipo(tipo_id, tipo_nome);
		else todos();
	}
}
var id_editado = 0;
var input_nome = document.getElementById("nome_arquivo");
var input_local = document.getElementById("local_arquivo");
	
function editar(id){
	$('#main').hide();
	$('#update').show();
	
	$.getJSON("/show/"+id , function(data) {
		input_nome.value = decodeURI(data[0].nome);
		input_local.value = decodeURI(data[0].local)
	});
	id_editado= id;
}
function salvar(){
	var tipo_update = input_local.value.split('.');
	tipo_update = tipo_update[tipo_update.length-1];
	
	var xhr = new XMLHttpRequest();
        xhr.open("put", '/' +id_editado, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
			"nome": encodeURI(input_nome.value),
			"local": encodeURI(input_local.value),
			"tipo" : tipo_update
        }));
		xhr.response;
	if(tipo_id > 0)tipo(tipo_id, tipo_nome);
	else todos();
	
    $('#main').show();
	$('#update').hide();
	id_editado = 0;
}
function cancelar(){
	input_local.value = "";
	input_nome.value = "";
	$('#main').show();
	$('#update').hide();
	id_editado = 0;
}