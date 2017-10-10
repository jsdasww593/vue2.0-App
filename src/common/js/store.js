/**
 *  每次点击收藏,保存模拟对应的id和key值.
 */
export function saveToLocal(id, key, value) {
    let seller = window.localStorage._seller_;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) seller[id] = {};
    }
    seller[id][key] = value;
    window.localStorage._seller_ = JSON.stringify(seller);
};
/**
 *  每次刷新页面,在本地存储读取相应id和key值,有则返回对应值、没有返回默认值:false
 */
export function loadFromLocal(id, key, def) {
    let seller = window.localStorage._seller_;
    if (!seller) return def;
    seller = JSON.parse(seller)[id];
    if (!seller) return def;
    let ret = seller[key];
    return ret || def;
};
