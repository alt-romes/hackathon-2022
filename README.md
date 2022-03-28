# Demo

https://www.youtube.com/watch?v=HoUoaOkqhfA

# APP Hacker

O APP Hacker é um projeto que tem o objetivo de promover e facilitar o desenvolvimento de aplicações simples.

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
--------------------------
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

A separação de dados é possível através do uso de: `==== `

Para criar o formulário de inserção da tabela: 

```
:Form:
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
:Mais_Dados:
Data | Protocolo | Outcome | Foto | Conclusao
=============================================
---------------------------------------------
```

Design da app completo:
```
:Lettuce_Irradiation:
Data | Protocolo | Outcome
==========================
--------------------------
[ Adicionar ] => Form
[ Mais Dados ] => Mais_Dados

:Form:
> Data
^ BI
> Protocolo
> Outcome
^ Foto
>> Conclusao
[[ Gravar ]] => :Lettuce_Irradiation:

:Mais_Dados:
Data | Protocolo | Outcome | Foto | Conclusao
=============================================
---------------------------------------------
```

## Exemplo de Aplicação gerada 

![lettucemain](https://user-images.githubusercontent.com/44882796/160276676-fd579b42-f89d-44c3-9739-e7e62411c16c.PNG)

![lettuceform](https://user-images.githubusercontent.com/44882796/160276678-20d5aa69-6f59-4a7e-8da8-2173303b61c9.PNG)

