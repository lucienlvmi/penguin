const textElement = document.getElementById('text') //this will include the scenes
const optionButtonsElement = document.getElementById('option-buttons') //for options

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
    text: 'Baby P. just woke up and is very hungry. Momma and Poppa are out hunting and he is left all alone. As Baby P. keeps on crying, he looks around to find something to eat ',
    
    options: [
      {
        text: 'Eat the silverfish. It was leftover but should still be good ',
        setState: { silverfish: true },
        nextText: 4
      },
      {
        text: 'Leave the silverfish. You want to eat some fresh crabs. You are a big boy now.',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You went outside and see several men carting their fresh haul for the day.',
    options: [
      {
        text: 'Exchange the silverFish for some fresh Alaskan crabs',
        requiredState: (currentState) => currentState.silverfish,
        setState: { silverFish: false, alaskanCrabs: true },
        nextText: 3
      },
      {
        text: 'Exchange the silverFish for some cuttleFish',
        requiredState: (currentState) => currentState.silverFish,
        setState: { silverFish: false, cuttleFish: true },
        nextText: 3
      },
      {
        text: 'Exchange the silverFish and continue walking along the road',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'As Baby P walks around the small village, he saw a commotion far away',
    options: [
      {
        text: 'Curiosity kills the cat but not a penguin! Check what the commotion is all about',
        nextText: 5
      },
      {
        text: ' Run back to the Colony. Shouldnt have been too eager to see the world ',
        nextText: 6
      },
      {
        text: 'It might be Momma or Poppa looking for him! Baby P. doesnt want to go back yet. Find some place to hide',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Oh No! Baby P. had a diarrhea. It turns out the silverfish is spoiled. Momma and Poppa are not happy and grounded him. He stayed at the colonies for the rest of his life',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'All around you villagers are running away. Mr. Polar OverBear is here. Somehow he smelled the freshly caught alaskan salmon and snow crabs that the men just caught. What do you want to do now? ',
    options: [
      {
        text: 'Play Dead',
        nextText: 8
      },
      {
        text: ' Run back to the Colony ',
        nextText: 6
      },
      {
        text: 'Find some place to hide',
        nextText: 6
      },
    ]
  },
  {
    id: 6,
    text: 'Baby P. clumsily waddle away. It was grumpy Mr. Polar OverBear causing all the commotion. He doesnt want to be eaten and so he tried to run away as fast as his two tiny feet can.',
    options: [
      {
        text: 'Explore the shores',
        nextText: 7
      }
    ]
  },
{  
id: 7,
    text: 'While exploring the shores, Baby P. heard a strange sound',
    options: [
      {
        text: 'Try to investigate what is causing the strange noise',
        nextText: 8
      },
   
      {
        text: 'Attack the strange noise. Throw some Alaskan crabs where the sound is coming from',
        requiredState: (currentState) => currentState.alaskanCrabs,
        nextText: 9
      },
      {
        text: 'Hide and wait till the strange sound stop. Meanwhile, eat the cuttle fish',
        requiredState: (currentState) => currentState.cuttleFish,
        nextText: 10
      },
      {
        text: 'Throw the spoiled silver fish towards the strang sound ',
        requiredState: (currentState) => currentState.silverFish,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Baby P. pretended to play dead. He wanted to run but his two small feet is no match for Mr. Polar OverBear. Mr. OverBear sniff around him. Alas! He didnt believe you are dead and cuff your neck with his oversize paws.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
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
