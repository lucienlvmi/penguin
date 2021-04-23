const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'The Baby penguin just woke up and is very hungry. As it keeps on squawking, you tried to look for some food left last night ',
    
    options: [
      {
        text: 'Give the baby some silverfish leftover to eat',
        setState: { silverfish: true },
        nextText: 2
      },
      {
        text: 'Leave the silverfish. You prepare to go out to get some crabs',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You went outside the igloo after packing your stuffs and are planning to get fresh food',
    options: [
      {
        text: 'Trade the silverFish for some fresh crabs',
        requiredState: (currentState) => currentState.silverfish,
        setState: { silverFish: false, crabs: true },
        nextText: 3
      },
      {
        text: 'Exchange the silverFish for some cuttleFish',
        requiredState: (currentState) => currentState.silverFish,
        setState: { silverFish: false, cuttleFish: true },
        nextText: 3
      },
      {
        text: 'Dont exchange the silverFish and continue walking along the path',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'While you are walking, you saw the baby penguin wobbling towards you, you heard a strange sound',
    options: [
      {
        text: 'Look where the strange sound is coming from',
        nextText: 4
      },
      {
        text: 'You tried running away',
        nextText: 5
      },
      {
        text: 'Find some place to hide',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You see the iceberg is cracking. You tried rushing towards the baby penguin',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
//   {
//     id: 5,
//     text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
//     options: [
//       {
//         text: 'Restart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 6,
//     text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
//     options: [
//       {
//         text: 'Explore the castle',
//         nextText: 7
//       }
//     ]
//   },
//   {
//     id: 7,
//     text: 'While exploring the castle you come across a horrible monster in your path.',
//     options: [
//       {
//         text: 'Try to run',
//         nextText: 8
//       },
//       {
//         text: 'Attack it with your sword',
//         requiredState: (currentState) => currentState.sword,
//         nextText: 9
//       },
//       {
//         text: 'Hide behind your shield',
//         requiredState: (currentState) => currentState.shield,
//         nextText: 10
//       },
//       {
//         text: 'Throw the blue goo at it',
//         requiredState: (currentState) => currentState.blueGoo,
//         nextText: 11
//       }
//     ]
//   },
//   {
//     id: 8,
//     text: 'Your attempts to run are in vain and the monster easily catches.',
//     options: [
//       {
//         text: 'Restart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 9,
//     text: 'You foolishly thought this monster could be slain with a single sword.',
//     options: [
//       {
//         text: 'Restart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 10,
//     text: 'The monster laughed as you hid behind your shield and ate you.',
//     options: [
//       {
//         text: 'Restart',
//         nextText: -1
//       }
//     ]
//   },
//   {
//     id: 11,
//     text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
//     options: [
//       {
//         text: 'Congratulations. Play Again.',
//         nextText: -1
//       }
//     ]
//   }
// ]
]
startGame()
