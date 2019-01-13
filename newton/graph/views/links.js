const d3 = require('d3')
const View = require('./view')
const Transitions = require('./transitions')

const SELECTOR = '.link'
const nodeRadius = 12
const arrowViewbox = 10

/**
 * Encapsulates what is needed to create the links between
 * nodes of a network graph, namely rendering and positioning
 *
 * @extends View
 */
class Links extends View {
	/**
	 * @param {Object} options
	 * @param {String} [options.container] - HTML identifier used by for d3
	 */
	constructor (options = {}) {
		super()
		this.container = options.container || 'svg'
	}

	render (data) {
		let t = d3.transition()
			.duration(100)
			.ease(d3.easeLinear)

		let links = d3.select(this.container)
			.selectAll(SELECTOR)
			.data(data.links, (d) => 'link-' + d.source.id + '-' + d.target.id)

		links.exit()
			.transition(t)
				.call(Transitions.fadeOut)
				.call(Transitions.FadeDown.link)
			.remove()

		links = links.enter()
			.append('line')
			.merge(links)
				.attr('class', 'link')

		this.links = links
	}

	position (options = {}) {
		this.links
			.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', function (d) {
				let pos = d.target.x
				pos = (options.arrowheads && options.flow === 'horizontal')
					? pos - nodeRadius/2 - arrowViewbox
					: pos
				return pos
			})
			.attr('y2', (d) => d.target.y)
	}
}

module.exports = Links