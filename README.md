# ficha5-DinisGoncalves
Rotas da API

GET /api/cartas — Devolve todas as cartas.

GET /api/cartas?tipo=Criatura — Filtra as cartas pelo tipo.

GET /api/cartas/aleatoria — Devolve uma carta aleatória.

POST /api/cartas — Adiciona uma nova carta.

DELETE /api/cartas/:id — Apaga uma carta através do seu ID.

CORS e pedido OPTIONS

O CORS permite a comunicação entre o cliente React (localhost:5173) e o servidor Express (localhost:3000). O pedido OPTIONS é uma verificação (preflight) realizada pelo navegador antes de determinados pedidos, como POST e DELETE, para confirmar se o servidor permite a comunicação.

Persistência dos dados

Os dados das cartas são guardados no ficheiro cartas.json. Quando o servidor inicia, lê os dados do ficheiro. Sempre que uma carta é adicionada ou apagada, o ficheiro é atualizado através do módulo fs. Assim, os dados mantêm-se mesmo depois de reiniciar o servidor.
