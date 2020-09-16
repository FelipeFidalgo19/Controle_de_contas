//liga o submit localizado em formulario ao js
document.getElementById('formulario'),addEventListener('submit', Adicionar);

//cria uma variavel que adicona os valores dos inputs referencia e valor
function Adicionar(e){
    var referencia = document.getElementById('referencia').value;
    var valor = document.getElementById('valor').value;
    //cria a condição de que se referencia e valor estiverem vazios então exibe msg
    if(!referencia || !valor){ // || para que if funcione para os 2 para que se 1 estiver vazio já não ocorra nada
	    alert("Por favor preencha os campos em branco");
		  return false;
    }
//contas = carros e conta = carro
    conta = {
        Referencia: referencia,
        Valor: Number.parseFloat(valor),//torna possivel receber valores com mais casas decimais
    }

    
    console.log(conta);

//caixa2 = patio2
    if (localStorage.getItem('caixa2') === null){
      var contas = [];
      contas.push(conta);
      localStorage.setItem('caixa2' , JSON.stringify(contas));
    }else {
      var contas = JSON.parse(localStorage.getItem('caixa2'));
      contas.push(conta);
      localStorage.setItem('caixa2' , JSON.stringify(contas));
    }
    document.getElementById('formulario').reset();//reseta conteudo do formulario

    
   mostraPatio(); //executa a função de adicionar "mostrapatio()" dentro da função de adicionar

    e.preventDefault();

}

//cria uma variavel que adicona os valores dos inputs referencia e valor
function Adicinarg(e){
    var referencia = document.getElementById('referencia').value;
    var valor = document.getElementById('valor').value;
    var valor = valor * -1;
    //cria a condição de que se referencia e valor estiverem vazios então exibe msg
    if(!referencia || !valor){ // || para que if funcione para os 2 para que se 1 estiver vazio já não ocorra nada
      alert("Por favor preencha os campos em branco");
      return false;
    }
    document.location.reload(true);//metodo para Recarregar a pagina 
//contas = carros e conta = carro
    conta = {
        Referencia: referencia,
        Valor: Number.parseFloat(valor),//torna possivel receber valores com mais casas decimais
    }
    
    console.log(conta);

//caixa2 = patio2
    if (localStorage.getItem('caixa2') === null){
      var contas = [];
      contas.push(conta);
      localStorage.setItem('caixa2' , JSON.stringify(contas));
    }else {
      var contas = JSON.parse(localStorage.getItem('caixa2'));
      contas.push(conta);
      localStorage.setItem('caixa2' , JSON.stringify(contas));
    }
    document.getElementById('formulario').reset();


    
    //executa a função de adicionar "mostrapatio()" dentro da função de adicionar
    mostraPatio();
    e.preventDefault();

}
function apagaReferencia(caixa){
  var contas = JSON.parse(localStorage.getItem('caixa2'));
  
   for (var i = 0; i < contas.length; i++){
      if (contas[i].Valor == caixa){ //se o valor de contas for mudado para caixa então
          contas.splice(i ,1);//retirar 1 de contas
    }
       
 }
   localStorage.setItem('caixa2', JSON.stringify(contas));
   mostraPatio();
}
function mostraPatio(){
  	var contas = JSON.parse(localStorage.getItem('caixa2'));
  	var contasResultado = document.getElementById('resultados');
  	var totalResultado = document.getElementById('total');

  	 contasResultado.innerHTML = '';

  	//soma os valores que estão em patio 
	var total = 0;
	for(var i = 0; i < contas.length; i ++){
		var total = contas.map(conta => conta.Valor).reduce((a,b) => a+b);//pesquisar mais  
  }
  var total = Number.parseFloat(total).toFixed(2);//torna resultado com mais 2 casa descimais 
  	  totalResultado.innerHTML = `R$ ${total}`;

	for(var i = 0; i < contas.length; i ++){
      var identificacao = contas[i].Referencia;
      var caixa = contas[i].Valor;
      
      contasResultado.innerHTML += '<tr><td>' + identificacao +
                                	'</td><td>R$' + caixa +
                               		'<td><button class="botao" onclick="apagaReferencia(\''+caixa+'\')">Excluir</button>' +
                                	'</td><tr>';
  }

}