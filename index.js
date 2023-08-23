let refreshValue = 0
let content
let errorCount = 0
let errorCheckCount = 0
let errorCloseCount = 0
const random = Math.random()
const randomNumber = Math.floor(random * 9) + 1
let xVal = 0
let userns
let scrollCheck = 0
let chatBotOpenCloseCheck = "close"
let navBarElementHeight
let firstMessageTimer = 10000
let firstMessageIdleTimer
let messageIntervalCheck = "not set"
let recheckTimer = 500
let scrollingTimer

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
      setupMutationObserver();
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
    retrieveUUIDandUSERNS()
  } else {
    console.log('Waiting for Iframe to exist or Element not closed yet', errorCount)
    if (errorCount < 250) {
      setTimeout(checkIframe, 100)
    }

    errorCount = errorCount + 1

  }
}
async function retrieveUUIDandUSERNS() {
  setTimeout(async () => {
    try {
      let url = await getDocumentFromID()
      console.log('URL: ' + url)
      let urlsrc = await updateUrl(url)
      let userdata = await sendUrl(urlsrc)
      console.log(userdata)
      userns = userdata.userdata.userns
      console.log('USERNS: ' + userns)
      scrollCheck = 23

    } catch (error) {
      console.error('Error while getting elements from URL:', error)
    }
  }, 2000)
}

async function getDocumentFromID() {
  const iframeElement = document.getElementById('chatbot_live_chat_widget')
  console.log(iframeElement.src)

  console.log(iframeElement)

  return iframeElement.src
}

async function updateUrl(url) {
  let x
  console.log(url)
  const convToken = await getCookie('conv_token')
  let myCookie = 'conv_token=' + convToken
  const strToCheck = 'conv_token'

  if (url.includes(strToCheck)) {
    x = url
  } else {
    x = url + '&' + myCookie
  }

  console.log('UPDATED URL: ' + x)

  return x

}
async function getCookie(name) {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }
  return null
}

async function sendUrl(src) {
  const url = 'https://blog-uchat-nudge.thechatman.ai:3001/getuserns?url=' + src
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Error:', error)

  }
}
function setupMutationObserver() {
  const visibleElement = document.querySelector(".bot-widget-holder.bot-elements--right.bot-elements--right");

  if (!visibleElement) {
    console.log("Element not found. Waiting and retrying...");
    setTimeout(setupMutationObserver, 500);
    return;
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    console.log(visibleElement)
    console.log(window.getComputedStyle(visibleElement))
    let impChecker = window.getComputedStyle(visibleElement).visibility;
    let shadow = window.getComputedStyle(visibleElement).boxShadow

    if (impChecker === 'visible') {
      if (shadow !== "none") {
        chatBotOpenCloseCheck = "open"
        console.log(chatBotOpenCloseCheck)
      }
      else {
        chatBotOpenCloseCheck = "close"
        console.log(chatBotOpenCloseCheck)

        clearTimeout(scrollingTimer)
      }
    }


    else {

      chatBotOpenCloseCheck = "close"
      console.log(chatBotOpenCloseCheck)

      clearTimeout(scrollingTimer)
    }

  });

  observer.observe(visibleElement, { attributes: true });
}

function sendFirstMessage() {
  firstMessageIdleTimer = setTimeout(async function checkPElementsAndSend() {
    if (scrollCheck === 23 && messageIntervalCheck === "set" && chatBotOpenCloseCheck === "close") {

      try {
        content = await getVisibleParagraphs()
        console.log("OK")
      } catch (error) {
        console.error('Error while getting visible paragraphs:', error)
      }

      try {


        await postDataToAPI(content, userns)
        firstMessageSent = "sent"
        console.log(firstMessageSent)

        // window.addEventListener('scroll', subsequentMessageScroll)

      }
      catch (error){
        console.log('ERROR: ', error)
      }


    } else {
      clearTimeout(firstMessageIdleTimer)
      firstMessageIdleTimer = setTimeout(checkPElementsAndSend, recheckTimer)
    }

  }, recheckTimer)


}
function setMessageInterval() {
  messageIntervalCheck = "set"
  sendFirstMessage()
  console.log(messageIntervalCheck)
}
function setVar() {
  setTimeout(setMessageInterval, firstMessageTimer)
}
function getNavBarHeight() {
  const navBarElement = document.getElementById('navbarTop')

  if (navBarElement) {
    navBarElementHeight = navBarElement.offsetHeight;
    console.log("MY HEIGHT", navBarElementHeight)
  }
}

function newCall() {
  setVar();
  getNavBarHeight();
}

if (document.readyState === "complete") {
  newCall()
} else {
  window.addEventListener('load', newCall);
}

async function getVisibleParagraphs() {
  console.log('This works too')
  console.log('Navbar height:', navBarElementHeight)
  const containerDiv = document.querySelector('.flex.flex-col.items-start.justify-start.mt-4');
  const paragraphs = Array.from(containerDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, strong'));

  let pageTop = 0 + navBarElementHeight

  let visibleParagraphs = '';

  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const rect = paragraph.getBoundingClientRect();

    if (rect.bottom >= pageTop && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      visibleParagraphs = visibleParagraphs + paragraph.outerHTML;
    }
  }

  const h1 = document.querySelector('h1');
  let newData = "####\n" + (h1 ? h1.innerText : '') + "\n####\n****\n" + visibleParagraphs + "\n****";
  return newData;
}

async function postDataToAPI(data, userns) {
  const article = {
    content: data,
    userns: userns,
  }

  const jsonArticle = JSON.stringify(article)
  console.log(article)


  const url = 'https://blog-uchat-nudge.thechatman.ai:3001/postapi'


  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonArticle,
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.json())
        console.log('Data posted successfully.')
      } else {
        console.log('Failed to post data. Status code:', response.status)
        console.log(body)
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}
