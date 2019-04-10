const d3 = require('d3')
const Nodes = require('./nodes')
const JSDOM = require('jsdom').JSDOM
const markup = `<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<svg></svg>
</body>
</html>`
const jsdom = new JSDOM(markup)

const nodesArray = [
	{ id: 'foo', name: 'bar' },
	{ id: 'hello', name: 'world' }
]


const nodesData = {
	nodes: nodesArray
}

fdescribe ('Nodes', () => {
	let nodes

	beforeEach(() => {
		nodes = new Nodes({
			adapter: '',
			dom: jsdom.,
			container: 'svg'
		})

		// prevent memory link in tests
		// nodes.setMaxListeners(5)

		// nodes.on('hello', (what) => {
		// 	console.log('hello ', whats)
		// })
	})

	it ('has a constructor', () => {
		expect(new Nodes()).not.toEqual(undefined)
	})

	describe ('render()', () => {
		it ('checks parameter', () => {
			expect(() => {
				nodes.render(nodesArray)
			}).toThrow()

			expect(() => {
				nodes.render(nodesData)
			}).not.toThrow()
		})

		describe ('uses general update pattern', () => {
			// GENERAL UPDATE PATTERN:
			// We have to test via our events because `nodes` variable
			// is set on every render() call so we cannot spy on it

			const baseArray = [
				{ id: '1', name: 'foo' },
				{ id: '2', name: 'bar' }
			]

			const updatedNodesArray = [
				{ id: '1', name: 'foo' },
				{ id: '3', name: 'hello world' }
			]

			const addedNode = { id: '3', name: 'hello world' }
			const removedNode = { id: '2', name: 'bar' }
			// console.log('TEST: base nodes', baseArray)
			// console.log('TEST: updated nodes', updatedNodesArray)


			// beforeEach(() => {
			// 	stub = d3.select('svg').selectAll('circle')
			// 	// nodes.render(nodesData)
			// 	jest.mock('d3')
			// 	d3.selectAll.mockResolvedValue(stub)
			// })

			// xit ('join via data()', () => {
			// 	nodes.nodes = d3.select('svg').selectAll('circle')
			// 	let spy = jest.spyOn(nodes.nodes, 'data')
			// 	// let spy2 = jest.spyOn(d3.data, 'data')
			// 	nodes.render(nodesData)
			// 	expect(spy).toHaveBeenCalledTimes(2)
			// })

			fit ('debugging listener', (done) => {
				// initial seed

				let cb = jest.fn((removed) => {
					let foo = removed['_groups']
					console.log('TEST: ', foo)
					// done()
					// expect(foo).toEqual([removedNode])
				})

				nodes.on('enter', cb)
				nodes.render({ nodes: nodesArray })
				// nodes.render({ nodes: updatedNodesArray })
				console.log('expect')

				expect('la').toEqual([removedNode])
			})


			// xit ('exit and remove', (done) => {
			// 	// seed initial selection
			// 	nodes.render({ nodes: baseArray })
			// 	// let updatedArray
			// 	nodes.render({ nodes: updatedNodesArray })

			// 	nodes.on('exit', (n) => {
			// 		console.log(n)
			// 		done()
			// 		expect(n).toEqual('foo')
			// 	})



			// 	// nodes.nodes = d3.select('svg').selectAll('circle')
			// 	// expect(nodes.nodes).not.toEqual(undefined)
			// 	// let spy1 = jest.spyOn(stub, 'data')
			// 	// let spy2 = jest.spyOn(nodes.nodes, 'remove')

			// 	// nodes.render(nodesData)
			// 	// console.log(nodes)

			// 	// expect(spy1).toHaveBeenCalledTimes(1)
			// 	// expect(spy2).toHaveBeenCalledTimes(1)
			// })

			xit ('enter & merge', () => {

			})
		})

		// it.skip ('calls animate()')
	})

	describe ('position()', () => {
		describe ('without `nodes` property', () => {
			it ('throws', () => {
				expect(typeof nodes.nodes).toEqual('undefined')
				expect(() => {
					nodes.position()
				}).toThrow('Error: `nodes` attribute not set. Please render with data first.')
			})
		})

		describe ('with `nodes` property', () => {
			let attrSpy

			beforeEach (() => {
				nodes.nodes = d3.select('svg').selectAll('circle')
				attrSpy = jest.spyOn(nodes.nodes, 'attr')
			})

			afterEach (() => {
				attrSpy.mockRestore()
			})

			it ('calls `attr()` on d3 nodes', () => {
				nodes.position()
				const firstParam = attrSpy.mock.calls[0][0]
				const secondParam = attrSpy.mock.calls[1][0]

				expect(attrSpy).toHaveBeenCalledTimes(2)
				expect(firstParam).toEqual('cx')
				expect(secondParam).toEqual('cy')
			})
		})
	})
})
