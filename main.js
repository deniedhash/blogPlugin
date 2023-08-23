let errorCount = 0
async function logM() {
    console.log('Starting the load of UCHAT Script')

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://www.uchat.com.au/js/widget/h0ey00a9hg9wjfyx/float.js?ref=blog--5`

    const head = document.getElementsByTagName('head')[0]
    head.appendChild(script)
  }

// async function checkIframe() {
//     const iframeCheck = document.getElementById('chatbot_live_chat_widget')

//     if (iframeCheck ) {
//       console.log('Before Retrieval Call')
//       // retrieveUUIDandUSERNS()
//     } else {
//       console.log('Waiting for Iframe to exist or Element not closed yet', errorCount)
//       if (errorCount < 250) {
//         setTimeout(checkIframe, 100)
//       }

//       errorCount = errorCount + 1

//     }
//   }

async function checkConvToken() {
    let newCookie = document.cookie
    const strToCheck = 'conv_token'

    if (newCookie.includes(strToCheck)) {
      console.log('Conv_Token found')
      // clickandClose()
        // checkIframe()
    } else {
      console.log('Conv_Token not found')
      // setTimeout(checkConvToken, 500)
    }
  }
logM()
checkConvToken()
