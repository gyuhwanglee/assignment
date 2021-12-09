
// 그리 많은 내용은 아니지만, 저처럼 두 개의 차이를 모르셨던 분들을 위해 혼자 정리한 내용을 공유할까 합니다.

// WebSocket vs socket.io
// 사실 애초에 둘은 다른 개념입니다. 웹소켓은 양방향 소통을 위한 프로토콜입니다. 
// 프로토콜은 쉽게 말하자면 서로 다른 컴퓨터끼리 소통하기 위한 약속 정도로 이해하면 됩니다.

// 반면에, socket.io는 양방햔 통신을 하기위해 웹소켓 기술을 활용하는 라이브러리입니다. 
// 어찌보면 자바스크립트와 jQuery의 관계와 비슷하다고 할 수 있겠습니다.

// 그렇기 때문에 socket.io가 같은 기능을 구현하더라도 약간 느리지만, 많은 편의성을 제공합니다. 
// 또한 Java, C++, Python 등 여러 언어들의 라이브러리 또한 지원됩니다.

// 그렇다면 둘 사이에 기술적으로 어떤 차이점이 있는지 짧게 정리했습니다.

// WebSocket

// HTML5 웹 표준 기술
// 매우 빠르게 작동하며 통신할 때 아주 적은 데이터를 이용함
// 이벤트를 단순히 듣고, 보내는 것만 가능함
// Socket.io

// 표준 기술이 아니며, 라이브러리임
// 소켓 연결 실패 시 fallback을 통해 다른 방식으로 알아서 해당 클라이언트와 연결을 시도함
// 방 개념을 이용해 일부 클라이언트에게만 데이터를 전송하는 브로드캐스팅이 가능함
// 그래서 어떤 걸 써야하는데?
// 짧게 정리했지만 사실, 이 정도는 다른 블로그나 문서에도 이미 잘 설명되어 있는 내용입니다.

// 그렇다면 우리에게 정말 중요한 것은 대체 언제 WebSocket을 사용하고, 언제 socket.io를 사용해야할 지 기준을 정해야 하는 것이겠죠.

// 개인적으로 이렇습니다. 서버에서 연결된 소켓(사용자)들을 세밀하게 관리해야하는 서비스인 경우에는 Broadcasting 기능이 있는 socket.io을 쓰는게 유지보수 측면에서 훨씬 이점이 많습니다.

// 반면 가상화폐 거래소같이 데이터 전송이 많은 경우에는 빠르고 비용이 적은 표준 WebSocket을 이용하는게 바람직하겠죠. 실제로 업비트나 바이낸스 소켓 API를 사용해보면 정말 엄청나게 많은 데이터가 들어옵니다.

// 결국 선택의 몫은 어떤 서비스를 제공할 것인가에 따라 달려있네요. (진리의 케바케)

// 아, 추가로 여러분들이 알아두셔야 할 내용이 있습니다. socket.io로 구성된 서버에게 소켓 연결을 하기 위해서는 클라이언트측에서 반드시 socket.io-client 라이브러리를 이용해야합니다. 꼭 짝을 맞춰주세요.

// 웹소켓 (WebSocket) 구현 예제
// 소켓은 양방향 연결이기 때문에 서버와 클라이언트측에서 같이 구현을 해야합니다. 이번 예제는 Node.js를 이용해 서버를 구성하겠습니다.

// 먼저 Node.js에서 표준 웹소켓을 구성하려면 ws 패키지를 사용하면 됩니다.

// shell
// $ npm install ws
// 다음은 간단한 서버측 예제입니다.

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('received: %s', message)
  })

  ws.send('something')
})
// 다음은 클라이언트측 입니다. 웹소켓은 HTML5 모듈이기 때문에 클라이언트 측에서는 따로 모듈을 설치할 필요가 없습니다.

const ws = new WebSocket('ws://localhost:3000')

ws.on('open', () => {
  ws.send('something')
})

ws.on('message', data => {
  console.log(data)
})
// Socket.io 구현 예제
// 먼저 Node.js에서 socket.io를 사용하기 위해 패키지를 설치해줍니다.

// shell
// npm install socket.io
// 다음은 서버 측 예제입니다.

const server = require('http').createServer()

const io = require('socket.io')(server)
io.on('connection', socket => {
  socket.on('message', msg => {
    console.log(msg)
  })
})

server.listen(3000)
// 만약 서버에서 express를 사용하고 있다면 이렇게 사용하면 됩니다.

const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  /* … */
})

server.listen(3000)
// 다음은 클라이언트 측 예제입니다. 아까 말했듯이 socket.io로 구성된 서버에겐 반드시 socket.io-client 패키지로 연결을 시도해야합니다.

// 패키지를 설치합니다.

// shell
// $ npm install socket.io-client