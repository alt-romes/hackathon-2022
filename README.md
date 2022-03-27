# APP Hacker

O APP Hacker é um projeto que tem o objetivo de facilitar o desenvolvimento de aplicações simples.

O cenário que inspirou a criação deste projeto foi a dificuldade da gestão de dados numa investigação no ramo de farmácia.

E se fosse possível fazer uma aplicação que permitisse definir os critérios que pretendemos organizados numa base de dados?

Este necessita apenas do preenchimento dos seguintes critérios:


```
A:
Data | Protocolo | Outcome
==========================
--------------------------------------------
[ Adicionar ] => B
B:
> Data
^ BI
> Protocolo
> Outcome
^ Foto
>> Conclusao
[[ Gravar ]] => A
C:
Data | Protocolo | Outcome | Foto | Conclusao
==================================
----------------------------------------------------------
```

Exemplo
=======

Vamos criar uma aplicação para ajudar a registar dados no processo de investigação.
Necessitamos de ter três páginas: 
- Página principal;
- Tabela com dados;
- Adição de dados.

Para criar a página principal escrevemos:

```
:Lettuce_Irradiation:
Data | Protocolo | Outcome
==========================
---------------------------
[ Adicionar ] => B

```

O título da página escreve-se entre dois pontos: `:Titulo_da_pagina:`

A definição do botão é entre dois parênteses retos: `[ Texto_do_Botão ]`

A navegação para outra página é descrito por: `=> `

A tabela é definida por:

``` 
Campo A | Campo B | Campo C
==========================
--------------------------- 
```

Na realização da tabela de dados: 

```
B:
> Data
^ BI
> Protocolo
> Outcome
^ Foto
>> Conclusao
[[ Gravar ]] => A
```
O input de texto é dado por: `>`

O input de texto longo é através de: `>>`

O upload do ficheiro é feito pelo uso de: `^`

A submissão de dados é atribuída com: `[[]]`


E por fim, para a página de adição de dados:

```
C:
Data | Protocolo | Outcome | Foto | Conclusao
==================================
----------------------------------
```

A separação de dados é possível através do uso de: `==== `






