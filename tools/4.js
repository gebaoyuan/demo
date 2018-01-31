
var nodeWrapEl = _$('.wrap'),
    addBtn = _$('.btn.btn-add'),
    removeBtn = _$('.btn.btn-remove'),
    input = _$('.node-input');
addBtn.addEventListener('click', function () {
    var inputText = +input.value;
    if (isNaN(inputText)) {
        alert('请输入合法的数字');
        input.value = '';
        return;
    }
    nodes.add(new Node(inputText));
    renderElement();
})

function renderElement() {
    var nodeEls = nodes.createNodeEl();
    nodeWrapEl.innerHTML = '';
    nodeWrapEl.appendChild(nodeEls);
}

removeBtn.addEventListener('click', function () {
    nodes.root = null;
    renderElement();
    console.log('点击清除节点');
})

// node 节点
class Node {
    constructor(value, leftNode, rightNode) {
        this.value = value;
        this.rightNode = rightNode;
        this.leftNode = leftNode;
    }

    compute(node) {
        return this.value < node.value;
    }

    check() {
        return (this instanceof Node);
    }

    add(node) {
        console.log(this.compute(node));
        if (this.compute(node)) {
            if (this.rightNode) {
                this.rightNode.add(node);
            } else {
                this.rightNode = node;
            }
        } else {
            if (this.leftNode) {
                this.leftNode.add(node);
            } else {
                this.leftNode = node;
            }
        }
    }

    forEach(fn, type = 0) {
        if (typeof fn === 'function') {
            if (0 == type) {
                fn(this, type);
                if (this.leftNode) this.leftNode.forEach(fn, type);
                if (this.rightNode) this.rightNode.forEach(fn, type);
            } else if (1 == type) {

            }
        }
    }

    createNodeEl(type = 'root') {
        var node = createElement('div');
        node.className = type + ' node-wrap';
        var titleEl = createElement('div');
        var text = type == 'root' ? '根节点 : ' : type == 'node-left' ? '左节点:' : '右节点:';
        titleEl.innerText = text + this.value;
        titleEl.className = 'title';
        var childWrapEl = createElement('div');
        childWrapEl.className = 'child-node-wrap';
        if (this.leftNode) {
            childWrapEl.appendChild(this.leftNode.createNodeEl('node-left'));
        }
        if (this.rightNode) {
            childWrapEl.appendChild(this.rightNode.createNodeEl('node-right'));
        }
        node.appendChild(titleEl);
        node.appendChild(childWrapEl);
        return node;

    }
}

class NodeController {
    constructor(node = null) {
        this.root = node;
    }

    add(node) {
        if (this.root) {
            this.root.add(node);
        } else {
            this.root = node;
        }
    }

    forEach(fn, type = 0) {
        if (typeof fn === 'function') {
            this.root.forEach(fn, type);
        }
    }

    createNodeEl() {
        if (this.root) {
            return this.root.createNodeEl();
        } else {
            return createElement('div');
        }
    }
}


var nodes = new NodeController();
