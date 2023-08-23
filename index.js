let refreshValue = 0
let errorCount = 0
let errorCheckCount = 0
let errorCloseCount = 0
const random = Math.random()
const randomNumber = Math.floor(random * 9) + 1
let xVal = 0

logM()
checkConvToken()
checkIframe()

async function logM() {
  console.log("Starting the load of UCHAT Script");

  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = `https://www.uchat.com.au/js/widget/h0ey00a9hg9wjfyx/float.js?ref=blog--${randomNumber}`;

  const head = document.getElementsByTagName("head")[0];
  head.appendChild(script);
}


async function checkConvToken() {
  let newCookie = document.cookie
  const strToCheck = 'conv_token'

  if (newCookie.includes(strToCheck)) {
    console.log('Conv_Token found')
    clickandClose()
  } else {
    console.log('Conv_Token not found')
    setTimeout(checkConvToken, 500)
  }
}

function clickandClose() {
  console.log('uChat widget script has been loaded.')

  checkTarget()
  checkClose()
}

async function checkTarget() {
  const targetElement = document.querySelector('.bot-widget-bubble.bot-elements--right.bot-elements--right')
  const element = document.getElementById('chatbot_live_chat_widget')

  if (targetElement) {
    setTimeout(() => {
      targetElement.click()
      element.style.visibility = "hidden"

      console.log('Element clicked')
      refreshValue = 6
    }, 1500)
  } else {
    console.log('Element not found! Waiting for it to exist', errorCheckCount)
    if (errorCheckCount < 250) {
      setTimeout(checkTarget, 100)
    }

    errorCheckCount = errorCheckCount + 1
  }
}

async function checkClose() {
  const closeElement = document.querySelector(
    '.bot-elements--right.bot-elements--right.bot-widget-bubble.bot--close'
  )
  const element = document.getElementById('chatbot_live_chat_widget')

  if (closeElement && refreshValue === 6) {
    setTimeout(() => {
      closeElement.click()
      element.style.visibility = "visible"
      console.log('Element Closed')
      xVal = 1298
      console.log('Set xVal to 1298')
      // setupMutationObserver();
    }, 500)
  } else {
    console.log('Close not found. Waiting for it to exist', errorCloseCount)
    if (errorCloseCount < 250) {
      setTimeout(checkClose, 100)
    }

    errorCloseCount = errorCloseCount + 1
  }
}

async function checkIframe() {
  const iframeCheck = document.getElementById('chatbot_live_chat_widget')

  if (iframeCheck && xVal === 1298) {
    console.log('Before Retrieval Call')
    // retrieveUUIDandUSERNS()
  } else {
    console.log('Waiting for Iframe to exist or Element not closed yet', errorCount)
    if (errorCount < 250) {
      setTimeout(checkIframe, 100)
    }

    errorCount = errorCount + 1

  }
}
