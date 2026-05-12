---
title: Recon local antes do payload
slug: recon-local-antes-do-payload
date: 2026-05-08
author: offensive think
summary: Um exemplo técnico em formato zine/NFO mostrando reconhecimento local controlado antes de qualquer payload.
tags: [linux, pentest, opsec, recon]
level: intermediário
reading_time: 12 min
style: nfo
---

```ascii-title
     ___  ___  ___  ___  _  _       _     ___   ___   ___   _    _     
    | _ \/ __|/ __|/ _ \| \| |     | |   / _ \ / __| /   \ | |  | |    
    |   /\__ \ (__| (_) | .` |     | |__| (_) | (__  | - | | |__| |__  
    |_|_\|___/\___|\___/|_|\_|     |____|\___/ \___| |_|_| |____|____| 
```

```nfo-meta
titulo : Recon local antes do payload
autor  : offensive think
data   : 2026-05-08
tags   : linux, pentest, opsec, recon
```

        ----------------------------------------------------------------
        offensive think :: artigo técnico em formato zine / nfo
        ----------------------------------------------------------------

        --> https://www.offensivethink.com/posts/recon-local-antes-do-payload.html <--

```index
0 - Introdução
1 - Escopo e postura operacional
2 - Coleta mínima de contexto
3 - Leitura defensiva dos sinais
4 - Checklist de saída
5 - Referências
```

# 0x00 - Introdução

Reconhecimento local não é sinônimo de barulho. Em uma avaliação autorizada,
a primeira fase deveria responder uma pergunta simples:

    "qual é o terreno antes de qualquer ação mais intrusiva?"

Este texto demonstra um fluxo mínimo, escrito para ambientes de laboratório ou
contratos formais de pentest. A intenção é reduzir erro operacional, registrar
hipóteses e evitar payloads desnecessários.

```warning
Use apenas em sistemas próprios, laboratório controlado ou ambiente com autorização explícita.
```

# 0x01 - Escopo e postura operacional

Antes da técnica, vem o escopo:

- qual host pode ser analisado;
- qual janela de execução foi aprovada;
- quais comandos são permitidos;
- quais evidências devem ser coletadas;
- quem recebe o relatório se algo inesperado aparecer.

## regra de ouro

Se o comando não ajuda a responder uma hipótese do teste, ele provavelmente é ruído.

```note
Em zines antigos, muita coisa era escrita como receita. Em operação real, trate como método: hipótese, evidência, decisão.
```

# 0x02 - Coleta mínima de contexto

Comece por comandos que descrevem o ambiente sem modificar estado relevante.

```payload
$ whoami
analyst

$ hostname
lab-edge-01

$ id
uid=1000(analyst) gid=1000(analyst) groups=1000(analyst),27(sudo)

$ uname -a
Linux lab-edge-01 6.6.0-lab x86_64 GNU/Linux
```

:: usuários e sessões

```payload
$ w
 10:42:11 up 3 days,  2:13,  2 users,  load average: 0.20, 0.18, 0.16
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
analyst  pts/0    10.10.10.5       10:01    1.00s  0.04s  0.00s w
ops      pts/1    10.10.10.9       09:55    8:17   0.02s  0.02s -bash
```

[*] Se há usuário ativo, a prioridade vira coordenação e cautela.

:: rede local

```payload
$ ip -br addr
lo               UNKNOWN        127.0.0.1/8 ::1/128
eth0             UP             10.10.20.14/24 fe80::42:acff:fe11:2/64

$ ss -tulpn
Netid State  Local Address:Port  Peer Address:Port Process
udp   UNCONN 127.0.0.53:53       0.0.0.0:*       -
tcp   LISTEN 127.0.0.1:5432      0.0.0.0:*       -
tcp   LISTEN 0.0.0.0:22          0.0.0.0:*       -
```

# 0x03 - Leitura defensiva dos sinais

O operador ofensivo responsável também observa sinais defensivos. Isso evita
gerar incidentes artificiais e melhora o relatório final.

### sinais úteis

- agentes EDR instalados;
- processos de backup em execução;
- conexões administrativas ativas;
- arquivos sensíveis fora do escopo;
- serviços expostos apenas em localhost.

```payload
$ ps aux | grep -Ei 'edr|sensor|falcon|defender|audit|osquery' | grep -v grep
root        771  0.1  1.2  921100 49840 ?        Ssl  May05   6:42 osqueryd

$ systemctl is-active auditd
active
```

[+] nota operacional

Registrar esses sinais não é "desviar" do teste. É documentar o ambiente para
explicar risco, cobertura e possíveis limitações.

# 0x04 - Checklist de saída

Antes de encerrar a fase de recon local:

- salve comandos e horários;
- separe observações de evidências;
- marque tudo que exige autorização adicional;
- remova arquivos temporários criados durante o teste;
- registre limitações sem tentar compensá-las com improviso.

```payload
$ history | tail -n 20
$ rm -f /tmp/ot-recon-*.txt
$ date -Iseconds
2026-05-08T13:37:00-03:00
```

# 0x05 - Referências

[0] MITRE ATT&CK - Discovery
[1] NIST SP 800-115 - Technical Guide to Information Security Testing and Assessment
[2] Linux man-pages project

---[ EOF ]---------------------------------------------------------------

                    offensive think / 2026
