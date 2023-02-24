# WeasyPrint Wrapper

Este projeto é um exemplo de como criar um wrapper simples para utlizar [WeasyPrint](https://weasyprint.org) no Node.js.

## Motivação

Eventualmente as aplicações que desenvolvo precisam gerar arquivos PDF para emissão de faturas, certificados, boletos bancários, etc... E a maneira mais rápida de fazer isso é criando um template HTML e convertendo ele para PDF usando alguma biblioteca.
No caso do PHP por exemplo, existe a [dompdf](https://github.com/dompdf/dompdf) que é amplamente utilizada.

Mas quando vamos para o ambiente Node.js, encontramos três principais problemas:

- Bibliotecas que não recebem atualização à 2, 7, 9 anos
- Bibliotecas que geram PDF, mas não à partir de um HTML, como [pdfkit](https://pdfkit.org/) e derivadas
- Bibliotecas que dependem do Puppeteer, PhantomJS (esse inclusive foi abandonado) e outras que utilizam headless browser

Para muitos casos, a última alternativa funciona bem, inclusive é muito recomendada por devs influenciadores.

Porém imagine o cenário onde para cada cliente realizando uma compra através de boleto bancário, o seu server vai abrir uma nova aba do Chromium, chamar a função print() e retornar o arquivo PDF gerado. Se torna uma alternativa inviável.

A solução para esse problema foi econtrar uma lib de outra plataforma (python) e chamá-la através das funções do child_process do Node.js.

## WeasyPrint vs. wkhtmltopdf

Minha primeira alternativa depois de muitas pesquisas foi desenvolver um wrapper para [wkhtmltopdf](https://wkhtmltopdf.org) (já existem alguns, porém não recebem atualizações).

A princípio funcionou bem, mas tive problemas de compatibilidade ao instalar em diferentes distribuições Linux.

Lendo o site especificamente na página de status, vi as recomendações que eles fazem de outras libs, entre elas a [WeasyPrint](https://weasyprint.org).

## Requerimentos

Obviamente é necessário instalar a WeasyPrint no SO em que a sua aplicação vai rodar. Para mim funcionou dessa forma:

No **Ubuntu 22.04** só precisei executar `sudo apt instal weasyprint` e funcionou. O repositório oficial apontou para a versão 54 da weasyprint.

No **Alpine** precisei instalar mais algumas dependências para a lib funcionar corretamente. Sem essas dependências os caracteres renderizaram como retângulos pretos.

    apk add fontconfig freetype ttf-dejavu ttf-droid ttf-freefont ttf-liberation weasyprint

Construí uma imagem Docker com essas dependências e funcionou muito bem. A versão do weasyprint instalada foi a 57.

No **Ubuntu 20.04** tive problemas, a versão que do repositório oficial é a 51, que me retornou alguns erros. Decidi então instalar a weasyprint no sistema via **pip**. Deve funcionar para a maioria das distros Linux rodando o **python3** 🐍.

O processo de instalar foi o seguinte:

**1 - Instalar as dependências recomendadas no [site](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#linux)**

    sudo apt install python3-pip python3-cffi python3-brotli libpango-1.0-0 libharfbuzz0b libpangoft2-1.0-0

**2 - Instalar o WeasyPrint via pip3**
`sudo pip3 install weasyprint`

**3 - Adicionar o weasyprint no $PATH**
A maneira mais fácil é deixar o sistema fazer isso por você **reiniciando o sistema**😉

**4 - Verifique se a instalação funcionou**
Digite o comando no terminal: `weasyprint --version`

Para informações mais detalhadas, vale a pena consultar a [documentação oficial](https://doc.courtbouillon.org/weasyprint/stable/index.html).

---

Desenvolvido com ❤️ por [@jeanvcastro](https://github.com/jeanvcastro)
