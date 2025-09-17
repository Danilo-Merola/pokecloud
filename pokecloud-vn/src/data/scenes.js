export const firstSceneId = 'TITLE';
export const bossSceneId = 'BOSS';

const go = (id) => () => id;

export const scenesById = {
  TITLE: {
    bg: 'lab_bg.png',
    actors: [],
    steps: [
      { type: 'dialogue', name: 'Narrador', text: 'Bem-vindo à Pokecloud VN.' },
      { type: 'dialogue', name: 'Narrador', text: 'Comece um Novo Jogo para ajudar o Professor Carvalho.' },
    ],
    nextId: go('LAB'),
  },

  LAB: {
    bg: 'lab_bg.png',
    actors: [
      { name: 'Professor Carvalho', src: 'prof.png', pos: 'right' },
      { name: 'Pikachu', src: 'pikaa.png', pos: 'left' },
    ],
    extra: { src: 'pokecloud.png', alt: 'Pokecloud', pos: 'center' },
    steps: [
      { type: 'dialogue', name: 'Narrador', text: 'Você está no laboratório do Professor Carvalho. Hoje ele te chamou aqui para te mostrar algumas coisas sobre a nuvem.' },
      { type: 'dialogue', name: 'Professor Carvalho', text: 'Veja o Pikachu: ele só evolui com a pedra do trovão. Os dados também precisam de uma condição especial para ficarem mais fortes e seguros: A Pokecloud!' },
      { type: 'dialogue', name: 'Professor Carvalho', text: 'Eu preciso de sua ajuda. Não posso sair do meu laboratório pois preciso cuidar da manutenção da nuvem. Me ajude a migrar os Pokémons (dados) para a nuvem para derrotar os hackers da Equipe Rocket.' },
      { type: 'dialogue', name: 'Professor Carvalho', text: 'Vá com ele, Pikachu. Se precisar de ajuda, o Pikachu pode te dar dicas.' },
      {
        type: 'choices',
        options: [
          {
            label: 'Pode deixar, professor! Vou ajudar. (pular tutorial)',
            onChoose: (g) => g.go('JOY') // pula direto
          },
          {
            label: 'O que é a Pokecloud?',
            onChoose: (g) => {},
            jump: 5
          },
        ]
      },
      { type: 'dialogue', name: 'Professor Carvalho', text: 'Ah, a Pokecloud? É um sistema em nuvem que permite você ter acesso a todos os seus Pokémons de qualquer lugar do mundo! Contanto que tenha internet.' },
      { type: 'dialogue', name: 'Professor Carvalho', text: 'Passo 1: Abra seu menu e selecione o Pokémon que deseja migrar. Conecte o pendrive físico na lateral do dispositivo Pokecloud.' },
      { type: 'dialogue', name: 'Professor Carvalho', text: 'Passo 2: Aguarde a conexão com a Pokecloud. O dispositivo se conecta ao servidor.' },
      { type: 'dialogue', name: 'Professor Carvalho', text: 'Passo 3: Confirme o envio. Por segurança, responda corretamente uma pergunta.' },
      {
        type: 'quiz',
        flag: 'lab_q1',
        givesLife: true,
        infinite: true, // 👈 tentativas infinitas (fica na mesma pergunta ao errar)
        q: 'De quais locais você pode acessar o servidor da Pokecloud?',
        answers: [
          { label: 'Locais próximos do servidor' },
          { label: 'Qualquer lugar do mundo contanto que tenha conexão com a internet', correct: true },
          { label: 'Qualquer lugar do mundo mesmo offline' },
          { label: 'Apenas do laboratório do Professor Carvalho' }
        ],
        retry: 'Hmm... não tá certo. Tente novamente.'
      },
      { type: 'dialogue', name: 'Narrador', text: 'Pronto! Seu Pokémon está na nuvem e agora pode ser acessado de qualquer lugar, protegido contra hackers.' },
      { type: 'dialogue', name: 'Professor Carvalho', text: 'Viu? É como colocar seu Pokémon em um cofre mágico acessível de qualquer lugar. Se não migrar, fica limitado e, se o pendrive quebrar, já era!' },
    ],
    nextId: go('JOY'),
  },

  JOY: {
  bg: 'centro_pokemon.png',
  actors: [
    { name: 'Enfermeira Joy', src: 'joy.png', pos: 'right' },
    { name: 'Pikachu', src: 'pikachu.png', pos: 'left' },
  ],
  steps: [
    { type: 'dialogue', name: 'Enfermeira Joy', text: 'Olá! O Pikachu se feriu em alguma batalha?' },
    {
      type: 'choices',
      options: [
        { label: 'O Professor Carvalho pediu minha ajuda com a Pokecloud', next: true },
        { label: 'Não, o Pikachu está bem, eu preciso ajudar o professor', next: true },
      ]
    },
    { type: 'dialogue', name: 'Enfermeira Joy', text: 'Com a Pokecloud? Já sabe como funcionam os datacenters que ele está fazendo?' },
    {
      type: 'choices',
      options: [
        // 👇 AGORA pula diretamente para o primeiro quiz (índice 7)
        { label: 'Já sei como funciona, só preciso subir as mídias antes da Equipe Rocket', onChoose: ()=>{}, jump: 7 },
        { label: 'Data... que? Pode explicar?', jump: 4 },
      ]
    },
    { type: 'dialogue', name: 'Enfermeira Joy', text: 'O PC do Professor é como um Datacenter: um prédio cheio de servidores organizados e seguros. Pela cloud você acessa de qualquer lugar.' },
    { type: 'dialogue', name: 'Enfermeira Joy', text: 'Diferente de pendrive/HD de casa, datacenters têm segurança pesada, energia reserva, internet dedicada e protocolos de backup.' },
    { type: 'dialogue', name: 'Enfermeira Joy', text: 'Aqui está um HD com 3 Pokémons. Envie-os para a Pokecloud.' },

    // quizzes
    {
      type: 'quiz',
      flag: 'joy_q1',
      givesLife: true,
      q: 'Onde ficam armazenados os dados em um Datacenter?',
      answers: [
        { label: 'Em computadores espalhados pela cidade' },
        { label: 'Em uma sala organizada com vários servidores', correct: true },
        { label: 'Dentro das Pokébolas' },
        { label: 'Em pastas de papel' }
      ]
    },
    {
      type: 'quiz',
      flag: 'joy_q2',
      givesLife: true,
      q: 'Qual é uma característica principal de um Datacenter?',
      answers: [
        { label: 'Sempre está fechado para acesso' },
        { label: 'Possui segurança, energia e internet dedicadas', correct: true },
        { label: 'É apenas uma nuvem desenhada' },
        { label: 'Funciona sem computadores' }
      ]
    },
    {
      type: 'quiz',
      flag: 'joy_q3',
      givesLife: true,
      q: 'Se o Datacenter parar de funcionar totalmente, o que pode acontecer?',
      answers: [
        { label: 'Os dados ficam inacessíveis', correct: true },
        { label: 'Os dados se transformam em Pokémons' },
        { label: 'Nada acontece' },
        { label: 'O Pikachu resolve sozinho' }
      ]
    },
    { type: 'dialogue', name: 'Pikachu', text: 'Pika pika! (Envio concluído!)' },
  ],
  nextId: () => 'TRAIN',
},

  TRAIN: {
    bg: 'estação.jpg',
    actors: [
      { name: 'Passageiro', src: 'passageiro.png', pos: 'right' },
      { name: 'Pikachu', src: 'pikaa.png', pos: 'left' },
    ],
    steps: [
      { type: 'dialogue', name: 'Narrador', text: 'Sua próxima parada é a biblioteca. No trem, um passageiro puxa assunto sobre nuvem.' },
      { type: 'dialogue', name: 'Passageiro', text: 'Assim como o trem leva você para qualquer cidade, a nuvem permite acessar dados de qualquer lugar com internet.' },
      { type: 'dialogue', name: 'Passageiro', text: 'Valendo um Pokémon: qual a vantagem da nuvem?' },
      {
        type: 'quiz',
        flag: 'train_q1',
        givesLife: true,
        q: 'Qual a vantagem da nuvem?',
        answers: [
          { label: 'Só funciona em um único computador' },
          { label: 'Acessar dados de qualquer lugar com internet', correct: true },
          { label: 'Funciona sem energia elétrica' },
          { label: 'Aumenta o poder dos Pokémons' }
        ]
      },
      { type: 'dialogue', name: 'Passageiro', text: 'O Professor não decepciona! Parabéns.' },
    ],
    nextId: go('PREBOSS'),
  },

  PREBOSS: {
    bg: 'library.png',
    actors: [
      { name: 'passa', src: 'passageiro.png', pos: 'right' },
      { name: 'Pikachu', src: 'pikaa.png', pos: 'left' },
    ],
    steps: [
      { type: 'dialogue', name: 'Narrador', text: 'Na biblioteca você encontra a Equipe Rocket disfarçada. Eles querem testar seus conhecimentos.' },
      { type: 'dialogue', name: 'Jessie', text: 'Datacenter guarda fisicamente. A cloud permite acessar de qualquer lugar, com credenciais para segurança.' },
      {
        type: 'quiz',
        flag: 'pre_q1',
        givesLife: true,
        q: 'Qual a relação entre Datacenter e Cloud?',
        answers: [
          { label: 'São a mesma coisa' },
          { label: 'Datacenter é físico; Cloud é acessível via internet de qualquer lugar', correct: true },
          { label: 'Cloud funciona sem computadores' },
          { label: 'Cloud só existe em jogos' }
        ]
      },
      {
        type: 'quiz',
        flag: 'pre_q2',
        givesLife: true,
        q: 'Quando você usa Pokecloud no dispositivo e no PC, por que isso funciona?',
        answers: [
          { label: 'Porque fica no HD do computador' },
          { label: 'Porque o Pokecloud está na nuvem', correct: true },
          { label: 'Porque o Pikachu carrega as informações' },
          { label: 'Só funciona offline local' }
        ]
      },
    ],
    nextId: go('BOSS'),
  },

  BOSS: {
  bg: 'library.png',
  actors: [
    { name: 'Jessie', src: 'jessie.png', pos: 'right', cls: 'large' }, // maior
    { name: 'James', src: 'james.png', pos: 'left',  cls: 'large' },   // maior
    { name: 'Meowth', src: 'meowth.png', pos: 'center', cls: 'small' }, // pequeno e ao centro
  ],
  steps: [
    { type: 'dialogue', name: 'Jessie', text: 'Surpresa! Vamos ver se você realmente aprendeu.' },
    { type: 'dialogue', name: 'James', text: 'Cada erro tira uma vida!' },
    { type: 'dialogue', name: 'Meowth', text: 'Prepare-se para a batalha da nuvem!' },
    bossQ(1, 'O que é um Datacenter?', [
      'Um prédio cheio de livros antigos',
      'Um conjunto de computadores organizados para armazenar dados com segurança',
      'Apenas um backup na nuvem',
      'Um servidor que funciona sem eletricidade'
    ], 1),
    bossQ(2, 'Vantagem da Cloud vs HD/Pendrive?', [
      'Apenas local',
      'Acessar de qualquer lugar com internet',
      'Mais lenta sempre',
      'Não precisa internet'
    ], 1),
    bossQ(3, 'O que garante que os dados não se percam?', [
      'Energia elétrica constante',
      'Backups duplicados e protocolos de segurança',
      'Pikachu guarda os arquivos',
      'Pastas físicas de papel'
    ], 1),
    bossQ(4, 'Relação Datacenter e Cloud?', [
      'São a mesma coisa',
      'Datacenter é físico; Cloud acessível de qualquer lugar com internet',
      'Cloud funciona sem computadores',
      'Cloud só existe em jogos'
    ], 1),
    bossQ(5, 'Por que o Pokecloud funciona no PC após enviar um Pokémon?', [
      'Porque fica no HD do PC',
      'Porque o Pokecloud está na nuvem',
      'Porque o Pikachu carrega as infos',
      'Funciona só offline'
    ], 1),
    bossQ(6, 'Se algum arquivo se perde no Datacenter, o que acontece?', [
      'Perde para sempre',
      'Nada acontece',
      'São substituídos por backups',
      'Alguém recupera manualmente'
    ], 2),
  ],
  nextId: () => 'VICTORY',
},

  VICTORY: {
    bg: 'library.png',
    actors: [{ name: 'Pikachu', src: 'pikaa.png', pos: 'center' }],
    steps: [
      { type: 'dialogue', name: 'Narrador', text: 'Você protegeu todos os dados! A Equipe Rocket recua.' },
      { type: 'dialogue', name: 'Pikachu', text: 'Pika pii! (Vitória!)' },
      { type: 'choices', options: [{ label: 'Jogar de novo', onChoose: (g) => g.reset() }] },
    ],
    nextId: go('TITLE'),
  },
};

// --- util para perguntas da boss fight ---
import React from 'react';
function bossQ(n, question, options, correctIndex) {
  return {
    type: 'quiz',
    q: question,
    answers: options.map((label, idx) => ({ label, correct: idx === correctIndex })),
    boss: true,
    n,
  };
}
