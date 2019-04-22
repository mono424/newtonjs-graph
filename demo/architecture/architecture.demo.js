const io = require('socket.io-client')
const Graph = require('./../../newton').ColaGraph
const Network = require('./../../newton').Network
const data = require('./architecture.data')

// ----------- SETUP AND BIND ----------- //

const network = new Network(data.nodes, data.links)
const graph = new Graph({
	width: window.innerWidth,
	height: window.innerHeight - 60, // top in css
	flow: 'horizontal',
	draggable: true,
	network: network
})
graph.init()

// ----------- REAL TIME UPDATES ----------- //

const socket = io('http://localhost:3000')

socket.on('connect', (data) => {
	socket.emit('join', 'Newton.js Graph connected')
})

socket.on('network:data', function (d) {
	console.log('[demo] data received')
	console.log(d)

	if (isValidData(d)) {
		network.updateData(d.nodes, d.links)
	}
})

function isValidData (data) {
	if (data.hasOwnProperty('nodes') && data.hasOwnProperty('links')) {
		return true
	} else {
		throw 'ERROR [Socket] - invalid data received. `nodes` and `links` properties are required.'
	}
}