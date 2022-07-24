class Forca {
  constructor(palavra) {
    this.estado = "aguardando chute";
    this.letrasChutadas = [];
    this.palavra = [];
    this.vidas = 6;
    this.palavraTarget = palavra;

    this.preencherUnderscores();
  }

  chutar(letra) { 
    if(this.deveIgnorarJogada(letra))
      return;

    this.letrasChutadas.push(letra);
    
    if(!this.acerto(letra))
    {
      this.subtraiVida();    
    }
  }

  acerto(letra) {
    if(this.palavraTarget.includes(letra)) {
      this.substituirOcorrencias(letra);
      this.validaVitoria();
      return true;
    }

    return false;
  }

  preencherUnderscores(){
    for(let i = 0; i < this.palavraTarget.length; i++){
      this.palavra.push("_");
    }
  }

  validaVitoria(){
    if(!this.palavra.includes("_")){
      this.estado = "ganhou";
    }  
  }

  deveIgnorarJogada(letra) {
    return this.letrasChutadas.includes(letra) 
           || letra.length > 1;
  }

  subtraiVida() {
    this.vidas--;

    if(this.vidas === 0){
      this.estado = "perdeu";
    }
  }

  substituirOcorrencias(letra){
    for(let i = 0; i < this.palavraTarget.length; i++){

      if(this.palavraTarget[i] === letra)
        this.palavra[i] = letra;
    }
  }

  buscarEstado() { return this.estado; } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
          vidas: this.vidas, // Quantidade de vidas restantes
          palavra: this.palavra // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }
}

module.exports = Forca;
