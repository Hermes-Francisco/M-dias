todos();
tipo_vetor = [];
function listar_tipos(){
	document.getElementById('tipos').innerHTML = " ";
	$.getJSON("/tipo_fisica", function(data) {
		for (i = 0; i < data.length; i++) {
			var interno = data[i].id + ", '" +data[i].nome+ "'";
			$('#tipos').append('<li><a href="#" onclick="tipo('+interno+')">'+iniMaiuscula(data[i].nome)+'</a></li>');		
            tipo_vetor[data[i].id] = iniMaiuscula(data[i].nome);
        }
    });    

    document.getElementById('tipo_arquivo2').innerHTML = " ";
    $.getJSON("/tipo_fisica", function(data) {
		for (i = 0; i < data.length; i++) {
			$('#tipo_arquivo2').append('<option value='+data[i].id+'>'+iniMaiuscula(data[i].nome)+'</option>');		
		}
    });
    document.getElementById('tipo_arquivo3').innerHTML = " ";
    $.getJSON("/tipo_fisica", function(data) {
		for (i = 0; i < data.length; i++) {
			$('#tipo_arquivo3').append('<option value='+data[i].id+'>'+iniMaiuscula(data[i].nome)+'</option>');		
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
    
    $.getJSON("/fisica/tipo", function(data) {
       for(i = 0; i < data.length; i++){

          var interno = 'excluir('+data[i].id+', "'+decodeURI(data[i].nome)+'")'
			var opcao = "<td><a href='#' onclick='editar("+data[i].id+")'><img src='/lapis' style='margin-right:5px' height='20'></img></a>" + 
			"<a href='#' onclick='"+interno+"'><img src='/lixeira' style='margin-left:5px' height='20'></img></a></td>"
            var nome_do_tipo = "'"+tipo_vetor[data[i].tipo]+"'";
            $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].id+')">'+decodeURI(data[i].nome)+'</a>'+
            '<td><a href="#"onclick="tipo('+data[i].tipo+','+nome_do_tipo+')">'+tipo_vetor[data[i].tipo]+'</a></td></td>'+opcao+'</tr>')
        }
    });
	tipo_id = 0;
	tipo_nome = "";
}

function iniMaiuscula(palavra)
{
    return palavra.substring(0,1).toUpperCase() + palavra.substring(1);
}

function tipo(id, nome){
	
	listar_tipos();
	$('#pesquisa').hide();
    document.getElementById('Lista-titulo').innerHTML = iniMaiuscula(nome);
    document.getElementById('lista').innerHTML = " ";
	
    $.getJSON("/fisica/"+id, function(data) {
       for(i = 0; i < data.length; i++){

          var interno = 'excluir('+data[i].id+', "'+decodeURI(data[i].nome)+'")'
			var opcao = "<td><a href='#' onclick='editar("+data[i].id+")'><img src='/lapis' style='margin-right:5px' height='20'></img></a>" + 
			"<a href='#' onclick='"+interno+"'><img src='/lixeira' style='margin-left:5px' height='20'></img></a></td>"

            $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].id+')">'+decodeURI(data[i].nome)+'</a>'+
            '<td><a href="#">'+tipo_vetor[data[i].tipo]+'</a></td></td>'+opcao+'</tr>')
        }
    });
	tipo_id = id;
	tipo_nome = nome;
}

function pesquisa()
{
    var query = $('#pesq').val();
    if(query == ''){
		todos();
	}else{
	listar_tipos();
    document.getElementById('Lista-titulo').innerHTML = "Resultados";
    document.getElementById('lista').innerHTML = " ";
	
    $.getJSON("/search/"+query, function(data) {
        for(i = 0; i < data.length; i++){

            var interno = 'excluir('+data[i].id+', "'+decodeURI(data[i].nome)+'")'
              var opcao = "<td><a href='#' onclick='editar("+data[i].id+")'><img src='/lapis' style='margin-right:5px' height='20'></img></a>" + 
              "<a href='#' onclick='"+interno+"'><img src='/lixeira' style='margin-left:5px' height='20'></img></a></td>"
              var nome_do_tipo = "'"+tipo_vetor[data[i].tipo]+"'";
              $('#lista').append('<tr><td><a href="#" onclick="midia('+data[i].id+')">'+decodeURI(data[i].nome)+'</a>'+
              '<td><a href="#"onclick="tipo('+data[i].tipo+','+nome_do_tipo+')">'+tipo_vetor[data[i].tipo]+'</a></td></td>'+opcao+'</tr>')
        }
    });
	tipo_id = 0;
	tipo_nome = "";
	}
}
function adicionar()
{
    $('#main').hide();
    $('#adicionar').show();
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

function midia(id){
    OpenWindow('/fisica/show/'+id)
}
function excluir(id, nome){
	var pergunta = confirm("Deseja excluir o arquivo '"+nome+"' da lista?")
	if(pergunta){
		var xhr = new XMLHttpRequest();
        xhr.open("delete", '/fisica', true);
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

var adicionar_nome = document.getElementById("nome_adicionar");
var adicionar_local = document.getElementById("local_adicionar");
var adicionar_tipo = document.getElementById("tipo_arquivo3");

var input_nome = document.getElementById("nome_arquivo");
var input_local = document.getElementById("local_arquivo");
var input_tipo = document.getElementById("tipo_arquivo2");

	
function editar(id)
{
	$('#main').hide();
    $('#update').show();
	
	$.getJSON("/fisica/id/"+id , function(data) {
		input_nome.value = decodeURI(data[0].nome);
        input_local.value = decodeURI(data[0].local);
        console.log(data[0].tipo)
        input_tipo.value = data[0].tipo;
	});
	id_editado= id;
}

//Midia fisica
function cancelar()
{
    $('#adicionar').hide();
    $('#update').hide();
    $('#main').show();
    input_local.value = "";
    input_nome.value = "";
    id_editado = 0;
}

function salvarFisica()
{
    var xhr = new XMLHttpRequest();
    
    xhr.open("post", '/fisica' , true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(
        JSON.stringify({
            "nome": encodeURI(adicionar_nome.value),
            "local": encodeURI(adicionar_local.value),
            "tipo" : encodeURI(adicionar_tipo.value),
        })
    );

    xhr.response;
    
    adicionar_local.value = "";
    adicionar_nome.value = "";
	$('#adicionar').hide();
    $('#main').show();
}
function salvar()
{
    var xhr = new XMLHttpRequest();
    
    xhr.open("put", '/fisica/'+id_editado , true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.send(
        JSON.stringify({
            "nome": encodeURI(input_nome.value),
            "local": encodeURI(input_local.value),
            "tipo" : encodeURI(input_tipo.value),
        })
    );

    xhr.response;
    id_editado = 0;
	$('#update').hide();
    $('#main').show();
}