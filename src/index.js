var CoCreateProgress = {
    selector: "[plugin='progress']",
    // mainObjects: [],

    init: async function (element) {
        if (element && !Array.isArray(element))
            element = [element]
        else if (!element)
            element = document.querySelectorAll(this.selector);

        for (let i = 0; i < element.length; i++) {
            element[i].setValue = (data) => this.setData(element[i], data)
            if (element[i].getValue) {
                let value = await element[i].getValue()
                if (value)
                    element[i].setValue(value)
            }
            // element[i].getValue = () => self.getData(data)

        }

    },

    setData: function (element, data) {
        if (data.metadata == "progress-total") {
            this.renderProgress(element, data, true);
        } else if (data.metadata == "progress-value") {
            this.renderProgress(element, data, false)
        }
    },

    renderProgress(element, data, isTotal) {
        if (!data) return;

        let elements = element.querySelectorAll(`.progressbar`)

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].tagName === "PROGRESS") {
                if (isTotal) {
                    elements[i].setAttribute('max', result_count);
                } else {
                    elements[i].setAttribute('value', result_count);
                }
            } else {
                if (isTotal) {
                    elements[i].setAttribute('data-total', result_count);
                } else {
                    elements[i].setAttribute('data-value', result_count);
                }
                this.render(elements[i])
            }

        }

    },

    render: function (el) {
        const total = Number(el.getAttribute('data-total'));
        const value = Number(el.getAttribute('data-value'));

        if (!total || !value || total === 0) {
            return;
        }

        const percent = (value / total) * 100;
        el.innerHTML = `<div style="width: ${percent}%"></div>`;
    },

    //     fetchProgess: function (el) {
    //         let select_obj = null
    //         let _id = el.getAttribute('data-progress_id')

    //         this.mainObjects.forEach((item) => {
    //             if (item.id == _id) {
    //                 select_obj = item;
    //             }
    //         })
    //         if (!select_obj) return;

    //         let filter = select_obj.filter;
    //         console.log(filter)
    //         let totalFilter = { method: 'read.object', ...filter };
    //         let valueFilter = { method: 'read.object', ...filter }

    //         let progressName = el.getAttribute('data-progress_name')
    //         let progressValue = el.getAttribute('data-progress_value')

    //         let valueOperator = el.getAttribute('data-progress_operator') || "contain"

    //         totalFilter['metadata'] = 'progress-total';
    //         valueFilter['metadata'] = 'progress-value'

    //         let val_filter = [].concat(valueFilter['operator']['filters']);
    //         val_filter.push({ key: progressName, value: [progressValue], operator: valueOperator });
    //         valueFilter['operator']['filters'] = val_filter;

    //         crud.send(totalFilter)
    //         crud.send(valueFilter)
    //     }
}

CoCreateProgress.init();

export default CoCreateProgress;
