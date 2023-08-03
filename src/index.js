import ccfilter from '@cocreate/filter'
import crud from '@cocreate/crud-client';

var CoCreateProgress = {

    selector: ".progress-wrapper",

    mainObjects: [],

    init: function () {
        this.initElement()
        this.initEvent()
    },

    initElement: function (container) {
        const main_container = container ? container : document;

        let elements = main_container.querySelectorAll(this.selector);
        let _this = this;
        elements.forEach((el) => {
            let filter = ccfilter.init(el, 'data-progress_id', 'progress')

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

    initEvent: function () {
        let _this = this;
        crud.listen('read.object', function (data) {

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
        const eid = data.element;
        if (!eid) {
            return;
        }

        const result_count = data.object.length
        let _this = this;
        let elements = [];
        let selector = isTotal ? '.progressTotal' : '.progressValue';
        selector = selector + `[data-progress_id="${eid}"]`;

        elements = document.querySelectorAll(selector)

        elements.forEach((el) => {
            el.textContent = result_count;
        })

        //. set progressbar

        elements = document.querySelectorAll(`.progressbar[data-progress_id="${eid}"]`)

        elements.forEach((el) => {

            if (el.tagName === "PROGRESS") {
                if (isTotal) {
                    el.setAttribute('max', result_count);
                } else {
                    el.setAttribute('value', result_count);
                }
            } else {
                if (isTotal) {
                    el.setAttribute('data-total', result_count);
                } else {
                    el.setAttribute('data-value', result_count);
                }
                _this.renderBar(el)
            }
        })
    },

    renderBar: function (el) {
        const total = Number(el.getAttribute('data-total'));
        const value = Number(el.getAttribute('data-value'));

        if (!total || !value || total === 0) {
            return;
        }

        const percent = (value / total) * 100;
        el.innerHTML = `<div style="width: ${percent}%"></div>`;
    },

    fetchProgess: function (el) {
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
        let totalFilter = { method: 'read.object', ...filter };
        let valueFilter = { method: 'read.object', ...filter }

        let progressName = el.getAttribute('data-progress_name')
        let progressValue = el.getAttribute('data-progress_value')

        let valueOperator = el.getAttribute('data-progress_operator') || "contain"

        totalFilter['metadata'] = 'progress-total';
        valueFilter['metadata'] = 'progress-value'

        let val_filter = [].concat(valueFilter['operator']['filters']);
        val_filter.push({ name: progressName, value: [progressValue], operator: valueOperator });
        valueFilter['operator']['filters'] = val_filter;

        crud.send(totalFilter)
        crud.send(valueFilter)
    }
}

CoCreateProgress.init();

export default CoCreateProgress;
