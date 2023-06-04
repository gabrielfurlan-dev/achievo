import { NextApiRequest, NextApiResponse } from "next"

export const config =
{
    "Report": {
        "id": 1,
        "Date": "2023-05-29T12:34:56Z",
        "name": "Relatório de Exemplo",
        "reportContent": {
            "id": 1,
            "]progressGoals": [
                {
                    "id": 1,
                    "title": "Meta 1",
                    "total": 10,
                    "value": 7
                },
                {
                    "id": 2,
                    "title": "Meta 2",
                    "total": 15,
                    "value": 2
                }
            ],
            "checkGoals": [
                {
                    "id": 1,
                    "title": "Verificar Meta 1",
                    "checked": true
                },
                {
                    "id": 2,
                    "title": "Verificar Meta 2",
                    "checked": false
                }
            ],
            "hits": [
                {
                    "id": 1,
                    "text": "Conquista 1",
                },
                {
                    "id": 2,
                    "text": "Conquista 2",
                }
            ],
            "misses": [
                {
                    "id": 1,
                    "text": "Falha 1",
                },
                {
                    "id": 2,
                    "text": "Falha 2",
                }
            ],
            "learnings": [
                {
                    "id": 1,
                    "text": "Falha 1",
                },
                {
                    "id": 2,
                    "text": "Falha 2",
                }
            ]
        }
    }
}
