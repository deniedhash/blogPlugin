async function logM() {
    console.log('Starting the load of UCHAT Script')

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://www.uchat.com.au/js/widget/h0ey00a9hg9wjfyx/float.js?ref=blog--5`

    const head = document.getElementsByTagName('head')[0]
    head.appendChild(script)
  }
