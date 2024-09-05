
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
export default function ClientesPDF(contatos) {
pdfMake.vfs=pdfFonts.pdfMake.vfs;
const reportTitle=[
  {
    text:'Clientes',
    fontSize:15,
    bold:true,
    margin:[15,20,0,45]

  }
];
const dados=contatos.map((contato)=>{
return[
  {
    text:contato.nome,fontSize:10,margin:[0,2,0,2]
  },
  {
    text:contato.emails,fontSize:10,margin:[0,2,0,2]
  },
  {
    text:contato.telefones,fontSize:10,margin:[0,2,0,2]
  },
]
})

const details=[
{
  table:{
    headerRows:1,
    // coluna dinamica
    widths:['*','*','*'],
    body:[
      [
  {
    text:'Nome',style:'tableHeader',fontSize:10, bold:true,
  },
  {
    text:'Email',style:'tableHeader',fontSize:10, bold:true,
  },
  {
    text:'Telefone',style:'tableHeader',fontSize:10, bold:true,
  },
      ],

   ...dados

    ]
  },
  layout:'lightHorizontalLines',
}
]
function Rodape(currentPage,pageCount){
return[
  {
    // numero e total de paginas
    text:currentPage+'/'+pageCount,
    alignment:'right',
    fontSize:9,
    margin:[0,10,20,0]

  }
]
}
const docDefinitions={
  pageSize:'A4',
  pageMargins:[15,50,15,40],
  header:[reportTitle],
  content:[details],
  footer:Rodape
}
pdfMake.createPdf(docDefinitions).download();
}
