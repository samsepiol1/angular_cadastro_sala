Módulo Cadastro de Sala - Angular
O modulo de cadastro de sala para o administrador irá salvar os dados na API fazendo uma conexão com esse backend por meio dos recursos que são oferecidos no framework de desenvolvimento Angular. Para que seja possível é necessário a instalação do angular com a utilização do seguinte comando


$ npm install - g @angular/cli
Para integrar o módulo de cadastro de sala com API basta edit o arquivo http-provider.service.ts localizado na pasta services do módulo e adicionar as seguintes linhas no arquivo:


var apiUrl = "http://localhost:8080";

// Outra opção que pode ser usado é adicionar o IP
//var apiUrl = "http://your_IP:8000";

var httpLink = {
  getAllEmployee: apiUrl + "/salas",
  deleteEmployeeById: apiUrl + "/salas",
  getEmployeeDetailById: apiUrl + "/salas",
  saveEmployee: apiUrl + "/salas"
}
feita a integração o sistema já está pronto para uso e os dados inseridos nele serão salvos salvos na API a qual o banco de dados fornece a conexão. Feito isso, para iniciar esse módulo use o comando:


$ ng serve
