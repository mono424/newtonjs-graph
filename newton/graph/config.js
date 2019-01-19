const config = {
	nodes: {
		id: (d) => 'node-' + d.id,
		defaultRadius: 12,
		radius: (d) => {
			d.size || this.defaultRadius
		},
	},
	links: {
		id: (d) => 'link-' + d.source.id + '-' + d.target.id
	},
	labels: {
		id:  (d) => 'label-' + d.id
	}
}

module.export = Object.assign({}, config)