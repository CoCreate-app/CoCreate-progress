var CoCreateProgress = {
	
	selector: ".progress-wrapper",
	
	mainObjects: [],
	
	init: function() {
		this.initElement()
		this.initEvent()
	},
	
	initElement: function(container) {
		const main_container = container ? container : document;
		
		let elements = main_container.querySelectorAll(this.selector);
		let _this = this;
		elements.forEach((el) => {
			let filter = g_cocreateFilter.setFilter(el, 'data-progress_id', 'progress')
			
			if (!filter) return;
			
			let obj = {
				el: el,
				filter: filter,
				id: el.getAttribute('data-progress_id')
			}
			_this.mainObjects.push(obj);
			_this.fetchProgess(el)

		})
	},
	
	initEvent: function() {
		let _this = this;
		socket.on('readDocumentList', function(data) {

			if (data.metadata == "progress-total") {
				_this.renderProgress(data, true);
			} else if (data.metadata == "progress-value") {
				_this.renderProgress(data, false)
			}
		})
	},
	
	renderProgress(data, isTotal) {
		//.
		if (!data) return;
		const element_id = data.element;
		if (!element_id) {
			return;
		}

		const result_count = data['data'].length
		let _this = this;		
		let elements = [];
		let selector  = isTotal ? '.progressTotal' : '.progressValue';
		selector = selector + `[data-progress_id="${element_id}"]`;
		
		elements = document.querySelectorAll(selector)

		elements.forEach((el) => {
			el.textContent = result_count;
		})
		
		//. set progressbar
		
		elements = document.querySelectorAll(`.progressbar[data-progress_id="${element_id}"]`)
		
		elements.forEach((el) => {
			if (isTotal) {
				el.setAttribute('data-total', result_count);
			} else {
				el.setAttribute('data-value', result_count);
			}
			
			_this.renderBar(el)
		})
	},
	
	renderBar: function(el) {
		const total = Number(el.getAttribute('data-total'));
		const value = Number(el.getAttribute('data-value'));
		
		if (!total || !value || total === 0) {
			return;
		}
		
		const percent = (value / total) * 100;
		el.innerHTML = `<div style="width: ${percent}%"></div>`;
	},
	
	fetchProgess: function(el) {
		let select_obj = null
		let _id = el.getAttribute('data-progress_id')
		
		this.mainObjects.forEach((item) => {
			if (item.id == _id) {
				select_obj = item;
			}
		})
		if (!select_obj) return;
		
		let filter = select_obj.filter;
		console.log(filter)
		let totalFilter = g_cocreateFilter.makeFetchOptions(filter);
		let valueFilter = g_cocreateFilter.makeFetchOptions(filter)

		let progressName = el.getAttribute('data-progress_name')
		let progressValue = el.getAttribute('data-progress_value')
		
		let valueOperator = el.getAttribute('data-progress_operator') || "contain"
		
		totalFilter['metadata'] = 'progress-total';
		valueFilter['metadata'] = 'progress-value'
		
		let val_filter = [].concat(valueFilter['operator']['filters']);
		val_filter.push({name: progressName, value: [progressValue], operator: valueOperator});
		valueFilter['operator']['filters'] = val_filter;

		CoCreate.readDocumentList(totalFilter)
		CoCreate.readDocumentList(valueFilter)
	}
}

CoCreateProgress.init();



