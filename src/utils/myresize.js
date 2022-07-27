//将该代码定义为一个js文件
let resize = {
    bind(el, binding) {
        let width = '', height = '';
        function isResize() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
                binding();
            }
            width = style.width;
            height = style.height;
        }
        el._vueSetInterval_ = setInterval(isResize, 100);
    },
    unbind(el) {
        clearInterval(el._vueSetInterval_);
    }
}
export default resize;
